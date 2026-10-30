import type React from 'react';
import { Audio } from '@remotion/media';
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import audioEnvelope from './data/audio-envelope.json';
import { SCENE_MARKERS } from './data/lyrics';
import {
  FourStripMontage,
  type MontageVariant,
} from './components/FourStripMontage';
import { LivingBaseline, type BaselineMode } from './components/LivingBaseline';
import { LyricStage } from './components/LyricStage';
import { PaperBackground, type PaperMood } from './components/PaperBackground';
import {
  IceCreamWindows,
  type IceCreamStageMode,
} from './components/IceCreamWindows';
import {
  WatercolorFireworks,
  type FireworkMode,
} from './components/WatercolorFireworks';

export type SceneActProps = {
  readonly sceneId: string;
  readonly durationInFrames: number;
  readonly paperMood: PaperMood;
  readonly windowMode: IceCreamStageMode;
  readonly baselineMode?: BaselineMode;
  readonly fireworkMode?: FireworkMode;
  readonly montageVariant?: MontageVariant;
  readonly montageStartLocalFrame?: number;
  readonly montageDurationFrames?: number;
};

export const SceneAct: React.FC<SceneActProps> = ({
  sceneId,
  durationInFrames,
  paperMood,
  windowMode,
  baselineMode = 'none',
  fireworkMode = 'none',
  montageVariant,
  montageStartLocalFrame = 0,
  montageDurationFrames = 120,
}) => {
  const localFrame = useCurrentFrame();
  const sceneMeta = SCENE_MARKERS.find((s) => s.id === sceneId);
  const globalFrame = Math.min(
    audioEnvelope.totalFrames - 1,
    Math.max(0, (sceneMeta ? sceneMeta.startFrame : 0) + localFrame)
  );

  const rmsEnergy = audioEnvelope.rms[globalFrame] ?? 0.3;
  const highEnergy = audioEnvelope.high[globalFrame] ?? 0.3;

  const isMontageActive =
    montageVariant !== undefined &&
    localFrame >= montageStartLocalFrame &&
    localFrame < montageStartLocalFrame + montageDurationFrames;

  const showBaseline =
    !isMontageActive &&
    baselineMode === 'album-cover-signature';

  return (
    <AbsoluteFill>
      {/* L0: Pure Antique Ivory Watercolor Paper & Atmospheric Mood */}
      <PaperBackground mood={paperMood} energy={rmsEnergy} />

      {/* L1: Ice Cream Shop White-wood Windows & Parallax Viewports */}
      {!isMontageActive && (
        <IceCreamWindows
          mode={windowMode}
          localFrame={localFrame}
          durationInFrames={durationInFrames}
          rmsEnergy={rmsEnergy}
          highEnergy={highEnergy}
        />
      )}

      {/* L2: Four-Strip Montage at Interlude (120 BPM卡点快切) */}
      {isMontageActive && montageVariant && (
        <FourStripMontage
          variant={montageVariant}
          localFrame={localFrame - montageStartLocalFrame}
        />
      )}

      {/* L3A: Awashima-Style Signature Title Baseline ("アイスクリームと、 / 晴れ空 / 初恋の手書") */}
      {showBaseline && (
        <LivingBaseline
          mode={baselineMode}
          localFrame={localFrame}
          durationInFrames={durationInFrames}
        />
      )}

      {/* L3B: Audio-driven Floating Sunlight Bokeh & Drifting Petals */}
      <WatercolorFireworks mode={fireworkMode} rmsEnergy={rmsEnergy} />
    </AbsoluteFill>
  );
};

