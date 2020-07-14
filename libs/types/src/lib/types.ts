export interface Province {
  borders: string;
  id: string;
  name?: string;
}

export interface Cases {
  cases: number;
  id: string;
}

export interface DailyCases {
  date: Date;
  cases: Cases[];
}

export enum Provinces {
  'PL-DS' = 0,
  'PL-KP' = 1,
  'PL-LU' = 2,
  'PL-LB' = 3,
  'PL-LD' = 4,
  'PL-MA' = 5,
  'PL-MZ' = 6,
  'PL-OP' = 7,
  'PL-PK' = 8,
  'PL-PD' = 9,
  'PL-PM' = 10,
  'PL-SL' = 11,
  'PL-SK' = 12,
  'PL-WN' = 13,
  'PL-WP' = 14,
  'PL-ZP' = 15,
}
