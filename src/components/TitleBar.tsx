import { appWindow } from "@tauri-apps/api/window";

export function TitleBar() {
  const handleClose = () => appWindow.close();
  const handleMinimize = () => appWindow.minimize();
  const handleMaximize = () => appWindow.toggleMaximize();

  return (
    <div className="titlebar" data-tauri-drag-region>
      <div className="titlebar-logo">
        <span className="infinity">✧</span>
        <span>Infinity Community Launcher</span>
        <span className="infinity">✧</span>
      </div>
      <div className="titlebar-controls">
        <button className="titlebar-btn minimize" onClick={handleMinimize} title="Thu nhỏ" />
        <button className="titlebar-btn maximize" onClick={handleMaximize} title="Phóng to" />
        <button className="titlebar-btn close" onClick={handleClose} title="Đóng" />
      </div>
    </div>
  );
}