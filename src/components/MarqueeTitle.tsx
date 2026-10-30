import type React from 'react';
import { useCurrentFrame } from 'remotion';

const FONT_TITLE =
  "'Zen Maru Gothic', 'Zen Maru Gothic Local', 'M PLUS Rounded 1c', 'Kosugi Maru', sans-serif";
const FONT_SANS =
  "'Zen Maru Gothic', 'Zen Maru Gothic Local', 'M PLUS Rounded 1c', sans-serif";

interface MarqueeTitleProps {
  readonly title?: string;
  readonly artist?: string;
}

export const MarqueeTitle: React.FC<MarqueeTitleProps> = ({
  title = 'アイスクリームと晴れ空',
  artist = 'Lost_云',
}) => {
  const frame = useCurrentFrame();

  // Marquee scroll speed: 1.2 px per frame
  const scrollOffset = (frame * 1.2) % 480;

  return (
    <div
      style={{
        position: 'absolute',
        left: 110,
        top: 240,
        transform: 'rotate(-13deg)',
        transformOrigin: 'top left',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* Title Marquee Container with overflow hidden */}
      <div
        style={{
          position: 'relative',
          width: 520,
          height: 72,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Continuous looping text row */}
        <div
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            transform: `translateX(-${scrollOffset}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_TITLE,
              fontSize: 50,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.08em',
              textShadow:
                '-1.5px -1.5px 0 rgba(20, 50, 95, 0.7), 1.5px -1.5px 0 rgba(20, 50, 95, 0.7), -1.5px 1.5px 0 rgba(20, 50, 95, 0.7), 1.5px 1.5px 0 rgba(20, 50, 95, 0.7), 0 4px 14px rgba(10, 30, 65, 0.5)',
              marginRight: 60,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontFamily: FONT_TITLE,
              fontSize: 50,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.08em',
              textShadow:
                '-1.5px -1.5px 0 rgba(20, 50, 95, 0.7), 1.5px -1.5px 0 rgba(20, 50, 95, 0.7), -1.5px 1.5px 0 rgba(20, 50, 95, 0.7), 1.5px 1.5px 0 rgba(20, 50, 95, 0.7), 0 4px 14px rgba(10, 30, 65, 0.5)',
              marginRight: 60,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontFamily: FONT_TITLE,
              fontSize: 50,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.08em',
              textShadow:
                '-1.5px -1.5px 0 rgba(20, 50, 95, 0.7), 1.5px -1.5px 0 rgba(20, 50, 95, 0.7), -1.5px 1.5px 0 rgba(20, 50, 95, 0.7), 1.5px 1.5px 0 rgba(20, 50, 95, 0.7), 0 4px 14px rgba(10, 30, 65, 0.5)',
              marginRight: 60,
            }}
          >
            {title}
          </span>
        </div>
      </div>

      {/* Artist Subtitle */}
      <div
        style={{
          fontFamily: FONT_SANS,
          fontSize: 26,
          fontWeight: 500,
          color: '#FFFFFF',
          letterSpacing: '0.12em',
          marginTop: 6,
          marginLeft: 4,
          textShadow:
            '-1px -1px 0 rgba(20, 50, 95, 0.65), 1px -1px 0 rgba(20, 50, 95, 0.65), -1px 1px 0 rgba(20, 50, 95, 0.65), 1px 1px 0 rgba(20, 50, 95, 0.65), 0 2px 8px rgba(10, 30, 65, 0.45)',
        }}
      >
        {artist}
      </div>
    </div>
  );
};
