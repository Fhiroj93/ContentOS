import { analyticsData } from "../data/mockData";

export default function Analytics() {
  const { stats, topPosts, weeklyBars, weekDays, bestDay, bestTime, platformBreakdown } = analyticsData;

  const maxBar = Math.max(...weeklyBars);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Analytics</div>
        <div className="page-sub">
          Pulled from LinkedIn API + X/Twitter API via n8n · Last updated: today at 7 AM
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {Object.entries(stats).map(([key, s]) => (
          <div key={key} className="stat-card">
            <div className="stat-label">
              { key === "impressions" ? "Total impressions"
              : key === "engagement" ? "Avg. engagement rate"
              : key === "followers"   ? "New followers"
              :                         "Link clicks" }
            </div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-delta ${s.dir === "up" ? "delta-up" : "delta-neu"}`}>
              {s.dir === "up" ? "↑" : ""} {s.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Two-column */}
      <div className="grid-2 grid-2-wide" style={{ marginBottom: 16 }}>

        {/* Top posts */}
        <div className="card">
          <div className="card-label">Top posts this week</div>
          {topPosts.map((post, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
                paddingBottom: i < topPosts.length - 1 ? 14 : 0,
                marginBottom: i < topPosts.length - 1 ? 14 : 0,
                borderBottom: i < topPosts.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", lineHeight: 1.4, marginBottom: 4 }}>
                  {post.title}
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>
                  {post.platform} · {post.date}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--green)" }}>{post.engagement}</div>
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{post.impressions} imp.</div>
              </div>
            </div>
          ))}
        </div>

        {/* Best timing */}
        <div className="card">
          <div className="card-label">Engagement by day</div>
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 6,
            height: 80,
            marginBottom: 8,
          }}>
            {weeklyBars.map((val, i) => {
              const pct = (val / maxBar) * 100;
              const isBest = val === maxBar;
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{
                    width: "100%",
                    height: `${pct}%`,
                    borderRadius: "4px 4px 0 0",
                    background: isBest ? "var(--accent)" : "var(--surface3)",
                    transition: "height 0.3s",
                  }} />
                  <span style={{ fontSize: 10, color: isBest ? "var(--accent)" : "var(--text3)" }}>
                    {weekDays[i]}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{
            fontSize: 12,
            color: "var(--text2)",
            paddingTop: 12,
            borderTop: "1px solid var(--border)",
          }}>
            <span style={{ color: "var(--text)" }}>Best day:</span> {bestDay}
            <span style={{ marginLeft: 12, color: "var(--text)" }}>Best time:</span> {bestTime}
          </div>
          <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 6 }}>
            n8n auto-schedules new posts to these windows
          </div>
        </div>
      </div>

      {/* Platform breakdown */}
      <div className="card">
        <div className="card-label">Platform breakdown — last 30 days</div>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: 0 }}>Platform</th>
              <th>Posts published</th>
              <th>Avg. engagement rate</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {platformBreakdown.map((row, i) => (
              <tr key={i}>
                <td style={{ paddingLeft: 0, fontWeight: 500 }}>{row.name}</td>
                <td style={{ fontFamily: "var(--mono)" }}>{row.posts}</td>
                <td>
                  <span style={{ fontWeight: 600, color: "var(--green)", fontFamily: "var(--mono)" }}>
                    {row.avgEng}
                  </span>
                </td>
                <td>
                  <span style={{
                    fontSize: 11,
                    padding: "3px 9px",
                    borderRadius: 20,
                    background: "var(--green-dim)",
                    color: "var(--green)",
                  }}>↑ Growing</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 14, fontSize: 12, color: "var(--text3)" }}>
        Data pulled via LinkedIn Analytics API and X/Twitter API · stored in Google Sheets · visualised here
      </div>
    </div>
  );
}
