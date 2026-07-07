import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
} from "react";
import { ThemeContext } from "./ThemeContext";

function TextInput({
  label,
  name,
  placeholder = "",
  value = "",
  onChange,
}) {
  // Access theme from Context
  const theme = useContext(ThemeContext);

  // Local state to control the input
  const [inputValue, setInputValue] = useState(value);

  // Reference to the input element
  const inputRef = useRef(null);

  // Memoized calculation
  // Recalculates only when inputValue changes
  const characterCount = useMemo(() => {
    console.log("Calculating character count...");
    return inputValue.length;
  }, [inputValue]);

  // Memoized event handler
  // Function reference stays the same unless onChange changes
  const handleChange = useCallback(
    (e) => {
      setInputValue(e.target.value);

      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

  // Runs whenever inputValue changes
  useEffect(() => {
    console.log("Current Input:", inputValue);
  }, [inputValue]);

  // Sync local state if parent updates value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Focus input when component mounts
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

      <input
        ref={inputRef}
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "8px",
          fontSize: "16px",
        }}
      />

      <p>
        Characters : <strong>{characterCount}</strong>
      </p>

      <button
        onClick={() => inputRef.current.focus()}
        style={{
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Focus Input
      </button>
    </div>
  );
}

export default TextInput;