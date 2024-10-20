export interface IDateRangePickerProps {
  onChange: (startDate: Date | null, endDate: Date | null) => void;
}

export interface ICalendarProps {
  onDateSelect: (date: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
}

export interface IDayProps {
  date: Date;
  onSelect: (date: Date) => void;
  isInRange: boolean;
  isHovered: boolean;
  isFocused: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  tabIndex: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}
