const NAV = [
  { id: "queue",       label: "Content Queue",    icon: "☰",  desc: "Drafts & scheduled" },
  { id: "publish",     label: "Publish Now",       icon: "✦",  desc: "Draft & post live" },
  { id: "ideas",       label: "Idea Briefing",     icon: "◈",  desc: "Today's AI ideas" },
  { id: "competitors", label: "Competitor Feed",   icon: "◎",  desc: "Niche intel" },
  { id: "analytics",   label: "Analytics",         icon: "⬡",  desc: "Performance data" },
];

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside style={{
      width: "var(--sidebar-w)",
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      height: "100vh",
      overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 28, height: 28,
            background: "var(--accent)",
            borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, color: "#fff", fontWeight: 700,
          }}>C</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>ContentOS</div>
            <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 1 }}>Powered by n8n + AI</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map(item => {
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                background: active ? "var(--accent-dim)" : "transparent",
                color: active ? "var(--accent)" : "var(--text2)",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                transition: "all 0.12s",
                outline: "none",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--surface2)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text2)"; } }}
            >
              <span style={{ fontSize: 15, width: 18, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: active ? 600 : 400, lineHeight: 1.2 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: active ? "var(--accent)" : "var(--text3)", marginTop: 1 }}>{item.desc}</div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "14px 16px", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "var(--surface3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 600, color: "var(--text2)",
          }}>S</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text)" }}>SaaS Client</div>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>Connected ● Live</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
