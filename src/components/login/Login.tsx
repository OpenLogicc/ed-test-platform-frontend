import React, { useState } from 'react';
import {
  User,
  Lock,
  Smartphone,
  Mail,
  GraduationCap,
  Calendar,
  Eye,
  EyeOff,
  BookOpen,
  Target,
  Users,
  ChevronDown,
  ArrowRight,
  LogIn,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // UI State Management
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Login Form State
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: ''
  });

  // Signup Form State
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    targetGoal: '',
    targetExamYear: ''
  });

  const BASE_URL = 'http://localhost:8080/api/v1/auth';

  // Input Change Handlers
  const handleLoginChange = (e:any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e:any) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // Toggle View Handler
  const toggleView = (toSignup: boolean) => {
    setIsSignup(toSignup);
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Login API Call
  const handleLoginSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ fullName: data.fullName, email: data.email }));

      setSuccessMessage(`Welcome back, ${data.fullName}!`);
      // Optional: Redirect user to home
      window.location.href = '/home';
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Signup API Call
  const handleSignupSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      localStorage.setItem('token', data.token);
      setSuccessMessage('Account created successfully!');
      
      // Auto-switch to login after successful signup
      setTimeout(() => {
        toggleView(false);
      }, 2000);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-3 sm:p-6 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
        
        {/* ================= LEFT MARKETING PANEL ================= */}
        <div className="lg:w-[48%] bg-gradient-to-br from-[#FFF5EE] via-[#FFF0E6] to-[#FFE8DC] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200/40 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10">
            {/* Brand Logo */}
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

            {/* Banner Content */}
            {!isSignup ? (
              <>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight mb-4">
                  Ace Your Exams With <span className="text-[#EA580C]">Top Mentors & Notes</span>
                </h1>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Get 1-on-1 guidance from top rankers, access high-yield revision notes, and benchmark your score with full-length test series.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl text-center border border-white/60 shadow-sm">
                    <span className="block text-xl font-extrabold text-[#EA580C]">10K+</span>
                    <span className="text-[11px] text-slate-500 font-medium">Mentorship Sessions</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl text-center border border-white/60 shadow-sm">
                    <span className="block text-xl font-extrabold text-[#EA580C]">50K+</span>
                    <span className="text-[11px] text-slate-500 font-medium">Notes Downloaded</span>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl text-center border border-white/60 shadow-sm">
                    <span className="block text-xl font-extrabold text-[#EA580C]">200K+</span>
                    <span className="text-[11px] text-slate-500 font-medium">Tests Taken</span>
                  </div>
                </div>

                <div className="space-y-3.5 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#EA580C] shrink-0">
                      <Users size={16} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">1-on-1 Mentorship by Top Rankers & Experts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#EA580C] shrink-0">
                      <BookOpen size={16} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">Curated Short Notes, Mind Maps & Formula Sheets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#EA580C] shrink-0">
                      <Target size={16} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">Exam-pattern Test Series with AIR Ranking & Insights</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight mb-4">
                  Start Your Prep with <span className="text-[#EA580C]">Free Resources</span>
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Create your free account today to unlock sample revision notes, free mock tests, and a complimentary 15-minute mentorship call.
                </p>

                <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-white/60 shadow-sm mb-6 space-y-2.5">
                  <span className="text-[10px] font-bold tracking-widest text-[#EA580C] uppercase block mb-1">
                    What You Get On Joining
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Free Subject-wise PDF Notes
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Access to 2 Free All-India Mock Tests
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Direct Chat Access with Dedicated Mentor
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="relative z-10 flex flex-wrap gap-3 pt-2">
            <a href="#" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl flex items-center gap-2.5 transition">
              <span className="text-lg">▶</span>
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-tight">Get it on</span>
                <span className="block text-xs font-bold leading-tight">Google Play</span>
              </div>
            </a>
            <a href="#" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl flex items-center gap-2.5 transition">
              <span className="text-lg"></span>
              <div className="text-left">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-tight">Download on</span>
                <span className="block text-xs font-bold leading-tight">App Store</span>
              </div>
            </a>
          </div>
        </div>

        {/* ================= RIGHT FORM PANEL ================= */}
        <div className="lg:w-[52%] p-6 sm:p-12 flex flex-col justify-center bg-white">
          
          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="max-w-md w-full mx-auto mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="max-w-md w-full mx-auto mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* LOGIN VIEW */}
          {!isSignup ? (
            <div className="max-w-md w-full mx-auto">
              <span className="text-[11px] font-bold tracking-widest text-[#EA580C] uppercase block mb-1">
                Welcome Back
              </span>
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-1">
                Login to Student Portal
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Access your test analytics, notes library, and mentor sessions.
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 tracking-wider uppercase mb-1.5">
                    Email or Mobile Number
                  </label>
                  <div className="flex rounded-2xl border border-slate-200 overflow-hidden focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition">
                    <div className="px-3.5 flex items-center bg-slate-50 text-slate-400 border-r border-slate-200">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      name="identifier"
                      value={loginData.identifier}
                      onChange={handleLoginChange}
                      required
                      placeholder="Enter mobile or email"
                      className="flex-1 px-3 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 tracking-wider uppercase mb-1.5">
                    Password
                  </label>
                  <div className="flex rounded-2xl border border-slate-200 overflow-hidden focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition">
                    <div className="px-3.5 flex items-center bg-slate-50 text-slate-400 border-r border-slate-200">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                      placeholder="Enter your password"
                      className="flex-1 px-3 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="px-3.5 text-slate-400 hover:text-slate-600 flex items-center"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="text-right mt-1.5">
                    <a href="#" className="text-[11px] font-bold text-[#EA580C] hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0F172A] hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-slate-900/10 mt-2"
                >
                  <LogIn size={15} />
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <span className="text-xs text-slate-500">New to EduPrep? </span>
                <button
                  onClick={() => toggleView(true)}
                  className="text-xs font-bold text-[#EA580C] hover:underline inline-flex items-center gap-1"
                >
                  Join For Free <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ) : (
            
            /* SIGNUP VIEW */
            <div className="max-w-md w-full mx-auto">
              <span className="text-[11px] font-bold tracking-widest text-[#EA580C] uppercase block mb-1">
                Start Learning Today
              </span>
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-1">
                Create Account
              </h2>
              <p className="text-xs text-slate-500 mb-5">
                Fill in your details to get free study materials & mentorship.
              </p>

              <form onSubmit={handleSignupSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 tracking-wider uppercase mb-1">
                    Full Name
                  </label>
                  <div className="flex rounded-2xl border border-slate-200 overflow-hidden focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition">
                    <div className="px-3.5 flex items-center bg-slate-50 text-slate-400 border-r border-slate-200">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={signupData.fullName}
                      onChange={handleSignupChange}
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="flex-1 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 tracking-wider uppercase mb-1">
                    Email Address
                  </label>
                  <div className="flex rounded-2xl border border-slate-200 overflow-hidden focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition">
                    <div className="px-3.5 flex items-center bg-slate-50 text-slate-400 border-r border-slate-200">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      required
                      placeholder="name@example.com"
                      className="flex-1 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 tracking-wider uppercase mb-1">
                    Mobile Number
                  </label>
                  <div className="flex rounded-2xl border border-slate-200 overflow-hidden focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition">
                    <div className="px-3.5 flex items-center bg-slate-50 text-slate-400 border-r border-slate-200">
                      <Smartphone size={16} />
                    </div>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={signupData.mobileNumber}
                      onChange={handleSignupChange}
                      required
                      placeholder="Enter 10-digit mobile number"
                      className="flex-1 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 tracking-wider uppercase mb-1">
                    Create Password
                  </label>
                  <div className="flex rounded-2xl border border-slate-200 overflow-hidden focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition">
                    <div className="px-3.5 flex items-center bg-slate-50 text-slate-400 border-r border-slate-200">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      required
                      placeholder="Create a strong password"
                      className="flex-1 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="px-3 text-slate-400 hover:text-slate-600 flex items-center"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 tracking-wider uppercase mb-1">
                    Select Target Goal
                  </label>
                  <div className="flex rounded-2xl border border-slate-200 overflow-hidden focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition relative">
                    <div className="px-3.5 flex items-center bg-slate-50 text-slate-400 border-r border-slate-200">
                      <GraduationCap size={16} />
                    </div>
                    <select
                      name="targetGoal"
                      value={signupData.targetGoal}
                      onChange={handleSignupChange}
                      required
                      className="flex-1 px-3 py-2.5 text-sm text-slate-700 bg-transparent appearance-none focus:outline-none cursor-pointer"
                    >
                      <option value="">Choose Exam / Goal</option>
                      <option value="jee">JEE Main / Advanced</option>
                      <option value="neet">NEET UG</option>
                      <option value="upsc">UPSC CSE</option>
                      <option value="cat">CAT / Management</option>
                      <option value="gate">GATE / ESE</option>
                      <option value="boards">Class 11 & 12 Board Prep</option>
                    </select>
                    <div className="px-3 flex items-center text-slate-400 pointer-events-none">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-600 tracking-wider uppercase mb-1">
                    Target Exam Year
                  </label>
                  <div className="flex rounded-2xl border border-slate-200 overflow-hidden focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition relative">
                    <div className="px-3.5 flex items-center bg-slate-50 text-slate-400 border-r border-slate-200">
                      <Calendar size={16} />
                    </div>
                    <select
                      name="targetExamYear"
                      value={signupData.targetExamYear}
                      onChange={handleSignupChange}
                      required
                      className="flex-1 px-3 py-2.5 text-sm text-slate-700 bg-transparent appearance-none focus:outline-none cursor-pointer"
                    >
                      <option value="">Target Exam Year</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                    <div className="px-3 flex items-center text-slate-400 pointer-events-none">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0F172A] hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-3 rounded-2xl text-xs transition shadow-lg shadow-slate-900/10 mt-2"
                >
                  {loading ? 'Creating Account...' : 'Create Free Account'}
                </button>
              </form>

              <div className="mt-5 text-center">
                <span className="text-xs text-slate-500">Already registered? </span>
                <button
                  onClick={() => toggleView(false)}
                  className="text-xs font-bold text-[#EA580C] hover:underline inline-flex items-center gap-1"
                >
                  Sign In <ArrowRight size={12} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}