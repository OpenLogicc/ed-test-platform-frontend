import React from 'react'
import { SideBar } from '../components/sideBar/SideBar'
import { useNavigate } from 'react-router-dom';

export const AdminPage = () => {
    const navigate = useNavigate();
    
    const stats = [
        { title: 'Total Students', value: '2,340' },
        { title: 'Active Mentorships', value: '186' },
        { title: 'Tests Conducted', value: '94' },
        { title: 'Revenue', value: '₹4.8L' },
    ];

    const students = [
        {
            name: 'Aarav Sharma',
            course: 'JEE Advanced',
            mentor: 'Physics Mentor',
            progress: '82%',
        },
        {
            name: 'Fatima Khan',
            course: 'NEET',
            mentor: 'Biology Mentor',
            progress: '76%',
        },
        {
            name: 'Rohan Verma',
            course: 'JEE Main',
            mentor: 'Math Mentor',
            progress: '91%',
        },
    ];

    const upcomingTests = [
        {
            title: 'NEET Full Mock Test',
            date: '28 May 2026',
            students: '520 Students',
        },
        {
            title: 'JEE Physics Marathon',
            date: '30 May 2026',
            students: '410 Students',
        },
        {
            title: 'Chemistry Weekly Quiz',
            date: '1 June 2026',
            students: '220 Students',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* <SideBar /> */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">EdTech Admin Dashboard</h1>
                        <p className="text-slate-400 mt-2">
                            Manage mentorship programs, students, and test series.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/admin/create-test")}
                        className="bg-purple-500 hover:bg-purple-600 transition px-5 py-3 rounded-2xl font-semibold shadow-lg"
                    >
                        + Create New Test
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl"
                        >
                            <p className="text-slate-400 text-sm">{item.title}</p>
                            <h2 className="text-3xl font-bold mt-3">{item.value}</h2>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-2xl font-semibold">Student Progress</h2>
                            <button className="text-orange-400">View All</button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-slate-400 border-b border-slate-800">
                                        <th className="pb-3">Student</th>
                                        <th className="pb-3">Course</th>
                                        <th className="pb-3">Mentor</th>
                                        <th className="pb-3">Progress</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {students.map((student, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-slate-800 hover:bg-slate-800 transition"
                                        >
                                            <td className="py-4">{student.name}</td>
                                            <td>{student.course}</td>
                                            <td>{student.mentor}</td>
                                            <td>
                                                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                                                    {student.progress}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-2xl font-semibold">Upcoming Tests</h2>
                            <button className="text-orange-400">Schedule</button>
                        </div>

                        <div className="space-y-4">
                            {upcomingTests.map((test, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-800 rounded-2xl p-4 border border-slate-700"
                                >
                                    <h3 className="font-semibold text-lg">{test.title}</h3>
                                    <p className="text-slate-400 mt-1">{test.date}</p>
                                    <p className="text-orange-400 mt-2 text-sm">{test.students}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                        <h2 className="text-2xl font-semibold mb-5">Mentorship Features</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-800 p-5 rounded-2xl">
                                <h3 className="font-semibold">1-to-1 Sessions</h3>
                                <p className="text-slate-400 text-sm mt-2">
                                    Schedule and manage mentor calls.
                                </p>
                            </div>

                            <div className="bg-slate-800 p-5 rounded-2xl">
                                <h3 className="font-semibold">Student Analytics</h3>
                                <p className="text-slate-400 text-sm mt-2">
                                    Track accuracy, rank, and performance.
                                </p>
                            </div>

                            <div className="bg-slate-800 p-5 rounded-2xl">
                                <h3 className="font-semibold">Doubt Solving</h3>
                                <p className="text-slate-400 text-sm mt-2">
                                    Students can upload doubts with images.
                                </p>
                            </div>

                            <div className="bg-slate-800 p-5 rounded-2xl">
                                <h3 className="font-semibold">Performance Reports</h3>
                                <p className="text-slate-400 text-sm mt-2">
                                    Weekly PDF reports for parents and students.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                        <h2 className="text-2xl font-semibold mb-5">Quick Actions</h2>

                        <div className="grid grid-cols-1 gap-4">
                            <button className="bg-purple-500 hover:bg-purple-600 transition rounded-2xl py-4 font-semibold">
                                Add New Student
                            </button>

                            <button className="bg-slate-800 hover:bg-slate-700 transition rounded-2xl py-4 font-semibold border border-slate-700">
                                Upload Test Series
                            </button>

                            <button className="bg-slate-800 hover:bg-slate-700 transition rounded-2xl py-4 font-semibold border border-slate-700">
                                Assign Mentor
                            </button>

                            <button className="bg-slate-800 hover:bg-slate-700 transition rounded-2xl py-4 font-semibold border border-slate-700">
                                Send Student Reports
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
