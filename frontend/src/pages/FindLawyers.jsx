import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { lawyers } from "../data/lawyers";

function parseHourlyRate(rate) {
  const amount = Number(String(rate).replace(/[^0-9]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

export default function FindLawyers() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("best-match");

  const issue = searchParams.get("issue") || "";
  const location = searchParams.get("location") || "";
  const budget = searchParams.get("budget") || "";

  const filteredLawyers = useMemo(() => {
    let list = [...lawyers];
    const issueTerm = normalize(issue);
    const locationTerm = normalize(location);

    if (issueTerm) {
      list = list.filter((lawyer) => normalize(lawyer.specialization).includes(issueTerm));
    }

    if (locationTerm) {
      list = list.filter((lawyer) => normalize(lawyer.location).includes(locationTerm));
    }

    if (budget === "Pro Bono") {
      list = list.filter((lawyer) => lawyer.proBono);
    }
    if (budget === "$100-$199/hr") {
      list = list.filter((lawyer) => {
        const rate = parseHourlyRate(lawyer.hourlyRate);
        return rate >= 100 && rate <= 199;
      });
    }
    if (budget === "$200-$249/hr") {
      list = list.filter((lawyer) => {
        const rate = parseHourlyRate(lawyer.hourlyRate);
        return rate >= 200 && rate <= 249;
      });
    }
    if (budget === "$250+/hr") {
      list = list.filter((lawyer) => parseHourlyRate(lawyer.hourlyRate) >= 250);
    }

    if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "experience") {
      list.sort((a, b) => (b.experience || 0) - (a.experience || 0));
    } else if (sortBy === "fast-response") {
      list.sort((a, b) => {
        const responseA = Number(String(a.responseTime).replace(/[^0-9]/g, ""));
        const responseB = Number(String(b.responseTime).replace(/[^0-9]/g, ""));
        return responseA - responseB;
      });
    } else {
      list.sort((a, b) => {
        const scoreA = (a.rating * 40) + ((a.casesWon || 0) / 10) + ((a.proBono ? 1 : 0) * 8) + ((a.reviews || 0) / 5);
        const scoreB = (b.rating * 40) + ((b.casesWon || 0) / 10) + ((b.proBono ? 1 : 0) * 8) + ((b.reviews || 0) / 5);
        return scoreB - scoreA;
      });
    }

    return list;
  }, [issue, location, budget, sortBy]);

  const removeFilter = (key) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    navigate(`/find-lawyers?${params.toString()}`);
  };

  const activeFilters = [
    issue ? { key: "issue", label: issue } : null,
    location ? { key: "location", label: location } : null,
    budget ? { key: "budget", label: budget } : null,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#edf1f8]">
      <Navbar />

      <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-[#0f2a66] via-[#1d4ed8] to-[#60a5fa] px-6 pb-14 pt-12 text-white md:px-12">
        <div className="absolute -top-20 right-20 h-56 w-56 rounded-full bg-white/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-cyan-300/30 blur-3xl"></div>

        <div data-reveal className="relative mx-auto max-w-7xl">
          <p className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.12em]">
            LAWYER MATCH STREAM
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
            Your Best Lawyer Matches, Ready to Hire
          </h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Curated by your filters and ranked by trust signals, outcomes, and response quality.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {activeFilters.length > 0 ? (
              activeFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => removeFilter(filter.key)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/30"
                >
                  {filter.label} <span aria-hidden="true">&times;</span>
                </button>
              ))
            ) : (
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white/90">
                No filters selected, showing all lawyers
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        <div data-reveal className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.1em] text-slate-500">LIVE RESULTS</p>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              {filteredLawyers.length} lawyers found
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="sortBy" className="text-sm font-semibold text-slate-600">
              Sort by
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500"
            >
              <option value="best-match">Best Match</option>
              <option value="rating">Highest Rated</option>
              <option value="experience">Most Experienced</option>
              <option value="fast-response">Fastest Response</option>
            </select>
            <Link
              to="/"
              className="inline-flex h-11 items-center rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-700"
            >
              Refine Search
            </Link>
          </div>
        </div>

        {filteredLawyers.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <h3 className="text-3xl font-black tracking-tight text-slate-900">No matches yet</h3>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              Try removing one filter or broadening location and budget. We will instantly refresh your lawyer stream.
            </p>
            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Search <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredLawyers.map((lawyer, idx) => (
              <article
                data-reveal
                key={lawyer.id}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_14px_38px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)]"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-4">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="h-24 w-24 rounded-2xl border border-slate-200 object-cover shadow-sm"
                    />

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          Match #{idx + 1}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {lawyer.specialization}
                        </span>
                        {lawyer.proBono && (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Pro Bono Available
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-900">{lawyer.name}</h3>
                      <p className="text-sm font-medium text-slate-500">{lawyer.location}</p>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700">
                          &#9733;&#9733;&#9733;&#9733;&#9733; {lawyer.rating}
                        </span>
                        <span className="font-semibold text-slate-700">{lawyer.reviews} reviews</span>
                        <span className="font-semibold text-slate-700">{lawyer.experience}+ years</span>
                        <span className="font-semibold text-slate-700">{lawyer.responseTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 text-sm sm:grid-cols-3 lg:w-[440px] lg:grid-cols-1">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold tracking-[0.08em] text-slate-500">HOURLY RATE</p>
                      <p className="mt-1 text-xl font-black text-slate-900">{lawyer.hourlyRate}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold tracking-[0.08em] text-slate-500">CASES WON</p>
                      <p className="mt-1 text-xl font-black text-slate-900">{lawyer.casesWon}</p>
                    </div>
                    <Link
                      to={`/lawyer/${lawyer.id}`}
                      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(29,78,216,0.35)] transition hover:from-blue-800 hover:to-blue-600"
                    >
                      View Full Profile
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
