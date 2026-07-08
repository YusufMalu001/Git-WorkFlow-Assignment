import { useState } from "react";

import { ThemeProvider } from "./ThemeContext";

import TextInput from "./components/text_input";
import FileInput from "./components/file_input";
import DateInput from "./components/date_input";
import SelectInput from "./components/select_input";
import RadioGroup from "./components/radio_group";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    education: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  const [errors, setErrors] = useState({});

  const educationOptions = [
    { label: "High School", value: "high_school" },
    { label: "Bachelor's Degree", value: "bachelors" },
    { label: "Master's Degree", value: "masters" },
    { label: "PhD", value: "phd" },
  ];

  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    handleChange("profilePic", file);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.profilePic) newErrors.profilePic = "Profile Pic is required";
    if (!formData.education) newErrors.education = "Level of Education is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("User Data:", formData);
      alert("Form submitted successfully! Check console for data.");
    }
  };

  return (
    <ThemeProvider>
      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          fontFamily: "Arial",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          background: "#fff"
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>User Registration Form</h1>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && <div style={{ color: "red", marginTop: "-15px", marginBottom: "15px", marginLeft: "15px" }}>{errors.name}</div>}

          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && <div style={{ color: "red", marginTop: "-15px", marginBottom: "15px", marginLeft: "15px" }}>{errors.email}</div>}

          <DateInput
            label="Date of Birth"
            name="dob"
            value={formData.dob}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
          {errors.dob && <div style={{ color: "red", marginTop: "-15px", marginBottom: "15px", marginLeft: "15px" }}>{errors.dob}</div>}

          <RadioGroup
            label="Gender"
            name="gender"
            value={formData.gender}
            options={genders}
            onChange={(e) => handleChange("gender", e.target.value)}
          />
          {errors.gender && <div style={{ color: "red", marginTop: "-15px", marginBottom: "15px", marginLeft: "15px" }}>{errors.gender}</div>}

          <FileInput
            label="Profile Pic"
            name="profilePic"
            accept="image/*"
            multiple={false}
            onChange={handleFileChange}
          />
          {errors.profilePic && <div style={{ color: "red", marginTop: "-15px", marginBottom: "15px", marginLeft: "15px" }}>{errors.profilePic}</div>}

          <SelectInput
            label="Level of Education"
            name="education"
            value={formData.education}
            options={educationOptions}
            onChange={(e) => handleChange("education", e.target.value)}
          />
          {errors.education && <div style={{ color: "red", marginTop: "-15px", marginBottom: "15px", marginLeft: "15px" }}>{errors.education}</div>}

          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          {errors.password && <div style={{ color: "red", marginTop: "-15px", marginBottom: "15px", marginLeft: "15px" }}>{errors.password}</div>}

          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
          {errors.confirmPassword && <div style={{ color: "red", marginTop: "-15px", marginBottom: "15px", marginLeft: "15px" }}>{errors.confirmPassword}</div>}

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              type="submit"
              style={{
                padding: "12px 24px",
                background: "#007BFF",
                color: "#FFF",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                width: "100%"
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default App;