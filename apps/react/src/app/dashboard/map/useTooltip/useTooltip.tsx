import React, { useState, useCallback, useRef } from 'react';
import './tooltip.scss';

export type useTooltipInput = [string, { x: number; y: number }, boolean];

const useTooltip = ([
  defaultContent,
  defaultPosition,
  defaultVisibility,
]: useTooltipInput): [JSX.Element, (useTooltipInput) => void] => {
  const [content, setContent] = useState(defaultContent);
  const [{ x, y }, setPosition] = useState(defaultPosition);
  const [isVisible, setVisibility] = useState(defaultVisibility);

  const style = {
    display: isVisible ? 'block' : 'none',
    left: x,
    top: y,
  };

  const tooltip = (
    <div style={style} className="tooltip">
      <p className="content">{content}</p>
    </div>
  );

  const setTooltipState = useCallback(
    ([newContent, newPosition, newVisibility]: useTooltipInput) => {
      setContent(newContent);
      setPosition(newPosition);
      setVisibility(newVisibility);
    },
    []
  );

  return [tooltip, setTooltipState];
};

export default useTooltip;
