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
  const [submissions, setSubmissions] = useState([]);
  const [editingId, setEditingId] = useState(null);

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
      if (editingId !== null) {
        setSubmissions((prev) =>
          prev.map((sub) =>
            sub.id === editingId ? { ...formData, id: editingId } : sub
          )
        );
        setEditingId(null);
        alert("Form updated successfully!");
      } else {
        setSubmissions((prev) => [...prev, { ...formData, id: Date.now() }]);
        alert("Form submitted successfully!");
      }
      setFormData({
        name: "",
        email: "",
        dob: "",
        gender: "",
        education: "",
        password: "",
        confirmPassword: "",
        profilePic: null,
      });
    }
  };

  const handleEdit = (submission) => {
    setFormData({
      name: submission.name,
      email: submission.email,
      dob: submission.dob,
      gender: submission.gender,
      education: submission.education,
      password: submission.password,
      confirmPassword: submission.confirmPassword,
      profilePic: submission.profilePic,
    });
    setEditingId(submission.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setFormData({
          name: "",
          email: "",
          dob: "",
          gender: "",
          education: "",
          password: "",
          confirmPassword: "",
          profilePic: null,
        });
      }
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
              {editingId !== null ? "Update" : "Submit"}
            </button>
          </div>
        </form>

        {submissions.length > 0 && (
          <div style={{ marginTop: "40px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Submissions</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f2f2f2", color: "#333" }}>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Email</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>DOB</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Gender</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Education</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => (
                    <tr key={sub.id} style={{ color: "#333" }}>
                      <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{sub.name}</td>
                      <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{sub.email}</td>
                      <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{sub.dob}</td>
                      <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>{sub.gender}</td>
                      <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                        {educationOptions.find(opt => opt.value === sub.education)?.label || sub.education}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                        <button
                          onClick={() => handleEdit(sub)}
                          style={{
                            padding: "6px 12px",
                            background: "#28a745",
                            color: "#FFF",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            marginRight: "8px"
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id)}
                          style={{
                            padding: "6px 12px",
                            background: "#dc3545",
                            color: "#FFF",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px"
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;