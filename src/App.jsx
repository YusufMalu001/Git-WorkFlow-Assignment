import { useState } from "react";
import TextInput from "./components/TextInput";
import FileInput from "./components/FileInput";
import DateInput from "./components/DateInput";
import SelectInput from "./components/SelectInput";
import RadioGroup from "./components/RadioGroup";
import RangeInput from "./components/RangeInput";

function App() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(18);

  return (
    <div style={{ padding: "20px" }}>
      <TextInput
        label="Name"
        name="name"
        value={name}
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />

      <FileInput
        label="Upload Resume"
        name="resume"
        onChange={(e) => console.log(e.target.files[0])}
      />

      <DateInput
        label="Date of Birth"
        name="dob"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <SelectInput
        label="Country"
        name="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        options={[
          { value: "india", label: "India" },
          { value: "usa", label: "USA" },
          { value: "uk", label: "United Kingdom" }
        ]}
      />

      <RadioGroup
        label="Gender"
        name="gender"
        selectedValue={gender}
        onChange={(e) => setGender(e.target.value)}
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" }
        ]}
      />

      <RangeInput
        label="Age"
        value={age}
        min={18}
        max={100}
        step={1}
        onChange={(e) => setAge(e.target.value)}
      />
    </div>
  );
}

export default App;