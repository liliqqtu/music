import type React from 'react';
import { Easing, interpolate } from 'remotion';

export type BaselineMode = 'album-cover-signature' | 'none';

interface LivingBaselineProps {
  readonly mode: BaselineMode;
  readonly localFrame: number;
  readonly durationInFrames: number;
}

export const LivingBaseline: React.FC<LivingBaselineProps> = ({
  mode,
  localFrame,
  durationInFrames,
}) => {
  if (mode === 'none') {
    return null;
  }

  const drawProgress = interpolate(localFrame, [10, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const fadeOut = interpolate(
    localFrame,
    [Math.max(80, durationInFrames - 30), durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Aligned to the canonical 1920x1080 girl position (skirt right edge at x=1060, calves left at x=910, ankles right at x=1005)
  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: Math.min(drawProgress, fadeOut),
      }}
    >
      {/* 1. "アイスクリームと、" */}
      <g>
        <text
          x={1080}
          y={652}
          fill="#1E2D52"
          fontSize="36"
          fontFamily="'Shippori Mincho', 'Hiragino Mincho ProN', 'YuMincho', 'Noto Serif JP', serif"
          letterSpacing="0.12em"
          opacity={drawProgress}
        >
          アイスクリームと、
        </text>
        <line
          x1={1060}
          y1={657}
          x2={1060 + 340 * drawProgress}
          y2={657}
          stroke="#1E2D52"
          strokeWidth="1.6"
        />
      </g>

      {/* 2. "晴れ空" */}
      <g>
        <text
          x={725}
          y={785}
          fill="#1E2D52"
          fontSize="36"
          fontFamily="'Shippori Mincho', 'Hiragino Mincho ProN', 'YuMincho', 'Noto Serif JP', serif"
          letterSpacing="0.12em"
          opacity={drawProgress}
        >
          晴れ空
        </text>
        <line
          x1={865 - 235 * drawProgress}
          y1={790}
          x2={865}
          y2={790}
          stroke="#1E2D52"
          strokeWidth="1.6"
        />
      </g>

      {/* 3. "初恋の手書" */}
      <g>
        <text
          x={1068}
          y={882}
          fill="#1E2D52"
          fontSize="21"
          fontFamily="'Shippori Mincho', 'Hiragino Mincho ProN', 'YuMincho', 'Noto Serif JP', Georgia, serif"
          letterSpacing="0.08em"
          opacity={drawProgress}
        >
          初恋の手書
        </text>
        <line
          x1={1055}
          y1={885}
          x2={1055 + 110 * drawProgress}
          y2={885}
          stroke="#1E2D52"
          strokeWidth="1.4"
        />
      </g>
    </svg>
  );
};
