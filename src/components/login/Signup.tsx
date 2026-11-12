import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Smartphone,
  User,
} from "lucide-react";
import AuthLayout from "./AuthLayout";

type SignupResponse = {
  message?: string;
};

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    targetGoal: "",
    targetExamYear: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setSignupData({ ...signupData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      const data = (await response.json()) as SignupResponse;

      if (!response.ok) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      setSuccessMessage("Account created successfully!");
      window.setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout mode="signup">
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

        <form onSubmit={handleSubmit} className="space-y-3">
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                type={showPassword ? "text" : "password"}
                name="password"
                value={signupData.password}
                onChange={handleChange}
                required
                placeholder="Create a strong password"
                className="flex-1 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-slate-400 hover:text-slate-600 flex items-center"
                aria-label={showPassword ? "Hide password" : "Show password"}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
            {loading ? "Creating Account..." : "Create Free Account"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <span className="text-xs text-slate-500">Already registered? </span>
          <Link
            to="/login"
            className="text-xs font-bold text-[#EA580C] hover:underline inline-flex items-center gap-1"
          >
            Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
