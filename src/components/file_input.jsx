function FileInput({
  label,
  onChange,
  name
}) {
  return (
    <div>
      <label>{label}</label>

      <input
        type="file"
        name={name}
        onChange={onChange}
      />
    </div>
  );
}

export default FileInput;