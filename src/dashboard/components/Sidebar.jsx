import logoAsset from "@/assets/contentos-logo.png.asset.json";

const NAV = [
  { id: "queue",       label: "Content Queue",  icon: "▦", desc: "Drafts & scheduled" },
  { id: "publish",     label: "Publish Now",    icon: "◆", desc: "Draft & post live" },
  { id: "ideas",       label: "Idea Briefing",  icon: "✳", desc: "Today's AI ideas" },
  { id: "competitors", label: "Competitor Feed",icon: "◎", desc: "Niche intel" },
  { id: "analytics",   label: "Analytics",      icon: "▲", desc: "Performance data" },
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
    }}>
      {/* Logo */}
      <div style={{ padding: "22px 18px 20px" }}>
        <img
          src={logoAsset.url}
          alt="ContentOS"
          style={{ width: "100%", maxWidth: 190, height: "auto", display: "block" }}
        />
      </div>


      {/* Nav */}
      <nav style={{ flex: 1, padding: "4px 12px", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" }}>
        {NAV.map(item => {
          const active = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "11px 14px",
                borderRadius: 999,
                border: "1px solid",
                borderColor: active ? "var(--accent-border)" : "transparent",
                background: active ? "var(--accent-grad)" : "transparent",
                color: active ? "#fff" : "var(--text2)",
                boxShadow: active ? "var(--shadow-glow)" : "none",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                transition: "all 0.18s ease",
                outline: "none",
                fontFamily: "var(--font)",
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "var(--surface2)"; e.currentTarget.style.color = "var(--text)"; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text2)"; } }}
            >
              <span style={{ fontSize: 14, width: 18, textAlign: "center", flexShrink: 0, opacity: active ? 1 : 0.8 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: active ? 600 : 500, lineHeight: 1.25 }}>{item.label}</div>
                <div style={{
                  fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase",
                  color: active ? "#ffffffcc" : "var(--text3)", marginTop: 2,
                }}>{item.desc}</div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Theme toggle */}
      <div style={{ padding: "12px 16px 0" }}>
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
      <div style={{ padding: "14px 16px 18px", marginTop: 12, borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "var(--surface3)",
            border: "1px solid var(--border2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "var(--text2)", fontFamily: "var(--mono)",
          }}>S</div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)" }}>SaaS Client</div>
            <div style={{
              fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase",
              color: "var(--green)",
            }}>● Connected · Live</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
