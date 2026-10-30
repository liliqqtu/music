# 日系美学歌词视频与手书 MV 引擎 (Anime Lyric Player MV Engine)

<p align="center">
  <img src="docs/images/preview_vertical.png" alt="9:16 竖屏美学播放器手书 MV 效果预览" width="380" />
</p>

<p align="center">
  <a href="https://remotion.dev"><img src="https://img.shields.io/badge/Remotion-4.0-blue?logo=react" alt="Remotion" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.2-61dafb?logo=react" alt="React" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript" alt="TypeScript" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" /></a>
</p>

[English](README.md) · [简体中文](README-ZH.md)

---

## 🌟 项目简介

**Anime Lyric Player MV Engine** 是一套基于 **Remotion + React + TypeScript** 的开源可编程音乐视频渲染引擎。

它能够生成具有极高日系美学质感的 **9:16 竖屏歌词播放器手书 MV** 与 **16:9 宽屏水彩画手书 MV**：
- **-13° 倾斜复古现代播放器 UI**（`< || >` 控制键、拟态毛玻璃进度条、当前/总时长跑表）；
- **平滑弹簧阻尼滚动歌词**（日文原词 + 中文翻译双语对齐，焦点行平滑过渡）；
- **真音频 RMS 能量驱动的动态波形丝带**（随节奏起伏，杜绝伪动画）；
- **日系可爱圆体字**：内置开源商用 **Zen Maru Gothic（禅丸黑体）**，配合贴纸水彩柔和描边，在白云和高光下清晰夺目；
- **盛夏晴空蔚蓝水彩晕染**：采用 CSS `mix-blend-mode: multiply` 与纸纹完美融合，无需压抑的暗夜遮罩即可实现绝佳对比度；
- **全自动范式流水线**：提供一键式 Python CLI 脚本，自动提取音频包络、转换 LRC 歌词并无缝渲染导出。

---

## 📸 视觉走查展示

| 9:16 竖屏播放器手书 MV (`VerticalPlayerMV`) | 16:9 宽屏水彩手书 MV (`IceCreamMV`) |
| :---: | :---: |
| <img src="docs/images/preview_vertical.png" width="300" /> | 1920×1080 多画幅画框蒙太奇 |
| *-13° 跑马灯标题、Zen Maru Gothic 歌词、实时音频波形* | *水彩画框、呼吸感镜头律动、粒子微风* |

---

## ✨ 核心特性

1. **可爱日系动漫圆体（Zen Maru Gothic + 贴纸描边）**
   - 离线内置完整 TTF 字体文件（`public/fonts/`），开箱即用；
   - 独创双层动漫周边贴纸阴影着色器，字体圆润软糯，在纯白宣纸或白云上绝不吃色。

2. **盛夏晴空蔚蓝水彩晕染（Sunny Azure Sky Wash）**
   - 彻底摆脱参考视频由于夜晚背景造成的“暗黑夜空”违和感；
   - 从画布顶部自然注入新海诚风格的夏季动漫晴空蔚蓝渐变，完美契合《晴れ空》（晴空）本意。

3. **空间黄金分割排版**
   - 播放器整体上移至白云区域（`top: 840`），将原画建筑、屋檐红瓦、遮阳篷、招牌、长椅与单车 100% 完整展现。

4. **一键式工程范式脚本**
   - 提供 `extract_audio_envelope.py`、`parse_lrc.py` 和 `render_pipeline.py`，换歌只需一条命令。

---

## 🚀 快速上手

### 1. 环境依赖
- **Node.js**: >= 18.0.0
- **Python**: >= 3.8
- **FFmpeg**: （可选，用于非标准音频解码回退）

### 2. 安装项目
```bash
git clone https://github.com/liliqqtu/music.git
cd music

npm install
```

### 3. 本地实时预览（Remotion Studio）
```bash
npm run dev
# 或
npm start
```
在浏览器打开 `http://localhost:3000`，支持拖动时间轴毫秒级实时审查画面。

### 4. 视频导出渲染
```bash
# 渲染 9:16 竖屏歌词播放器视频（1080x1920 @ 30fps）
npm run render:vertical

# 渲染 16:9 宽屏多画幅视频（1920x1080 @ 30fps）
npm run render:widescreen

# 导出单帧高清预览图（第 1900 帧）
npm run still
```

---

## 🛠️ 自动化流水线（换歌使用方法）

使用 `scripts/render_pipeline.py` 一键生成属于您自己的歌曲视频：

```bash
python scripts/render_pipeline.py \
  --audio "path/to/song.mp3" \
  --bg "path/to/illustration.jpg" \
  --lrc "path/to/lyrics.lrc" \
  --zh "path/to/translation.txt" \
  --mode vertical \
  --out "out/my_video.mp4"
```

该工具将自动完成：
1. 提取每帧音频 RMS 振幅并写入 `src/data/audio-envelope.json`；
2. 解析 LRC 时间戳与中文双语对齐，生成 `src/data/lyrics.ts`；
3. 调度 Remotion 无头 Chrome 编译器导出高清 MP4。

---

## 📂 目录规范

```text
music/
├── docs/                      # 文档与预览展示图
│   └── images/
│       └── preview_vertical.png
├── public/                    # 静态资产目录
│   ├── assets/
│   │   └── scenes/            # 背景插画素材 (.jpg)
│   ├── audio/                 # 伴奏与音频 (.mp3)
│   └── fonts/                 # Zen Maru Gothic 日系圆体字
├── scripts/                   # Python 自动化工具集
│   ├── extract_audio_envelope.py  # 音频能量包络计算器
│   ├── parse_lrc.py               # LRC 歌词与翻译对齐转换工具
│   └── render_pipeline.py         # 一键出片 CLI 脚本
├── src/                       # Remotion React 源码
│   ├── components/            # 核心渲染组件
│   │   ├── AudioWaveRibbon.tsx       # 动态音频波形丝带
│   │   ├── MarqueeTitle.tsx          # -13° 跑马灯歌曲标题
│   │   ├── ScrollingLyricsPlayer.tsx # 弹簧平滑滚动双语歌词
│   │   ├── SunlightParticles.tsx     # 阳光丁达尔微尘粒子
│   │   ├── TiltedMusicPlayer.tsx     # -13° 倾斜音乐播放器
│   │   └── VerticalBackground.tsx    # 晴空蔚蓝晕染背景
│   ├── data/                  # 结构化数据
│   │   ├── audio-envelope.json       # 音频包络数据
│   │   └── lyrics.ts                 # 时间戳歌词数据
│   ├── IceCreamMV.tsx         # 16:9 宽屏工程
│   ├── VerticalPlayerMV.tsx   # 9:16 竖屏播放器工程
│   ├── Root.tsx               # Remotion 根注册入口
│   └── index.ts               # 项目入口
├── .gitignore
├── LICENSE                    # MIT 开源协议
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

---

## 📄 开源许可

本项目基于 [MIT License](LICENSE) 开源。

字体资产（`Zen Maru Gothic`）遵循 [SIL Open Font License 1.1](https://scripts.sil.org/OFL) 许可。
