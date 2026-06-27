import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";

interface Game {
  id: string;
  name: string;
  description: string;
  serverIp: string;
  bannerColor: string;
  emoji: string;
  connectUrl: string;
  statusUrl: string;
}

type Status = "online" | "offline" | "checking";

export function GameCard({ game }: { game: Game }) {
  const [status, setStatus] = useState<Status>("checking");
  const [players, setPlayers] = useState<string | null>(null);

  useEffect(() => {
    if (!game.statusUrl) {
      setStatus("offline");
      return;
    }

    const check = async () => {
      try {
        const res = await fetch(game.statusUrl, { signal: AbortSignal.timeout(5000) });
        if (res.ok) {
          const data = await res.json();
          if (game.id === "minecraft" && data.online) {
            setStatus("online");
            setPlayers(`${data.players?.online ?? 0}/${data.players?.max ?? 0}`);
          } else if (game.id === "gtav" && data.Data) {
            setStatus("online");
            const p = data.Data?.clients ?? 0;
            const max = data.Data?.sv_maxclients ?? 32;
            setPlayers(`${p}/${max}`);
          } else {
            setStatus("offline");
          }
        } else {
          setStatus("offline");
        }
      } catch {
        setStatus("offline");
      }
    };

    check();
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, [game]);

  const handlePlay = () => {
    if (game.connectUrl) {
      invoke("open_url", { url: game.connectUrl }).catch(() => {
        window.open(game.connectUrl, "_blank");
      });
    }
  };

  return (
    <div className="game-card">
      <div className="game-banner" style={{ background: game.bannerColor }}>
        <span className="game-banner-emoji">{game.emoji}</span>
      </div>
      <div className="game-info">
        <div className="game-name">{game.name}</div>
        <div className="game-desc">{game.description}</div>
        <div className="game-ip">
          <span className="game-ip-label">IP</span>
          <span className="game-ip-value">{game.serverIp}</span>
        </div>
        <div className="game-status-row">
          <div className="game-status">
            <div className={`status-dot ${status}`} />
            <span style={{ color: status === "online" ? "#22c55e" : status === "checking" ? "#f59e0b" : "#ef4444", fontSize: 12 }}>
              {status === "online" ? "Trực tuyến" : status === "checking" ? "Đang kiểm tra..." : "Ngoại tuyến"}
            </span>
          </div>
          {players && status === "online" && (
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
              👥 {players}
            </span>
          )}
        </div>
        <button className="play-btn" onClick={handlePlay}>
          🎮 Chơi ngay
        </button>
      </div>
    </div>
  );
}
