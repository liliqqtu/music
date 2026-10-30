"""
Anime Lyric Player MV Automation Pipeline
One-click CLI pipeline to process assets and render high-aesthetic vertical/widescreen music videos.
"""

import argparse
import os
import shutil
import subprocess
import sys

def run_command(cmd: list[str]):
    print("Executing:", " ".join(cmd))
    res = subprocess.run(cmd)
    if res.returncode != 0:
        print(f"Error: command failed with return code {res.returncode}")
        sys.exit(res.returncode)

def main():
    parser = argparse.ArgumentParser(description="One-click Remotion MV Render Pipeline")
    parser.add_argument("--audio", help="Path to input audio (.mp3)")
    parser.add_argument("--bg", help="Path to background image (.jpg / .png)")
    parser.add_argument("--lrc", help="Path to LRC lyrics file")
    parser.add_argument("--zh", help="Path to Chinese translation text file")
    parser.add_argument("--mode", choices=["vertical", "widescreen", "still"], default="vertical", help="Render mode")
    parser.add_argument("--out", default="out/video.mp4", help="Output file path")
    parser.add_argument("--frame", type=int, default=1900, help="Frame number for still mode")
    args = parser.parse_args()

    # 1. Copy audio if provided
    if args.audio and os.path.exists(args.audio):
        dest_audio = "public/audio/icecream-harezora.mp3"
        os.makedirs(os.path.dirname(dest_audio), exist_ok=True)
        shutil.copy2(args.audio, dest_audio)
        print(f"Copied audio to {dest_audio}")
        # Extract audio envelope
        run_command([sys.executable, "scripts/extract_audio_envelope.py", "--audio", dest_audio])

    # 2. Copy background if provided
    if args.bg and os.path.exists(args.bg):
        dest_bg = "public/assets/scenes/icecream-stand-vertical.jpg"
        os.makedirs(os.path.dirname(dest_bg), exist_ok=True)
        shutil.copy2(args.bg, dest_bg)
        print(f"Copied background image to {dest_bg}")

    # 3. Parse LRC if provided
    if args.lrc and os.path.exists(args.lrc):
        parse_cmd = [sys.executable, "scripts/parse_lrc.py", "--lrc", args.lrc]
        if args.zh and os.path.exists(args.zh):
            parse_cmd.extend(["--zh", args.zh])
        run_command(parse_cmd)

    # 4. Render
    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    if args.mode == "vertical":
        run_command(["npx", "remotion", "render", "VerticalPlayerMV", args.out])
    elif args.mode == "widescreen":
        run_command(["npx", "remotion", "render", "IceCreamMV", args.out])
    elif args.mode == "still":
        run_command(["npx", "remotion", "still", "VerticalPlayerMV", args.out, f"--frame={args.frame}"])

    print("Pipeline finished successfully! Output:", args.out)

if __name__ == "__main__":
    main()
