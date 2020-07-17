import React from 'react';

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
  return (
    <label className="date-picker__wrapper">
      <div className="date-picker__label">{label}</div>
      <input
        className="date-picker__input"
        type="date"
        aria-label="Choose date"
        value={value}
        min={min ? min : null}
        max={max ? max : null}
        onChange={onChange ? onChange : null}
      />
    </label>
  );
};

export default DatePicker;
