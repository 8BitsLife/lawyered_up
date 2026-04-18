import React from "react";
import { Link } from "react-router-dom";

export default function LawyerCard({ lawyer }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/80 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
      <div className="relative">
        <img
          src={lawyer.image}
          alt={lawyer.name}
          className="h-52 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {lawyer.specialization}
        </div>
      </div>

      <div className="mt-4 px-1">
        <h3 className="text-xl font-black tracking-tight text-slate-900">{lawyer.name}</h3>
        <p className="mt-1 text-sm font-medium text-slate-500">{lawyer.location}</p>

        <div className="my-4 h-px bg-slate-200"></div>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <span aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            {lawyer.rating}
          </div>
          <p className="text-xs font-medium text-slate-500">{lawyer.reviews} reviews</p>
        </div>

        <div className="mt-4 space-y-2 text-sm text-slate-600">
          {lawyer.proBono && (
            <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 font-medium text-blue-700">
              <span aria-hidden="true">&#10003;</span> Pro Bono Available
            </div>
          )}

          {lawyer.casesWon && (
            <p className="font-medium">
              <span className="text-slate-900">{lawyer.casesWon}</span> cases won
            </p>
          )}

          {lawyer.experience && (
            <p className="font-medium">
              <span className="text-slate-900">{lawyer.experience}+ years</span> experience
            </p>
          )}
        </div>

        <Link to={`/lawyer/${lawyer.id}`} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-blue-500 hover:text-blue-700">
          View Profile <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
