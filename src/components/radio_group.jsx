function RadioGroup({
  label,
  name,
  options,
  selectedValue,
  onChange
}) {
  return (
    <div>
      <p>{label}</p>

      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
          />

          {option.label}
        </label>
      ))}
    </div>
  );
}

export default RadioGroup;