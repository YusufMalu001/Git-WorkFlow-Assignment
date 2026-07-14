import { useState } from "react";

import { ThemeProvider } from "./ThemeContext";

import TextInput from "./text_input";
import FileInput from "./file_input";
import DateInput from "./date_input";
import SelectInput from "./select_input";
import RadioGroup from "./radio_group";
import RangeInput from "./range_input";

function App() {
  // Text Input
  const [username, setUsername] = useState("");

  // Date
  const [dob, setDob] = useState("");

  // Country
  const [country, setCountry] = useState("");

  // Gender
  const [gender, setGender] = useState("");

  // Volume
  const [volume, setVolume] = useState(50);

  // Dropdown Options
  const countries = [
    {
      label: "India",
      value: "india",
    },
    {
      label: "United States",
      value: "usa",
    },
    {
      label: "United Kingdom",
      value: "uk",
    },
    {
      label: "Japan",
      value: "japan",
    },
  ];

  // Radio Options
  const genders = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  return (
    <ThemeProvider>
      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          fontFamily: "Arial",
        }}
      >
        <h1>Reusable Form Components</h1>

        <TextInput
          label="Username"
          name="username"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <FileInput
          label="Upload Resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          multiple={false}
        />

        <DateInput
          label="Date of Birth"
          name="dob"
          value={dob}
          onChange={(e) =>
            setDob(e.target.value)
          }
        />

        <SelectInput
          label="Country"
          name="country"
          value={country}
          options={countries}
          onChange={(e) =>
            setCountry(e.target.value)
          }
        />

        <RadioGroup
          label="Gender"
          name="gender"
          value={gender}
          options={genders}
          onChange={(e) =>
            setGender(e.target.value)
          }
        />

        <RangeInput
          label="Volume"
          name="volume"
          value={volume}
          min={0}
          max={100}
          step={1}
          onChange={(e) =>
            setVolume(Number(e.target.value))
          }
        />

        <hr />

        <h2>Form Summary</h2>

        <p>
          <strong>Name:</strong> {username}
        </p>

        <p>
          <strong>Date of Birth:</strong> {dob}
        </p>

        <p>
          <strong>Country:</strong> {country}
        </p>

        <p>
          <strong>Gender:</strong> {gender}
        </p>

        <p>
          <strong>Volume:</strong> {volume}
        </p>
      </div>
    </ThemeProvider>
  );
}

export default App;