---
title: "RCA: Windows Temporary Profile Outage (AD / Entra ID Dual-SID Conflict)"
titleVi: "RCA: Khắc phục Sự cố Windows Temporary Profile (Xung đột Dual-SID AD & Entra ID)"
summary: "Investigated and resolved a hybrid identity workstation outage caused by conflicting On-Premises AD and Microsoft Entra ID SIDs in 56 minutes with zero data loss."
summaryVi: "Điều tra và khắc phục triệt để sự cố rơi vào hồ sơ tạm (C:\\Users\\TEMP) do xung đột 2 SID giữa On-Premises AD và Microsoft Entra ID trong 56 phút với 0% mất dữ liệu."
category: "SysAdmin RCA"
date: "2026-11"
readTime: "~6 min read"
status: "Sanitized RCA"
tags: ["Active Directory", "Microsoft Entra ID", "PowerShell", "Windows Registry", "Incident RCA"]
repoUrl: "https://github.com/phat0x8/Enterprise-IT-Operations-Casebook"
impact: "56 min MTTR · 0% Data Loss"
impactVi: "56 phút xử lý · 0% mất dữ liệu"
order: 1
---

> **OPSEC Sanitization Notice:** All usernames, SIDs, hostnames, and domain identifiers in this report have been replaced with generic placeholders (`<USER>`, `S-1-5-21-...`, `CORP-WKSTN-01`).

## 1. Incident Overview

An enterprise workstation logged in under a hybrid identity environment silently fell back to a Windows Temporary User Profile (`C:\Users\TEMP`). All Desktop files, Documents, Outlook profiles, and local application preferences disappeared from the active session.

- **Environment:** Windows 11 Enterprise · Hybrid On-Premises Active Directory + Microsoft Entra ID
- **Resolution Time (MTTR):** 56 minutes (08:58 – 09:54)
- **Data Integrity Outcome:** 100% preserved (0% data loss)

## 2. Diagnostic Triage (PowerShell Evidence)

Before modifying any profile registry keys or file ACLs, the affected session was inspected and safely signed out to release `NTUSER.DAT` file locks.

```powershell
# 1. Inspect active terminal sessions on the workstation
quser

# 2. Query registered local profiles via CIM to spot duplicate/temp SIDs
Get-CimInstance -ClassName Win32_UserProfile |
  Where-Object { $_.LocalPath -match "Users" } |
  Select-Object SID, LocalPath, Special, Loaded |
  Format-Table -AutoSize
```

### Root Cause Identification

CIM inspection and NTFS ACL auditing revealed **two competing SIDs** bound to the same user directory path:

| Identity Source | SID Prefix | Root Cause Behavior |
| :--- | :--- | :--- |
| **On-Premises Active Directory** | `S-1-5-21-<DOMAIN>-<RID>` | Legacy local profile directory owner (`C:\Users\<USER>`) |
| **Microsoft Entra ID (Cloud)** | `S-1-12-1-<TENANT>-<RID>` | Active sign-in identity blocked from claiming profile path, forcing fallback to `C:\Users\TEMP` |

## 3. Safe Remediation Procedure

1. **Pre-change backup:** Verified files created during the temporary session inside `C:\Users\TEMP` and archived them safely into a staging directory.
2. **Registry cleanup:** Audited `HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList`, removing stale `.bak` / corrupted `ProfileImagePath` collision entries after backing up the registry hive.
3. **Clean profile re-initialization:** Allowed the authoritative Microsoft Entra ID identity (`S-1-12-1-...`) to generate a clean profile folder `C:\Users\<USER>`.
4. **Data restoration & sync verification:** Restored archived local files and confirmed full OneDrive / SharePoint synchronization and Outlook profile hydration.

```powershell
# Export ProfileList registry branch before any remediation edit
reg export "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList" C:\Temp\ProfileList_Backup.reg /y

# Verify NTFS ownership and effective ACL on the restored profile
icacls "C:\Users\<USER>"
```

## 4. Preventive Controls & SOP Update

- Documented this Dual-SID diagnostic checklist in the internal IT Runbook so L1 engineers never delete `C:\Users\TEMP` prior to backing up user-created files.
- Standardized pre-migration identity verification checks whenever transitioning endpoints from legacy AD-joined profiles to Entra ID / Intune management.
