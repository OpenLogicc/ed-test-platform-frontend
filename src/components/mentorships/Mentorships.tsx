import React, { useState } from "react";
import {
  Star,
  Video,
  Briefcase,
  Code,
} from "lucide-react";
import BookingModal from "./BookingModal";

type Mentor = {
  name: string;
  role: string;
  expertise: string[];
  helps: string;
  rating: string;
  sessions: string;
  image: string;
};

export const Mentorships = () => {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [openBooking, setOpenBooking] = useState(false);

  const mentors = [
    {
      name: "Rahul Sharma",
      role: "Software Engineer at Google",
      expertise: ["DSA", "System Design", "React", "Career Guidance"],
      helps:
        "Helps students crack product-based companies and improve coding skills.",
      rating: "4.9",
      sessions: "120+ Sessions",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    {
      name: "Priya Verma",
      role: "AI Engineer at Microsoft",
      expertise: ["Machine Learning", "AI", "Python", "Deep Learning"],
      helps:
        "Guides students in AI/ML projects, research, and interview preparation.",
      rating: "4.8",
      sessions: "95+ Sessions",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      name: "Aman Gupta",
      role: "SDE at Amazon",
      expertise: ["Java", "Spring Boot", "Backend", "Microservices"],
      helps:
        "Mentors students in backend development and scalable applications.",
      rating: "4.7",
      sessions: "150+ Sessions",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    },
    {
      name: "Sneha Kapoor",
      role: "Product Designer at Adobe",
      expertise: [
        "UI/UX",
        "Figma",
        "Design Systems",
        "Product Design",
      ],
      helps:
        "Helps students build modern UI/UX portfolios and design thinking.",
      rating: "4.9",
      sessions: "80+ Sessions",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
  ];

  const handleBooking = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setOpenBooking(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">

      <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
        <h1 className="text-4xl font-bold">
          1-to-1 Mentorship 👨‍🎓
        </h1>

        <p className="text-slate-400 mt-3">
          Connect with experienced mentors and get personalized career
          guidance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {mentors.map((mentor, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-3xl border border-slate-700 p-6"
          >
            <div className="flex gap-4">

              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div>
                <h2 className="text-2xl font-bold">
                  {mentor.name}
                </h2>

                <p className="text-slate-400">
                  {mentor.role}
                </p>

                <div className="flex items-center mt-2">
                  <Star
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />

                  <span className="ml-1">
                    {mentor.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-slate-700/40 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-blue-400" />

                <h3 className="font-semibold">
                  What this mentor helps with
                </h3>
              </div>

              <p className="text-slate-300 text-sm">
                {mentor.helps}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-slate-400 mb-3">
                Expertise
              </p>

              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-slate-700 rounded-full px-3 py-1 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-5">
              <Briefcase className="w-5 h-5 text-blue-400" />

              <span>{mentor.sessions}</span>
            </div>

            <div className="flex gap-3 mt-6">

              <button className="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-xl">
                View Profile
              </button>

              <button
                onClick={() => handleBooking(mentor)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl flex justify-center items-center gap-2"
              >
                <Video className="w-5 h-5" />
                Book Meeting
              </button>
            </div>
          </div>
        ))}

      </div>

      {openBooking && selectedMentor && (
        <BookingModal
          mentor={selectedMentor}
          onClose={() => setOpenBooking(false)}
        />
      )}
    </div>
  );
};