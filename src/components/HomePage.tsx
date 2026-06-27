import { invoke } from "@tauri-apps/api/tauri";
import { CONFIG } from "../config";
import { GameCard } from "./GameCard";

export function HomePage() {
  const open = (url: string) => {
    invoke("open_url", { url }).catch(() => window.open(url, "_blank"));
  };

  const socials = [
    { label: "Website", icon: "🌐", url: CONFIG.links.website },
    { label: "Facebook", icon: "📘", url: CONFIG.links.facebook },
    { label: "YouTube", icon: "▶️", url: CONFIG.links.youtube },
    { label: "TikTok", icon: "🎵", url: CONFIG.links.tiktok },
  ];

  return (
    <div className="page">
      {/* Hero */}
      <div className="hero">
        <div className="hero-logo">✧∞✧</div>
        <div className="hero-text">
          <h1>Infinity Community</h1>
          <p>Cộng đồng game Việt Nam – Nơi mọi cuộc phiêu lưu bắt đầu</p>
        </div>
        <div className="hero-badge">✨ v{CONFIG.version}</div>
      </div>

      {/* Games */}
      <div className="section-header">
        <span className="section-title">🎮 Máy chủ game</span>
        <div className="section-line" />
      </div>
      <div className="games-grid">
        {CONFIG.games.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>

      {/* Discord */}
      <div className="section-header">
        <span className="section-title">💬 Discord</span>
        <div className="section-line" />
      </div>
      <div className="discord-section">
        <div className="discord-header">
          <div className="discord-title">
            <span>🟣</span>
            <span>Tham gia cộng đồng Discord</span>
          </div>
          <button
            className="discord-invite-btn"
            onClick={() => open(CONFIG.links.discord)}
          >
            <span>💬</span>
            Tham gia Discord
          </button>
        </div>
        {CONFIG.links.discordWidgetId ? (
          <iframe
            className="discord-widget-iframe"
            src={`https://discord.com/widget?id=${CONFIG.links.discordWidgetId}&theme=dark`}
            height="200"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            title="Discord Widget"
          />
        ) : (
          <div className="discord-widget-placeholder">
            Widget Discord đang được cấu hình. Nhấn nút bên trên để tham gia!
          </div>
        )}
      </div>

      {/* Social links */}
      <div className="section-header">
        <span className="section-title">🔗 Kết nối</span>
        <div className="section-line" />
      </div>
      <div className="social-row">
        {socials.map((s) => (
          <button key={s.label} className="social-btn" onClick={() => open(s.url)}>
            <span className="icon">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
