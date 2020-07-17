import React from 'react';

import './date-route.scss';
import DatePicker from '../date-picker/date-picker';
import { RouteComponentProps } from 'react-router-dom';
import {
  dateStringToFormString,
  formStringToDateString,
} from '@covid-app/helpers';

interface MatchParams {
  date: string;
}

export const DateRoute: React.FC<RouteComponentProps<MatchParams>> = (
  props
) => {
  const date = dateStringToFormString(props.match.params.date);
  return (
    <div className="date-route__wrpper">
      <DatePicker
        label="Pick date"
        value={date}
        onChange={(e) => {
          props.history.push(`/date/${formStringToDateString(e.target.value)}`);
        }}
      ></DatePicker>
    </div>
  );
};

export default DateRoute;
