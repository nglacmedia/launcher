import { useState, useEffect, useRef, useCallback } from "react";
import { CONFIG } from "../config";

interface Props {
  enabled: boolean;
  volume: number;
  onEnabledChange: (v: boolean) => void;
  onVolumeChange: (v: number) => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
    _ytPlayer: any;
  }
}

export function MusicPlayer({ enabled, volume, onEnabledChange, onVolumeChange }: Props) {
  const playerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [title, setTitle] = useState("Đang tải nhạc...");

  const initPlayer = useCallback(() => {
    if (playerRef.current) return;
    playerRef.current = new window.YT.Player("yt-player", {
      height: "1",
      width: "1",
      videoId: CONFIG.youtubeVideoId,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: CONFIG.youtubeVideoId,
        controls: 0,
        disablekb: 1,
        mute: 0,
      },
      events: {
        onReady: (e: any) => {
          setReady(true);
          e.target.setVolume(volume);
          if (enabled) e.target.playVideo();
          else e.target.pauseVideo();
          const info = e.target.getVideoData();
          if (info?.title) setTitle(info.title);
        },
        onStateChange: (e: any) => {
          const info = e.target.getVideoData();
          if (info?.title) setTitle(info.title);
        },
      },
    });
    window._ytPlayer = playerRef.current;
  }, [enabled, volume]);

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }
    window.onYouTubeIframeAPIReady = initPlayer;
    if (!document.getElementById("yt-api-script")) {
      const tag = document.createElement("script");
      tag.id = "yt-api-script";
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  }, [initPlayer]);

  useEffect(() => {
    if (!ready || !playerRef.current) return;
    if (enabled) playerRef.current.playVideo?.();
    else playerRef.current.pauseVideo?.();
  }, [enabled, ready]);

  useEffect(() => {
    if (!ready || !playerRef.current) return;
    playerRef.current.setVolume?.(volume);
  }, [volume, ready]);

  return (
    <>
      <div id="yt-player" className="yt-hidden" />
      <div className="music-player">
        <span className={`music-player-icon ${!enabled ? "paused" : ""}`}>
          {enabled ? "🎵" : "🎵"}
        </span>
        <span className="music-title">{enabled ? title : "Nhạc đã tắt"}</span>
        <button
          className="music-control-btn"
          onClick={() => onEnabledChange(!enabled)}
          title={enabled ? "Tắt nhạc" : "Bật nhạc"}
        >
          {enabled ? "⏸" : "▶"}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="volume-slider"
          title={`Âm lượng: ${volume}%`}
        />
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", minWidth: 26, textAlign: "right" }}>
          {volume}%
        </span>
      </div>
    </>
  );
}
