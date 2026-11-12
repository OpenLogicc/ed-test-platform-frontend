import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  User,
} from "lucide-react";
import AuthLayout from "./AuthLayout";

type LoginResponse = {
  message?: string;
  token?: string;
  fullName?: string;
  email?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = (await response.json()) as LoginResponse;

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed. Please check your credentials.",
        );
      }

      if (!data.token) {
        throw new Error("Login response did not include an authentication token.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ fullName: data.fullName, email: data.email }),
      );
      setSuccessMessage(`Welcome back, ${data.fullName}!`);
      navigate("/home");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout mode="login">
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
          Welcome Back
        </span>
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-1">
          Login to Student Portal
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Access your test analytics, notes library, and mentor sessions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                onChange={handleChange}
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
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="flex-1 px-3 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3.5 text-slate-400 hover:text-slate-600 flex items-center"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="text-right mt-1.5">
              <a
                href="#"
                className="text-[11px] font-bold text-[#EA580C] hover:underline"
              >
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <span className="text-xs text-slate-500">New to EduPrep? </span>
          <Link
            to="/signup"
            className="text-xs font-bold text-[#EA580C] hover:underline inline-flex items-center gap-1"
          >
            Join For Free
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
