function RangeInput({
  label,
  value,
  min,
  max,
  step,
  onChange
}) {
  return (
    <div>
      <label>
        {label}: {value}
      </label>

      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
    </div>
  );
}

export default RangeInput;