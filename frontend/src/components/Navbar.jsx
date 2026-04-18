import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navItemClass = ({ isActive }) =>
    [
      "relative rounded-lg px-3 py-2 text-[15px] font-medium tracking-[0.01em] transition duration-200",
      isActive
        ? "text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-white"
        : "text-white/85 hover:text-white",
    ].join(" ");

  return (
    <header className="border-b border-white/15 bg-gradient-to-r from-[#1d3d8f] via-[#2f64c6] to-[#3f7ee6] text-white">
      <div className="mx-auto flex w-full max-w-[1500px] flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-12 xl:px-20">
        <Link to="/" className="inline-flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/10">
            <img src="/logo-mark.svg" alt="LawyeredUp logo" className="h-7 w-7 rounded-md" />
          </span>
          <span className="text-[31px] font-bold leading-[1.2] tracking-tight text-white md:text-[33px]">
            LawyeredUp
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          <NavLink to="/" className={navItemClass}>Find a Lawyer</NavLink>
          <Link
            to="/how-it-works#for-lawyers"
            className="rounded-lg px-3 py-2 text-[15px] font-medium tracking-[0.01em] text-white/85 transition duration-200 hover:text-white"
          >
            For Lawyers
          </Link>
          <NavLink to="/how-it-works" className={navItemClass}>How it Works</NavLink>
          <NavLink to="/login" className={navItemClass}>Log In</NavLink>
        </nav>

        <Link to="/signup" className="rounded-xl bg-[#ffd32a] px-6 py-2.5 text-[17px] font-semibold leading-none text-slate-900 transition duration-200 hover:bg-[#ffdf5e]">
          Sign Up
        </Link>
      </div>
    </header>
  );
}
