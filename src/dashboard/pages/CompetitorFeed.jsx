import { useState } from "react";
import { competitorData } from "../data/mockData";

export default function CompetitorFeed() {
  const [sortBy, setSortBy] = useState("engagement");
  const [filterComp, setFilterComp] = useState("all");

  const competitors = [...new Set(competitorData.map(p => p.competitor))];

  const sorted = [...competitorData]
    .filter(p => filterComp === "all" || p.competitor === filterComp)
    .sort((a, b) => {
      if (sortBy === "engagement") return b.engagement - a.engagement;
      if (sortBy === "likes") return b.likes - a.likes;
      return 0;
    });

  const maxEng = Math.max(...competitorData.map(p => p.engagement));

  function EngBar({ val }) {
    const pct = (val / maxEng) * 100;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          flex: 1,
          height: 5,
          background: "var(--surface3)",
          borderRadius: 3,
          overflow: "hidden",
          maxWidth: 80,
        }}>
          <div style={{
            height: "100%",
            borderRadius: 3,
            width: `${pct}%`,
            background: val >= 7 ? "var(--green)" : val >= 5 ? "var(--amber)" : "var(--text3)",
          }} />
        </div>
        <span style={{
          fontSize: 13,
          fontWeight: 600,
          color: val >= 7 ? "var(--green)" : val >= 5 ? "var(--amber)" : "var(--text2)",
        }}>{val}%</span>
      </div>
    );
  }

  // Gap alert — a topic nobody has covered
  const gapTopic = "AI in customer success for SaaS";

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Competitor Feed</div>
        <div className="page-sub">
          Last 7 days · Scraped via Apify · Updated daily at 6 AM alongside idea briefing
        </div>
      </div>

      {/* Gap alert */}
      <div style={{
        background: "var(--amber-dim)",
        border: "1px solid #fbbf2430",
        borderRadius: "var(--radius)",
        padding: "14px 18px",
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16 }}>◎</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--amber)", marginBottom: 2 }}>
              Gap identified by AI
            </div>
            <div style={{ fontSize: 12, color: "var(--text2)" }}>
              No competitor has covered <strong style={{ color: "var(--text)" }}>"{gapTopic}"</strong> — high search intent, zero saturation this week.
            </div>
          </div>
        </div>
        <span style={{
          fontSize: 11,
          background: "var(--amber-dim)",
          color: "var(--amber)",
          border: "1px solid #fbbf2430",
          padding: "4px 10px",
          borderRadius: 20,
          fontWeight: 600,
          whiteSpace: "nowrap",
          marginLeft: 16,
        }}>Recommended next post</span>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, marginBottom: 18, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["all", ...competitors].map(c => (
            <button
              key={c}
              onClick={() => setFilterComp(c)}
              style={{
                padding: "5px 13px",
                borderRadius: 20,
                border: `1px solid ${filterComp === c ? "var(--accent)" : "var(--border2)"}`,
                background: filterComp === c ? "var(--accent-dim)" : "transparent",
                color: filterComp === c ? "var(--accent)" : "var(--text2)",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "var(--font)",
              }}
            >
              {c === "all" ? "All competitors" : c}
            </button>
          ))}
        </div>
        <select
          className="field"
          style={{ width: 160, padding: "5px 12px" }}
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="engagement">Sort: Engagement</option>
          <option value="likes">Sort: Likes</option>
        </select>
      </div>

      {/* Posts */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: 20 }}>Post</th>
              <th>Platform</th>
              <th>Competitor</th>
              <th>Posted</th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Engagement</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(post => (
              <tr key={post.id}>
                <td style={{ paddingLeft: 20, maxWidth: 300 }}>
                  <div style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.4, marginBottom: 4 }}>
                    {post.post}
                  </div>
                  <span style={{
                    fontSize: 10,
                    padding: "2px 7px",
                    borderRadius: 10,
                    background: "var(--surface3)",
                    color: "var(--text3)",
                    fontWeight: 500,
                  }}>{post.topic_tag}</span>
                </td>
                <td>
                  <span style={{
                    fontSize: 12,
                    color: "var(--text2)",
                    background: "var(--surface2)",
                    padding: "3px 8px",
                    borderRadius: 5,
                  }}>{post.platform}</span>
                </td>
                <td style={{ fontSize: 13, fontWeight: 500 }}>{post.competitor}</td>
                <td style={{ fontSize: 12, color: "var(--text3)" }}>{post.posted}</td>
                <td style={{ fontSize: 13, fontFamily: "var(--mono)" }}>
                  {post.likes > 0 ? post.likes.toLocaleString() : "—"}
                </td>
                <td style={{ fontSize: 13, fontFamily: "var(--mono)" }}>
                  {post.comments > 0 ? post.comments : "—"}
                </td>
                <td><EngBar val={post.engagement} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 14, fontSize: 12, color: "var(--text3)" }}>
        Data pulled via Apify scrapers configured in n8n · No manual tracking needed
      </div>
    </div>
  );
}
