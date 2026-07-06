function DateInput({
  label,
  value,
  onChange,
  name
}) {
  return (
    <div>
      <label>{label}</label>

      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default DateInput;