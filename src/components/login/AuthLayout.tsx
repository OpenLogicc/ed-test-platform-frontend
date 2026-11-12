import type { ReactNode } from "react";
import {
  BookOpen,
  CheckCircle2,
  Target,
  Users,
} from "lucide-react";

type AuthLayoutProps = {
  mode: "login" | "signup";
  children: ReactNode;
};

export default function AuthLayout({ mode, children }: AuthLayoutProps) {
  const isSignup = mode === "signup";

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-3 sm:p-6 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
        <div className="lg:w-[48%] bg-gradient-to-br from-[#FFF5EE] via-[#FFF0E6] to-[#FFE8DC] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200/40 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 font-bold text-xl">
                🚀
              </div>
              <div>
                <span className="block text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  EduPrep
                </span>
                <span className="block text-xs font-semibold text-orange-600 tracking-wider uppercase leading-none">
                  Mentorship & Prep
                </span>
              </div>
            </div>

            {isSignup ? (
              <>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight mb-4">
                  Start Your Prep with{" "}
                  <span className="text-[#EA580C]">Free Resources</span>
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Create your free account today to unlock sample revision
                  notes, free mock tests, and a complimentary 15-minute
                  mentorship call.
                </p>

                <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-white/60 shadow-sm mb-6 space-y-2.5">
                  <span className="text-[10px] font-bold tracking-widest text-[#EA580C] uppercase block mb-1">
                    What You Get On Joining
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    Free Subject-wise PDF Notes
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    Access to 2 Free All-India Mock Tests
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    Direct Chat Access with Dedicated Mentor
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight mb-4">
                  Ace Your Exams With{" "}
                  <span className="text-[#EA580C]">Top Mentors & Notes</span>
                </h1>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Get 1-on-1 guidance from top rankers, access high-yield
                  revision notes, and benchmark your score with full-length test
                  series.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl text-center border border-white/60 shadow-sm">
                    <span className="block text-xl font-extrabold text-[#EA580C]">
                      10K+
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Mentorship Sessions
                    </span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl text-center border border-white/60 shadow-sm">
                    <span className="block text-xl font-extrabold text-[#EA580C]">
                      50K+
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Notes Downloaded
                    </span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl text-center border border-white/60 shadow-sm">
                    <span className="block text-xl font-extrabold text-[#EA580C]">
                      200K+
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Tests Taken
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#EA580C] shrink-0">
                      <Users size={16} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      1-on-1 Mentorship by Top Rankers & Experts
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#EA580C] shrink-0">
                      <BookOpen size={16} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      Curated Short Notes, Mind Maps & Formula Sheets
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#EA580C] shrink-0">
                      <Target size={16} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      Exam-pattern Test Series with AIR Ranking & Insights
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative z-10 flex flex-wrap gap-3 pt-2">
            <a
              href="#"
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl flex items-center gap-2.5 transition"
            >
              <span className="text-lg">▶</span>
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-tight">
                  Get it on
                </span>
                <span className="block text-xs font-bold leading-tight">
                  Google Play
                </span>
              </div>
            </a>
            <a
              href="#"
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl flex items-center gap-2.5 transition"
            >
              <span className="text-lg"></span>
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-tight">
                  Download on
                </span>
                <span className="block text-xs font-bold leading-tight">
                  App Store
                </span>
              </div>
            </a>
          </div>
        </div>

        <div className="lg:w-[52%] p-6 sm:p-12 flex flex-col justify-center bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
