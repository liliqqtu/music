import type React from 'react';
import { Composition, Folder } from 'remotion';
import { IceCreamMV, SceneAct } from './IceCreamMV';
import { VerticalPlayerMV } from './VerticalPlayerMV';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 9:16 Vertical Player Music Video (1080x1920 @ 30fps, 5416 frames / 180.53s) */}
      <Composition
        id="VerticalPlayerMV"
        component={VerticalPlayerMV}
        durationInFrames={5416}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Master 03:00.53 Music Video Composition (5416 frames @ 30fps, 1920x1080) */}
      <Composition
        id="IceCreamMV"
        component={IceCreamMV}
        durationInFrames={5416}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Individual Scene Compositions for Studio Inspection */}
      <Folder name="Scenes">
        <Composition
          id="S01-IntroMorning"
          component={SceneAct}
          durationInFrames={506}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            sceneId: 'S01',
            durationInFrames: 506,
            paperMood: 'morning-breeze' as const,
            windowMode: 's01-intro-morning' as const,
            baselineMode: 'album-cover-signature' as const,
            fireworkMode: 'subtle-sparks' as const,
          }}
        />

        <Composition
          id="S05-Chorus1Sky"
          component={SceneAct}
          durationInFrames={790}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            sceneId: 'S05',
            durationInFrames: 790,
            paperMood: 'ivory-pure' as const,
            windowMode: 's05-chorus1-sky' as const,
            fireworkMode: 'drifting-petals' as const,
          }}
        />

        <Composition
          id="S06-InterludeFourMontage"
          component={SceneAct}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            sceneId: 'S06',
            durationInFrames: 540,
            paperMood: 'sunset-coral' as const,
            windowMode: 's06-interlude-bench' as const,
            montageVariant: 'icecream-four' as const,
            montageStartLocalFrame: 122,
            montageDurationFrames: 120,
            fireworkMode: 'drifting-petals' as const,
          }}
        />

        <Composition
          id="S08-Chorus2Climax"
          component={SceneAct}
          durationInFrames={1031}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            sceneId: 'S08',
            durationInFrames: 1031,
            paperMood: 'dawn-break' as const,
            windowMode: 's08-chorus2-climax' as const,
            fireworkMode: 'drifting-petals' as const,
          }}
        />
      </Folder>
    </>
  );
};
