import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import { ThemeContext } from "../ThemeContext";

function FileInput({
  label,
  name,
  accept = "*",
  multiple = false,
  onChange,
}) {
  // Access theme using Context
  const theme = useContext(ThemeContext);

  // Store selected file names
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Reference to the file input
  const fileInputRef = useRef(null);

  // Memoized event handler
  const handleFileChange = useCallback(
    (event) => {
      const files = Array.from(event.target.files);

      setSelectedFiles(files);

      if (onChange) {
        onChange(event);
      }
    },
    [onChange]
  );

  // Runs whenever files change
  useEffect(() => {
    if (selectedFiles.length > 0) {
      console.log("Selected Files:");

      selectedFiles.forEach((file) => {
        console.log(file.name);
      });
    }
  }, [selectedFiles]);

  // Open file explorer using ref
  const openFileExplorer = () => {
    fileInputRef.current.click();
  };

  // Clear selected files
  const clearFiles = () => {
    setSelectedFiles([]);

    // Reset the actual input
    fileInputRef.current.value = "";
  };

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
      <label>
        <strong>{label}</strong>
      </label>

      <br />
      <br />

      {/* Hidden File Input */}

      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Button to trigger file input */}

      <button
        onClick={openFileExplorer}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          cursor: "pointer",
        }}
      >
        Choose File
      </button>

      {/* Clear button */}

      <button
        onClick={clearFiles}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Clear
      </button>

      <br />
      <br />

      {selectedFiles.length === 0 ? (
        <p>No file selected.</p>
      ) : (
        <>
          <h4>Selected Files:</h4>

          <ul>
            {selectedFiles.map((file) => (
              <li key={file.name}>
                <strong>{file.name}</strong>

                <br />

                Size: {(file.size / 1024).toFixed(2)} KB

                <br />

                Type: {file.type}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default FileInput;