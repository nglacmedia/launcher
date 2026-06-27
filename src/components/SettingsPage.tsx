import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import { CONFIG } from "../config";

interface Props {
  musicEnabled: boolean;
  volume: number;
  onMusicChange: (v: boolean) => void;
  onVolumeChange: (v: number) => void;
}

type UpdateState =
  | { phase: "idle" }
  | { phase: "checking" }
  | { phase: "uptodate" }
  | { phase: "available"; version: string; url: string }
  | { phase: "downloading"; progress: number }
  | { phase: "done" }
  | { phase: "error"; msg: string };

export function SettingsPage({ musicEnabled, volume, onMusicChange, onVolumeChange }: Props) {
  const [update, setUpdate] = useState<UpdateState>({ phase: "idle" });

  const checkUpdate = async () => {
    setUpdate({ phase: "checking" });
    try {
      const data = await invoke<any>("check_update", { repo: CONFIG.githubRepo });
      const latest: string = data.tag_name?.replace(/^v/, "") ?? "";
      const current = CONFIG.version;
      if (latest && latest !== current) {
        // find .exe asset
        const assets: any[] = data.assets ?? [];
        const asset = assets.find(
          (a: any) =>
            typeof a.name === "string" &&
            a.name.toLowerCase().endsWith(".exe")
        );
        setUpdate({
          phase: "available",
          version: latest,
          url: asset?.browser_download_url ?? "",
        });
      } else {
        setUpdate({ phase: "uptodate" });
      }
    } catch (e: any) {
      setUpdate({ phase: "error", msg: String(e) });
    }
  };

  const downloadUpdate = async (url: string) => {
    if (!url) {
      setUpdate({ phase: "error", msg: "Không tìm thấy file cập nhật." });
      return;
    }
    setUpdate({ phase: "downloading", progress: 0 });

    const unlisten = await listen<number>("download-progress", (e) => {
      setUpdate({ phase: "downloading", progress: e.payload });
    });

    try {
      // Save to temp location
      const tempDest = "C:\\Users\\Public\\InfinityLauncher_update.exe";
      await invoke("download_update", { url, dest: tempDest });
      setUpdate({ phase: "done" });
      // Optionally relaunch or notify
    } catch (e: any) {
      setUpdate({ phase: "error", msg: String(e) });
    } finally {
      unlisten();
    }
  };

  const renderUpdateSection = () => {
    switch (update.phase) {
      case "idle":
        return (
          <button className="update-btn" onClick={checkUpdate}>
            🔄 Kiểm tra cập nhật
          </button>
        );
      case "checking":
        return (
          <button className="update-btn" disabled>
            ⏳ Đang kiểm tra...
          </button>
        );
      case "uptodate":
        return (
          <>
            <button className="update-btn" onClick={checkUpdate}>
              ✅ Đang dùng phiên bản mới nhất
            </button>
            <div className="update-status">Phiên bản {CONFIG.version} – Không có bản cập nhật mới.</div>
          </>
        );
      case "available":
        return (
          <>
            <button
              className="update-btn"
              onClick={() => downloadUpdate(update.url)}
              style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.3), rgba(59,91,219,0.3))", borderColor: "rgba(34,197,94,0.5)" }}
            >
              ⬇️ Tải bản {update.version} ngay
            </button>
            <div className="update-status">Phiên bản hiện tại: {CONFIG.version} → Mới: {update.version}</div>
          </>
        );
      case "downloading":
        return (
          <>
            <button className="update-btn" disabled>
              ⬇️ Đang tải... {Math.round(update.progress)}%
            </button>
            <div className="progress-bar-wrap">
              <div className="progress-bar-fill" style={{ width: `${update.progress}%` }} />
            </div>
            <div className="update-status">Đang tải bản cập nhật...</div>
          </>
        );
      case "done":
        return (
          <>
            <button className="update-btn" style={{ borderColor: "rgba(34,197,94,0.5)" }}>
              ✅ Tải xong! Khởi động lại để áp dụng.
            </button>
            <div className="update-status">File đã lưu tại: C:\Users\Public\InfinityLauncher_update.exe</div>
          </>
        );
      case "error":
        return (
          <>
            <button className="update-btn" onClick={checkUpdate} style={{ borderColor: "rgba(239,68,68,0.5)" }}>
              ❌ Lỗi – Thử lại
            </button>
            <div className="update-status" style={{ color: "#ef4444" }}>{update.msg}</div>
          </>
        );
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="hero" style={{ marginBottom: 20 }}>
        <div className="hero-logo">⚙️</div>
        <div className="hero-text">
          <h1>Cài đặt</h1>
          <p>Tùy chỉnh trải nghiệm của bạn</p>
        </div>
        <div className="version-chip">v{CONFIG.version}</div>
      </div>

      {/* Music settings */}
      <div className="settings-card">
        <div className="settings-card-title">🎵 Âm nhạc</div>
        <div className="settings-row">
          <div>
            <div className="settings-label">Nhạc nền</div>
            <div className="settings-desc">Bật/tắt nhạc nền YouTube</div>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={musicEnabled}
              onChange={(e) => onMusicChange(e.target.checked)}
            />
            <div className="toggle-track" />
            <div className="toggle-thumb" />
          </label>
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-label">Âm lượng</div>
            <div className="settings-desc">Điều chỉnh âm lượng nhạc ({volume}%)</div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="volume-slider"
            style={{ width: 120 }}
          />
        </div>
      </div>

      {/* Update */}
      <div className="settings-card">
        <div className="settings-card-title">🔄 Cập nhật</div>
        <div style={{ marginBottom: 12 }}>
          <div className="settings-label" style={{ marginBottom: 4 }}>Kiểm tra cập nhật</div>
          <div className="settings-desc">
            Launcher sẽ kiểm tra phiên bản mới từ GitHub Releases.
            Phiên bản hiện tại: <strong style={{ color: "rgba(167,139,250,1)" }}>v{CONFIG.version}</strong>
          </div>
        </div>
        {renderUpdateSection()}
      </div>

      {/* About */}
      <div className="settings-card">
        <div className="settings-card-title">ℹ️ Thông tin</div>
        <div className="settings-row">
          <div className="settings-label">Ứng dụng</div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Infinity Community Launcher</span>
        </div>
        <div className="settings-row">
          <div className="settings-label">Phiên bản</div>
          <span style={{ fontSize: 13, color: "rgba(167,139,250,0.9)" }}>v{CONFIG.version}</span>
        </div>
        <div className="settings-row">
          <div className="settings-label">Nền tảng</div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Tauri + React + TypeScript</span>
        </div>
        <div className="settings-row">
          <div className="settings-label">GitHub</div>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{CONFIG.githubRepo}</span>
        </div>
      </div>
    </div>
  );
}
