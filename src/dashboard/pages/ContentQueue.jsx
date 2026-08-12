import { useState } from "react";
import { queueData } from "../data/mockData";

const STATUS_LABELS = {
  draft: "Draft",
  approved: "Approved",
  scheduled: "Scheduled",
  published: "Published",
};

const BADGE_CLASS = {
  draft: "badge badge-draft",
  approved: "badge badge-approved",
  scheduled: "badge badge-scheduled",
  published: "badge badge-published",
};

const PLATFORM_BADGE = {
  linkedin: "badge badge-linkedin",
  twitter: "badge badge-twitter",
  blog: "badge badge-blog",
};

function StatusDot({ status }) {
  const colors = {
    draft: "#5a5a6a",
    approved: "#60a5fa",
    scheduled: "#7c6af7",
    published: "#34d399",
  };
  return (
    <span style={{
      width: 7, height: 7, borderRadius: "50%",
      background: colors[status] || "#5a5a6a",
      display: "inline-block",
      marginRight: 5,
    }} />
  );
}

export default function ContentQueue() {
  const [posts, setPosts] = useState(queueData);
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all");

  const counts = {
    all: posts.length,
    draft: posts.filter(p => p.status === "draft").length,
    approved: posts.filter(p => p.status === "approved").length,
    scheduled: posts.filter(p => p.status === "scheduled").length,
    published: posts.filter(p => p.status === "published").length,
  };

  const filtered = filter === "all" ? posts : posts.filter(p => p.status === filter);

  function approve(id) {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: "approved" } : p));
  }

  function schedule(id) {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: "scheduled", scheduled_time: "Tomorrow, 9:00 AM" } : p));
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Content Queue</div>
        <div className="page-sub">All posts synced from Google Sheets · Approve drafts to trigger scheduling via n8n</div>
      </div>

      {/* Filter tabs */}
      <div className="chip-row" style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {["all", "draft", "approved", "scheduled", "published"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: `1px solid ${filter === f ? "var(--accent)" : "var(--border2)"}`,
              background: filter === f ? "var(--accent-dim)" : "transparent",
              color: filter === f ? "var(--accent)" : "var(--text2)",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font)",
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span style={{
              marginLeft: 6,
              background: "var(--surface3)",
              color: "var(--text3)",
              fontSize: 10,
              padding: "1px 6px",
              borderRadius: 10,
            }}>{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: 20 }}>Post</th>
              <th>Platform</th>
              <th>Status</th>
              <th>Scheduled / Published</th>
              <th>Engagement</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(post => (
              <>
                <tr
                  key={post.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                >
                  <td style={{ paddingLeft: 20, maxWidth: 280 }}>
                    <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text)", lineHeight: 1.4, marginBottom: 3 }}>
                      {post.topic}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{post.source}</div>
                  </td>
                  <td>
                    <span className={PLATFORM_BADGE[post.platform]}>
                      {post.platform === "linkedin" ? "in" : post.platform === "twitter" ? "𝕏" : "✍"} {post.platform_label}
                    </span>
                  </td>
                  <td>
                    <span className={BADGE_CLASS[post.status]}>
                      <StatusDot status={post.status} />{STATUS_LABELS[post.status]}
                    </span>
                  </td>
                  <td style={{ color: "var(--text2)", fontSize: 12 }}>{post.scheduled_time}</td>
                  <td>
                    {post.status === "published" ? (
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--green)" }}>{post.engagement}%</div>
                        <div style={{ fontSize: 11, color: "var(--text3)" }}>{post.impressions?.toLocaleString()} impressions</div>
                      </div>
                    ) : (
                      <span style={{ color: "var(--text3)", fontSize: 12 }}>—</span>
                    )}
                  </td>
                  <td style={{ paddingRight: 20 }}>
                    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      {post.status === "draft" && (
                        <button className="btn btn-approve btn-sm" onClick={e => { e.stopPropagation(); approve(post.id); }}>
                          ✓ Approve
                        </button>
                      )}
                      {post.status === "approved" && (
                        <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); schedule(post.id); }}>
                          Schedule
                        </button>
                      )}
                      {post.status === "scheduled" && (
                        <span style={{ fontSize: 12, color: "var(--accent)" }}>⧗ Queued</span>
                      )}
                      {post.status === "published" && (
                        <span style={{ fontSize: 12, color: "var(--green)" }}>✓ Live</span>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedId === post.id && post.draft && (
                  <tr key={`${post.id}-exp`}>
                    <td colSpan={6} style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 16, borderTop: "none" }}>
                      <div style={{
                        background: "var(--surface2)",
                        border: "1px solid var(--border2)",
                        borderRadius: "var(--radius-sm)",
                        padding: "14px 16px",
                        fontSize: 13,
                        color: "var(--text2)",
                        lineHeight: 1.7,
                        whiteSpace: "pre-wrap",
                      }}>
                        {post.draft}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 14, fontSize: 12, color: "var(--text3)" }}>
        Click any row to preview the draft · Approve triggers n8n → UploadPost API → platform publish
      </div>
    </div>
  );
}
