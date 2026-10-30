import type React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

export type IceCreamStageMode =
  | 's01-intro-morning'
  | 's02-mirror-practice'
  | 's03-slope-run'
  | 's04-trees-dappled'
  | 's05-chorus1-sky'
  | 's06-interlude-bench'
  | 's07-verse2-melting'
  | 's08-chorus2-climax'
  | 's09-outro-fin';

interface IceCreamWindowsProps {
  readonly mode: IceCreamStageMode;
  readonly localFrame: number;
  readonly durationInFrames: number;
  readonly rmsEnergy: number;
  readonly highEnergy: number;
}

// Canonical stage container box centered in 1920x1080 (1806x1016 at left: 57, top: 32)
const CANONICAL_STAGE_BOX: React.CSSProperties = {
  position: 'absolute',
  left: 57,
  top: 32,
  width: 1806,
  height: 1016,
};

export const IceCreamWindows: React.FC<IceCreamWindowsProps> = ({
  mode,
  localFrame,
  durationInFrames,
  rmsEnergy,
  highEnergy,
}) => {
  const globalFrame = useCurrentFrame();
  // 10fps stepped frame (3-frame hold at 30fps) for authentic hand-drawn 2D anime cadence
  const stepFrame = Math.floor(globalFrame / 3) * 3;

  // Gentle sea breeze sway for awning and wind chime
  const breezeSway = Math.sin((stepFrame / 45) * Math.PI * 2) * 2.5;
  const chimeAngle = Math.sin((stepFrame / 30) * Math.PI * 2) * 5.0;

  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const fadeOut = interpolate(
    localFrame,
    [Math.max(0, durationInFrames - 18), durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      <div style={CANONICAL_STAGE_BOX}>
        {/* SVG Window Stage with 3 Rounded Viewport Panes */}
        <svg
          width="1806"
          height="1016"
          viewBox="0 0 1672 941"
          style={{ position: 'absolute', inset: 0 }}
        >
          <defs>
            {/* The 3 canonical window panes */}
            <clipPath id="icecream-three-panes">
              <rect x="306" y="132" width="295" height="392" rx="28" />
              <rect x="690" y="132" width="298" height="392" rx="28" />
              <rect x="1074" y="132" width="296" height="392" rx="28" />
            </clipPath>

            {/* Climax overflow mask: Right & Top clip dissolves */}
            <clipPath id="icecream-climax-overflow">
              <rect x="250" y="80" width="1250" height="520" rx="28" />
            </clipPath>
          </defs>

          {/* ======================================================== */}
          {/* VIEWPORT BACKGROUND SCROLLS (Inside Window Panes)        */}
          {/* ======================================================== */}
          <g
            clipPath={
              mode === 's08-chorus2-climax'
                ? 'url(#icecream-climax-overflow)'
                : 'url(#icecream-three-panes)'
            }
          >
            {/* S01 & S05: Wide Coastal Horizon & Flying Seagulls */}
            {(mode === 's01-intro-morning' || mode === 's05-chorus1-sky') && (
              <image
                href={staticFile('assets/scenes/03-seaside-parallax.png')}
                x={interpolate(
                  localFrame,
                  [0, durationInFrames],
                  [160, -80],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                )}
                y={mode === 's05-chorus1-sky' ? 100 : 120}
                width="1420"
                height="450"
                preserveAspectRatio="xMidYMid slice"
              />
            )}

            {/* S02: Morning Novel & Mirror Preparation */}
            {mode === 's02-mirror-practice' && (
              <image
                href={staticFile('assets/scenes/02-morning-novel-windows.png')}
                x={120}
                y={110}
                width="1420"
                height="440"
                preserveAspectRatio="xMidYMid slice"
              />
            )}

            {/* S03: Seaside Slope Running Parallax Scroll */}
            {mode === 's03-slope-run' && (
              <image
                href={staticFile('assets/scenes/15-sunset-town-walk.png')}
                x={interpolate(
                  localFrame,
                  [0, durationInFrames],
                  [80, -180],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                )}
                y={110}
                width="1500"
                height="450"
                preserveAspectRatio="xMidYMid slice"
              />
            )}

            {/* S04: Dappled Tree Shade & Coastal Shore */}
            {mode === 's04-trees-dappled' && (
              <image
                href={staticFile('assets/scenes/26-chorus2-cicada-shrine-walk.png')}
                x={140}
                y={105}
                width="1400"
                height="440"
                preserveAspectRatio="xMidYMid slice"
              />
            )}

            {/* S06: Interlude Bench Handing Ice Cream (Camphor Tree) */}
            {mode === 's06-interlude-bench' && (
              <image
                href={staticFile('assets/scenes/icecream-26-bench-handing-cone.jpg')}
                x={260}
                y={110}
                width="1150"
                height="430"
                preserveAspectRatio="xMidYMid slice"
              />
            )}

            {/* S07: Melting Soda Ice Cream Cone -> Tentative Touch (Verse 2 to Pre-Chorus 2) */}
            {mode === 's07-verse2-melting' && (
              <>
                <image
                  href={staticFile('assets/scenes/icecream-27-melting-soda-cone.jpg')}
                  x={270}
                  y={110}
                  width="1140"
                  height="430"
                  preserveAspectRatio="xMidYMid slice"
                  opacity={interpolate(localFrame, [440, 470], [1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })}
                />
                <image
                  href={staticFile('assets/scenes/icecream-23-hands-tentative-touch.jpg')}
                  x={270}
                  y={110}
                  width="1140"
                  height="430"
                  preserveAspectRatio="xMidYMid slice"
                  opacity={interpolate(localFrame, [440, 470], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })}
                />
              </>
            )}

            {/* S08: Climax Beach Wave Run & Fingers Intertwined -> Shoulder Lean Evening Star */}
            {mode === 's08-chorus2-climax' && (
              <>
                <image
                  href={staticFile('assets/scenes/icecream-41-fingers-intertwined-sea.jpg')}
                  x={interpolate(
                    localFrame,
                    [0, durationInFrames],
                    [180, 240],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  )}
                  y={90}
                  width="1280"
                  height="480"
                  preserveAspectRatio="xMidYMid slice"
                  opacity={interpolate(localFrame, [500, 530], [1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })}
                />
                <image
                  href={staticFile('assets/scenes/icecream-44-shoulder-lean-evening-star.jpg')}
                  x={interpolate(
                    localFrame,
                    [500, durationInFrames],
                    [220, 200],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  )}
                  y={90}
                  width="1280"
                  height="480"
                  preserveAspectRatio="xMidYMid slice"
                  opacity={interpolate(localFrame, [500, 530], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })}
                />
              </>
            )}

            {/* S09: Outro Fin (Sketchbook & Sunset Embankment) */}
            {mode === 's09-outro-fin' && (
              <image
                href={staticFile('assets/scenes/icecream-45-sketchbook-shells-table.jpg')}
                x={280}
                y={110}
                width="1120"
                height="430"
                preserveAspectRatio="xMidYMid slice"
              />
            )}
          </g>

          {/* ======================================================== */}
          {/* WHITE WOODEN WINDOW FRAMES & BAR COUNTER (Foreground)    */}
          {/* ======================================================== */}
          {mode !== 's08-chorus2-climax' && (
            <g>
              {/* Window Outer Panes (Clean White-washed Wood Outline) */}
              <rect
                x="306"
                y="132"
                width="295"
                height="392"
                rx="28"
                fill="none"
                stroke="#6B889E"
                strokeWidth="2.5"
                opacity="0.85"
              />
              <rect
                x="690"
                y="132"
                width="298"
                height="392"
                rx="28"
                fill="none"
                stroke="#6B889E"
                strokeWidth="2.5"
                opacity="0.85"
              />
              <rect
                x="1074"
                y="132"
                width="296"
                height="392"
                rx="28"
                fill="none"
                stroke="#6B889E"
                strokeWidth="2.5"
                opacity="0.85"
              />

              {/* Wooden Horizontal Guardrail / Windowsill Crossbars */}
              <line
                x1="260"
                y1="472"
                x2="1410"
                y2="472"
                stroke="#4E6D82"
                strokeWidth="2"
                opacity="0.8"
              />
              <line
                x1="260"
                y1="518"
                x2="1410"
                y2="518"
                stroke="#4E6D82"
                strokeWidth="2.8"
                opacity="0.9"
              />

              {/* Wooden Bar Counter / Table Surface at bottom of window */}
              <rect
                x="240"
                y="520"
                width="1190"
                height="18"
                rx="4"
                fill="#F0EBE0"
                stroke="#7B92A2"
                strokeWidth="1.5"
              />

              {/* Two Sea-Salt Soda Cones Resting on Counter */}
              <g transform="translate(710, 485) scale(0.24)">
                <image
                  href={staticFile('assets/props/motif-09-icecream.png')}
                  width="600"
                  height="800"
                />
              </g>
              <g transform="translate(775, 492) scale(0.21)">
                <image
                  href={staticFile('assets/props/motif-09-icecream.png')}
                  width="600"
                  height="800"
                />
              </g>

              {/* Transparent Blue Glass Wind Chime (右上角海风风铃) */}
              <g
                transform={`translate(1360, 140) rotate(${chimeAngle}) scale(0.26)`}
                style={{ transformOrigin: 'top center' }}
              >
                <image
                  href={staticFile('assets/props/motif-12-windchime.png')}
                  width="600"
                  height="800"
                />
              </g>
            </g>
          )}

          {/* ======================================================== */}
          {/* STRIPED WATERCOLOR AWNING (Top Scalloped Canvas Canopy)  */}
          {/* ======================================================== */}
          <g transform={`translate(0, ${breezeSway})`}>
            {/* Awning Main Canopy (Light Cyan #7EC2D8 & Ivory #FFFDF5) */}
            <path
              d="M 220 50 L 1450 50 L 1430 115 Q 1400 125, 1370 115 Q 1340 125, 1310 115 Q 1280 125, 1250 115 Q 1220 125, 1190 115 Q 1160 125, 1130 115 Q 1100 125, 1070 115 Q 1040 125, 1010 115 Q 980 125, 950 115 Q 920 125, 890 115 Q 860 125, 830 115 Q 800 125, 770 115 Q 740 125, 710 115 Q 680 125, 650 115 Q 620 125, 590 115 Q 560 125, 530 115 Q 500 125, 470 115 Q 440 125, 410 115 Q 380 125, 350 115 Q 320 125, 290 115 Q 260 125, 240 115 Z"
              fill="#F9F6EA"
              stroke="#6B889E"
              strokeWidth="2"
            />
            {/* Awning Cyan Stripes (手绘浅青条纹) */}
            {Array.from({ length: 19 }).map((_, i) => {
              if (i % 2 === 1) {
                const sx = 260 + i * 60;
                return (
                  <path
                    key={i}
                    d={`M ${sx} 50 L ${sx + 50} 50 L ${sx + 45} 118 Q ${sx + 20} 125, ${sx - 5} 118 Z`}
                    fill="#85C7DE"
                    opacity="0.82"
                  />
                );
              }
              return null;
            })}
          </g>
        </svg>

        {/* ======================================================== */}
        {/* CHARACTER FOREGROUND (Authentic Awashima Girl Profile)    */}
        {/* ======================================================== */}
        {(mode === 's01-intro-morning' ||
          mode === 's05-chorus1-sky' ||
          mode === 's07-verse2-melting') && (
          <Img
            src={staticFile('assets/character/highres-girl-and-frames-cutout.png')}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};
