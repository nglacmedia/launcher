import { useState, useEffect } from "react";
import { Background } from "./components/Background";
import { TitleBar } from "./components/TitleBar";
import { HomePage } from "./components/HomePage";
import { SettingsPage } from "./components/SettingsPage";
import { MusicPlayer } from "./components/MusicPlayer";
import { CONFIG } from "./config";

type Page = "home" | "settings";

const STORAGE_KEY = "infinity_settings";

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return CONFIG.defaults;
}

function saveSettings(s: typeof CONFIG.defaults) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => saveSettings(settings), [settings]);

  const navItems: { id: Page; icon: string; label: string }[] = [
    { id: "home", icon: "🏠", label: "Trang chủ" },
    { id: "settings", icon: "⚙️", label: "Cài đặt" },
  ];

  return (
    <div className="app-shell">
      <Background />
      <TitleBar />
      <div className="layout">
        <nav className="sidebar">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-btn tooltip-wrap ${page === item.id ? "active" : ""}`}
              onClick={() => setPage(item.id)}
              data-tip={item.label}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span className="nav-label">{item.label.split(" ")[0]}</span>
            </button>
          ))}
          <div className="nav-divider" />
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "0 4px", lineHeight: 1.4 }}>
            v{CONFIG.version}
          </div>
        </nav>
        <main className="main-content">
          {page === "home" && <HomePage />}
          {page === "settings" && (
            <SettingsPage
              musicEnabled={settings.musicEnabled}
              volume={settings.volume}
              onMusicChange={(v) => setSettings((s: typeof CONFIG.defaults) => ({ ...s, musicEnabled: v }))}
              onVolumeChange={(v) => setSettings((s: typeof CONFIG.defaults) => ({ ...s, volume: v }))}
            />
          )}
        </main>
      </div>
      <MusicPlayer
        enabled={settings.musicEnabled}
        volume={settings.volume}
        onEnabledChange={(v) => setSettings((s: typeof CONFIG.defaults) => ({ ...s, musicEnabled: v }))}
        onVolumeChange={(v) => setSettings((s: typeof CONFIG.defaults) => ({ ...s, volume: v }))}
      />
    </div>
  );
}