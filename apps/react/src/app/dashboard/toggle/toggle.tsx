import React from 'react';

import './toggle.scss';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ToggleProps {
  option: number;
}

export const Toggle: React.FC<ToggleProps> = ({ option }) => {
  console.log('rerender');

  return (
    <div className="toggle__wrapper">
      <div
        className="toggle__indicator"
        style={{
          transform: option ? 'translate(100%)' : 'translate(0%)',
        }}
      ></div>
      <Link className="toggle__link" to="/date/04-03-2020">
        Pick by date
      </Link>
      <Link className="toggle__link" to="/interval/04-03-2020/29-06-2020">
        Pick by interval
      </Link>
    </div>
  );
};

export default Toggle;
