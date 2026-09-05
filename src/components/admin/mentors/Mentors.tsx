import React, { useState, useEffect, ChangeEvent, FormEvent, FC } from "react";

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  experienceYears: number;
  skills: string[];
  avatarUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
  email?: string;
}

const Mentors: FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [skillTagInput, setSkillTagInput] = useState("");

  const [formData, setFormData] = useState<{
    name: string;
    role: string;
    company: string;
    bio: string;
    experienceYears: string;
    skills: string[];
    avatarUrl: string;
    linkedinUrl: string;
    githubUrl: string;
    email: string;
  }>({
    name: "",
    role: "",
    company: "",
    bio: "",
    experienceYears: "",
    skills: [],
    avatarUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    email: "",
  });

  // Load mentors from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem("app_mentors");
    if (saved) {
      try {
        setMentors(JSON.parse(saved));
      } catch (err) {
        console.error("Error loading mentors:", err);
      }
    } else {
      // Default demo mentor
      const initialMentors: Mentor[] = [
        {
          id: crypto.randomUUID(),
          name: "Md Athar",
          role: "Software Engineer",
          company: "Deutsche Bank",
          bio: "Specializing in distributed systems, Spring Boot microservices, Kafka pipelines, and applied LLM workflows.",
          experienceYears: 2,
          skills: ["Java", "Spring Boot", "Kafka", "Airflow", "Python"],
          avatarUrl: "",
          linkedinUrl: "https://linkedin.com/in/mdathar4403",
          email: "mdathar4403@gmail.com",
        },
      ];
      setMentors(initialMentors);
      localStorage.setItem("app_mentors", JSON.stringify(initialMentors));
    }
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSkill = () => {
    const trimmed = skillTagInput.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, trimmed],
      });
      setSkillTagInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatarUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.role.trim()) {
      alert("Name and Role are required.");
      return;
    }

    const newMentor: Mentor = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      role: formData.role.trim(),
      company: formData.company.trim(),
      bio: formData.bio.trim(),
      experienceYears: Number(formData.experienceYears) || 0,
      skills: formData.skills,
      avatarUrl: formData.avatarUrl,
      linkedinUrl: formData.linkedinUrl.trim(),
      githubUrl: formData.githubUrl.trim(),
      email: formData.email.trim(),
    };

    const updated = [newMentor, ...mentors];
    setMentors(updated);
    localStorage.setItem("app_mentors", JSON.stringify(updated));

    // Reset Form
    setFormData({
      name: "",
      role: "",
      company: "",
      bio: "",
      experienceYears: "",
      skills: [],
      avatarUrl: "",
      linkedinUrl: "",
      githubUrl: "",
      email: "",
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove mentor ${name}?`)) {
      const updated = mentors.filter((m) => m.id !== id);
      setMentors(updated);
      localStorage.setItem("app_mentors", JSON.stringify(updated));
    }
  };

  const filteredMentors = mentors.filter((m) => {
    const search = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(search) ||
      m.role.toLowerCase().includes(search) ||
      m.company.toLowerCase().includes(search) ||
      m.skills.some((s) => s.toLowerCase().includes(search))
    );
  });

  return (
    <div className="min-h-screen text-white p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Mentors Directory
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Connect, manage, and view internal or community mentors.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 self-start sm:self-auto"
          >
            <span>+</span> Add Mentor
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name, company, role, or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Mentors Grid */}
        {filteredMentors.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-8">
            <p className="text-slate-400 text-lg">No mentors found.</p>
            <p className="text-slate-600 text-sm mt-1">
              Try adjusting your search terms or add a new mentor.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-sm"
              >
                <div>
                  {/* Top Profile Header */}
                  <div className="flex items-start gap-4 mb-4">
                    {mentor.avatarUrl ? (
                      <img
                        src={mentor.avatarUrl}
                        alt={mentor.name}
                        className="w-14 h-14 rounded-full object-cover border border-slate-700 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-purple-900/60 border border-purple-700 flex items-center justify-center font-bold text-lg text-purple-300 flex-shrink-0">
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white truncate">
                        {mentor.name}
                      </h3>
                      <p className="text-purple-400 text-sm font-medium truncate">
                        {mentor.role}
                      </p>
                      {mentor.company && (
                        <p className="text-slate-400 text-xs truncate">
                          @{mentor.company}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  {mentor.bio && (
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-4">
                      {mentor.bio}
                    </p>
                  )}

                  {/* Experience Tag */}
                  {mentor.experienceYears > 0 && (
                    <div className="mb-4">
                      <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                        {mentor.experienceYears}+ years experience
                      </span>
                    </div>
                  )}

                  {/* Skills Pills */}
                  {mentor.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {mentor.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-950/60 border border-purple-800/50 text-purple-300 text-[11px] font-medium px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Socials & Delete */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {mentor.linkedinUrl && (
                      <a
                        href={mentor.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-blue-400 transition"
                      >
                        LinkedIn
                      </a>
                    )}
                    {mentor.githubUrl && (
                      <a
                        href={mentor.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white transition"
                      >
                        GitHub
                      </a>
                    )}
                    {mentor.email && (
                      <a
                        href={`mailto:${mentor.email}`}
                        className="text-slate-400 hover:text-purple-400 transition"
                      >
                        Email
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(mentor.id, mentor.name)}
                    className="text-rose-400 hover:text-rose-300 font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Mentor Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 w-full max-w-2xl relative my-8">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-9 h-9 rounded-full flex items-center justify-center font-bold transition"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-white mb-2">
                Add New Mentor
              </h2>
              <p className="text-slate-400 text-xs mb-6">
                Fill in the mentor's technical background and contact details.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Smith"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Current Role / Title *
                    </label>
                    <input
                      type="text"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="e.g. Senior Backend Engineer"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Google / Meta"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleInputChange}
                      placeholder="e.g. 5"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Short Bio / Summary
                  </label>
                  <textarea
                    rows={3}
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Brief background or areas of expertise..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Skills Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Skills & Tech Stack
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={skillTagInput}
                      onChange={(e) => setSkillTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                      placeholder="Type a skill and click Add (e.g. React, Java)"
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm font-medium border border-slate-700"
                    >
                      Add
                    </button>
                  </div>

                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-950/60 border border-purple-800 text-purple-300 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                        >
                          {s}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(s)}
                            className="text-purple-400 hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Avatar upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-purple-300 hover:file:bg-slate-700 cursor-pointer"
                  />
                </div>

                {/* Social links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    placeholder="LinkedIn Profile URL"
                    className="bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    placeholder="GitHub Profile URL"
                    className="bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2.5 rounded-xl text-sm font-semibold transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition shadow-md"
                  >
                    Save Mentor
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentors;