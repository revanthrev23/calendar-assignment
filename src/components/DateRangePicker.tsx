import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { IDateRangePickerProps } from './types'

const DateRangePicker: React.FC<IDateRangePickerProps> = ({ onChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  useEffect(() => {
    onChange(startDate, endDate);
  }, [startDate, endDate, onChange])

  return (
    <div className="date-range-picker">
      <Calendar
        onDateSelect={handleDateSelect}
        startDate={startDate}
        endDate={endDate}
      />
      <div className="selected-dates">
        {startDate && endDate && <p>Selected data range is from <b>{startDate.toDateString()}</b> to <b>{endDate.toDateString()}</b>.</p>}
      </div>
    </div>
  );
};

export default DateRangePicker;
