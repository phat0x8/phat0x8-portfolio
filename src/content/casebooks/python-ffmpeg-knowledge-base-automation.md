---
title: "Automation SOP: Standardizing 132 IT Operations Videos with Python & FFmpeg"
titleVi: "SOP Tự động hóa: Chuẩn hóa Kho 132 Video Vận hành IT bằng Python & FFmpeg"
summary: "Redesigned a fragmented 15+ GB screen-recording archive into an ITIL-indexed knowledge base using Python, FFmpeg (libx264 CRF 28), and ffprobe verification — saving >11.4 GB (~80%)."
summaryVi: "Tái cấu trúc kho >15 GB video ghi hình xử lý sự cố rời rạc thành thư viện tri thức chuẩn ITIL bằng Python, FFmpeg (libx264 CRF 28) và kiểm chứng ffprobe — tiết kiệm >11,4 GB (~80%)."
category: "Automation & SOP"
date: "2026-11"
readTime: "~5 min read"
status: "Production Script"
tags: ["Python", "FFmpeg", "ffprobe", "Automation", "ITIL", "Knowledge Base"]
repoUrl: "https://github.com/phat0x8/Enterprise-IT-Operations-Casebook"
impact: "~80% Storage Saved (>11.4 GB)"
impactVi: "Giảm ~80% dung lượng (>11,4 GB)"
order: 5
---

## 1. Problem Statement

Across 12 months of multi-site IT operations, over **132 troubleshooting screen recordings** (~90+ hours of real L1–L2 fixes) accumulated as raw `.mkv` captures exceeding **15 GB** with inconsistent timestamps and filenames. Searching past fixes took minutes instead of seconds.

## 2. ITIL Taxonomy & Naming Convention

Every artifact was categorized into 8 operational domains (`00`–`07`) and normalized to a deterministic filename schema:

```text
YYYY-MM-DD_<Category>_<Action>_<SanitizedRole>_<SiteCode>.mp4
```

## 3. Automated Batch Transcoding & Integrity Verification

Because screen recordings of terminal and desktop GUIs have low motion variance, `libx264` with `CRF 28` and `-tune stillimage` (or fast screen presets) maintains sharp text readability while shrinking storage by ~78–80%.

```python
import subprocess
from pathlib import Path

def compress_and_verify(src: Path, dst: Path) -> bool:
    cmd = [
        "ffmpeg", "-y", "-i", str(src),
        "-c:v", "libx264", "-crf", "28", "-preset", "medium",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        "-c:a", "aac", "-b:a", "64k",
        str(dst),
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0 or not dst.exists():
        return False

    # Verify playable video stream via ffprobe before archiving source
    probe = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=codec_name,duration", "-of", "csv=p=0", str(dst)],
        capture_output=True, text=True,
    )
    return probe.returncode == 0 and "h264" in probe.stdout
```

## 4. Measured Impact

| Metric | Before Automation | After Pipeline |
| :--- | :--- | :--- |
| **Total Standardized Sessions** | 132 unindexed raw files | 132 categorized `.mp4` + `VIDEO_INDEX.md` |
| **Storage Footprint** | ~14.5+ GB raw captures | **~3.1 GB** (>11.4 GB reclaimed / **~80% reduction**) |
| **Lookup Speed** | Manual folder scanning | Instant Markdown search by date, error, or site |
