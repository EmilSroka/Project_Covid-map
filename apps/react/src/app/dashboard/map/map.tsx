import React, { useState, useRef, useEffect, useReducer, useMemo } from 'react';
import { Province, Cases } from '@covid-app/types';
import {
  calculateColor,
  getMaxCases,
  calcTooltipStateFromMouseEvent,
  getProvinceDescription,
  calcTooltipStateFromFocusEvent,
} from '@covid-app/helpers';
import { fromEvent } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';
import useTooltip from './useTooltip/useTooltip';

import './map.scss';

const hue = 355;
const tooltipTime = 1000;

export interface MapProps {
  titleID: string;
  provinces: Province[];
  cases: Cases[];
}

export const Map: React.FC<MapProps> = ({ cases, titleID, provinces }) => {
  const [maxCases, setMaxCases] = useState(0);
  const [isTooltipActive, setIsTooltipActive] = useState(false);
  const [Tooltip, setTooltipState] = useTooltip(['', { x: 0, y: 0 }, false]);

  const svgRootEl = useRef(null);
  const isMouseOver = useRef(false);
  const casesRef = useRef([]);
  const provincesRef = useRef([]);

  casesRef.current = cases;
  provincesRef.current = provinces;

  useEffect(() => {
    setMaxCases(getMaxCases(cases));
  }, [cases]);

  useEffect(() => {
    const event = fromEvent<MouseEvent>(svgRootEl.current, 'mousemove')
      .pipe(
        debounceTime(tooltipTime),
        filter(() => isMouseOver.current)
      )
      .subscribe((e) => {
        setTooltipState(
          calcTooltipStateFromMouseEvent(
            e,
            provincesRef.current,
            casesRef.current
          )
        );
        setIsTooltipActive(true);
      });

    return () => event.unsubscribe();
  }, []);

  return (
    <div className="map__wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 612.75696 577.23169"
        className="svg-root"
        role="group"
        aria-labelledby={titleID}
        aria-describedby="map-description"
        ref={svgRootEl}
        onMouseOver={() => (isMouseOver.current = true)}
        onMouseOut={() => (isMouseOver.current = false)}
        onMouseMove={() =>
          isTooltipActive
            ? (setTooltipState(['', { x: 0, y: 0 }, false]),
              setIsTooltipActive(false))
            : null
        }
      >
        <desc id="map-description">
          COVID-19 cases in provinces on given date
        </desc>
        <g role="list">
          {provinces.map(({ borders, id, name }) => (
            <path
              tabIndex={0}
              key={id}
              className="map__path"
              role="listitem"
              d={borders}
              id={id}
              fill={calculateColor(hue, id, maxCases, cases)}
              stroke="black"
              aria-label={getProvinceDescription(id, provinces, cases)}
              onFocus={(e) => {
                setTooltipState(
                  calcTooltipStateFromFocusEvent(
                    (e as unknown) as FocusEvent,
                    provincesRef.current,
                    casesRef.current
                  )
                );
                setIsTooltipActive(true);
              }}
              onBlur={() => {
                setTooltipState(['', { x: 0, y: 0 }, false]);
                setIsTooltipActive(false);
              }}
            ></path>
          ))}
        </g>
      </svg>
      {Tooltip}
    </div>
  );
};

export default Map;
