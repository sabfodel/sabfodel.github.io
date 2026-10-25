/**
 * Sinematik ana sayfanın ortak hareket altyapısı.
 * Lenis yumuşak kaydırma + GSAP ScrollTrigger. Her bileşen buradan içe aktarır;
 * Astro modülü tek kez paketler, initMotion() da birden fazla çağrılsa bir kez çalışır.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
// iOS/Android adres çubuğu açılıp kapanınca yükseklik değişir; bunun için
// tüm tetikleyicileri yeniden hesaplamak kaydırmada sıçramaya yol açıyor.
ScrollTrigger.config({ ignoreMobileResize: true });

export const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isSmall = () => innerWidth < 760;

let lenis: Lenis | null = null;

export function initMotion() {
  if (lenis || reduceMotion) return lenis;
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  // Geliştirmede tarayıcıdan test edebilmek için
  if (import.meta.env.DEV) (window as unknown as { __lenis: Lenis }).__lenis = lenis;
  // #bağlantılar Lenis üzerinden kaysın
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href')!);
      if (!target) return;
      e.preventDefault();
      lenis!.scrollTo(target as HTMLElement, { offset: 0 });
    })
  );
  return lenis;
}

export const getLenis = () => lenis;

/** Öğe ekrandayken `on`, değilken `off` çağırır — kanvas döngülerini durdurmak için */
export function onVisible(el: Element, on: () => void, off: () => void, margin = '120px') {
  new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? on() : off()),
    { rootMargin: margin }
  ).observe(el);
}

/** requestAnimationFrame döngüsü; yalnızca görünürken çalışır */
export function loop(el: Element, frame: (t: number, dt: number) => void) {
  let raf = 0;
  let last = 0;
  const tick = (t: number) => {
    const dt = Math.min(64, last ? t - last : 16);
    last = t;
    frame(t, dt);
    raf = requestAnimationFrame(tick);
  };
  onVisible(
    el,
    () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    },
    () => {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  );
}

/** HiDPI kanvas; boyut değişince yeniden ayarlar ve `onResize(w, h)` çağırır */
export function fitCanvas(
  canvas: HTMLCanvasElement,
  onResize: (w: number, h: number, dpr: number) => void
) {
  const ctx = canvas.getContext('2d')!;
  let lastW = 0, lastH = 0;
  const apply = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    // Mobil adres çubuğunun yarattığı küçük yükseklik değişimlerini yok say:
    // kanvası her seferinde silip yeniden çizmek iOS'ta takılmaya yol açıyor.
    if (w === lastW && lastH && Math.abs(h - lastH) / lastH < 0.2) return;
    lastW = w;
    lastH = h;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    onResize(w, h, dpr);
  };
  new ResizeObserver(apply).observe(canvas);
  return ctx;
}

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export { gsap, ScrollTrigger };
