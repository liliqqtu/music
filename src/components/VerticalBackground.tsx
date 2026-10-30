import type React from 'react';
import { staticFile, useCurrentFrame } from 'remotion';

export const VerticalBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Gentle Ken Burns living camera breathing (scale 1.000 to 1.020 over 3 minutes)
  const scale = 1.0 + Math.sin(frame * 0.0035) * 0.012;
  const translateY = Math.sin(frame * 0.0028) * 5;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: '#F9F7EC',
      }}
    >
      {/* 1. Base Illustration (无标题.jpg) - 100% Daytime Sunny Sky */}
      <img
        src={staticFile('assets/scenes/icecream-stand-vertical.jpg')}
        alt="Ice Cream Stand"
        style={{
          position: 'absolute',
          left: 0,
          top: -10,
          width: 1080,
          height: 1940,
          objectFit: 'cover',
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: 'bottom center',
        }}
      />

      {/* 2. Scheme A: Sunny Azure Watercolor Sky Wash (盛夏晴空蔚蓝水彩晕染) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1080,
          height: 920,
          background:
            'linear-gradient(180deg, rgba(50, 125, 215, 0.75) 0%, rgba(75, 155, 230, 0.60) 35%, rgba(125, 192, 248, 0.38) 65%, rgba(195, 230, 255, 0.12) 85%, rgba(255, 255, 255, 0) 100%)',
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      />

      {/* 3. Soft Ambient Sunlight Bloom (Pure daytime sun glow from upper right) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1080,
          height: 800,
          background:
            'radial-gradient(circle at 75% 15%, rgba(255, 250, 220, 0.35) 0%, rgba(255, 255, 255, 0) 65%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
