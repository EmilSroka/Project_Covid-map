import React from 'react';

import './interval-route.scss';
import { useParams, useHistory } from 'react-router-dom';
import DatePicker from '../date-picker/date-picker';
import {
  increaseDateString,
  dateStringToFormString,
  formStringToDateString,
} from '@covid-app/helpers';

export const IntervalRoute: React.FC<{}> = () => {
  const { startDate, stopDate } = useParams();
  const history = useHistory();
  return (
    <div className="interval-route__wrpper">
      <DatePicker
        label="Pick date"
        value={dateStringToFormString(startDate)}
        max={dateStringToFormString(increaseDateString(stopDate, -1))}
        onChange={(e) => {
          history.push(
            `/interval/${formStringToDateString(e.target.value)}/${stopDate}`
          );
        }}
      ></DatePicker>
      <DatePicker
        label="Pick date"
        value={dateStringToFormString(stopDate)}
        min={dateStringToFormString(increaseDateString(startDate, 1))}
        onChange={(e) => {
          history.push(
            `/interval/${startDate}/${formStringToDateString(e.target.value)}`
          );
        }}
      ></DatePicker>
    </div>
  );
};

export default IntervalRoute;
