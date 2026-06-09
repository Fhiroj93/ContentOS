const NAV = [
  { id: "queue",       label: "Content Queue",    icon: "☰",  desc: "Drafts & scheduled" },
  { id: "publish",     label: "Publish Now",       icon: "✦",  desc: "Draft & post live" },
  { id: "ideas",       label: "Idea Briefing",     icon: "◈",  desc: "Today's AI ideas" },
  { id: "competitors", label: "Competitor Feed",   icon: "◎",  desc: "Niche intel" },
  { id: "analytics",   label: "Analytics",         icon: "⬡",  desc: "Performance data" },
];

export default function Sidebar({ activePage, setActivePage, theme, setTheme }) {
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
      boxShadow: "var(--shadow)",
    }}>
      {/* Logo */}
      <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34,
            background: "var(--accent-grad)",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, color: "#fff", fontWeight: 800,
            boxShadow: "var(--shadow-glow)",
          }}>C</div>
          <div>
            <div style={{
              fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px",
              background: "var(--accent-grad)",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            }}>ContentOS</div>
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
                padding: "10px 12px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                background: active ? "var(--accent-dim)" : "transparent",
                color: active ? "var(--accent)" : "var(--text2)",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                transition: "all 0.15s",
                outline: "none",
                position: "relative",
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "var(--surface2)"; e.currentTarget.style.color = "var(--text)"; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text2)"; } }}
            >
              {active && (
                <span style={{
                  position: "absolute", left: 0, top: 8, bottom: 8, width: 3,
                  background: "var(--accent-grad)", borderRadius: 3,
                }} />
              )}
              <span style={{ fontSize: 15, width: 18, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: active ? 700 : 500, lineHeight: 1.2 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: active ? "var(--accent)" : "var(--text3)", marginTop: 1 }}>{item.desc}</div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Theme toggle */}
      <div style={{ padding: "12px 14px 0" }}>
        <div className="theme-toggle">
          <button
            className={theme === "light" ? "active" : ""}
            onClick={() => setTheme?.("light")}
            aria-label="Light theme"
          >
            ☀ Light
          </button>
          <button
            className={theme === "dark" ? "active" : ""}
            onClick={() => setTheme?.("dark")}
            aria-label="Dark theme"
          >
            ☾ Dark
          </button>
        </div>
      </div>


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
