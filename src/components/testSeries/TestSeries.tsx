import React from "react";
import UpcomingTest from "./UpcomingTest";
import { useNavigate } from "react-router-dom";

const tests = [
  {
    id: 1,
    title: "JEE Full Mock Test 1",
    subject: "Physics • Chemistry • Maths",
    duration: "3 Hours",
    questions: 90,
    difficulty: "Hard",
  },
  {
    id: 2,
    title: "NEET Biology Practice Test",
    subject: "Biology",
    duration: "1 Minute",
    questions: 180,
    difficulty: "Medium",
  },
  {
    id: 3,
    title: "Mathematics Chapter Test",
    subject: "Mathematics",
    duration: "1.5 Hours",
    questions: 30,
    difficulty: "Easy",
  },
];

export const TestSeries = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-700">
        <h1 className="text-4xl font-bold mb-3">Test Series 📝</h1>
        <p className="text-slate-400 text-lg">
          Access various test series to practice and prepare.
        </p>
      </div>

      <div className="m-5 min-h-screen bg-slate-900 text-white">
        <UpcomingTest />
        {/* Heading */}
        <div className="mb-8">
          <p className="text-slate-400 text-lg">
            Practice mock tests and improve your performance.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search tests..."
            className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <select className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3">
            <option>All Subjects</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Maths</option>
            <option>Biology</option>
          </select>
        </div>

        {/* Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div
              key={test.id}
              className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-lg hover:scale-105 transition-all duration-300"
            >
              {/* Title */}
              <h2 className="text-2xl font-bold mb-3">{test.title}</h2>

              {/* Subject */}
              <p className="text-slate-400 mb-4">{test.subject}</p>

              {/* Details */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration</span>
                  <span>{test.duration}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Questions</span>
                  <span>{test.questions}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Difficulty</span>

                  <span className="text-purple-400 font-semibold">
                    {test.difficulty}
                  </span>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() =>
                  navigate(`/test/${test.id}`, { state: { test } })
                }
                className="w-full bg-purple-500 hover:bg-purple-600 py-3 rounded-2xl font-semibold transition-all duration-300"
              >
                Start Test
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
