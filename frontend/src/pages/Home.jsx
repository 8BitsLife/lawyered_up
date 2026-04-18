import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LawyerCard from "../components/LawyerCard";
import { lawyers } from "../data/lawyers";

export default function Home() {
  const navigate = useNavigate();

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [searchForm, setSearchForm] = useState({
    issue: "",
    location: "",
    budget: "",
  });

  // PARALLAX
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 40;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchForm.issue) params.set("issue", searchForm.issue);
    if (searchForm.location) params.set("location", searchForm.location);
    if (searchForm.budget) params.set("budget", searchForm.budget);
    navigate(`/find-lawyers?${params.toString()}`);
  };

  return (
    <div className="bg-[#f5f7fb] min-h-screen">

      <Navbar />

      {/* HERO */}
      <div className="relative bg-gradient-to-br from-[#0f2a66] via-[#1e40af] to-[#3b82f6] text-white px-20 pt-28 pb-40 overflow-hidden">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_40%)]"></div>

        {/* LEFT */}
        <div data-reveal className="max-w-xl z-10 relative">
          <h1 className="text-[52px] font-extrabold leading-tight">
            Find the Right Lawyer <br /> for Your Case
          </h1>

          <p className="mt-5 text-lg opacity-90">
            Connect with top lawyers for Pro Bono & Paid Services
          </p>

          <div className="mt-8 rounded-2xl border border-white/25 bg-white/95 p-2 shadow-[0_18px_45px_rgba(10,31,74,0.35)] backdrop-blur-xl">
            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 xl:grid-cols-[1.1fr_1fr_0.9fr_auto]">
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                >
                  <path d="M9.5 3.5a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z" />
                  <path d="m14 14 5 5" />
                </svg>
                <select
                  value={searchForm.issue}
                  onChange={(e) => setSearchForm((prev) => ({ ...prev, issue: e.target.value }))}
                  className="h-14 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 xl:text-[15px]"
                >
                  <option value="">Legal Issue</option>
                  <option value="Criminal Defense">Criminal Defense</option>
                  <option value="Family Law">Family Law</option>
                  <option value="Corporate Law">Corporate Law</option>
                  <option value="Property Dispute">Property Dispute</option>
                  <option value="Immigration Law">Immigration Law</option>
                  <option value="Civil Litigation">Civil Litigation</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">&#9662;</span>
              </div>

              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                >
                  <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <select
                  value={searchForm.location}
                  onChange={(e) => setSearchForm((prev) => ({ ...prev, location: e.target.value }))}
                  className="h-14 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 xl:text-[15px]"
                >
                  <option value="">Location</option>
                  <option value="New York">New York</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Houston">Houston</option>
                  <option value="San Francisco">San Francisco</option>
                  <option value="Miami">Miami</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">&#9662;</span>
              </div>

              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                >
                  <path d="M4 8h16M4 12h16M4 16h9" />
                </svg>
                <select
                  value={searchForm.budget}
                  onChange={(e) => setSearchForm((prev) => ({ ...prev, budget: e.target.value }))}
                  className="h-14 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 xl:text-[15px]"
                >
                  <option value="">Budget</option>
                  <option value="Pro Bono">Pro Bono</option>
                  <option value="$100-$199/hr">$100-$199/hr</option>
                  <option value="$200-$249/hr">$200-$249/hr</option>
                  <option value="$250+/hr">$250+/hr</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">&#9662;</span>
              </div>

              <button
                onClick={handleSearch}
                className="group h-14 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-8 text-[15px] font-semibold tracking-wide text-white shadow-[0_10px_24px_rgba(29,78,216,0.45)] transition hover:-translate-y-[1px] hover:from-blue-800 hover:to-blue-600 sm:col-span-2 xl:col-span-1"
              >
                <span className="inline-flex items-center gap-2">
                  Search
                  <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </span>
              </button>
            </div>
          </div>

          {/* ?? IMPROVED BADGES */}
          <div className="flex gap-6 mt-8">

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
              <span className="inline-flex h-5 w-5 items-center justify-center text-green-300" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M12 3 5 6v6c0 5 3.5 8 7 9 3.5-1 7-4 7-9V6l-7-3Z" />
                  <path d="m9.5 12 1.8 1.8 3.6-3.8" />
                </svg>
              </span>
              <span className="text-sm font-medium tracking-wide">
                Verified Attorneys
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
              <span className="inline-flex h-5 w-5 items-center justify-center text-yellow-300" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-5 w-5">
                  <path d="M12 4v12" />
                  <path d="M7 8h10" />
                  <path d="M8 8c0 3-1.3 5-3 6.2C3.5 15.3 3 17.2 3 18h5c0-.8-.5-2.7-2-3.8C7.7 13 9 11 9 8H8Z" />
                  <path d="M16 8c0 3 1.3 5 3 6.2 1.5 1.1 2 3 2 3.8h-5c0-.8.5-2.7 2-3.8C16.3 13 15 11 15 8h1Z" />
                </svg>
              </span>
              <span className="text-sm font-medium tracking-wide">
                Pro Bono & Paid Options
              </span>
            </div>

          </div>
        </div>

        {/* HERO IMAGE */}
        <div
          className="absolute right-0 top-0 h-full flex items-end pr-10 transition-transform duration-200"
          style={{
            transform: `translate(${offset.x}px, calc(${offset.y}px - 80px))`
          }}
        >
          <div className="hero-image-shell animate-float">
            <img
              src="/hero.png"
              alt="LawyeredUp featured legal experts"
              className="hero-image-art"
            />
          </div>
        </div>

      </div>

      {/* ACTION CARDS */}
      <div data-reveal className="relative z-10 -mt-24 px-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white via-[#f4f8ff] to-[#e7efff] p-8 shadow-[0_22px_55px_rgba(14,46,117,0.2)] transition duration-300 hover:-translate-y-1.5">
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-200/45 blur-2xl"></div>
            <div className="relative flex h-full flex-col">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-blue-700/10 px-4 py-1.5 text-xs font-semibold tracking-[0.08em] text-blue-800">
                CLIENTS
              </div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Post Your Case</h2>
              <p className="mt-3 max-w-[34ch] text-[17px] leading-relaxed text-slate-600">
                Share your legal issue once and receive tailored proposals from verified lawyers.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                <span className="rounded-full border border-slate-300/80 bg-white/80 px-3 py-1.5">Fast responses</span>
                <span className="rounded-full border border-slate-300/80 bg-white/80 px-3 py-1.5">100% confidential</span>
              </div>
              <Link to="/signup" className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(29,78,216,0.38)] transition group-hover:translate-x-1">
                Get Started
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-[#ffe2bf] bg-gradient-to-br from-[#fff8ef] via-[#fff2df] to-[#ffe6c8] p-8 shadow-[0_22px_55px_rgba(129,75,6,0.18)] transition duration-300 hover:-translate-y-1.5">
            <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-amber-300/40 blur-2xl"></div>
            <div className="relative flex h-full flex-col">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-semibold tracking-[0.08em] text-amber-900">
                FOR LAWYERS
              </div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">Join as a Lawyer</h2>
              <p className="mt-3 max-w-[36ch] text-[17px] leading-relaxed text-slate-700">
                Build your profile, choose Pro Bono or paid work, and get matched with relevant cases.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                <span className="rounded-full border border-amber-300/80 bg-white/65 px-3 py-1.5">Flexible plans</span>
                <span className="rounded-full border border-amber-300/80 bg-white/65 px-3 py-1.5">Trusted leads</span>
              </div>
              <Link to="/signup" className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(15,23,42,0.35)] transition group-hover:translate-x-1 hover:bg-slate-800">
                Join Now
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* LAWYERS */}
      <div data-reveal className="px-20 py-16 overflow-hidden">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-1 text-xs font-semibold tracking-[0.09em] text-slate-600">
              DISCOVER TOP TALENT
            </p>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Find Your Lawyers
            </h2>
            <p className="mt-2 text-slate-600">
              Live showcase: trusted experts sliding in real time.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="lawyer-marquee-track flex w-max gap-7 py-1">
            {[...lawyers, ...lawyers].map((lawyer, index) => (
              <div key={`${lawyer.id}-${index}`} className="w-[340px] shrink-0" data-reveal>
                <LawyerCard lawyer={lawyer} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