export const IceCreamMV: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F9F7EC',
      }}
    >
      {/* Master Soundtrack */}
      <Audio src={staticFile('audio/icecream-harezora.mp3')} premountFor={fps} />

      {/* S01 (00:00.0 - 00:16.8 | 0 - 506f): 序幕：初夏晨光与晴空展开 */}
      <Sequence
        name="S01 · 序幕：晨光展开与白木窗"
        from={0}
        durationInFrames={506}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S01"
          durationInFrames={506}
          paperMood="morning-breeze"
          windowMode="s01-intro-morning"
          baselineMode="album-cover-signature"
          fireworkMode="subtle-sparks"
        />
      </Sequence>

      {/* S02 (00:16.8 - 00:32.4 | 506 - 972f): 第一朝：辗转难眠与清晨镜前 */}
      <Sequence
        name="S02 · 第一朝：镜前心事"
        from={506}
        durationInFrames={466}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S02"
          durationInFrames={466}
          paperMood="morning-breeze"
          windowMode="s02-mirror-practice"
          fireworkMode="none"
        />
      </Sequence>

      {/* S03 (00:32.4 - 00:47.3 | 972 - 1421f): 轻快坡道：奔向约定的背影 */}
      <Sequence
        name="S03 · 坡道奔跑与海风"
        from={972}
        durationInFrames={449}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S03"
          durationInFrames={449}
          paperMood="morning-breeze"
          windowMode="s03-slope-run"
          fireworkMode="drifting-petals"
        />
      </Sequence>

      {/* S04 (00:47.3 - 01:02.1 | 1421 - 1863f): 预副歌：林荫树影与心跳蔓延 */}
      <Sequence
        name="S04 · 预副歌：树荫对视"
        from={1421}
        durationInFrames={442}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S04"
          durationInFrames={442}
          paperMood="station-dusk"
          windowMode="s04-trees-dappled"
          fireworkMode="subtle-sparks"
        />
      </Sequence>

      {/* S05 (01:02.1 - 01:28.4 | 1863 - 2653f): 副歌1：晴空海堤与世界着色 */}
      <Sequence
        name="S05 · 副歌1：晴空着色"
        from={1863}
        durationInFrames={790}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S05"
          durationInFrames={790}
          paperMood="ivory-pure"
          windowMode="s05-chorus1-sky"
          fireworkMode="drifting-petals"
        />
      </Sequence>

      {/* S06 (01:28.4 - 01:46.4 | 2653 - 3193f): 间奏：石阶漫步与四意象快切 */}
      <Sequence
        name="S06 · 间奏：四意象快切与长椅递甜筒"
        from={2653}
        durationInFrames={540}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S06"
          durationInFrames={540}
          paperMood="sunset-coral"
          windowMode="s06-interlude-bench"
          fireworkMode="drifting-petals"
          montageVariant="icecream-four"
          montageStartLocalFrame={122}
          montageDurationFrames={120}
        />
      </Sequence>

      {/* S07 (01:46.4 - 02:17.1 | 3193 - 4114f): 第二幕：长椅双人与融化的甜筒 */}
      <Sequence
        name="S07 · 第二幕：融化的冰淇淋"
        from={3193}
        durationInFrames={921}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S07"
          durationInFrames={921}
          paperMood="ivory-pure"
          windowMode="s07-verse2-melting"
          fireworkMode="subtle-sparks"
        />
      </Sequence>

      {/* S08 (02:17.1 - 02:51.5 | 4114 - 5145f): 副歌2：浅滩飞奔与黄昏告白前奏 */}
      <Sequence
        name="S08 · 副歌2高潮：十指相扣与破框"
        from={4114}
        durationInFrames={1031}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S08"
          durationInFrames={1031}
          paperMood="dawn-break"
          windowMode="s08-chorus2-climax"
          fireworkMode="drifting-petals"
        />
      </Sequence>

      {/* S09 (02:51.5 - 03:00.5 | 5145 - 5416f): 高潮：夕阳回眸告白与牵手终章 */}
      <Sequence
        name="S09 · 终章：回眸告白与 Fin."
        from={5145}
        durationInFrames={271}
        premountFor={fps}
      >
        <SceneAct
          sceneId="S09"
          durationInFrames={271}
          paperMood="sunset-coral"
          windowMode="s09-outro-fin"
          fireworkMode="subtle-sparks"
        />
      </Sequence>

      {/* L4: Global Awashima-Style Ming Dynasty Typography Stage */}
      <LyricStage />
    </AbsoluteFill>
  );
};
