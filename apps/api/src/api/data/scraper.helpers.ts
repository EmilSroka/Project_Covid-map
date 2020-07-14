export class Scraper {
  constructor(private htmlPage: string) {}

  do() {
    const table = this.extractTable(this.htmlPage);
    const rows = this.splitIntoRows(table);
    const tableBodyRows = this.extractTableBody(rows);
    const data = this.extractData(tableBodyRows);

    return data;
  }

  private readonly tableRegex = /<table class="wikitable mw-collapsible".*?<\/table>/s;
  private extractTable(data: string): string {
    return data.match(this.tableRegex)[0];
  }

  private splitIntoRows(table: string): string[] {
    return table.split('<tr>');
  }

  private readonly rowsInHeader = 3;
  private readonly rowsInFooter = 3;
  private extractTableBody(rows: string[]): string[] {
    return rows.slice(this.rowsInHeader + 1, -this.rowsInFooter);
  }

  private readonly numberOfProvinces = 16;
  private extractData(data: string[]): [Date[], string[][]] {
    const days: Date[] = [];
    const casesTable: string[][] = FilledTableFactory(
      this.numberOfProvinces,
      data.length,
      ''
    );

    for (let [key, row] of Object.entries(data)) {
      const rowIndex = Number(key);
      const cells = row.split('<td');

      for (let [key, cell] of Object.entries(cells)) {
        let columnIndex = Number(key);

        if (isSummaryColumn(columnIndex)) {
          continue;
        } else if (isDateColumn(columnIndex)) {
          days.push(extractDate(cell));
        } else {
          columnIndex -= numberOfSummariesColumnBefore(columnIndex) + 1; // 1 for date column
          columnIndex = getIndexOfFirstEmptyColumn(
            casesTable[rowIndex],
            columnIndex,
            this.numberOfProvinces
          );

          const cases = getCases(cell);
          const rowspan = getRowspan(cell);

          casesTable[rowIndex][columnIndex] = cases;
          if (rowspan) {
            fillNextNCellsInColumn(
              casesTable,
              rowIndex,
              columnIndex,
              Number(rowspan),
              cases
            );
          }
        }
      }
    }

    return [days, casesTable];
  }
}

/* HELPERS */

function FilledTableFactory<T>(width: number, height: number, value: T): T[][] {
  const table: T[][] = [];
  for (let row = 0; row <= height; row++) {
    table[row] = [];
    for (let column = 0; column < width; column++) {
      table[row][column] = value;
    }
  }
  return table;
}

const summaryColumnsRanges = [
  [1, 3],
  [20, 20],
];
function isSummaryColumn(column: number): boolean {
  for (const [start, end] of summaryColumnsRanges) {
    if (column >= start && column <= end) return true;
  }
  return false;
}

function numberOfSummariesColumnBefore(column: number): number {
  return summaryColumnsRanges.reduce((accumulator, [start, stop]) => {
    if (stop <= column) {
      return accumulator + stop - start + 1;
    } else if (start <= column) {
      return accumulator + column - start + 1;
    } else {
      return accumulator;
    }
  }, 0);
}

const dateColumnIndex = 0;
function isDateColumn(column: number): boolean {
  return column === dateColumnIndex;
}

const dateRegex = /(\d\d)\.(\d\d)/;
const year = 2020;
function extractDate(cell: string): Date {
  const [, day, month] = cell.match(dateRegex);
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(process.env.TIMEZONE)
  );
}

function getIndexOfFirstEmptyColumn(
  casesTableRow: string[],
  index: number,
  limit: number
): number {
  while (casesTableRow[index] != '' && index < limit) {
    index += 1;
  }
  return index;
}

const casesRegex = /(?<=>).*?(?=<)/s;
function getCases(cell: string) {
  return cell.match(casesRegex)[0].trim();
}

const rowspanRegex = /(?<=rowspan=").*?(?=")/s;
function getRowspan(cell: string) {
  const match = cell.match(rowspanRegex);
  return match ? match[0] : null;
}

function fillNextNCellsInColumn<T>(
  table: T[][],
  startRow: number,
  column: number,
  count: number,
  value: T
) {
  for (let i = 1; i < count; i++) {
    table[startRow + i][column] = value;
  }
}
