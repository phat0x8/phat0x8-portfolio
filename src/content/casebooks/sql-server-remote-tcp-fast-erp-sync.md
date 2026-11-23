---
title: "SQL Server 2022 Remote TCP/IP & Safe T-SQL Differential Sync for ERP"
titleVi: "Cấu hình SQL Server 2022 Từ xa & Đồng bộ Vi sai T-SQL An toàn cho ERP Kế toán"
summary: "Configured remote TCP/IP connectivity on Windows Server 2022 SQL Server and executed verified Backup/Restore plus non-destructive T-SQL differential syncing for FAST Accounting ERP."
summaryVi: "Thiết lập kết nối TCP/IP từ xa trên SQL Server Windows Server 2022 và thực hiện sao lưu, phục hồi kèm đồng bộ vi sai T-SQL không ghi đè dữ liệu cho phần mềm kế toán FAST."
category: "SysAdmin RCA"
date: "2026-10"
readTime: "~5 min read"
status: "Sanitized RCA"
tags: ["SQL Server 2022", "T-SQL", "SSMS", "Windows Server", "FAST ERP", "Backup/Restore"]
repoUrl: "https://github.com/phat0x8/Enterprise-IT-Operations-Casebook"
impact: "Zero Accounting Downtime Loss"
impactVi: "Toàn vẹn 100% chứng từ kế toán"
order: 4
---

> **OPSEC Sanitization Notice:** Real server IPs, database names, custom ports, and company identifiers have been masked with generic placeholders (`<SQL_HOST>`, `<CUSTOM_PORT>`, `ERP_PROD_DB`).

## 1. Operational Context

A remote warehouse branch required stable TCP/IP connectivity to a central **Microsoft SQL Server** instance running on **Windows Server 2022**, followed by an incident where a factory accounting database missed recent voucher records after a client sync disruption.

## 2. Remote SQL Server TCP/IP Provisioning

1. Opened **SQL Server Configuration Manager** → **SQL Server Network Configuration** → enabled **TCP/IP**.
2. Configured the designated static port (`<CUSTOM_PORT>`) under **IPAll** and cleared dynamic port allocation.
3. Added a scoped Windows Defender Firewall inbound rule restricted to internal branch/VPN subnets only.
4. Restarted `MSSQLSERVER` during an approved maintenance window and validated connectivity from the client endpoint:

```powershell
# Verify TCP port reachability from the remote branch workstation
Test-NetConnection -ComputerName <SQL_HOST> -Port <CUSTOM_PORT>
```

## 3. Non-Destructive T-SQL Differential Recovery

Before touching production accounting records, a full copy-only backup and filesystem snapshot of the ERP data directory were verified. Instead of blindly overwriting active tables, missing records from the staged backup database were reconciled idempotently using `WHERE NOT EXISTS`:

```sql
-- Dry-run verification: count missing records before inserting
SELECT COUNT(*) AS MissingRows
FROM [ERP_STAGING_BACKUP].[dbo].[VoucherHeader] AS src
WHERE NOT EXISTS (
    SELECT 1
    FROM [ERP_PROD_DB].[dbo].[VoucherHeader] AS dst
    WHERE dst.VoucherID = src.VoucherID
);

-- Transactional insert with rollback safety
BEGIN TRANSACTION;

INSERT INTO [ERP_PROD_DB].[dbo].[VoucherHeader] (VoucherID, PostingDate, Amount, BranchCode)
SELECT src.VoucherID, src.PostingDate, src.Amount, src.BranchCode
FROM [ERP_STAGING_BACKUP].[dbo].[VoucherHeader] AS src
WHERE NOT EXISTS (
    SELECT 1
    FROM [ERP_PROD_DB].[dbo].[VoucherHeader] AS dst
    WHERE dst.VoucherID = src.VoucherID
);

-- Verify affected row count matches dry-run before COMMIT
COMMIT TRANSACTION;
```

## 4. Outcome

- Restored full remote accounting connectivity and reconciled missing voucher entries cleanly without clobbering concurrent entries created on the live server.
- Reduced accounting team disruption and documented the pre-change backup checklist in the operations SOP.
