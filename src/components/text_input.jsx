function TextInput({
  label,
  value,
  onChange,
  placeholder,
  name
}) {
  return (
    <div>
      <label>{label}</label>

      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInput;