import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
} from "react";
import { ThemeContext } from "./ThemeContext";

function DateInput({
  label,
  name,
  value = "",
  onChange,
}) {
  // ===========================
  // Access Theme using Context
  // ===========================
  const theme = useContext(ThemeContext);

  // ===========================
  // Local State
  // ===========================
  const [selectedDate, setSelectedDate] = useState(value);

  // ===========================
  // Reference to Input
  // ===========================
  const inputRef = useRef(null);

  // ===========================
  // Memoized Date Information
  // Runs only when date changes
  // ===========================
  const dateInfo = useMemo(() => {
    if (!selectedDate) {
      return null;
    }

    const date = new Date(selectedDate);

    const weekday = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const month = date.toLocaleDateString("en-US", {
      month: "long",
    });

    const year = date.getFullYear();

    const age =
      new Date().getFullYear() -
      date.getFullYear();

    return {
      weekday,
      month,
      year,
      age,
    };
  }, [selectedDate]);

  // ===========================
  // Memoized Change Handler
  // ===========================
  const handleChange = useCallback(
    (e) => {
      setSelectedDate(e.target.value);

      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

  // ===========================
  // Runs whenever date changes
  // ===========================
  useEffect(() => {
    if (selectedDate !== "") {
      console.log("Selected Date:", selectedDate);
    }
  }, [selectedDate]);

  // ===========================
  // Sync Parent Value
  // ===========================
  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  // ===========================
  // Focus Input on Mount
  // ===========================
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      style={{
        background: theme.background,
        color: theme.color,
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <label htmlFor={name}>
        <strong>{label}</strong>
      </label>

      <br />
      <br />

      <input
        ref={inputRef}
        id={name}
        name={name}
        type="date"
        value={selectedDate}
        onChange={handleChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "250px",
        }}
      />

      <br />
      <br />

      <button
        onClick={() => inputRef.current.focus()}
        style={{
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Focus Date Input
      </button>

      <br />
      <br />

      {dateInfo && (
        <div
          style={{
            padding: "10px",
            border: "1px solid gray",
            borderRadius: "5px",
          }}
        >
          <h4>Date Details</h4>

          <p>
            <strong>Weekday:</strong>{" "}
            {dateInfo.weekday}
          </p>

          <p>
            <strong>Month:</strong>{" "}
            {dateInfo.month}
          </p>

          <p>
            <strong>Year:</strong>{" "}
            {dateInfo.year}
          </p>

          <p>
            <strong>Approximate Age:</strong>{" "}
            {dateInfo.age}
          </p>
        </div>
      )}
    </div>
  );
}

export default DateInput;