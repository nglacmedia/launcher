// ✧ Infinity Community Launcher - Config ✧
// Edit all links, IPs, and settings here

export const CONFIG = {
  // App info
  appName: "Infinity Community",
  version: "1.0.0",

  // GitHub repo for update checks (owner/repo)
  githubRepo: "nglacmedia/launcher",

  // YouTube background music (video ID)
  youtubeVideoId: "DUhuOYsHjLs",

  // Social links
  links: {
    website: "https://discord.gg/MP4JFF4YcC",
    facebook: "https://discord.gg/MP4JFF4YcC",
    youtube: "https://discord.gg/MP4JFF4YcC",
    tiktok: "https://discord.gg/MP4JFF4YcC",
    discord: "https://discord.gg/MP4JFF4YcC",
    discordWidgetId: "123456789012345678", // Discord server ID for widget
  },

  // Game servers
  games: [
    {
      id: "gtav",
      name: "GTA V",
      description: "FiveM Roleplay",
      serverIp: "dangcapnhat",
      bannerColor: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      emoji: "🚗",
      connectUrl: "dangcapnhat",
      statusUrl: "dangcapnhat",
    },
    {
      id: "samp",
      name: "SA-MP",
      description: "San Andreas Multiplayer",
      serverIp: "dangcapnhat",
      bannerColor: "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
      emoji: "🏖️",
      connectUrl: "dangcapnhat",
      statusUrl: "",
    },
    {
      id: "minecraft",
      name: "Minecraft",
      description: "Survival & Creative",
      serverIp: "dangcapnhat",
      bannerColor: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
      emoji: "⛏️",
      connectUrl: "",
      statusUrl: "",
    },
  ],

  // Default settings
  defaults: {
    musicEnabled: true,
    volume: 50,
    autoUpdate: true,
  },
};
