import React, { useState } from "react";
import Day from "./Day";
import { ICalendarProps } from "./types";

const Calendar: React.FC<ICalendarProps> = ({
  onDateSelect,
  startDate,
  endDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);

  const daysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const handleFocusDateChange = (newDate: Date) => {
    setFocusedDate(newDate);
    setHoveredDate(newDate);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (focusedDate) {
      let newDate = new Date(focusedDate);
      if (e.key === "ArrowRight") {
        newDate.setDate(newDate.getDate() + 1);
      } else if (e.key === "ArrowLeft") {
        newDate.setDate(newDate.getDate() - 1);
      } else if (e.code === "Space" || e.key === "Enter") {
        onDateSelect(focusedDate);
      }

      const totalDays = daysInMonth(currentMonth);
      if (newDate.getDate() > totalDays) {
        newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
      } else if (newDate.getDate() < 1) {
        newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
      }

      handleFocusDateChange(newDate);
    }
  };

  const generateCalendarDays = () => {
    const days: JSX.Element[] = [];
    const totalDays = daysInMonth(currentMonth);
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div className="empty-day" key={`empty-${i}`} />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );

      const isHovered = !!hoveredDate && !!startDate && !endDate && date > startDate && date < hoveredDate;
      const isFocused = !!focusedDate && date.toDateString() === focusedDate.toDateString();
      const isInRange = !!startDate && !!endDate && date > startDate && date < endDate;

      days.push(
        <Day
          key={day}
          date={date}
          onSelect={onDateSelect}
          isInRange={isInRange}
          isHovered={isHovered}
          isFocused={isFocused}
          isStartDate={startDate?.toDateString() === date.toDateString()}
          isEndDate={endDate?.toDateString() === date.toDateString()}
          tabIndex={0}
          onMouseEnter={() => setHoveredDate(date)}
          onMouseLeave={() => setHoveredDate(null)}
          onFocus={() => handleFocusDateChange(date)}
          onBlur={() => setHoveredDate(null)}
          onKeyDown={handleKeyDown}
        />
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Previous</button>
        <h3>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h3>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="calendar-grid">{generateCalendarDays()}</div>
    </div>
  );
};

export default Calendar;
