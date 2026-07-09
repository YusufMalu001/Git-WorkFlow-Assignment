import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
} from "react";
import { ThemeContext } from "../ThemeContext";

function RangeInput({
  label,
  name,
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}) {
  // ===========================
  // Theme Context
  // ===========================
  const theme = useContext(ThemeContext);

  // ===========================
  // Local State
  // ===========================
  const [sliderValue, setSliderValue] = useState(value);

  // ===========================
  // Reference
  // ===========================
  const sliderRef = useRef(null);

  // ===========================
  // Memoized Percentage
  // Recalculates only when
  // sliderValue, min or max change
  // ===========================
  const percentage = useMemo(() => {
    return (
      ((sliderValue - min) / (max - min)) * 100
    ).toFixed(2);
  }, [sliderValue, min, max]);

  // ===========================
  // Memoized Change Handler
  // ===========================
  const handleChange = useCallback(
    (event) => {
      const value = Number(event.target.value);

      setSliderValue(value);

      if (onChange) {
        onChange(event);
      }
    },
    [onChange]
  );

  // ===========================
  // Runs whenever slider changes
  // ===========================
  useEffect(() => {
    console.log("Slider Value:", sliderValue);
  }, [sliderValue]);

  // ===========================
  // Sync Parent Value
  // ===========================
  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  // ===========================
  // Focus Slider on Mount
  // ===========================
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.focus();
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
      <label htmlFor={name}>
        <strong>{label}</strong>
      </label>

      <br />
      <br />

      <input
        ref={sliderRef}
        id={name}
        name={name}
        type="range"
        value={sliderValue}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        style={{
          width: "100%",
          cursor: "pointer",
        }}
      />

      <br />
      <br />

      <button
        onClick={() => sliderRef.current.focus()}
        style={{
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Focus Slider
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
        <h4>Slider Information</h4>

        <p>
          <strong>Current Value:</strong>{" "}
          {sliderValue}
        </p>

        <p>
          <strong>Percentage:</strong>{" "}
          {percentage}%
        </p>

        <p>
          <strong>Minimum:</strong>{" "}
          {min}
        </p>

        <p>
          <strong>Maximum:</strong>{" "}
          {max}
        </p>
      </div>
    </div>
  );
}

export default RangeInput;