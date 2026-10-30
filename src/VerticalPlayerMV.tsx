import type React from 'react';
import { Audio } from '@remotion/media';
import { AbsoluteFill, staticFile, useVideoConfig } from 'remotion';
import { VerticalBackground } from './components/VerticalBackground';
import { SunlightParticles } from './components/SunlightParticles';
import { MarqueeTitle } from './components/MarqueeTitle';
import { ScrollingLyricsPlayer } from './components/ScrollingLyricsPlayer';
import { TiltedMusicPlayer } from './components/TiltedMusicPlayer';

export const VerticalPlayerMV: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const regularFont = staticFile('fonts/ZenMaruGothic-Regular.ttf');
  const boldFont = staticFile('fonts/ZenMaruGothic-Bold.ttf');

  return (
    <AbsoluteFill
      style={{
        width: 1080,
        height: 1920,
        overflow: 'hidden',
        backgroundColor: '#0F1A2A',
      }}
    >
      {/* Global Font Injection: Zen Maru Gothic (Japanese anime cute rounded font) */}
      <style>{`
        @font-face {
          font-family: 'Zen Maru Gothic';
          src: url('${boldFont}') format('truetype');
          font-weight: 700;
          font-style: normal;
        }
        @font-face {
          font-family: 'Zen Maru Gothic';
          src: url('${boldFont}') format('truetype');
          font-weight: 500;
          font-style: normal;
        }
        @font-face {
          font-family: 'Zen Maru Gothic';
          src: url('${regularFont}') format('truetype');
          font-weight: 400;
          font-style: normal;
        }
      `}</style>

      {/* Master Soundtrack (180.53s / 5,416 frames) */}
      <Audio src={staticFile('audio/icecream-harezora.mp3')} premountFor={fps} />

      {/* L1: High-res Watercolor Background (无标题.jpg) with atmospheric twilight sky wash */}
      <VerticalBackground />

      {/* L2: Floating Sunlight Bokeh & Dust Particles */}
      <SunlightParticles />

      {/* L3: Top Marquee Title & Subtitle (Tilted -13°) */}
      <MarqueeTitle title="アイスクリームと晴れ空" artist="Lost_云" />

      {/* L4: Center Smooth Scrolling Lyrics & Chinese Translation */}
      <ScrollingLyricsPlayer />

      {/* L5: Tilted Music Player Progress Bar, Animated Audio Wave Ribbon & Controls */}
      <TiltedMusicPlayer totalFrames={durationInFrames} />
    </AbsoluteFill>
  );
};
