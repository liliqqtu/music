import type React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { AudioWaveRibbon } from './AudioWaveRibbon';

interface TiltedMusicPlayerProps {
  readonly totalFrames?: number;
}

export const TiltedMusicPlayer: React.FC<TiltedMusicPlayerProps> = ({
  totalFrames = 5416,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Progress ratio 0.0 to 1.0
  const progress = Math.min(1.0, Math.max(0.0, frame / totalFrames));

  // Current timestamp string mm:ss
  const currentSec = Math.floor(frame / fps);
  const curMin = Math.floor(currentSec / 60);
  const curRemSec = currentSec % 60;
  const curTimeStr = `${String(curMin).padStart(2, '0')}:${String(curRemSec).padStart(2, '0')}`;

  // Total duration string 03:00
  const totalSec = Math.floor(totalFrames / fps);
  const totMin = Math.floor(totalSec / 60);
  const totRemSec = totalSec % 60;
  const totTimeStr = `${String(totMin).padStart(2, '0')}:${String(totRemSec).padStart(2, '0')}`;

  const barWidth = 530;
  const playedX = progress * barWidth;

  return (
    <div
      style={{
        position: 'absolute',
        left: 95,
        top: 840,
        transform: 'rotate(-13deg)',
        transformOrigin: 'top left',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* 1. Undulating Audio Wave Ribbon behind progress line */}
      <AudioWaveRibbon width={barWidth} height={85} />

      {/* 2. Progress Bar Track & Thumb */}
      <svg
        width={barWidth + 40}
        height={32}
        viewBox={`0 0 ${barWidth + 40} 32`}
        style={{ overflow: 'visible' }}
      >
        {/* Unplayed Background Track (Semi-translucent white with shadow) */}
        <line
          x1={0}
          y1={16}
          x2={barWidth}
          y2={16}
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(15, 30, 50, 0.35))',
          }}
        />

        {/* Played Highlight Track (Pure White with shadow) */}
        <line
          x1={0}
          y1={16}
          x2={playedX}
          y2={16}
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0 2px 6px rgba(15, 30, 50, 0.6))',
          }}
        />

        {/* Circular Progress Thumb Knob */}
        <circle
          cx={playedX}
          cy={16}
          r={11}
          fill="#FFFFFF"
          style={{
            filter:
              'drop-shadow(0 2px 8px rgba(15, 30, 50, 0.65)) drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))',
          }}
        />
      </svg>

      {/* 3. Timestamps: Current Time (Left) & Total Time (Right) */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 4,
          fontSize: 26,
          fontWeight: 700,
          fontFamily:
            "'Zen Maru Gothic', 'Zen Maru Gothic Local', 'M PLUS Rounded 1c', sans-serif",
          color: '#FFFFFF',
          letterSpacing: '0.04em',
          textShadow:
            '-1px -1px 0 rgba(20, 50, 95, 0.7), 1px -1px 0 rgba(20, 50, 95, 0.7), -1px 1px 0 rgba(20, 50, 95, 0.7), 1px 1px 0 rgba(20, 50, 95, 0.7), 0 2px 8px rgba(10, 30, 65, 0.5)',
        }}
      >
        {curTimeStr}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 36,
          left: barWidth - 65,
          fontSize: 26,
          fontWeight: 700,
          fontFamily:
            "'Zen Maru Gothic', 'Zen Maru Gothic Local', 'M PLUS Rounded 1c', sans-serif",
          color: '#FFFFFF',
          letterSpacing: '0.04em',
          textShadow:
            '-1px -1px 0 rgba(20, 50, 95, 0.7), 1px -1px 0 rgba(20, 50, 95, 0.7), -1px 1px 0 rgba(20, 50, 95, 0.7), 1px 1px 0 rgba(20, 50, 95, 0.7), 0 2px 8px rgba(10, 30, 65, 0.5)',
        }}
      >
        {totTimeStr}
      </div>

      {/* 4. Playback Controls (|◀, ❚❚ in circle, ▶|) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 65,
          marginTop: 65,
          marginLeft: 35,
        }}
      >
        {/* Previous Track Icon |◀ */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          style={{
            overflow: 'visible',
            filter: 'drop-shadow(0 2px 8px rgba(15, 30, 50, 0.65))',
          }}
        >
          <line
            x1="4"
            y1="5"
            x2="4"
            y2="31"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <polygon points="30,5 6,18 30,31" fill="#FFFFFF" />
        </svg>

        {/* Play / Pause Circular Button ❚❚ */}
        <div
          style={{
            width: 86,
            height: 86,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.65)',
            boxShadow:
              '0 4px 18px rgba(15, 30, 50, 0.4), inset 0 0 8px rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 7,
              height: 32,
              borderRadius: 3.5,
              backgroundColor: '#FFFFFF',
              boxShadow: '0 1px 4px rgba(15, 30, 50, 0.5)',
            }}
          />
          <div
            style={{
              width: 7,
              height: 32,
              borderRadius: 3.5,
              backgroundColor: '#FFFFFF',
              boxShadow: '0 1px 4px rgba(15, 30, 50, 0.5)',
            }}
          />
        </div>

        {/* Next Track Icon ▶| */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          style={{
            overflow: 'visible',
            filter: 'drop-shadow(0 2px 8px rgba(15, 30, 50, 0.65))',
          }}
        >
          <polygon points="6,5 30,18 6,31" fill="#FFFFFF" />
          <line
            x1="32"
            y1="5"
            x2="32"
            y2="31"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
