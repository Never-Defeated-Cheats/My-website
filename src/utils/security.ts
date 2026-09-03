// Security & Protection Utility Module

export interface SecurityStatus {
  isFramed: boolean;
  rightClickDisabled: boolean;
  shortcutsGuarded: boolean;
}

export function initSecurityMeasures(
  onSecurityAlert?: (msg: string, type?: 'warning' | 'info') => void
): () => void {
  // 1. Frame-Busting & Anti-Embedding Protection
  try {
    const isFramed = window.self !== window.top;
    if (isFramed) {
      // Check if embedding parent domain is trusted (AI Studio dev/preview or local dev)
      const currentHost = window.location.hostname;
      const isAllowedHost =
        currentHost === 'localhost' ||
        currentHost === '127.0.0.1' ||
        currentHost.includes('run.app') ||
        currentHost.includes('googleusercontent.com') ||
        currentHost.includes('web.app') ||
        currentHost.includes('firebaseapp.com') ||
        currentHost.includes('creavibestudios');

      if (!isAllowedHost) {
        // Attempt immediate frame-busting breakout on unauthorized domains
        try {
          if (window.top && window.top.location) {
            window.top.location.href = window.self.location.href;
          }
        } catch {
          // Cross-origin restriction: block document body content to protect from clickjacking
          document.body.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#f6f5f0;color:#242b27;font-family:sans-serif;text-align:center;padding:24px;">
              <h2 style="font-size:24px;font-weight:bold;margin-bottom:12px;">🔒 Embedding Restricted</h2>
              <p style="color:#4c5750;max-width:500px;margin-bottom:24px;line-height:1.6;">For security and copyright integrity, Creative Vibe cannot be embedded in third-party iframes.</p>
              <a href="${window.location.href}" target="_blank" rel="noopener noreferrer" style="background:#537568;color:#ffffff;padding:12px 24px;border-radius:9999px;text-decoration:none;font-weight:bold;">Open Creative Vibe in New Window</a>
            </div>
          `;
          if (onSecurityAlert) {
            onSecurityAlert('⚠️ Unauthorized iframe embedding blocked.', 'warning');
          }
        }
      }
    }
  } catch {
    // Cross-origin iframe frame check caught
  }

  // 2. Right-Click Context Menu Guard
  const handleContextMenu = (e: MouseEvent) => {
    // Check if right-clicking on an input or textarea (allow users to paste into booking inputs)
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return; // Allow pasting/typing in forms
    }

    e.preventDefault();
    if (onSecurityAlert) {
      onSecurityAlert('🔒 Content & Source Protected: Right-click is restricted on Creative Vibe.', 'info');
    }
  };

  // 3. DevTools / View Source Keyboard Shortcuts Guard
  const handleKeyDown = (e: KeyboardEvent) => {
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;
    const key = e.key.toUpperCase();

    // Check prohibited shortcuts:
    // F12 -> DevTools
    // Ctrl+U -> View Source
    // Ctrl+Shift+I -> DevTools Inspect
    // Ctrl+Shift+J -> DevTools Console
    // Ctrl+Shift+C -> Inspect Element
    // Ctrl+S -> Save Page
    const isF12 = e.key === 'F12';
    const isViewSource = isCtrlOrCmd && key === 'U';
    const isInspect = isCtrlOrCmd && e.shiftKey && (key === 'I' || key === 'J' || key === 'C');
    const isSavePage = isCtrlOrCmd && key === 'S';

    if (isF12 || isViewSource || isInspect || isSavePage) {
      e.preventDefault();
      e.stopPropagation();
      if (onSecurityAlert) {
        onSecurityAlert(`🔒 Shortcut (${isF12 ? 'F12' : `Ctrl+${e.shiftKey ? 'Shift+' : ''}${key}`}) restricted. Source code & assets are protected.`, 'warning');
      }
      return false;
    }
  };

  // 4. Console Security Notice
  try {
    console.clear();
    console.log(
      "%c🎬 CREATIVE VIBE STUDIOS — SOURCE & ASSET INTEGRITY ACTIVE",
      "color: #537568; font-size: 16px; font-weight: bold; background: #eeece4; padding: 6px 12px; border-radius: 6px;"
    );
    console.log(
      "%c⚠️ All portfolio videos, client assets, and proprietary shaders are copyrighted. Client-side inspection is restricted.",
      "color: #748078; font-size: 12px; font-weight: 500;"
    );
  } catch {
    // Ignore console restriction
  }

  // Attach event listeners
  window.addEventListener('contextmenu', handleContextMenu, { capture: true });
  window.addEventListener('keydown', handleKeyDown, { capture: true });

  // Cleanup handler
  return () => {
    window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
    window.removeEventListener('keydown', handleKeyDown, { capture: true });
  };
}
