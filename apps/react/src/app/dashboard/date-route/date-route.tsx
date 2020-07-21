import React from 'react';

import './date-route.scss';
import DatePicker from '../date-picker/date-picker';
import { useParams, useHistory } from 'react-router-dom';
import {
  dateStringToFormString,
  formStringToDateString,
} from '@covid-app/helpers';

export const DateRoute: React.FC<{}> = (props) => {
  const { date } = useParams();
  const history = useHistory();
  return (
    <div className="date-route__wrpper">
      <DatePicker
        label="Pick date"
        value={dateStringToFormString(date)}
        onChange={(e) => {
          history.push(`/date/${formStringToDateString(e.target.value)}`);
        }}
      ></DatePicker>
    </div>
  );
};

export default DateRoute;
