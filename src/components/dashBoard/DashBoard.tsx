import React from "react";
import {
  BookOpen,
  Clock,
  Award,
  Calendar,
  Bell,
  PlayCircle,
  TrendingUp,
} from "lucide-react";

export const Dashboard = () => {
  const courses = [
    {
      name: "React Development",
      progress: "75%",
    },
    {
      name: "Data Structures & Algorithms",
      progress: "60%",
    },
    {
      name: "Machine Learning",
      progress: "40%",
    },
  ];

  const upcomingExams = [
    {
      subject: "Mathematics",
      date: "28 May 2026",
      time: "10:00 AM",
    },
    {
      subject: "Physics",
      date: "30 May 2026",
      time: "1:00 PM",
    },
    {
      subject: "Artificial Intelligence",
      date: "2 June 2026",
      time: "9:00 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-xl flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Student Dashboard 🎓</h1>

          <p className="text-slate-400 text-lg">
            Welcome back! Keep learning and track your progress.
          </p>
        </div>

        <button className="relative p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition">
          <Bell className="w-6 h-6" />

          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Courses */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Enrolled Courses</p>

              <h2 className="text-3xl font-bold mt-2">12</h2>
            </div>

            <div className="bg-blue-500/20 p-3 rounded-xl">
              <BookOpen className="w-7 h-7 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Learning Hours */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Learning Hours</p>

              <h2 className="text-3xl font-bold mt-2">148h</h2>
            </div>

            <div className="bg-green-500/20 p-3 rounded-xl">
              <Clock className="w-7 h-7 text-green-400" />
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Test Given</p>

              <h2 className="text-3xl font-bold mt-2">8</h2>
            </div>

            <div className="bg-yellow-500/20 p-3 rounded-xl">
              <Award className="w-7 h-7 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Overall Progress</p>

              <h2 className="text-3xl font-bold mt-2">78%</h2>
            </div>

            <div className="bg-pink-500/20 p-3 rounded-xl">
              <TrendingUp className="w-7 h-7 text-pink-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">My Courses 📚</h2>

            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition">
              View All
            </button>
          </div>

          <div className="space-y-5">
            {courses.map((course, index) => (
              <div key={index} className="bg-slate-700/40 p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium">{course.name}</h3>

                  <PlayCircle className="w-6 h-6 text-blue-400" />
                </div>

                <div className="w-full bg-slate-600 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: course.progress }}
                  ></div>
                </div>

                <p className="text-sm text-slate-400 mt-2">
                  Progress: {course.progress}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Exams 📝</h2>

          <div className="space-y-4">
            {upcomingExams.map((exam, index) => (
              <div
                key={index}
                className="bg-slate-700/40 p-4 rounded-xl hover:bg-slate-700/60 transition"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{exam.subject}</h3>

                  <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                    Upcoming
                  </span>
                </div>

                <div className="mt-3 text-slate-400 text-sm space-y-1">
                  <p>📅 Date: {exam.date}</p>
                  <p>⏰ Time: {exam.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Activity */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-5">Learning Activity 📈</h2>

        <div className="h-64 border-2 border-dashed border-slate-600 rounded-2xl flex items-center justify-center text-slate-400">
          Weekly Learning Chart / Analytics
        </div>
      </div>
    </div>
  );
};
