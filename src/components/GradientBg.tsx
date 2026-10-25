/**
 * Site-wide arka plan: ruucm/shadergradient ile koyu, yavaş akan 3B gradyan.
 * Sabit konumlu tek bir WebGL tuvali; yalnızca gradyanın görünebildiği bir bölüm
 * ([data-sg]) ekrandayken ve sekme açıkken canlandırılır.
 */
import { useEffect, useState } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export default function GradientBg() {
  const [animate, setAnimate] = useState<'on' | 'off'>('off');
  const [small, setSmall] = useState(false);
  // Kâğıt zeminli bölümlerdeyken (html.sg-light) açık palet
  const [light, setLight] = useState(false);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setSmall(innerWidth < 760);
    const visible = new Set<Element>();
    const sync = () => setAnimate(!reduce && !document.hidden && visible.size > 0 ? 'on' : 'off');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      sync();
    });
    document.querySelectorAll('[data-sg]').forEach((el) => io.observe(el));
    const root = document.documentElement;
    const mo = new MutationObserver(() => setLight(root.classList.contains('sg-light')));
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return (
    <ShaderGradientCanvas
      style={{ position: 'absolute', inset: 0 }}
      pixelDensity={small ? 0.8 : 1}
      fov={45}
      pointerEvents="none"
      lazyLoad={false}
      powerPreference="low-power"
    >
      {/* "Universe" ön ayarının geometrisi, sitenin paletiyle */}
      <ShaderGradient
        control="props"
        type="waterPlane"
        shader="defaults"
        animate={animate}
        uTime={0.2}
        uSpeed={0.08}
        uStrength={2.4}
        uDensity={1.1}
        uFrequency={5.5}
        uAmplitude={0}
        positionX={-0.5}
        positionY={0.1}
        positionZ={0}
        rotationX={0}
        rotationY={0}
        rotationZ={235}
        color1={light ? '#bfe0da' : '#1d5a63'}
        color2={light ? '#f2b896' : '#e08a66'}
        color3={light ? '#efece5' : '#000000'}
        reflection={0.1}
        cAzimuthAngle={180}
        cPolarAngle={115}
        cDistance={3.9}
        cameraZoom={1}
        lightType="3d"
        brightness={light ? 1.25 : 1}
        grain={small ? 'off' : 'on'}
        wireframe={false}
      />
    </ShaderGradientCanvas>
  );
}
