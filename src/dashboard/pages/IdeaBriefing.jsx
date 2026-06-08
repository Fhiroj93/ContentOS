import { useState } from "react";
import { ideasData } from "../data/mockData";

const SCORE_STYLE = {
  high:   { bg: "var(--green-dim)",  color: "var(--green)",  label: "↑ High potential" },
  medium: { bg: "var(--amber-dim)",  color: "var(--amber)",  label: "→ Medium potential" },
};

const SIGNAL_STYLE = {
  "Competitor gap":    { bg: "var(--red-dim)",    color: "var(--red)" },
  "Your top post":     { bg: "var(--blue-dim)",   color: "var(--blue)" },
  "Audience question": { bg: "var(--accent-dim)", color: "var(--accent)" },
  "SEO gap":           { bg: "var(--amber-dim)",  color: "var(--amber)" },
  "Niche trend":       { bg: "var(--green-dim)",  color: "var(--green)" },
};

const PLATFORM_BADGE = {
  linkedin: "badge badge-linkedin",
  twitter:  "badge badge-twitter",
  blog:     "badge badge-blog",
};

export default function IdeaBriefing() {
  const [ideas, setIdeas] = useState(ideasData);
  const [drafting, setDrafting] = useState(null);
  const [drafted, setDrafted] = useState([]);

  function triggerDraft(id) {
    setDrafting(id);
    setTimeout(() => {
      setDrafting(null);
      setDrafted(prev => [...prev, id]);
    }, 1600);
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Idea Briefing</div>
        <div className="page-sub">
          Generated daily at 6 AM · Sources: competitor posts, trending topics, your audience's comments, SEO gaps
        </div>
      </div>

      {/* Today's date banner */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "12px 20px",
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "var(--green)",
            display: "inline-block",
            boxShadow: "0 0 0 3px var(--green-dim)",
          }} />
          <span style={{ fontSize: 13, color: "var(--text)" }}>
            Today's briefing is ready
          </span>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>
            · {ideas.length} ideas · Fetched from Apify + Claude analysis
          </span>
        </div>
        <span style={{ fontSize: 12, color: "var(--text3)" }}>
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" })}
        </span>
      </div>

      {/* Ideas list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {ideas.map(idea => {
          const score = SCORE_STYLE[idea.score];
          const signal = SIGNAL_STYLE[idea.signal] || { bg: "var(--surface3)", color: "var(--text2)" };
          const isDrafted = drafted.includes(idea.id);
          const isDrafting = drafting === idea.id;

          return (
            <div
              key={idea.id}
              className="card"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                opacity: isDrafted ? 0.6 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {/* Left: Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span className={PLATFORM_BADGE[idea.platform]}>
                    {idea.platform === "linkedin" ? "in" : idea.platform === "twitter" ? "𝕏" : "✍"} {idea.platform_label}
                  </span>
                  <span className="badge" style={{ background: signal.bg, color: signal.color }}>
                    {idea.signal}
                  </span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 6, lineHeight: 1.4 }}>
                  {idea.topic}
                </div>
                <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>
                  {idea.why}
                </div>
              </div>

              {/* Right: Score + action */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 }}>
                <span className="badge" style={{ background: score.bg, color: score.color }}>
                  {score.label}
                </span>
                <span style={{ fontSize: 11, color: "var(--text3)" }}>
                  Search vol: {idea.search_volume}
                </span>
                {isDrafted ? (
                  <span style={{ fontSize: 12, color: "var(--green)" }}>✓ Draft added to queue</span>
                ) : isDrafting ? (
                  <span style={{ fontSize: 12, color: "var(--text2)" }}>◌ Drafting…</span>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => triggerDraft(idea.id)}
                  >
                    Draft this →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20, fontSize: 12, color: "var(--text3)" }}>
        Clicking "Draft this" triggers the n8n drafting workflow → draft appears in Content Queue for review
      </div>
    </div>
  );
}
