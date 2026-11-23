---
title: "DFIR Casebook: NIST CFReDS Data Leakage Investigation Workflow"
titleVi: "Hồ sơ DFIR: Quy trình Điều tra Rò rỉ Dữ liệu Chuẩn NIST CFReDS"
summary: "End-to-end digital forensics methodology across 15 Kali Linux labs covering bit-stream imaging, file carving, Registry hives (RegRipper), NTFS $UsnJrnl, Prefetch, and Event Logs."
summaryVi: "Quy trình điều tra số trọn gói qua 15 bài lab Kali Linux: trích xuất ảnh đĩa bit-stream, file carving, phân tích Windows Registry (RegRipper), NTFS $UsnJrnl, Prefetch và Event Logs."
category: "DFIR Lab"
date: "2026-11"
readTime: "~7 min read"
status: "Lab Verified"
tags: ["DFIR", "Kali Linux", "The Sleuth Kit", "Autopsy", "RegRipper", "NTFS", "NIST CFReDS"]
repoUrl: "https://github.com/phat0x8/DFIR-Forensics-Casebook"
impact: "15 End-to-End DFIR Labs"
impactVi: "15 bài điều tra số hoàn chỉnh"
order: 2
---

## 1. Investigation Scope

This casebook summarizes the repeatable forensic triage pipeline executed across **15 hands-on DFIR labs** (`FRS301`), anchored on the **NIST CFReDS Data Leakage** scenario. Every step enforces strict evidence preservation and verifiable hashing before analysis begins.

## 2. Evidence Acquisition & Integrity Verification

Never analyze a live/raw image directly without recording cryptographic hashes and working exclusively on read-only copies.

```bash
# Verify image integrity before & after mounting
sha256sum evidence_disk.dd > evidence_disk.sha256
sha256sum -c evidence_disk.sha256

# Inspect partition layout using The Sleuth Kit (TSK)
mmls evidence_disk.dd

# List NTFS filesystem metadata at the discovered sector offset
fsstat -o 2048 evidence_disk.dd
```

## 3. Core Artifact Extraction Matrix

| Artifact Category | Windows Location | Tooling Used | Investigative Question Answered |
| :--- | :--- | :--- | :--- |
| **USB & Removable Media** | `SYSTEM\CurrentControlSet\Enum\USBSTOR` | RegRipper / Registry Explorer | Which external storage devices were attached and when? |
| **Program Execution** | `C:\Windows\Prefetch\*.pf` & `UserAssist` | PECmd / RegRipper | Which tools (archivers, exfil clients, browsers) executed? |
| **Filesystem Timeline** | `$MFT`, `$UsnJrnl:$J`, `$LogFile` | TSK (`fls`, `mactime`) / Autopsy | Which sensitive files were copied, renamed, or deleted? |
| **Deleted File Recovery** | Unallocated space / slack space | `tsk_recover`, `scalpel`, `foremost` | Can deleted exfiltrated documents be carved and verified? |
| **Security Telemetry** | `Security.evtx`, `Microsoft-Windows-USB*` | EvtxECmd / Python | Correlate logon sessions (4624/4625) with exfil timestamps |

## 4. Super-Timeline Generation with The Sleuth Kit

```bash
# Generate bodyfile from NTFS partition (offset 2048)
fls -r -m "C:/" -o 2048 evidence_disk.dd > bodyfile.txt

# Convert bodyfile into chronological CSV timeline
mactime -b bodyfile.txt -d -z UTC > timeline.csv

# Filter timeline around suspected exfiltration window
grep -E "2026-03-(14|15)" timeline.csv | head -n 40
```

## 5. Registry Triage via RegRipper

```bash
# Extract USB history, MountedDevices, and RecentDocs from exported hives
rip.pl -r SYSTEM -p usbstor > usb_history.txt
rip.pl -r NTUSER.DAT -p recentdocs > recent_docs.txt
rip.pl -r NTUSER.DAT -p userassist > user_execution.txt
```

## 6. Key Analytical Lessons

- **Cross-artifact corroboration prevents false positives:** A single Prefetch timestamp or deleted file entry is rarely conclusive until correlated across USBSTOR serial numbers, `LNK` jump lists, and `$UsnJrnl` deletion events.
- **Timezone discipline:** Normalize all extracted timestamps to **UTC** before merging Registry, Event Log, and Browser SQLite evidence into the master incident timeline.
