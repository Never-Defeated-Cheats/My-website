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
        currentHost.includes('firebaseapp.com');

      if (!isAllowedHost) {
        // Attempt frame-busting breakout on unauthorized domains
        try {
          if (window.top && window.top.location) {
            window.top.location.href = window.self.location.href;
          }
        } catch {
          // Cross-origin restriction: display warning
          if (onSecurityAlert) {
            onSecurityAlert('⚠️ Unauthorized iframe embedding detected. Frame protection active.', 'warning');
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
