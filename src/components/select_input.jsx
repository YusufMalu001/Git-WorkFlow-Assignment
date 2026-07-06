function SelectInput({
  label,
  value,
  options,
  onChange,
  name
}) {
  return (
    <div>
      <label>{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">
          Select
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;