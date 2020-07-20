import React, { useEffect, useState } from 'react';
import Map from './map/map';

import './dashboard.scss';
import { Route, Switch, Redirect, useParams } from 'react-router-dom';
import DateRoute from './date-route/date-route';
import IntervalRoute from './interval-route/interval-route';
import Title from './title/title';
import { getProvinces } from './requests/provinces';
import { getCases } from './requests/cases';
import Toggle from './toggle/toggle';
import { dateStringToDisplayString } from '@covid-app/helpers';

export const Dashboard = () => {
  const { startDate, stopDate, date } = useParams();
  const [provinces, setProvinces] = useState([]);
  const [cases, setCases] = useState([]);
  const [isRequestError, setIsRequestError] = useState(false);

  useEffect(() => {
    getCases().then((newProvinces) => setProvinces(newProvinces));
  }, []);

  useEffect(() => {
    getProvinces(date, startDate, stopDate)
      .then((newCases) => (setCases(newCases), setIsRequestError(false)))
      .catch((newCases) => (setCases(newCases), setIsRequestError(true)));
  }, [startDate, stopDate, date]);

  return (
    <div className="dashboard__container">
      {isRequestError ? (
        <p className="dashboard__error-msg">No response from backend.</p>
      ) : null}
      <Title startDate={startDate} stopDate={stopDate} date={date}></Title>
      <Map provinces={provinces} titleID="dashboard__title" cases={cases}></Map>
      <Toggle option={date ? 0 : 1}></Toggle>
      <Switch>
        <Route exact path="/date/:date" component={DateRoute}></Route>
        <Route
          exact
          path="/interval/:startDate/:stopDate"
          component={IntervalRoute}
        ></Route>
        <Redirect from="/" to="/date/04-03-2020" />
      </Switch>
    </div>
  );
};

export default Dashboard;
