import React from 'react'

const UpcomingTest = () => {
    const upcomingTests = [
        {
            id: 1,
            title: "JEE Advanced Grand Mock",
            subject: "PCM",
            duration: "3 Hours",
            questions: 90,
            date: "25 May • 10:00 AM",
        },
        {
            id: 2,
            title: "NEET Full Syllabus Test",
            subject: "PCB",
            duration: "3 Hours",
            questions: 180,
            date: "27 May • 9:00 AM",
        },
        {
            id: 3,
            title: "Physics Speed Test",
            subject: "Physics",
            duration: "45 Minutes",
            questions: 25,
            date: "29 May • 7:00 PM",
        },
        {
            id: 4,
            title: "Chemistry Speed Test",
            subject: "Chemistry",
            duration: "60 Minutes",
            questions: 25,
            date: "30 May • 7:00 PM",
        },
    ];
    return (
        <div>
            {/* Upcoming Tests */}
            <div className="mb-10">

                <h2 className="text-2xl font-bold mb-5">
                    Upcoming Tests ⏳
                </h2>

                {/* Cards Row */}
                <div  className="flex gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory scrollbar-hide">

                    {upcomingTests.map((test) => (
                        <div
                            key={test.id}
                            className="
                                min-w-[320px]
                                snap-start
                                bg-slate-800
                                border border-slate-700
                                rounded-2xl
                                p-4
                                hover:border-purple-500
                                transition-all duration-300
                                shadow-md
                            "
                        >

                            {/* Top */}
                            <div className="flex justify-between items-center mb-3">

                                <span className="
                                    text-xs
                                    bg-yellow-500/20
                                    text-yellow-300
                                    px-2 py-1
                                    rounded-full
                                ">
                                    Upcoming
                                </span>

                                <span className="text-sm text-slate-400">
                                    {test.date}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold mb-2">
                                {test.title}
                            </h3>

                            {/* Subject */}
                            <p className="text-sm text-slate-400 mb-4">
                                {test.subject}
                            </p>

                            {/* Bottom */}
                            <div className="flex justify-between items-center">

                                <div className="text-sm text-slate-400">
                                    {test.duration} • {test.questions} Questions
                                </div>

                                <button
                                    className="
                            bg-purple-500
                            hover:bg-purple-600
                            px-4 py-2
                            rounded-xl
                            text-sm
                            font-semibold
                            transition-all duration-300
                        "
                                >
                                    Notify
                                </button>

                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default UpcomingTest