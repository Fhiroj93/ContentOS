import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ContentQueue from "./pages/ContentQueue";
import IdeaBriefing from "./pages/IdeaBriefing";
import CompetitorFeed from "./pages/CompetitorFeed";
import Analytics from "./pages/Analytics";
import PublishNow from "./pages/PublishNow";

export default function App() {
  const [activePage, setActivePage] = useState("queue");
  const [navOpen, setNavOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("contentos-theme") || "dark";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    try { window.localStorage.setItem("contentos-theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  const pages = {
    queue: <ContentQueue />,
    ideas: <IdeaBriefing />,
    competitors: <CompetitorFeed />,
    analytics: <Analytics />,
    publish: <PublishNow />,
  };

  const go = (id) => { setActivePage(id); setNavOpen(false); };

  return (
    <div className="app-shell">
      {/* Mobile top bar */}
      <header className="mobile-bar">
        <button
          className="hamburger"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
          onClick={() => setNavOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
        <img src="/ContentOsLogo.png" alt="ContentOS" className="mobile-logo" />
        <div className="theme-toggle theme-toggle-mini">
          <button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")} aria-label="Light theme">☀</button>
          <button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")} aria-label="Dark theme">☾</button>
        </div>
      </header>

      {navOpen && <div className="nav-overlay" onClick={() => setNavOpen(false)} />}

      <Sidebar
        activePage={activePage}
        setActivePage={go}
        theme={theme}
        setTheme={setTheme}
        open={navOpen}
      />
      <main className="main-content">{pages[activePage]}</main>
    </div>
  );
}
