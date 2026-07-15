import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "./ThemeContext";
import { addSubmission, updateSubmission, deleteSubmission } from "./store/submissionsSlice";

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
  const submissions = useSelector((state) => state.submissions.list);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);

  const [filterGender, setFilterGender] = useState("all");
  const [actionMenuId, setActionMenuId] = useState(null);
  const [viewingSubmission, setViewingSubmission] = useState(null);

  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [isChangingFieldNames, setIsChangingFieldNames] = useState(false);
  const [isSelectingFields, setIsSelectingFields] = useState(false);
  
  const [columnNames, setColumnNames] = useState({
    id: "ID",
    name: "Name",
    gender: "Gender",
    education: "Education",
    email: "Email"
  });
  
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    gender: true,
    education: true,
    email: true
  });

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
        dispatch(updateSubmission({ ...formData, id: editingId }));
        setEditingId(null);
        alert("Form updated successfully!");
      } else {
        dispatch(addSubmission({ ...formData, id: Date.now() }));
        alert("Form submitted successfully!");
      }
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
      dispatch(deleteSubmission(id));
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

          {/* Right Panel: Data Table */}
          <section className="w-1/2 h-full flex flex-col p-lg">
            <div className="glass-panel flex-1 rounded-xl overflow-hidden flex flex-col">
              <div className="p-lg border-b border-outline-variant/30 flex justify-between items-center bg-surface-container/50">
                <div>
                  <h3 className="font-headline-md text-on-surface">ENTITY_LOG_001</h3>
                  <p className="font-data-mono text-[11px] text-on-surface-variant mt-xs">TOTAL_NODES: {filteredSubmissions.length} | STATUS: OPTIMIZED</p>
                </div>
                <div className="flex gap-sm">
                  <div className="relative">
                    <select
                      className="px-4 py-2 pl-8 appearance-none bg-surface-container border border-outline-variant text-on-surface font-label-caps text-[12px] hover:bg-surface-variant transition-colors focus:outline-none focus:ring-0 focus:border-primary rounded cursor-pointer"
                      value={filterGender}
                      onChange={(e) => setFilterGender(e.target.value)}
                    >
                      <option value="all">FILTER: ALL</option>
                      <option value="male">MALE</option>
                      <option value="female">FEMALE</option>
                    </select>
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] pointer-events-none">filter_alt</span>
                  </div>
                  <button className="px-4 py-2 bg-surface-container border border-outline-variant text-on-surface font-label-caps text-[12px] hover:bg-surface-variant transition-colors flex items-center gap-2 rounded">
                    <span className="material-symbols-outlined text-[18px]">file_download</span>
                    EXPORT
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10 bg-[#1e293b] shadow-sm">
                    <tr>
                      {visibleColumns.id && <th className="p-md font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant">{columnNames.id}</th>}
                      {visibleColumns.name && <th className="p-md font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant">{columnNames.name}</th>}
                      {visibleColumns.gender && <th className="p-md font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant">{columnNames.gender}</th>}
                      {visibleColumns.education && <th className="p-md font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant">{columnNames.education}</th>}
                      {visibleColumns.email && <th className="p-md font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant">{columnNames.email}</th>}
                      <th className="p-md font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant text-right relative">
                        <button onClick={(e) => { e.stopPropagation(); setHeaderMenuOpen(!headerMenuOpen); }} className="p-1 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                        
                        {headerMenuOpen && (
                          <div className="absolute right-0 top-full mt-1 z-50 bg-surface-container border border-outline-variant rounded-lg shadow-lg flex flex-col py-1 min-w-[240px]">
                            <button 
                              type="button" 
                              onClick={(e) => { e.stopPropagation(); setIsChangingFieldNames(true); setHeaderMenuOpen(false); }} 
                              className="px-4 py-2 text-left font-body-sm text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[16px]">edit_note</span> Change field name
                            </button>
                            <button 
                              type="button" 
                              onClick={(e) => { e.stopPropagation(); setIsSelectingFields(true); setHeaderMenuOpen(false); }} 
                              className="px-4 py-2 text-left font-body-sm text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[16px]">checklist</span> Select fields to display
                            </button>
                          </div>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-data-mono text-on-surface">
                    {filteredSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="p-xl text-center text-on-surface-variant">No entities found.</td>
                      </tr>
                    ) : (
                      filteredSubmissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-primary/10 transition-colors group cursor-pointer relative">
                          {visibleColumns.id && <td className="p-md border-b border-outline-variant/20 text-primary opacity-80">#{sub.id.toString().slice(-4)}</td>}
                          {visibleColumns.name && (
                            <td className="p-md border-b border-outline-variant/20">
                              <div className="flex items-center gap-md">
                                <div className="w-2 h-2 rounded-full bg-primary pulse-active"></div>
                                <span>{sub.name}</span>
                              </div>
                            </td>
                          )}
                          {visibleColumns.gender && (
                            <td className="p-md border-b border-outline-variant/20 text-on-surface-variant">
                              {sub.gender.charAt(0).toUpperCase() + sub.gender.slice(1)}
                            </td>
                          )}
                          {visibleColumns.education && (
                            <td className="p-md border-b border-outline-variant/20">
                              <span className="px-2 py-0.5 bg-secondary-container/20 text-on-secondary-container rounded text-[11px]">
                                {educationOptions.find((opt) => opt.value === sub.education)?.label.toUpperCase() || sub.education.toUpperCase()}
                              </span>
                            </td>
                          )}
                          {visibleColumns.email && <td className="p-md border-b border-outline-variant/20 text-on-surface-variant">{sub.email}</td>}
                          <td className="p-md border-b border-outline-variant/20 text-right relative">
                            <button 
                              type="button" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActionMenuId(actionMenuId === sub.id ? null : sub.id);
                              }} 
                              className="p-1 hover:text-primary transition-colors"
                            >
                              <span className="material-symbols-outlined text-[20px]">more_vert</span>
                            </button>
                            
                            {actionMenuId === sub.id && (
                              <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 bg-surface-container border border-outline-variant rounded-lg shadow-lg flex flex-col py-1 min-w-[120px]">
                                <button 
                                  type="button" 
                                  onClick={(e) => { e.stopPropagation(); setViewingSubmission(sub); setActionMenuId(null); }} 
                                  className="px-4 py-2 text-left font-body-sm text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2"
                                >
                                  <span className="material-symbols-outlined text-[16px]">visibility</span> View
                                </button>
                                <button 
                                  type="button" 
                                  onClick={(e) => { e.stopPropagation(); handleEdit(sub); setActionMenuId(null); }} 
                                  className="px-4 py-2 text-left font-body-sm text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2"
                                >
                                  <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                                </button>
                                <button 
                                  type="button" 
                                  onClick={(e) => { e.stopPropagation(); handleDelete(sub.id); setActionMenuId(null); }} 
                                  className="px-4 py-2 text-left font-body-sm text-error hover:bg-surface-variant transition-colors flex items-center gap-2"
                                >
                                  <span className="material-symbols-outlined text-[16px]">delete</span> Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-md bg-surface-container-low border-t border-outline-variant/30 flex justify-between items-center px-lg">
                <span className="font-data-mono text-[11px] text-on-surface-variant">PAGE_01_OF_01</span>
                <div className="flex gap-xs">
                  <button className="w-8 h-8 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center bg-primary text-on-primary font-data-mono text-[11px]">01</button>
                  <button className="w-8 h-8 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
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