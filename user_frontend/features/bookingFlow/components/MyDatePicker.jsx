"use client"
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function MyDatePicker({
  onDateSelect
}) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (date) => {
    setSelected(date);
    onDateSelect(date);
  };

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={handleSelect}
      disabled={{ before: new Date() }}
    />
  );
}

