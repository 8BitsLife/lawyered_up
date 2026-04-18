import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

function bootMotionSystem() {
  if (typeof window === "undefined") return () => {};

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return () => {};

  let observer;
  const seen = new WeakSet();

  const registerReveals = () => {
    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el, index) => {
      if (seen.has(el)) return;
      seen.add(el);
      el.classList.add("reveal-ready");
      el.style.setProperty("--reveal-delay", `${Math.min(index * 45, 320)}ms`);
      observer.observe(el);
    });
  };

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  registerReveals();

  const mutationObserver = new MutationObserver(() => {
    registerReveals();
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });

  return () => {
    mutationObserver.disconnect();
    observer.disconnect();
  };
}

bootMotionSystem();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
