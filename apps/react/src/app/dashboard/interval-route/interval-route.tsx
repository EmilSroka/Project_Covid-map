import React from 'react';

import './interval-route.scss';
import { RouteComponentProps } from 'react-router-dom';
import DatePicker from '../date-picker/date-picker';
import {
  increaseDateString,
  dateStringToFormString,
  formStringToDateString,
} from '@covid-app/helpers';

interface MatchParams {
  startDate: string;
  stopDate: string;
}

export const IntervalRoute: React.FC<RouteComponentProps<MatchParams>> = (
  props
) => {
  const startDate = props.match.params.startDate;
  const stopDate = props.match.params.stopDate;
  return (
    <div className="date-route__wrpper">
      <DatePicker
        label="Pick date"
        value={dateStringToFormString(startDate)}
        max={dateStringToFormString(increaseDateString(stopDate, -1))}
        onChange={(e) => {
          props.history.push(
            `/interval/${formStringToDateString(e.target.value)}/${stopDate}`
          );
        }}
      ></DatePicker>
      <DatePicker
        label="Pick date"
        value={dateStringToFormString(stopDate)}
        min={dateStringToFormString(increaseDateString(startDate, 1))}
        onChange={(e) => {
          props.history.push(
            `/interval/${startDate}/${formStringToDateString(e.target.value)}`
          );
        }}
      ></DatePicker>
    </div>
  );
};

export default IntervalRoute;
