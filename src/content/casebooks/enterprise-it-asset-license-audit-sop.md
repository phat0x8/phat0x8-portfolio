---
title: "SOP: Multi-Site IT Asset Inventory & Software License Compliance Audit"
titleVi: "SOP: Kiểm kê Tài sản CNTT & Đánh giá Tuân thủ Bản quyền Đa chi nhánh"
summary: "Standardized PowerShell audit workflow used across corporate offices and showrooms to collect Hostnames, MAC addresses, OS/M365/CAD license status, and eliminate risky unlicensed software."
summaryVi: "Quy trình chuẩn hóa bằng PowerShell áp dụng cho văn phòng và showroom nhằm thu thập Hostname, địa chỉ MAC, trạng thái bản quyền Windows/M365/CAD và loại bỏ phần mềm rủi ro."
category: "Automation & SOP"
date: "2026-09"
readTime: "~4 min read"
status: "Sanitized SOP"
tags: ["PowerShell", "IT Asset Audit", "License Compliance", "OPSEC", "Windows"]
repoUrl: "https://github.com/phat0x8/Enterprise-IT-Operations-Casebook"
impact: "Multi-Site Compliance Visibility"
impactVi: "Chuẩn hóa bản quyền đa chi nhánh"
order: 6
---

## 1. Objective

Shadow IT and unlicensed PDF or design utilities create both legal compliance exposure and malware supply-chain risk (trojanized cracks/keygens). This SOP establishes a fast, non-intrusive PowerShell collection pass for multi-site workstations.

## 2. Read-Only Endpoint Audit Script

```powershell
# Collect Hostname, OS build, active NIC MAC addresses, and Windows activation status
$computer = $env:COMPUTERNAME
$os = Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version
$nics = Get-NetAdapter | Where-Object { $_.Status -eq 'Up' } |
  Select-Object Name, MacAddress, LinkSpeed

$license = Get-CimInstance SoftwareLicensingProduct -Filter "ApplicationID='55c92734-d682-4d71-98e3-d6ec3f16059f' AND PartialProductKey IS NOT NULL" |
  Select-Object Name, LicenseStatus

[PSCustomObject]@{
  Timestamp     = (Get-Date -Format "yyyy-MM-dd HH:mm")
  Hostname      = $computer
  OS            = $os.Caption
  ActiveMACs    = ($nics.MacAddress -join "; ")
  WinActivated  = ($license.LicenseStatus -contains 1)
}
```

## 3. Remediation & Hardening Actions

1. **Asset Register Reconciliation:** Mapped collected Hostname + MAC pairs against DHCP reservations and branch switch/router tables.
2. **Risky Software Elimination:** Audited installed programs across Showroom and HQ endpoints, cleanly removing unauthorized PDF/utility installers with **Revo Uninstaller** and standardizing safe free alternatives (such as **PDFgear**).
3. **Phishing & Access Hygiene:** Paired audit visits with quick end-user verification of Barracuda/Azure VPN clients and phishing email triage awareness.
