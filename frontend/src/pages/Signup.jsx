import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { apiJson } from "../config/api";

export default function Signup() {
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "CLIENT",
    password: ""
  });
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
      const data = await apiJson("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(form)
      });

      const name = data?.user?.firstName || "there";
      setMessage({ type: "success", text: `Account created for ${name}. You can now log in.` });
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        role: "CLIENT",
        password: ""
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <Navbar />

      <div className="relative overflow-hidden bg-gradient-to-br from-[#102a5c] via-[#1e3a8a] to-[#2563eb] px-6 py-16 md:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.14),transparent_45%)]"></div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="text-white">
            <p className="mb-3 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.09em]">
              JOIN LAWYEREDUP
            </p>
            <h1 className="text-5xl font-black leading-tight">Create your account</h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">
              Sign up as a client or lawyer and start getting meaningful matches in minutes.
            </p>
            <div className="mt-8 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/25 bg-white/10 p-4">
                <p className="text-sm font-semibold">For Clients</p>
                <p className="mt-1 text-xs text-white/80">Post your legal need and compare offers quickly.</p>
              </div>
              <div className="rounded-2xl border border-white/25 bg-white/10 p-4">
                <p className="text-sm font-semibold">For Lawyers</p>
                <p className="mt-1 text-xs text-white/80">Create profile and receive quality case leads.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/40 bg-white/95 p-8 shadow-[0_24px_60px_rgba(14,46,117,0.35)] backdrop-blur-xl">
            <h2 className="text-3xl font-black text-slate-900">Sign up</h2>
            <p className="mt-2 text-sm text-slate-500">Set up your profile to get started.</p>

            <form className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={form.firstName}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
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

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">I am joining as</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="CLIENT">Client</option>
                  <option value="LAWYER">Lawyer</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="sm:col-span-2 h-12 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(29,78,216,0.35)] transition hover:from-blue-800 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {message.text && (
              <p className={`mt-4 text-sm font-medium ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
                {message.text}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-blue-700 hover:text-blue-800">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
