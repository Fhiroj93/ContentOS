import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ContentQueue from "./pages/ContentQueue";
import IdeaBriefing from "./pages/IdeaBriefing";
import CompetitorFeed from "./pages/CompetitorFeed";
import Analytics from "./pages/Analytics";
import PublishNow from "./pages/PublishNow";

export default function App() {
  const [activePage, setActivePage] = useState("queue");
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("contentos-theme") || "dark";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    try { window.localStorage.setItem("contentos-theme", theme); } catch {}
  }, [theme]);

  const pages = {
    queue: <ContentQueue />,
    ideas: <IdeaBriefing />,
    competitors: <CompetitorFeed />,
    analytics: <Analytics />,
    publish: <PublishNow />,
  };

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        theme={theme}
        setTheme={setTheme}
      />
      <main className="main-content">{pages[activePage]}</main>
    </div>
  );
}
