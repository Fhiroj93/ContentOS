import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ContentQueue from "./pages/ContentQueue";
import IdeaBriefing from "./pages/IdeaBriefing";
import CompetitorFeed from "./pages/CompetitorFeed";
import Analytics from "./pages/Analytics";
import PublishNow from "./pages/PublishNow";


export default function App() {
  const [activePage, setActivePage] = useState("queue");

  const pages = {
    queue: <ContentQueue />,
    ideas: <IdeaBriefing />,
    competitors: <CompetitorFeed />,
    analytics: <Analytics />,
    publish: <PublishNow />,
  };

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">{pages[activePage]}</main>
    </div>
  );
}
