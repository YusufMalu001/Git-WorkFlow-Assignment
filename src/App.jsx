import { useState } from "react";
import { ThemeProvider } from "./ThemeContext";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "male",
    education: "high_school",
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
          gender: "male",
          education: "high_school",
          password: "",
          confirmPassword: "",
          profilePic: null,
        });
      }
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    if (filterGender === "all") return true;
    return sub.gender === filterGender;
  });

  return (
    <ThemeProvider>
      <div className="h-screen w-full bg-surface overflow-hidden" onClick={() => { setActionMenuId(null); setHeaderMenuOpen(false); }}>
        <main className="flex h-full w-full">
          {/* Left Panel: Registration Form */}
          <section className="w-1/2 h-full flex flex-col p-lg border-r border-outline-variant/30">
            <div className="glass-panel flex-1 flex flex-col p-xl overflow-y-auto rounded-xl">
              <div className="flex items-center justify-between mb-xl">
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">ENTITY_REGISTRATION</h2>
                <span className="font-label-caps text-[12px] bg-primary/10 text-primary px-3 py-1 border border-primary/20 rounded">SECURE_CHANNEL</span>
              </div>
              <form className="space-y-xl" onSubmit={handleSubmit}>
                <div className="space-y-sm">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">NAME</label>
                  <input
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant rounded-lg p-4 text-body-md font-data-mono text-primary focus:border-primary focus:ring-0 transition-all"
                    placeholder="Enter full name..."
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-sm">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">EMAIL</label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container-lowest/50 border border-outline-variant rounded-lg p-4 pl-12 text-body-md font-data-mono text-on-surface focus:border-primary focus:ring-0 transition-all"
                      placeholder="node@network.sync"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline-variant">alternate_email</span>
                  </div>
                  {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-sm">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">DATE OF BIRTH</label>
                  <input
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant rounded-lg p-4 text-body-md font-data-mono text-primary focus:border-primary focus:ring-0 transition-all"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleChange("dob", e.target.value)}
                  />
                  {errors.dob && <p className="text-error text-sm mt-1">{errors.dob}</p>}
                </div>

                <div className="space-y-sm">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">GENDER</label>
                  <div className="grid grid-cols-3 gap-md">
                    {genders.map((g) => (
                      <label key={g.value} className="flex items-center gap-md p-4 bg-surface-container-lowest/30 border border-outline-variant rounded-lg cursor-pointer hover:border-primary/50 transition-all group">
                        <input
                          className="text-primary focus:ring-0 bg-transparent border-outline-variant"
                          name="gender"
                          type="radio"
                          value={g.value}
                          checked={formData.gender === g.value}
                          onChange={(e) => handleChange("gender", e.target.value)}
                        />
                        <span className="font-label-caps text-label-caps text-on-surface-variant group-hover:text-on-surface transition-colors">{g.label.toUpperCase()}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gender && <p className="text-error text-sm mt-1">{errors.gender}</p>}
                </div>

                <div className="space-y-sm">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">PROFILE PICTURE</label>
                  <input
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant rounded-lg p-4 text-body-md font-data-mono text-primary focus:border-primary focus:ring-0 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {errors.profilePic && <p className="text-error text-sm mt-1">{errors.profilePic}</p>}
                </div>

                <div className="space-y-sm">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">EDUCATION LEVEL</label>
                  <select
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant rounded-lg p-4 text-body-md font-data-mono text-on-surface focus:border-primary focus:ring-0 appearance-none transition-all"
                    value={formData.education}
                    onChange={(e) => handleChange("education", e.target.value)}
                  >
                    <option value="" disabled>SELECT_LEVEL</option>
                    {educationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label.toUpperCase()}</option>
                    ))}
                  </select>
                  {errors.education && <p className="text-error text-sm mt-1">{errors.education}</p>}
                </div>

                <div className="space-y-sm">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">PASSWORD</label>
                  <input
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant rounded-lg p-4 text-body-md font-data-mono text-primary focus:border-primary focus:ring-0 transition-all"
                    placeholder="Enter secure key..."
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="space-y-sm">
                  <label className="font-label-caps text-label-caps text-on-surface-variant">CONFIRM PASSWORD</label>
                  <input
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant rounded-lg p-4 text-body-md font-data-mono text-primary focus:border-primary focus:ring-0 transition-all"
                    placeholder="Verify secure key..."
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  />
                  {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="pt-xl border-t border-outline-variant/30">
                  <button
                    className="w-full bg-primary text-on-primary font-label-caps text-label-caps py-5 rounded-lg flex items-center justify-center gap-3 neon-glow hover:translate-y-[-2px] transition-all active:translate-y-0 active:scale-95"
                    type="submit"
                  >
                    <span className="material-symbols-outlined">database_upload</span>
                    {editingId !== null ? "Update Form" : "Submit Form"}
                  </button>
                </div>
              </form>
              <div className="mt-xl">
                <div className="p-lg bg-primary-container/10 border border-primary-container/20 rounded-lg">
                  <div className="flex gap-md">
                    <span className="material-symbols-outlined text-primary-container">info</span>
                    <p className="text-body-md text-on-surface-variant leading-relaxed">
                      Ensure all entity parameters align with the <span className="text-primary underline cursor-pointer">Protocol Guidelines v.4.0</span>. Mismatched headers will trigger a system-wide isolation event.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

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

      {/* View Modal Overlay */}
      {viewingSubmission && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setViewingSubmission(null)}>
          <div className="glass-panel p-xl rounded-xl max-w-md w-full border border-outline-variant shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-on-surface">Entity Details</h3>
              <button type="button" onClick={() => setViewingSubmission(null)} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-md text-body-md font-data-mono">
              <p><strong className="text-on-surface-variant">ID:</strong> <span className="text-primary">#{viewingSubmission.id.toString().slice(-4)}</span></p>
              <p><strong className="text-on-surface-variant">Name:</strong> {viewingSubmission.name}</p>
              <p><strong className="text-on-surface-variant">Email:</strong> {viewingSubmission.email}</p>
              <p><strong className="text-on-surface-variant">Date of Birth:</strong> {viewingSubmission.dob}</p>
              <p><strong className="text-on-surface-variant">Gender:</strong> {viewingSubmission.gender.toUpperCase()}</p>
              <p><strong className="text-on-surface-variant">Education:</strong> {educationOptions.find(o => o.value === viewingSubmission.education)?.label}</p>
            </div>
            <div className="mt-xl pt-lg border-t border-outline-variant/30 text-right">
              <button
                type="button"
                onClick={() => setViewingSubmission(null)}
                className="px-6 py-2 bg-surface-variant border border-outline-variant font-label-caps text-on-surface rounded-lg hover:bg-surface-bright transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Field Names Modal */}
      {isChangingFieldNames && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setIsChangingFieldNames(false)}>
          <div className="glass-panel p-xl rounded-xl max-w-md w-full border border-outline-variant shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-on-surface">Change Field Names</h3>
              <button type="button" onClick={() => setIsChangingFieldNames(false)} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-md">
              {Object.entries(columnNames).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="font-label-caps text-[10px] text-on-surface-variant uppercase">{key}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setColumnNames(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant rounded p-3 text-body-md font-data-mono text-primary focus:border-primary focus:ring-0 transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="mt-xl pt-lg border-t border-outline-variant/30 text-right">
              <button
                type="button"
                onClick={() => setIsChangingFieldNames(false)}
                className="px-6 py-2 bg-primary text-on-primary font-label-caps rounded-lg hover:bg-primary/90 transition-colors"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Select Fields Modal */}
      {isSelectingFields && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setIsSelectingFields(false)}>
          <div className="glass-panel p-xl rounded-xl max-w-md w-full border border-outline-variant shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-on-surface">Select Fields to Display</h3>
              <button type="button" onClick={() => setIsSelectingFields(false)} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-md">
              {Object.entries(visibleColumns).map(([key, isVisible]) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-surface-container-lowest/50 rounded transition-colors">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isVisible ? 'bg-primary border-primary' : 'border-outline-variant bg-surface-container-lowest/50 group-hover:border-primary/50'}`}>
                    {isVisible && <span className="material-symbols-outlined text-[14px] text-on-primary">check</span>}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isVisible}
                    onChange={(e) => setVisibleColumns(prev => ({ ...prev, [key]: e.target.checked }))}
                  />
                  <span className="font-data-mono text-on-surface">{columnNames[key]}</span>
                </label>
              ))}
            </div>
            <div className="mt-xl pt-lg border-t border-outline-variant/30 text-right">
              <button
                type="button"
                onClick={() => setIsSelectingFields(false)}
                className="px-6 py-2 bg-primary text-on-primary font-label-caps rounded-lg hover:bg-primary/90 transition-colors"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;