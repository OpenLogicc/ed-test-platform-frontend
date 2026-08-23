import React from 'react'

export const Payments = () => {
    return (
        <div className="bg-slate-900 min-h-screen text-white p-6">

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {/* PLAN 1 */}
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-xl hover:scale-105 transition-all duration-300">

                    <h2 className="text-2xl font-bold mb-2">
                        Test Series
                    </h2>

                    <p className="text-slate-400 mb-6">
                        Access full mock tests and practice exams.
                    </p>

                    <div className="mb-6">
                        <span className="text-5xl font-bold text-purple-400">
                            ₹249
                        </span>
                    </div>

                    <ul className="space-y-4 mb-8 text-slate-300">
                        <li>✅ Full Test Series Access</li>
                        <li>✅ Mock Exams</li>
                        <li>✅ Performance Analysis</li>
                        <li>❌ Chapter-wise Questions</li>
                        <li>❌ Mentorship</li>
                    </ul>

                    <button className="w-full bg-purple-500 hover:bg-purple-600 py-3 rounded-2xl font-semibold transition-all duration-300">
                        Buy Now
                    </button>
                </div>

                {/* PLAN 2 */}
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 border border-purple-500 rounded-3xl p-8 shadow-2xl scale-105 relative">

                    {/* Popular Badge */}
                    <div className="absolute top-2 right-3 bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full">
                        MOST POPULAR
                    </div>

                    <h2 className="text-2xl font-bold mt-3">
                        Test Series + Practice
                    </h2>

                    <p className="text-slate-200 mb-6">
                        Best for serious preparation with solutions.
                    </p>

                    <div className="mb-6">
                        <span className="text-5xl font-bold">
                            ₹499
                        </span>
                    </div>

                    <ul className="space-y-4 mb-8 text-slate-100">
                        <li>✅ Full Test Series Access</li>
                        <li>✅ Chapter-wise Questions</li>
                        <li>✅ Detailed Solutions</li>
                        <li>✅ Mock Exams</li>
                        <li>❌ Mentorship</li>
                    </ul>

                    <button className="w-full bg-white text-black hover:bg-slate-200 py-3 rounded-2xl font-semibold transition-all duration-300">
                        Buy Now
                    </button>
                </div>

                {/* PLAN 3 */}
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-xl hover:scale-105 transition-all duration-300">

                    <h2 className="text-2xl font-bold mb-2">
                        Ultimate Mentorship
                    </h2>

                    <p className="text-slate-400 mb-6">
                        Complete preparation with personal mentorship.
                    </p>

                    <div className="mb-6">
                        <span className="text-5xl font-bold text-green-400">
                            ₹1199
                        </span>
                    </div>

                    <ul className="space-y-4 mb-8 text-slate-300">
                        <li>✅ Full Test Series Access</li>
                        <li>✅ Chapter-wise Questions</li>
                        <li>✅ Detailed Solutions</li>
                        <li>✅ 1-to-1 Mentorship</li>
                        <li>✅ Study Guidance</li>
                    </ul>

                    <button className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-2xl font-semibold transition-all duration-300">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}
