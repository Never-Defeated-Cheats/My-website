/**
 * Performance & Memory Debug Monitor
 * Tracks real-time FPS, frame drops, and JS Heap memory usage during development.
 * Automatically disabled in production builds.
 */

interface PerfMetrics {
  fps: number;
  avgFps: number;
  minFps: number;
  droppedFrames: number;
  memoryMB: number | null;
  heapLimitMB: number | null;
}

export function initPerformanceMonitor(): () => void {
  // Only execute in development mode
  const isProd =
    (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') ||
    Boolean((import.meta as unknown as { env?: { PROD?: boolean } }).env?.PROD);

  if (isProd) {
    return () => {};
  }

  let isRunning = true;
  let frameCount = 0;
  let lastTime = performance.now();
  let lastLogTime = performance.now();
  let fpsHistory: number[] = [];
  let droppedFrames = 0;

  const getMemoryUsage = (): { usedMB: number | null; limitMB: number | null } => {
    // performance.memory is supported in Chromium-based browsers
    const perfWithMem = performance as Performance & {
      memory?: {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
      };
    };

    if (perfWithMem.memory) {
      return {
        usedMB: Math.round(perfWithMem.memory.usedJSHeapSize / (1024 * 1024)),
        limitMB: Math.round(perfWithMem.memory.jsHeapSizeLimit / (1024 * 1024)),
      };
    }
    return { usedMB: null, limitMB: null };
  };

  const getMetrics = (): PerfMetrics => {
    const mem = getMemoryUsage();
    const currentFps = fpsHistory.length > 0 ? fpsHistory[fpsHistory.length - 1] : 60;
    const avg = fpsHistory.length > 0 ? Math.round(fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length) : 60;
    const min = fpsHistory.length > 0 ? Math.min(...fpsHistory) : 60;

    return {
      fps: currentFps,
      avgFps: avg,
      minFps: min,
      droppedFrames,
      memoryMB: mem.usedMB,
      heapLimitMB: mem.limitMB,
    };
  };

  // Expose global debug object in dev tools
  (window as unknown as { __PERF_METRICS__?: () => PerfMetrics }).__PERF_METRICS__ = getMetrics;

  let animId: number;

  const measureLoop = (now: number) => {
    if (!isRunning) return;

    frameCount++;
    const delta = now - lastTime;

    // Detect frame drop (frame taking > 33.3ms = 2 standard frames)
    if (delta > 33.3) {
      droppedFrames++;
    }

    if (delta >= 1000) {
      const currentFps = Math.round((frameCount * 1000) / delta);
      fpsHistory.push(currentFps);
      if (fpsHistory.length > 30) fpsHistory.shift();

      frameCount = 0;
      lastTime = now;

      // Log warning if FPS drops significantly
      if (currentFps < 40) {
        console.warn(
          `⚠️ [PerfMonitor] Low Frame Rate Detected: ${currentFps} FPS | Dropped: ${droppedFrames}`
        );
      }
    }

    // Periodic summary log every 6 seconds in console
    if (now - lastLogTime >= 6000) {
      const metrics = getMetrics();
      const memInfo = metrics.memoryMB !== null ? `${metrics.memoryMB} MB` : 'N/A';
      
      console.log(
        `%c⚡ [Dev PerfMonitor] %c${metrics.fps} FPS (avg: ${metrics.avgFps}, min: ${metrics.minFps}) | %cMemory: ${memInfo} | Dropped Frames: ${metrics.droppedFrames}`,
        'color: #537568; font-weight: bold;',
        metrics.fps >= 50 ? 'color: #10b981; font-weight: bold;' : 'color: #f59e0b; font-weight: bold;',
        'color: #3b82f6;'
      );
      lastLogTime = now;
    }

    animId = requestAnimationFrame(measureLoop);
  };

  animId = requestAnimationFrame(measureLoop);

  return () => {
    isRunning = false;
    cancelAnimationFrame(animId);
    delete (window as unknown as { __PERF_METRICS__?: () => PerfMetrics }).__PERF_METRICS__;
  };
}
