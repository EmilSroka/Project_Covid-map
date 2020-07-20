import React from 'react';

import './title.scss';
import { dateStringToDisplayString } from '@covid-app/helpers';

export interface TitleProps {
  startDate: string;
  stopDate: string;
  date: string;
}

export const Title: React.FC<TitleProps> = ({ startDate, stopDate, date }) => {
  return (
    <div>
      {date ? (
        <h1 id="dashboard__title" className="dashboard__title">
          Coronavirus cases in Poland on {dateStringToDisplayString(date)}
        </h1>
      ) : null}
      {startDate && stopDate ? (
        <h1
          id="dashboard__title"
          className="dashboard__title dashboard__title--small"
        >
          Coronavirus cases in Poland from{' '}
          {dateStringToDisplayString(startDate)} to{' '}
          {dateStringToDisplayString(stopDate)}
        </h1>
      ) : null}
    </div>
  );
};

export default Title;
