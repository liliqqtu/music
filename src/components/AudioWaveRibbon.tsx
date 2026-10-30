import type React from 'react';
import { useCurrentFrame } from 'remotion';
import audioEnvelope from '../data/audio-envelope.json';

interface AudioWaveRibbonProps {
  readonly width?: number;
  readonly height?: number;
}

export const AudioWaveRibbon: React.FC<AudioWaveRibbonProps> = ({
  width = 540,
  height = 90,
}) => {
  const frame = useCurrentFrame();

  const currentFrame = Math.min(
    audioEnvelope.totalFrames - 1,
    Math.max(0, frame)
  );

  const rms = audioEnvelope.rms[currentFrame] ?? 0.3;
  const mid = audioEnvelope.mid[currentFrame] ?? 0.3;
  const high = audioEnvelope.high[currentFrame] ?? 0.2;

  // Real-time animated sine waves responding to audio energy
  const t = frame * 0.05;
  const energyFactor = 0.65 + rms * 0.9;

  // Build SVG path with 16 sampled points
  const points: [number, number][] = [];
  const segments = 24;
  const dx = width / segments;

  for (let i = 0; i <= segments; i++) {
    const x = i * dx;
    const normX = i / segments; // 0 to 1

    // Window function so wave naturally tapers off at the left and right ends (Hamming/Hann window)
    const window = Math.sin(normX * Math.PI);

    // Multi-harmonic undulating wave
    const wave1 = Math.sin(normX * Math.PI * 3.2 - t * 1.5) * 18;
    const wave2 = Math.sin(normX * Math.PI * 5.4 + t * 2.2) * (10 + mid * 14);
    const wave3 = Math.cos(normX * Math.PI * 2.0 + t * 0.8) * (8 + high * 12);

    // Baseline is at y = height * 0.55
    const y = height * 0.55 - (wave1 + wave2 + wave3) * window * energyFactor;
    points.push([x, y]);
  }

  // Generate smooth SVG curve path
  let pathD = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const mx = (prev[0] + curr[0]) / 2;
    const my = (prev[1] + curr[1]) / 2;
    pathD += ` Q ${prev[0]},${prev[1]} ${mx},${my}`;
  }
  const last = points[points.length - 1];
  pathD += ` L ${last[0]},${last[1]}`;

  // Close path along baseline for translucent shaded fill
  const fillD = `${pathD} L ${width},${height * 0.65} L 0,${height * 0.65} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: 'absolute',
        top: -height * 0.45,
        left: 0,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient id="waveFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Shaded waveform body */}
      <path d={fillD} fill="url(#waveFillGrad)" />

      {/* Glowing top contour stroke */}
      <path
        d={pathD}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(15, 30, 50, 0.45))',
        }}
      />
    </svg>
  );
};
