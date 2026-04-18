import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const clientJourney = [
  {
    step: "01",
    title: "Post Your Case in Minutes",
    desc: "Describe your legal issue, location, urgency, and budget. We structure the brief so lawyers can respond quickly and clearly."
  },
  {
    step: "02",
    title: "Get Matched with Verified Lawyers",
    desc: "LawyeredUp surfaces relevant lawyers by specialization, availability, pricing model, and client-fit signals."
  },
  {
    step: "03",
    title: "Compare Proposals with Confidence",
    desc: "Review transparent quotes, timelines, and experience before choosing. No hidden messaging or surprise pricing."
  },
  {
    step: "04",
    title: "Collaborate and Track Progress",
    desc: "Use your dashboard for messages, documents, payment milestones, and hearing updates in one workspace."
  }
];

const lawyerJourney = [
  {
    step: "01",
    title: "Create a High-Trust Profile",
    desc: "Set your core practice areas, years of experience, city coverage, pricing model, and availability windows."
  },
  {
    step: "02",
    title: "Receive Qualified Leads",
    desc: "Get client requests aligned to your specialization. Prioritized matching reduces low-intent or irrelevant outreach."
  },
  {
    step: "03",
    title: "Send Structured Proposals",
    desc: "Respond with scope, quote, timeline, and recommended plan. Clients can compare your offer side-by-side."
  },
  {
    step: "04",
    title: "Manage Cases End-to-End",
    desc: "Track case pipelines, chat with clients, collect payments, and maintain documentation from a single dashboard."
  }
];

const platformValues = [
  {
    title: "Verified Network",
    detail: "Lawyers are listed with specialization-focused profiles and reputation signals."
  },
  {
    title: "Transparent Economics",
    detail: "Clients see pricing intent early. Lawyers avoid mismatched expectations."
  },
  {
    title: "Unified Workspace",
    detail: "Messages, case status, payments, and documents stay in one product surface."
  },
  {
    title: "Built for Speed",
    detail: "From first post to first response, the flow is optimized for low friction."
  }
];

function JourneyCard({ item, tone }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-[0.1em] ${
          tone === "client" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
        }`}
      >
        STEP {item.step}
      </div>
      <h4 className="mt-3 text-2xl font-black tracking-tight text-slate-900">{item.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#f3f6fb]">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2a66] via-[#1e40af] to-[#3b82f6] px-6 pb-20 pt-16 text-white md:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(255,255,255,0.18),transparent_38%)]"></div>
        <div className="relative mx-auto max-w-6xl">
          <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.11em]">
            HOW LAWYEREDUP WORKS
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight md:text-6xl">
            One platform. Two journeys. Zero confusion.
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-white/85">
            Whether you are a client looking for legal support or a lawyer growing your practice, LawyeredUp gives you a
            structured path from discovery to resolution.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#for-clients" className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50">
              Explore Client Flow
            </a>
            <a href="#for-lawyers" className="rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20">
              Explore Lawyer Flow
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-10 grid max-w-6xl grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-20">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.11em] text-blue-600">Client Outcome</p>
          <p className="mt-2 text-2xl font-black text-slate-900">Find the right lawyer faster, with clear pricing and progress visibility.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.11em] text-amber-700">Lawyer Outcome</p>
          <p className="mt-2 text-2xl font-black text-slate-900">Get qualified leads, respond with confidence, and run cases in one control center.</p>
        </div>
      </section>

      <section id="for-clients" className="mx-auto mt-14 max-w-6xl px-6 md:px-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-700">For Clients</p>
            <h2 className="mt-1 text-4xl font-black tracking-tight text-slate-900">How Clients Win on LawyeredUp</h2>
          </div>
          <Link to="/signup" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            Start as Client
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {clientJourney.map((item) => (
            <JourneyCard key={item.step} item={item} tone="client" />
          ))}
        </div>
      </section>

      <section id="for-lawyers" className="mx-auto mt-16 max-w-6xl px-6 md:px-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-amber-700">For Lawyers</p>
            <h2 className="mt-1 text-4xl font-black tracking-tight text-slate-900">How Lawyers Scale with Control</h2>
          </div>
          <Link to="/signup" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            Join as Lawyer
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {lawyerJourney.map((item) => (
            <JourneyCard key={item.step} item={item} tone="lawyer" />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-6 pb-20 md:px-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Platform Standards</p>
          <h3 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Everything a new user needs to trust the process</h3>
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {platformValues.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <p className="text-lg font-black text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/signup" className="rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-5 py-3 text-sm font-bold text-white">
              Create Your Account
            </Link>
            <Link to="/login" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700">
              Log In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
