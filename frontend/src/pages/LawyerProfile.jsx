import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getLawyerById } from "../data/lawyers";

function Stars() {
  return <span aria-hidden="true" className="text-amber-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>;
}

export default function LawyerProfile() {
  const { id } = useParams();
  const lawyer = getLawyerById(id);

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-slate-100">
        <Navbar />
        <div className="mx-auto max-w-5xl px-6 py-20 text-center md:px-10">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Lawyer not found</h1>
          <p className="mt-3 text-slate-600">This profile is unavailable right now.</p>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            Back to Home <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7ff_0%,#eef2fb_45%,#f8f9fc_100%)]">
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl"></div>
        <div className="absolute right-0 top-6 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div data-reveal className="mx-auto max-w-7xl px-6 pb-14 pt-10 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.65fr_0.85fr]">
            <section data-reveal className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_20px_50px_rgba(37,99,235,0.12)] backdrop-blur">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <img
                  src={lawyer.image}
                  alt={lawyer.name}
                  className="h-32 w-32 rounded-3xl border-4 border-white object-cover shadow-xl"
                />

                <div className="flex-1">
                  <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
                    VERIFIED LAWYER
                  </div>
                  <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">{lawyer.name}</h1>
                  <p className="mt-1 text-lg font-medium text-slate-600">
                    {lawyer.specialization} . {lawyer.location}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700">
                      <Stars /> {lawyer.rating}
                    </div>
                    <div className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                      {lawyer.reviews} reviews
                    </div>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                      {lawyer.casesWon} cases won
                    </div>
                    {lawyer.proBono && (
                      <div className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
                        Pro Bono Available
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {lawyer.highlights.map((highlight) => (
                  <div key={highlight.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className="text-xs font-semibold tracking-[0.12em] text-slate-500">{highlight.label}</p>
                    <p className="mt-1 text-2xl font-black text-slate-900">{highlight.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <aside data-reveal className="rounded-3xl border border-blue-100 bg-gradient-to-br from-[#0f2a66] via-[#1d4ed8] to-[#3b82f6] p-6 text-white shadow-[0_24px_55px_rgba(29,78,216,0.34)]">
              <p className="text-xs font-semibold tracking-[0.12em] text-blue-100">BOOK A CONSULTATION</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Start In Minutes</h2>
              <p className="mt-3 text-blue-100">
                Share your case details and get a direct response from {lawyer.name.split(" ")[0]}.
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                  <span>Consultation Fee</span>
                  <strong>{lawyer.consultationFee}</strong>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                  <span>Hourly Rate</span>
                  <strong>{lawyer.hourlyRate}</strong>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                  <span>Typical Response</span>
                  <strong>{lawyer.responseTime}</strong>
                </div>
              </div>

              <button className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">
                Book Consultation
              </button>
              <button className="mt-3 w-full rounded-xl border border-white/40 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Send Message
              </button>
            </aside>
          </div>

          <div data-reveal className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <section data-reveal className="rounded-3xl border border-white/80 bg-white p-7 shadow-[0_16px_45px_rgba(15,23,42,0.09)]">
              <h3 className="text-2xl font-black tracking-tight text-slate-900">About</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{lawyer.bio}</p>

              <h4 className="mt-7 text-lg font-bold text-slate-900">Practice Areas</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {lawyer.practiceAreas.map((area) => (
                  <span key={area} className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                    {area}
                  </span>
                ))}
              </div>

              <h4 className="mt-7 text-lg font-bold text-slate-900">Career Highlights</h4>
              <div className="mt-4 space-y-3">
                {lawyer.achievements.map((achievement, index) => (
                  <div key={achievement} className="flex gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600"></div>
                    <p className="text-slate-700">
                      <span className="font-semibold text-slate-900">#{index + 1}</span> {achievement}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section data-reveal className="rounded-3xl border border-white/80 bg-white p-7 shadow-[0_16px_45px_rgba(15,23,42,0.09)]">
              <h3 className="text-2xl font-black tracking-tight text-slate-900">Client Reviews</h3>
              <p className="mt-2 text-sm text-slate-500">Verified feedback from recent matters.</p>

              <div className="mt-5 space-y-4">
                {lawyer.reviewsList.map((item) => (
                  <article key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                        <Stars /> {item.rating}
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <section data-reveal className="mt-8 rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-slate-500">LANGUAGES & AVAILABILITY</p>
                <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-900">Ready for Your Case</h3>
                <p className="mt-2 text-slate-600">
                  Communicates in {lawyer.languages.join(", ")} and handles both urgent and scheduled consults.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {lawyer.languages.map((language) => (
                  <span key={language} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
