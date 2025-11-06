/**
 * Performance Optimization Utilities
 * 
 * Utilities included:
 * - Image lazy loading
 * - Debouncing
 * - Throttling
 * - Memoization
 * - Performance monitoring
 * - DOM batching
 * - Dynamic imports
 * - Network and motion detection
 */

/** ====================== Debounce ====================== */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/** ====================== Throttle ====================== */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number = 300
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function throttled(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/** ====================== Memoize ====================== */
export function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;

    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/** ====================== Lazy Load Images ====================== */
export function lazyLoadImages(selector: string = 'img[loading="lazy"]'): void {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;

          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }

          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll(selector).forEach((img) => observer.observe(img));
  }
}

/** ====================== Preload / Prefetch ====================== */
export function preloadResource(
  href: string,
  as: 'script' | 'style' | 'font' | 'image' = 'script'
): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (as === 'font') link.setAttribute('crossorigin', 'anonymous');
  document.head.appendChild(link);
}

export function prefetchResource(href: string): void {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/** ====================== Performance Monitor ====================== */
export class PerformanceMonitor {
  private marks = new Map<string, number>();

  mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  measure(name: string): number {
    const startTime = this.marks.get(name);
    if (startTime === undefined) {
      console.warn(`No mark found for "${name}"`);
      return 0;
    }
    const duration = performance.now() - startTime;
    this.marks.delete(name);
    return duration;
  }

  log(name: string): void {
    const duration = this.measure(name);
    console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`);
  }

  getNavigationTiming(): PerformanceNavigationTiming | null {
    const entries = performance.getEntriesByType('navigation');
    return entries.length > 0 ? (entries[0] as PerformanceNavigationTiming) : null;
  }

  getCoreWebVitals(): {
    FCP: number | null;
    LCP: number | null;
    CLS: number | null;
    FID: number | null;
  } {
    return {
      FCP: this.getFirstContentfulPaint(),
      LCP: this.getLargestContentfulPaint(),
      CLS: this.getCumulativeLayoutShift(),
      FID: this.getFirstInputDelay(),
    };
  }

  private getFirstContentfulPaint(): number | null {
    const entries = performance.getEntriesByName('first-contentful-paint');
    return entries.length > 0 ? entries[0].startTime : null;
  }

  private getLargestContentfulPaint(): number | null {
    const entries = performance.getEntriesByType('largest-contentful-paint');
    return entries.length > 0 ? entries[entries.length - 1].startTime : null;
  }

  private getCumulativeLayoutShift(): number | null {
    const entries = performance.getEntriesByType('layout-shift') as any[];
    let cls = 0;
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) cls += entry.value;
    });
    return cls;
  }

  private getFirstInputDelay(): number | null {
    const entries = performance.getEntriesByType('first-input') as any[];
    return entries.length > 0 ? entries[0].processingStart - entries[0].startTime : null;
  }

  logAllMetrics(): void {
    const navigation = this.getNavigationTiming();
    if (navigation) {
      console.group('📊 Performance Metrics');
      console.log(
        `DNS Lookup: ${(navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(2)}ms`
      );
      console.log(
        `TCP Connection: ${(navigation.connectEnd - navigation.connectStart).toFixed(2)}ms`
      );
      console.log(
        `Request Time: ${(navigation.responseStart - navigation.requestStart).toFixed(2)}ms`
      );
      console.log(
        `Response Time: ${(navigation.responseEnd - navigation.responseStart).toFixed(2)}ms`
      );
      const domTime =
        (navigation.domContentLoadedEventEnd ?? 0) -
        (navigation.domContentLoadedEventStart ?? 0);
      console.log(`DOM Processing: ${domTime.toFixed(2)}ms`);
      const loadTime =
        (navigation.loadEventEnd ?? 0) - (navigation.loadEventStart ?? 0);
      console.log(`Load Complete: ${loadTime.toFixed(2)}ms`);
      console.groupEnd();
    }

    const vitals = this.getCoreWebVitals();
    console.group('🎯 Core Web Vitals');
    console.log(`FCP: ${vitals.FCP?.toFixed(2) ?? 'N/A'}ms`);
    console.log(`LCP: ${vitals.LCP?.toFixed(2) ?? 'N/A'}ms`);
    console.log(`CLS: ${vitals.CLS?.toFixed(4) ?? 'N/A'}`);
    console.log(`FID: ${vitals.FID?.toFixed(2) ?? 'N/A'}ms`);
    console.groupEnd();
  }
}

/** ====================== Dynamic Import ====================== */
export async function dynamicImport<T>(
  importFunc: () => Promise<{ default: T }>
): Promise<T> {
  try {
    const module = await importFunc();
    return module.default;
  } catch (error) {
    console.error('Dynamic import failed:', error);
    throw error;
  }
}

/** ====================== Network / Motion Detection ====================== */
export function isSlowConnection(): boolean {
  const connection = (navigator as any).connection;
  return connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** ====================== Request Idle Callback ====================== */
export function requestIdleCallback(
  callback: () => void,
  options?: { timeout?: number }
): number {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  return setTimeout(callback, 1) as unknown as number;
}

export function cancelIdleCallback(id: number): void {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

/** ====================== DOM Batcher ====================== */
export class DOMBatcher {
  private readQueue: Array<() => void> = [];
  private writeQueue: Array<() => void> = [];
  private scheduled = false;

  read(callback: () => void): void {
    this.readQueue.push(callback);
    this.schedule();
  }

  write(callback: () => void): void {
    this.writeQueue.push(callback);
    this.schedule();
  }

  private schedule(): void {
    if (this.scheduled) return;
    this.scheduled = true;
    requestAnimationFrame(() => this.flush());
  }

  private flush(): void {
    const reads = this.readQueue.splice(0);
    reads.forEach((r) => r());
    const writes = this.writeQueue.splice(0);
    writes.forEach((w) => w());
    this.scheduled = false;
  }
}

/** ====================== Global Instances ====================== */
export const performanceMonitor = new PerformanceMonitor();
export const domBatcher = new DOMBatcher();

/** ====================== Initialize Performance ====================== */
export function initializePerformance(): void {
  lazyLoadImages();

  const isDevelopment =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1');

  if (isDevelopment) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        performanceMonitor.logAllMetrics();
      }, 0);
    });
  }

  console.info('⚡ Performance optimizations initialized');
}
export default {
  debounce,
  throttle,
  memoize,
  lazyLoadImages,
  preloadResource,
  prefetchResource,
  PerformanceMonitor,
  performanceMonitor,
  DOMBatcher,
  domBatcher,
  dynamicImport,
  isSlowConnection,
  prefersReducedMotion,
  requestIdleCallback,
  cancelIdleCallback,
  initializePerformance,
};