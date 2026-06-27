# ✧ Infinity Community Launcher ✧

A lightweight Windows launcher built with **Tauri + React + TypeScript**.

## 📦 Project Structure

```
infinity-launcher/
├── src/                         # React frontend
│   ├── components/
│   │   ├── Background.tsx       # Stars & clouds animation
│   │   ├── TitleBar.tsx         # Custom window chrome
│   │   ├── GameCard.tsx         # Game server card
│   │   ├── HomePage.tsx         # Main page
│   │   ├── SettingsPage.tsx     # Settings + updater
│   │   └── MusicPlayer.tsx      # YouTube music player
│   ├── App.tsx                  # Root component
│   ├── config.ts                # ← Edit ALL settings here
│   ├── main.tsx
│   └── styles.css
├── src-tauri/                   # Rust backend
│   ├── src/main.rs
│   ├── Cargo.toml
│   ├── build.rs
│   └── tauri.conf.json
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## ⚙️ Configuration

Edit **`src/config.ts`** to change:

- Server IPs for GTA V, SA-MP, Minecraft
- YouTube video ID for background music
- Social links (website, Facebook, YouTube, TikTok, Discord)
- GitHub repo for update checks
- App version

## 🛠️ Build Requirements

- [Node.js](https://nodejs.org/) 18+
- [Rust](https://rustup.rs/) (stable)
- [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites)

### Windows prerequisites:
```
winget install Microsoft.VisualStudio.2022.BuildTools
```

## 🚀 Development

```bash
npm install
npm run tauri dev
```

## 📦 Build for Windows (.exe)

```bash
npm install
npm run tauri build
```

Output: `src-tauri/target/release/bundle/msi/` or `nsis/`

The `.exe` installer will be in `src-tauri/target/release/bundle/`.

## 🔄 Update System

1. Set `githubRepo` in `config.ts` to your `owner/repo`
2. Create a GitHub Release tagged `v1.0.1` (or higher)
3. Attach your new `InfinityLauncher_*.exe` as a release asset
4. Users click **Kiểm tra cập nhật** in Settings

## 🎨 Customization

- Colors: Edit CSS variables in `src/styles.css` (`:root` block)
- Logo: Replace the `✧∞✧` emoji in `HomePage.tsx` with an `<img>` tag
- Fonts: Change Google Fonts in `index.html`
