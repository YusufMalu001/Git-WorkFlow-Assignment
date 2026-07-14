import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
} from "react";
import { ThemeContext } from "./ThemeContext";

function RadioGroup({
  label,
  name,
  value = "",
  options = [],
  onChange,
}) {
  // ===========================
  // Theme Context
  // ===========================
  const theme = useContext(ThemeContext);

  // ===========================
  // Local State
  // ===========================
  const [selectedValue, setSelectedValue] = useState(value);

  // ===========================
  // Reference to first radio
  // ===========================
  const firstRadioRef = useRef(null);

  // ===========================
  // Memoized Selected Label
  // ===========================
  const selectedLabel = useMemo(() => {
    const selected = options.find(
      (option) => option.value === selectedValue
    );

    return selected ? selected.label : "None";
  }, [selectedValue, options]);

  // ===========================
  // Memoized Change Handler
  // ===========================
  const handleChange = useCallback(
    (event) => {
      setSelectedValue(event.target.value);

      if (onChange) {
        onChange(event);
      }
    },
    [onChange]
  );

  // ===========================
  // Log Selection
  // ===========================
  useEffect(() => {
    if (selectedValue !== "") {
      console.log("Selected:", selectedValue);
    }
  }, [selectedValue]);

  // ===========================
  // Sync Parent Value
  // ===========================
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // ===========================
  // Focus First Radio
  // ===========================
  useEffect(() => {
    if (firstRadioRef.current) {
      firstRadioRef.current.focus();
    }
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
      <h3>{label}</h3>

      {options.map((option, index) => (
        <div key={option.value}>
          <label>
            <input
              ref={index === 0 ? firstRadioRef : null}
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={handleChange}
            />

            {" "}
            {option.label}
          </label>
        </div>
      ))}

      <br />

      <button
        onClick={() => firstRadioRef.current.focus()}
        style={{
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Focus First Option
      </button>

      <br />
      <br />

      <div
        style={{
          border: "1px solid gray",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <h4>Selected Option</h4>

        <p>{selectedLabel}</p>
      </div>
    </div>
  );
}

export default RadioGroup;