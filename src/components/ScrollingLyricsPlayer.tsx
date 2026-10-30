import type React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';
import { LYRIC_LINES } from '../data/lyrics';

const FONT_JP =
  "'Zen Maru Gothic', 'Zen Maru Gothic Local', 'M PLUS Rounded 1c', 'Kosugi Maru', -apple-system, BlinkMacSystemFont, sans-serif";
const FONT_ZH =
  "'Zen Maru Gothic', 'Zen Maru Gothic Local', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif";

export const ScrollingLyricsPlayer: React.FC = () => {
  const frame = useCurrentFrame();

  // Find currently active line index
  let activeIndex = LYRIC_LINES.findIndex(
    (l) => frame >= l.startFrame && frame <= l.endFrame
  );

  // If between lines, find closest past or upcoming line
  if (activeIndex === -1) {
    // Find the last line that already started
    for (let i = LYRIC_LINES.length - 1; i >= 0; i--) {
      if (frame >= LYRIC_LINES[i].startFrame) {
        activeIndex = i;
        break;
      }
    }
    if (activeIndex === -1) {
      activeIndex = 0;
    }
  }

  const currentLine = LYRIC_LINES[activeIndex];
  const prevLine = activeIndex > 0 ? LYRIC_LINES[activeIndex - 1] : null;

  // Smooth scroll interpolation when transitioning into activeIndex
  // Transition window: 16 frames around line start
  const transitionProgress = interpolate(
    frame,
    [currentLine.startFrame - 8, currentLine.startFrame + 12],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
    }
  );

  // Virtual float index for continuous smooth scroll
  const continuousIndex =
    prevLine && frame < currentLine.startFrame + 12
      ? activeIndex - 1 + transitionProgress
      : activeIndex;

  // Fixed anchor point for the active line on 1080x1920 canvas
  const ANCHOR_Y = 520;
  const LINE_HEIGHT = 96; // Base vertical pitch between lines

  return (
    <div
      style={{
        position: 'absolute',
        left: 110,
        top: 0,
        width: 680,
        height: 1920,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {LYRIC_LINES.map((line, idx) => {
        // Distance from current continuous focus
        const dist = idx - continuousIndex;

        // Skip rendering lines that are far out of view
        if (Math.abs(dist) > 3.8) {
          return null;
        }

        const yPos = ANCHOR_Y + dist * LINE_HEIGHT;

        // Opacity and font size based on proximity to active focus (dist === 0)
        const absDist = Math.abs(dist);
        let opacity = 0;
        let fontSize = 32;

        if (absDist < 0.6) {
          // Focused active line
          opacity = interpolate(absDist, [0, 0.6], [1.0, 0.65]);
          fontSize = interpolate(absDist, [0, 0.6], [40, 35]);
        } else if (dist < 0) {
          // Past lines above (fade out cleanly to keep title area clear)
          opacity = interpolate(absDist, [0.6, 1.8], [0.45, 0], {
            extrapolateRight: 'clamp',
          });
          fontSize = interpolate(absDist, [0.6, 1.8], [33, 27]);
        } else {
          // Upcoming lines below
          opacity = interpolate(absDist, [0.6, 2.8], [0.55, 0.05], {
            extrapolateRight: 'clamp',
          });
          fontSize = interpolate(absDist, [0.6, 2.8], [34, 26]);
        }

        const isFullyActive = idx === activeIndex && absDist < 0.8;

        return (
          <div
            key={line.id}
            style={{
              position: 'absolute',
              top: yPos,
              left: 0,
              width: 680,
              opacity: Math.max(0, Math.min(1, opacity)),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              transform: 'translateY(-50%)',
            }}
          >
            {/* Japanese Main Lyric */}
            <div
              style={{
                fontFamily: FONT_JP,
                fontSize: Math.round(fontSize),
                fontWeight: isFullyActive ? 700 : 500,
                color: '#FFFFFF',
                letterSpacing: '0.06em',
                lineHeight: 1.35,
                textShadow: isFullyActive
                  ? '-1.5px -1.5px 0 rgba(20, 50, 95, 0.75), 1.5px -1.5px 0 rgba(20, 50, 95, 0.75), -1.5px 1.5px 0 rgba(20, 50, 95, 0.75), 1.5px 1.5px 0 rgba(20, 50, 95, 0.75), 0 4px 14px rgba(10, 30, 65, 0.5)'
                  : '-1px -1px 0 rgba(25, 55, 95, 0.5), 1px -1px 0 rgba(25, 55, 95, 0.5), -1px 1px 0 rgba(25, 55, 95, 0.5), 1px 1px 0 rgba(25, 55, 95, 0.5), 0 2px 8px rgba(10, 30, 65, 0.35)',
              }}
            >
              {line.text}
            </div>

            {/* Chinese Translation for Active Line */}
            {isFullyActive && line.zhText && (
              <div
                style={{
                  fontFamily: FONT_ZH,
                  fontSize: 24,
                  fontWeight: 500,
                  color: '#FFFFFF',
                  letterSpacing: '0.08em',
                  lineHeight: 1.3,
                  marginTop: 6,
                  textShadow:
                    '-1px -1px 0 rgba(20, 50, 95, 0.7), 1px -1px 0 rgba(20, 50, 95, 0.7), -1px 1px 0 rgba(20, 50, 95, 0.7), 1px 1px 0 rgba(20, 50, 95, 0.7), 0 2px 10px rgba(10, 30, 65, 0.45)',
                }}
              >
                {line.zhText}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
