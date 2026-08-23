import React, { useState, ChangeEvent } from "react";
import {
  X,
  Calendar,
  Clock,
  Video,
  Upload,
  User,
  Mail,
  Phone,
} from "lucide-react";

type Mentor = {
  name: string;
  role: string;
  expertise: string[];
  helps: string;
  rating: string;
  sessions: string;
  image: string;
};

type BookingModalProps = {
  mentor: Mentor;
  onClose: () => void;
};

type BookingFormData = {
  name: string;
  date: string;
  time: string;
  duration: string;
  meetingType: string;
  topic: string;
  question: string;
  level: string;
  language: string;
  email: string;
  phone: string;
  notes: string;
  resume: File | null;
};

const BookingModal = ({ mentor, onClose }: BookingModalProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: mentor.name || "",
    date: "",
    time: "",
    duration: "",
    meetingType: "Google Meet",
    topic: "",
    question: "",
    level: "",
    language: "English",
    email: "",
    phone: "",
    notes: "",
    resume: null,
  });

  const availableSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "09:00 PM",
    "10:00 PM",
  ];

  const topics = [
    "DSA",
    "System Design",
    "Frontend",
    "Backend",
    "React",
    "Java",
    "Spring Boot",
    "Machine Learning",
    "AI",
    "Resume Review",
    "Career Guidance",
    "Mock Interview",
    "Other",
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);

    alert("Meeting Booked Successfully!");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-5">

      <div className="bg-slate-900 w-full max-w-4xl rounded-3xl p-8 border border-slate-700 overflow-y-auto max-h-[95vh]">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Book Session
            </h2>

            <p className="text-slate-400 mt-2">
              Mentor: <span className="text-blue-400">{mentor?.name}</span>
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X size={28} />
          </button>

        </div>

        {/* Date */}

        <div className="mt-8">

          <label className="text-white flex items-center gap-2 mb-2">
            <Calendar size={18} />
            Select Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700"
          />

        </div>

        {/* Time Slots */}

        <div className="mt-8">

          <label className="flex items-center gap-2 mb-4">
            <Clock size={18} />
            Available Time Slots
          </label>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">

            {availableSlots.map((slot) => (
              <button
                key={slot}
                onClick={() =>
                  setFormData({
                    ...formData,
                    time: slot,
                  })
                }
                className={`p-3 rounded-xl transition
                ${
                  formData.time === slot
                    ? "bg-blue-600"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {slot}
              </button>
            ))}

          </div>

        </div>

        {/* Duration */}

        <div className="mt-8">

          <label className="block mb-2">
            Session Duration
          </label>

          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700"
          >
            <option>15</option>
            <option>30</option>
            <option>45</option>
            <option>60</option>
          </select>

        </div>

        {/* Meeting Type */}

        <div className="mt-8">

          <label className="flex items-center gap-2 mb-2">
            <Video size={18} />
            Meeting Platform
          </label>

          <select
            name="meetingType"
            value={formData.meetingType}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700"
          >
            <option>Google Meet</option>
          </select>

        </div>

        {/* Topic */}

        <div className="mt-8">

          <label className="block mb-2">
            Topic
          </label>

          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700"
          >
            <option value="">Select Topic</option>

            {topics.map((topic) => (
              <option key={topic}>
                {topic}
              </option>
            ))}

          </select>

        </div>

        {/* Question */}

        <div className="mt-8">

          <label className="block mb-2">
            What would you like to ask?
          </label>

          <textarea
            rows={5}
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Describe your doubts..."
            className="w-full bg-slate-800 rounded-xl p-4 border border-slate-700"
          />

        </div>

        {/* Language */}

        <div className="mt-8">
          <label className="block mb-2">
            Preferred Language
          </label>

          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Hinglish</option>
          </select>
        </div>

        {/* Email */}

        <div className="mt-8">
          <label className="flex items-center gap-2 mb-2">
            <Mail size={18} />
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@gmail.com"
            className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700"
          />
        </div>

        {/* Phone */}

        <div className="mt-8">
          <label className="flex items-center gap-2 mb-2">
            <Phone size={18} />
            Phone Number (Optional)
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full bg-slate-800 rounded-xl p-3 border border-slate-700"
          />
        </div>

        {/* Additional Notes */}

        <div className="mt-8">
          <label className="block mb-2">
            Additional Notes
          </label>

          <textarea
            rows={4}
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Anything else you want your mentor to know?"
            className="w-full bg-slate-800 rounded-xl p-4 border border-slate-700"
          />
        </div>

        {/* Booking Summary */}

        <div className="mt-10 bg-slate-800 rounded-2xl p-6 border border-slate-700">

          <h3 className="text-xl font-bold mb-4">
            Booking Summary
          </h3>

          <div className="space-y-3 text-slate-300">

            <div className="flex justify-between">
              <span>Mentor</span>
              <span className="font-semibold text-white">
                {mentor?.name}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Date</span>
              <span>{formData.date || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span>Time</span>
              <span>{formData.time || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span>Duration</span>
              <span>{formData.duration} Minutes</span>
            </div>

            <div className="flex justify-between">
              <span>Meeting Platform</span>
              <span>{formData.meetingType}</span>
            </div>

            <div className="flex justify-between">
              <span>Topic</span>
              <span>{formData.topic || "-"}</span>
            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex gap-4 mt-10">

          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            Confirm Booking
          </button>

        </div>

      </div>

    </div>
  );
};

export default BookingModal;