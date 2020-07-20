import React from 'react';

import './toggle.scss';
import { Link } from 'react-router-dom';

export interface ToggleProps {
  option: number;
}

export const Toggle: React.FC<ToggleProps> = ({ option }) => {
  return (
    <div className="toggle__wrapper">
      <div
        className="toggle__indicator"
        style={{
          transform: option ? 'translate(100%)' : 'translate(0%)',
        }}
      ></div>
      <Link className="toggle__link" to="/date/04-03-2020">
        <span tabIndex={-1} className="toggle__link__content">
          Pick by date
        </span>
      </Link>
      <Link
        className="toggle__link toggle__link--right"
        to="/interval/04-03-2020/29-06-2020"
      >
        <span tabIndex={-1} className="toggle__link__content">
          Pick by interval
        </span>
      </Link>
    </div>
  );
};

export default Toggle;
