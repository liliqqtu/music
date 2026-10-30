import type React from 'react';
import { useCurrentFrame } from 'remotion';

interface Particle {
  id: number;
  initialX: number;
  initialY: number;
  size: number;
  speedY: number;
  swayFreq: number;
  swayAmp: number;
  baseOpacity: number;
  phase: number;
  color: string;
}

// Generate 45 deterministic particle seeds
const PARTICLE_SEEDS: Particle[] = Array.from({ length: 48 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const rand1 = seed / 233280;
  const rand2 = ((seed * 9301 + 49297) % 233280) / 233280;
  const rand3 = ((seed * 1337 + 5123) % 233280) / 233280;
  const rand4 = ((seed * 7777 + 9999) % 233280) / 233280;

  const isGold = i % 3 === 0;
  const color = isGold
    ? 'rgba(255, 230, 150, '
    : i % 2 === 0
      ? 'rgba(255, 255, 255, '
      : 'rgba(210, 240, 255, ';

  return {
    id: i,
    initialX: rand1 * 1080,
    initialY: rand2 * 1920,
    size: 4 + rand3 * 9, // 4px to 13px
    speedY: 0.6 + rand4 * 1.4, // 0.6 to 2.0 px/frame
    swayFreq: 0.015 + rand2 * 0.025,
    swayAmp: 18 + rand3 * 35,
    baseOpacity: 0.25 + rand1 * 0.55,
    phase: rand4 * Math.PI * 2,
    color,
  };
});

export const SunlightParticles: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {PARTICLE_SEEDS.map((p) => {
        // Continuous upward loop through 1920 height
        const totalTravel = frame * p.speedY;
        const rawY = (p.initialY - totalTravel) % 1920;
        const currentY = rawY < 0 ? rawY + 1920 : rawY;

        // Gentle horizontal sine wave sway
        const currentX =
          p.initialX + Math.sin(frame * p.swayFreq + p.phase) * p.swayAmp;

        // Subtle twinkling opacity pulsation
        const pulse = Math.sin(frame * 0.06 + p.phase) * 0.2;
        const opacity = Math.max(0.08, Math.min(1.0, p.baseOpacity + pulse));

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: currentX,
              top: currentY,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: `${p.color}${opacity})`,
              boxShadow: `0 0 ${p.size * 1.8}px ${p.color}${opacity * 0.9}), 0 0 ${p.size * 3.5}px rgba(255, 240, 180, ${opacity * 0.5})`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
};
