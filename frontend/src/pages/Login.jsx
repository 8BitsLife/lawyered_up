import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { apiJson } from "../config/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const data = await apiJson("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form)
      });

      const name = data?.user?.firstName || "User";
      setMessage({ type: "success", text: `Welcome back, ${name}.` });
      if (data?.user) {
        localStorage.setItem("lawyeredup_user", JSON.stringify(data.user));
      }
      if (data?.user?.role === "LAWYER") {
        setTimeout(() => navigate("/lawyer/dashboard"), 500);
      } else if (data?.user?.role === "CLIENT") {
        setTimeout(() => navigate("/client/dashboard"), 500);
      } else {
        setTimeout(() => navigate("/"), 500);
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />

      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f2a66] via-[#1e40af] to-[#3b82f6] px-6 py-16 md:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.16),transparent_45%)]"></div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="text-white">
            <p className="mb-3 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.09em]">
              WELCOME BACK
            </p>
            <h1 className="text-5xl font-black leading-tight">Log in to LawyeredUp</h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Track your case requests, connect with lawyers, and continue where you left off.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2">Secure access</span>
              <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2">Fast matching</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/40 bg-white/95 p-8 shadow-[0_24px_60px_rgba(14,46,117,0.35)] backdrop-blur-xl">
            <h2 className="text-3xl font-black text-slate-900">Sign in</h2>
            <p className="mt-2 text-sm text-slate-500">Use your account credentials to continue.</p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <button type="button" className="text-xs font-semibold text-blue-700 hover:text-blue-800">
                    Forgot?
                  </button>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(29,78,216,0.35)] transition hover:from-blue-800 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>

            {message.text && (
              <p className={`mt-4 text-sm font-medium ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
                {message.text}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-slate-600">
              New to LawyeredUp?{" "}
              <Link to="/signup" className="font-semibold text-blue-700 hover:text-blue-800">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
