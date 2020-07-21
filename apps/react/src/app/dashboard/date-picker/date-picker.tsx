import React, { useState } from 'react';

import './date-picker.scss';

export interface DatePickerProps {
  label: string;
  value: string;
  min?: string;
  max?: string;
  onChange?: (MouseEvent) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  label,
  value,
  min,
  max,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <label
      className={`date-picker__wrapper ${
        isFocus ? 'date-picker__wrapper--focused' : ''
      }`}
    >
      <div className="date-picker__label">{label}</div>
      <input
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        className="date-picker__input"
        type="date"
        value={value}
        min={min ? min : null}
        max={max ? max : null}
        onChange={onChange ? onChange : null}
      />
    </label>
  );
};

export default DatePicker;
