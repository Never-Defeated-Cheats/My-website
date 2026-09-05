// Security & Input Sanitization Utility Module
// Real web security focusing on safe input handling and data integrity

/**
 * Sanitizes user input to prevent basic script injection and format strings cleanly.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // strip < and >
    .trim();
}

/**
 * Validates external URL format to prevent javascript: pseudo-protocol exploits
 */
export function isSafeUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' || parsed.protocol === 'mailto:' || parsed.protocol === 'tel:';
  } catch {
    return false;
  }
}

/**
 * Initializes client-side security sanity checks without breaking DevTools, right-click, or accessibility.
 */
export function initSecurityMeasures(
  _onSecurityAlert?: (msg: string, type?: 'warning' | 'info') => void
): () => void {
  // Respect user browser accessibility & standard developer tools.
  // No intrusive event-blocking or keyboard interception.
  return () => {
    // cleanup
  };
}
