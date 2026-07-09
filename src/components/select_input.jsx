import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
} from "react";
import { ThemeContext } from "../ThemeContext";

function SelectInput({
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
  const [selectedOption, setSelectedOption] = useState(value);

  // ===========================
  // Reference
  // ===========================
  const selectRef = useRef(null);

  // ===========================
  // Memoized Options
  // Sort only when options change
  // ===========================
  const sortedOptions = useMemo(() => {
    console.log("Sorting options...");

    return [...options].sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  }, [options]);

  // ===========================
  // Memoized Change Handler
  // ===========================
  const handleChange = useCallback(
    (e) => {
      setSelectedOption(e.target.value);

      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

  // ===========================
  // Runs whenever selection changes
  // ===========================
  useEffect(() => {
    if (selectedOption !== "") {
      console.log("Selected:", selectedOption);
    }
  }, [selectedOption]);

  // ===========================
  // Sync Parent Value
  // ===========================
  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  // ===========================
  // Focus Dropdown on Mount
  // ===========================
  useEffect(() => {
    selectRef.current.focus();
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

      <select
        ref={selectRef}
        id={name}
        name={name}
        value={selectedOption}
        onChange={handleChange}
        style={{
          width: "250px",
          padding: "10px",
          fontSize: "16px",
        }}
      >
        <option value="">
          -- Select an Option --
        </option>

        {sortedOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button
        onClick={() => selectRef.current.focus()}
        style={{
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Focus Dropdown
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
        <h4>Selected Value</h4>

        <p>{selectedOption || "Nothing Selected"}</p>
      </div>
    </div>
  );
}

export default SelectInput;