import React, { useState } from "react";
import DateRangePicker from "./components/DateRangePicker";
import "./styles.css";

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  // callback to capture the startDate and endDate
  const handleDateRangeChange = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    console.log('handleDateRangeChange', { startDate, endDate });
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleSubmit = () => {
    if (startDate && endDate) {
      alert(`Selected data range is from ${startDate.toDateString()} to ${endDate.toDateString()}`)
    }
  }

  return (
    <div className="app-container">
      <h2>Date Picker Component</h2>
        <DateRangePicker onChange={handleDateRangeChange} />
        <button onClick={handleSubmit} type="submit">Submit</button>
    </div>
  );
};

export default App;
