import React from "react";
import { IDayProps } from "./types";

const Day: React.FC<IDayProps> = ({
  date,
  onSelect,
  isInRange,
  isHovered,
  isFocused,
  isStartDate,
  isEndDate,
  tabIndex,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const handleClick = () => {
    onSelect(date);
  };

  const classNames = ["day"];
  if (isInRange) classNames.push("in-range");
  if (isHovered) classNames.push("hovered");
  if (isFocused) classNames.push("focused");
  if (isStartDate) classNames.push("start-date");
  if (isEndDate) classNames.push("end-date");

  return (
    <div
      className={classNames.join(" ")}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={tabIndex}
      role="gridcell"
      aria-label={`Date: ${date.toDateString()}`}
      aria-selected={isStartDate || isEndDate || isInRange}
      onKeyDown={onKeyDown}
    >
      {date.getDate()}
    </div>
  );
};

export default Day;
