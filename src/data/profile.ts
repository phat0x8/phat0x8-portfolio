export interface ResearchItem {
  slug: string;
  index: string;
  code: string;
  badge: string;
  badgeTone: 'emerald' | 'cyan' | 'amber';
  title: string;
  titleVi: string;
  venue: string;
  venueVi: string;
  period: string;
  summary: string;
  summaryVi: string;
  metricBadge: string;
  metricSub: string;
  repoName: string;
  repoUrl: string;
  tags: string[];
  workflow: { step: string; en: string; vi: string }[];
  kpis: { labelEn: string; labelVi: string; value: string; noteEn: string; noteVi: string }[];
  sections: {
    num: string;
    labelEn: string;
    labelVi: string;
    bodyEn: string[];
    bodyVi: string[];
  }[];
  artifacts: { name: string; descEn: string; descVi: string }[];
}

export interface ProjectItem {
  index: string;
  category: 'security' | 'embedded';
  code: string;
  title: string;
  titleVi: string;
  period: string;
  badge: string;
  badgeTone: 'emerald' | 'cyan' | 'amber' | 'rose';
  summary: string;
  summaryVi: string;
  highlightsEn: string[];
  highlightsVi: string[];
  metric: string;
  tags: string[];
  repoName?: string;
  repoUrl?: string;
  liveUrl?: string;
}

export const PROFILE = {
  fullName: 'Tan Phat Nguyen',
  vietnameseName: 'Nguyễn Tấn Phát',
  handle: 'phat0x8',
  brand: 'PHAT0X8.',
  brandSub: 'SECURITY & OPS',
  location: 'Ho Chi Minh City, Vietnam',
  locationVi: 'TP. Hồ Chí Minh, Việt Nam',
  email: 'phat0x8.nt.work@gmail.com',
  github: 'https://github.com/phat0x8',
  githubOrg: 'https://github.com/DevSecOps-Researchers-Labs',
  githubOrgName: 'DevSecOps_Researchers_Labs',
  linkedin: 'https://www.linkedin.com/in/tan-phat-nguyen-6a4860252/',
  credly: 'https://www.credly.com/users/nguyen-tan-phat.37e2d608',
  cvEn: '/cv/Tan_Phat_Nguyen_CV_EN.pdf',
  cvVi: '/cv/Tan_Phat_Nguyen_CV_VN.pdf',
  avatar: '/avatar.jpeg',
  roleEn: 'Information Security Engineer | SOC / DFIR • SysAdmin • AI Security',
  roleVi: 'Kỹ sư An toàn Thông tin | SOC / DFIR • SysAdmin • AI Security',
  statusEn: 'OJT Ready · SOC / DFIR / SysAdmin',
  statusVi: 'Sẵn sàng OJT · SOC / DFIR / SysAdmin',
  eduPillEn: 'FPTU IA · IEEE ICEEIS ’26',
  eduPillVi: 'ĐH FPT ATTT · Tác giả IEEE ’26',
  sidebarBioEn:
    'FPT University Information Assurance student with 1+ year of multi-site enterprise SysAdmin experience, IEEE-accepted AI threat intelligence research, and hands-on DFIR/AppSec engineering.',
  sidebarBioVi:
    'Sinh viên An toàn Thông tin ĐH FPT với 1+ năm quản trị hệ thống doanh nghiệp đa chi nhánh, nghiên cứu AI Threat Intelligence (IEEE ICEEIS ’26) và thực chiến DFIR/AppSec.',
};

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    slug: 'secbert-mitre-attack',
    index: '01',
    code: 'IEEE_ICEEIS_2026 // TRACK_228',
    badge: 'Accepted Abstract · IEEE Xplore',
    badgeTone: 'emerald',
    title: 'Automated MITRE ATT&CK TTP Classification with SecBERT',
    titleVi: 'Phân loại Tự động Kỹ thuật MITRE ATT&CK bằng SecBERT',
    venue: 'ICEEIS 2026 (HCM-UTE · IEEE Xplore Track #228) — First Author',
    venueVi: 'Hội nghị ICEEIS 2026 (HCM-UTE · IEEE Xplore Track #228) — Tác giả chính',
    period: '08/2026 – 11/2026',
    summary:
      'Fine-tuned domain-specific SecBERT (109M parameters) with Contextual Data Augmentation (CDA), Iterative Stratification, and Focal Loss across TRAM 1, TRAM 2, and rcATT (25,757+ CTI samples) to mitigate severe class imbalance (171.25×) in automated MITRE ATT&CK mapping.',
    summaryVi:
      'Tinh chỉnh mô hình SecBERT (109 triệu tham số) kết hợp Contextual Data Augmentation (CDA), Iterative Stratification và Focal Loss trên 3 bộ dữ liệu TRAM 1, TRAM 2 và rcATT (25.757+ mẫu CTI) nhằm giải quyết mất cân bằng lớp nghiêm trọng (171,25×) khi ánh xạ MITRE ATT&CK tự động.',
    metricBadge: '0.6818 F1',
    metricSub: '+74.8% TRAM 2',
    repoName: 'Secbert-cda-attack-classification',
    repoUrl: 'https://github.com/phat0x8/Secbert-cda-attack-classification',
    tags: ['Python', 'PyTorch', 'SecBERT', 'NLP', 'MITRE ATT&CK', 'Focal Loss', 'CTI'],
    workflow: [
      { step: '01', en: 'CTI Corpus Audit', vi: 'Phân tích tập CTI' },
      { step: '02', en: 'Contextual Augment', vi: 'Tăng cường ngữ cảnh CDA' },
      { step: '03', en: 'SecBERT + Focal Loss', vi: 'Huấn luyện SecBERT' },
      { step: '04', en: 'Cross-Dataset Eval', vi: 'Đánh giá đa bộ dữ liệu' },
    ],
    kpis: [
      {
        labelEn: 'TRAM 1 Micro-F1',
        labelVi: 'Micro-F1 trên TRAM 1',
        value: '0.6818',
        noteEn: 'Across 50 ATT&CK techniques',
        noteVi: 'Trên 50 kỹ thuật MITRE ATT&CK',
      },
      {
        labelEn: 'TRAM 2 Improvement',
        labelVi: 'Cải thiện trên TRAM 2',
        value: '+74.8%',
        noteEn: 'Reached 0.5847 Micro-F1 under extreme imbalance',
        noteVi: 'Đạt 0.5847 Micro-F1 dưới mức mất cân bằng cao',
      },
      {
        labelEn: 'CTI Dataset Scale',
        labelVi: 'Quy mô dữ liệu CTI',
        value: '25,757+',
        noteEn: 'Samples across TRAM 1, TRAM 2 & rcATT',
        noteVi: 'Mẫu phân tích trên TRAM 1, TRAM 2 & rcATT',
      },
    ],
    sections: [
      {
        num: '01',
        labelEn: 'PROBLEM STATEMENT',
        labelVi: 'BÀI TOÁN NGHIÊN CỨU',
        bodyEn: [
          'SOC analysts and Cyber Threat Intelligence (CTI) teams spend substantial manual effort mapping unstructured threat reports into structured MITRE ATT&CK Techniques, Tactics, and Procedures (TTPs).',
          'Existing public CTI benchmarks suffer from extreme long-tail class imbalance (up to 171.25× ratio between head and tail techniques across 5,089 single-label samples), causing standard Transformer baselines to collapse on rare but high-impact attack techniques.',
        ],
        bodyVi: [
          'Đội ngũ SOC và Cyber Threat Intelligence (CTI) tốn rất nhiều thời gian để ánh xạ thủ công các báo cáo tấn công dạng văn bản tự do sang mã kỹ thuật MITRE ATT&CK (TTPs).',
          'Các bộ dữ liệu CTI công khai bị mất cân bằng lớp nghiêm trọng dạng đuôi dài (tỷ lệ chênh lệch tới 171,25× giữa nhóm phổ biến và nhóm hiếm trên 5.089 mẫu đơn nhãn), khiến các mô hình Transformer tiêu chuẩn dễ bỏ sót các kỹ thuật tấn công hiếm nhưng nguy hiểm.',
        ],
      },
      {
        num: '02',
        labelEn: 'METHODOLOGY & ARCHITECTURE',
        labelVi: 'PHƯƠNG PHÁP & KIẾN TRÚC',
        bodyEn: [
          'Built an end-to-end training pipeline around jackaduma/SecBERT (109M parameters pre-trained on cybersecurity corpora) paired with a custom Contextual Data Augmenter (CDA) that preserves technical IOC semantics while expanding minority TTP classes.',
          'Combined Iterative Stratification for multi-label split fidelity with Focal Loss to down-weight well-classified majority techniques and focus gradient updates on hard minority attack patterns.',
        ],
        bodyVi: [
          'Xây dựng pipeline huấn luyện hoàn chỉnh dựa trên jackaduma/SecBERT (109 triệu tham số tiền huấn luyện trên ngữ liệu an ninh mạng), kết hợp bộ tăng cường dữ liệu theo ngữ cảnh (CDA) giữ nguyên ngữ nghĩa kỹ thuật và mở rộng các lớp TTP thiểu số.',
          'Áp dụng Iterative Stratification để chia tập đa nhãn chuẩn xác và Focal Loss nhằm giảm trọng số các mẫu dễ, tập trung cập nhật gradient vào các kỹ thuật tấn công khó và hiếm gặp.',
        ],
      },
      {
        num: '03',
        labelEn: 'QUANTITATIVE FINDINGS & PUBLICATION',
        labelVi: 'KẾT QUẢ ĐỊNH LƯỢNG & CÔNG BỐ',
        bodyEn: [
          'Achieved 0.6818 Micro-F1 on TRAM 1 and improved TRAM 2 performance by +74.8% (reaching 0.5847 Micro-F1) compared against imbalanced baseline configurations.',
          'Research abstract officially accepted as First Author at ICEEIS 2026 (International Conference on Electrical Engineering and Informatics Systems — IEEE Xplore Track #228, HCM-UTE).',
        ],
        bodyVi: [
          'Đạt 0.6818 Micro-F1 trên TRAM 1 và cải thiện +74,8% trên TRAM 2 (đạt 0.5847 Micro-F1) so với cấu hình baseline chưa xử lý mất cân bằng.',
          'Tóm tắt nghiên cứu đã được chấp nhận chính thức với vai trò Tác giả chính tại hội nghị quốc tế ICEEIS 2026 (IEEE Xplore Track #228, tổ chức tại HCM-UTE).',
        ],
      },
      {
        num: '04',
        labelEn: 'REPRODUCIBILITY & CODE HYGIENE',
        labelVi: 'TÍNH TÁI LẬP & CHUẨN HÓA MÃ NGUỒN',
        bodyEn: [
          'Published reproducible Python analysis & classification scripts, standardized CITATION.cff (CFF 1.2.0), pinned requirements.txt, and dataset imbalance profiling utilities in the public GitHub repository.',
        ],
        bodyVi: [
          'Công khai mã nguồn Python phân tích dữ liệu & huấn luyện có thể tái lập, bổ sung chuẩn trích dẫn CITATION.cff (CFF 1.2.0), file requirements.txt đầy đủ và công cụ đo lường mất cân bằng tập dữ liệu trên GitHub.',
        ],
      },
    ],
    artifacts: [
      {
        name: 'src/dataset_analysis.py',
        descEn: 'Profiles 5,089 CTI samples across 50 ATT&CK techniques and computes 171.25× imbalance metrics.',
        descVi: 'Phân tích 5.089 mẫu CTI trên 50 kỹ thuật ATT&CK và tính chỉ số mất cân bằng 171,25×.',
      },
      {
        name: 'src/secbert_classifier.py',
        descEn: 'SecBERT fine-tuning pipeline with ContextualDataAugmenter and Focal Loss.',
        descVi: 'Pipeline tinh chỉnh SecBERT tích hợp ContextualDataAugmenter và Focal Loss.',
      },
      {
        name: 'CITATION.cff',
        descEn: 'Standardized CFF 1.2.0 academic citation metadata for IEEE ICEEIS 2026.',
        descVi: 'Metadata trích dẫn khoa học chuẩn CFF 1.2.0 cho hội nghị IEEE ICEEIS 2026.',
      },
    ],
  },
  {
    slug: 'schr-bench-llm-re',
    index: '02',
    code: 'AI_SEC_BENCHMARK // SPRINGER_LNICST',
    badge: 'LLM Reverse Engineering Eval',
    badgeTone: 'cyan',
    title: 'SCHR-Bench: Measuring LLM Hallucination in x86_64 Binary Reverse Engineering',
    titleVi: 'SCHR-Bench: Đánh giá Ảo giác LLM trong Dịch ngược Binary x86_64 PE',
    venue: 'IAM302t Research Group (G7) · Targeted for Springer LNICST / SNAPP',
    venueVi: 'Nghiên cứu IAM302t (Nhóm G7) · Định hướng công bố Springer LNICST / SNAPP',
    period: '09/2026 – 11/2026',
    summary:
      'Constructed a reproducible evaluation benchmark of 80 compiled x86_64 PE binaries and 1,020 structured LLM evaluations to systematically measure semantic correctness versus hallucination rates during AI-assisted malware & binary reverse engineering.',
    summaryVi:
      'Xây dựng bộ benchmark có tính tái lập gồm 80 tệp thực thi x86_64 PE biên dịch và 1.020 lượt đánh giá LLM có cấu trúc nhằm đo lường hệ thống độ chính xác ngữ nghĩa và tỷ lệ ảo giác khi dùng AI hỗ trợ dịch ngược mã độc/binary.',
    metricBadge: '1,020 Evals',
    metricSub: '80 x86_64 PEs',
    repoName: 'IAM302t_SCHR_Bench',
    repoUrl: 'https://github.com/phat0x8/IAM302t_SCHR_Bench',
    tags: ['C / x86_64', 'Ghidra', 'LLM Security', 'Reverse Engineering', 'Python', 'Benchmarking'],
    workflow: [
      { step: '01', en: 'C/PE Binary Corpus', vi: 'Biên dịch tập mẫu PE' },
      { step: '02', en: 'Ghidra Decompile', vi: 'Dịch ngược bằng Ghidra' },
      { step: '03', en: 'Prompt Harness', vi: 'Chạy 1.020 lượt đánh giá' },
      { step: '04', en: 'Hallucination Audit', vi: 'Phân loại lỗi ảo giác' },
    ],
    kpis: [
      {
        labelEn: 'Binary Corpus',
        labelVi: 'Tập mẫu Binary',
        value: '80 PEs',
        noteEn: 'Controlled x86_64 PE samples with ground truth',
        noteVi: 'Mẫu x86_64 PE có đối chiếu ground truth',
      },
      {
        labelEn: 'Total Evaluations',
        labelVi: 'Tổng lượt đánh giá',
        value: '1,020',
        noteEn: 'Structured multi-model prompt runs',
        noteVi: 'Lượt chạy chuẩn hóa trên nhiều mô hình LLM',
      },
      {
        labelEn: 'Security Focus',
        labelVi: 'Trọng tâm bảo mật',
        value: 'AI + RE',
        noteEn: 'Quantifying false indicators in triage',
        noteVi: 'Định lượng rủi ro nhận diện sai khi phân tích mã độc',
      },
    ],
    sections: [
      {
        num: '01',
        labelEn: 'MOTIVATION',
        labelVi: 'ĐỘNG LỰC NGHIÊN CỨU',
        bodyEn: [
          'Malware analysts increasingly rely on LLMs to summarize stripped decompiled C output from Ghidra or IDA. However, fabricated API behavior, nonexistent C2 logic, or wrong control-flow assumptions can mislead incident response triage.',
        ],
        bodyVi: [
          'Các chuyên gia phân tích mã độc ngày càng dựa vào LLM để tóm tắt mã giả C dịch ngược từ Ghidra/IDA. Tuy nhiên, việc mô hình bịa đặt hành vi API, giả định sai luồng điều khiển hoặc sinh ra IOC không có thật có thể làm lệch hướng ứng cứu sự cố.',
        ],
      },
      {
        num: '02',
        labelEn: 'BENCHMARK DESIGN',
        labelVi: 'THIẾT KẾ BENCHMARK',
        bodyEn: [
          'Compiled 80 controlled x86_64 Windows PE binaries covering deterministic algorithmic, system, and security-relevant behaviors, then extracted stripped decompilation artifacts for blind LLM inspection across 1,020 evaluation trials.',
          'Scored outputs with strict rubric criteria separating factual semantic recovery from unsupported hallucinations.',
        ],
        bodyVi: [
          'Biên dịch 80 tệp x86_64 Windows PE có kiểm soát bao phủ các hành vi thuật toán, hệ thống và đặc trưng bảo mật, sau đó trích xuất mã dịch ngược đã gỡ ký hiệu (stripped) để chạy 1.020 lượt kiểm thử mù trên LLM.',
          'Chấm điểm theo bộ tiêu chí nghiêm ngặt tách bạch giữa nhận diện ngữ nghĩa đúng và các suy diễn ảo giác không có cơ sở trong binary.',
        ],
      },
      {
        num: '03',
        labelEn: 'PRACTICAL TAKEAWAYS FOR SOC / RE TEAMS',
        labelVi: 'Ý NGHĨA THỰC TIỄN CHO ĐỘI SOC / RE',
        bodyEn: [
          'Demonstrates why human-in-the-loop verification against disassembly and dynamic telemetry remains mandatory whenever LLMs are integrated into malware triage pipelines.',
        ],
        bodyVi: [
          'Khẳng định rõ lý do quy trình xác minh có con người kiểm chứng (human-in-the-loop) đối chiếu với mã hợp ngữ và telemetry động vẫn là bắt buộc khi tích hợp LLM vào dây chuyền phân tích mã độc.',
        ],
      },
      {
        num: '04',
        labelEn: 'ACADEMIC RIGOR & ANONYMIZATION',
        labelVi: 'CHUẨN MỰC HỌC THUẬT',
        bodyEn: [
          'Prepared anonymized double-blind manuscript package and reproducible dataset/script repository aligned with Springer LNICST formatting standards.',
        ],
        bodyVi: [
          'Hoàn thiện bản thảo ẩn danh theo chuẩn phản biện mù đôi (double-blind) cùng kho mã nguồn/dữ liệu tái lập tuân thủ định dạng Springer LNICST.',
        ],
      },
    ],
    artifacts: [
      {
        name: '80 x86_64 PE Corpus',
        descEn: 'Controlled compiled binaries with documented source ground truth.',
        descVi: 'Tập 80 binary biên dịch có đối chiếu mã nguồn gốc rõ ràng.',
      },
      {
        name: '1,020 Eval Logs',
        descEn: 'Structured scoring records quantifying semantic recall and hallucination taxonomy.',
        descVi: 'Nhật ký 1.020 lượt đánh giá định lượng độ chính xác và phân loại ảo giác.',
      },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    index: '01',
    category: 'security',
    code: 'APPSEC // OWASP_TOP_10',
    title: 'GetApps Travel Platform — OWASP Top 10 Hardened Web App',
    titleVi: 'GetApps Travel Platform — Web App Bảo mật Chuẩn OWASP Top 10',
    period: '09/2026 – 11/2026',
    badge: '151/151 Pytest Pass',
    badgeTone: 'emerald',
    summary:
      'Production Flask web platform (ges.id.vn) deployed on Ubuntu 24.04 LTS behind Cloudflare Zero Trust Tunnel with defense-in-depth hardening against OWASP Top 10:2021 and a built-in SOC Security Audit Dashboard.',
    summaryVi:
      'Nền tảng web Flask vận hành thực tế (ges.id.vn) trên Ubuntu 24.04 LTS phía sau Cloudflare Zero Trust Tunnel, gia cố phòng thủ nhiều lớp theo chuẩn OWASP Top 10:2021 kèm bảng điều khiển SOC Security Audit.',
    highlightsEn: [
      'Proxy-aware rate limiting, strict CSP & Bleach XSS sanitization, CSRF tokens, SSRF-safe redirects, and magic-byte file upload validation.',
      'Automated security & regression test suite achieving 151/151 Pytest passing before deployment.',
    ],
    highlightsVi: [
      'Giới hạn tần suất nhận diện proxy, CSP nghiêm ngặt + lọc XSS bằng Bleach, chống CSRF, kiểm soát redirect chống SSRF và kiểm tra magic-byte tệp tải lên.',
      'Bộ kiểm thử tự động đạt 151/151 test case Pytest pass hoàn toàn trước khi triển khai.',
    ],
    metric: '151/151 Tests',
    tags: ['Python', 'Flask', 'SQLAlchemy', 'Docker', 'Cloudflare Zero Trust', 'OWASP Top 10', 'Pytest'],
    repoName: 'GetApps-Travel-Platform',
    repoUrl: 'https://github.com/phat0x8/GetApps-Travel-Platform',
  },
  {
    index: '02',
    category: 'security',
    code: 'DATA_INFRA // OJT_LAB_FPT',
    title: 'Real-Time Air & Log Monitoring Pipeline (Fault-Tolerant Cluster)',
    titleVi: 'Hệ thống Giám sát Dữ liệu & Log Thời gian thực Chịu lỗi (OJT Lab FPT)',
    period: '04/2026 – 09/2026',
    badge: '4 Chaos Scenarios Verified',
    badgeTone: 'cyan',
    summary:
      'Architected a fault-tolerant real-time telemetry pipeline combining Apache Kafka (KRaft mode), Spark Structured Streaming, and Apache Cassandra across a 3-node Docker Swarm cluster with HAProxy TCP load balancing and Prometheus/Grafana observability.',
    summaryVi:
      'Thiết kế kiến trúc pipeline thu thập & giám sát dữ liệu thời gian thực chịu lỗi gồm Apache Kafka (KRaft), Spark Structured Streaming và Cassandra trên cụm 3 node Docker Swarm với cân bằng tải HAProxy và giám sát Prometheus/Grafana.',
    highlightsEn: [
      'Executed 4 automated chaos/fault-tolerance tests (Kafka Broker failure, Cassandra Node drop, Spark Worker kill, and VM network partition).',
      'Verified automatic leader re-election, self-healing recovery, and zero end-to-end data loss.',
    ],
    highlightsVi: [
      'Xây dựng và chạy 4 kịch bản kiểm thử chịu lỗi tự động (sập Kafka Broker, mất node Cassandra, dừng Spark Worker và chia cắt mạng VM).',
      'Xác minh cơ chế tự bầu leader, tự phục hồi (self-healing) và bảo toàn dữ liệu xuyên suốt.',
    ],
    metric: '3-Node Swarm',
    tags: ['Apache Kafka (KRaft)', 'Spark Streaming', 'Cassandra', 'Docker Swarm', 'HAProxy', 'Grafana', 'Prometheus'],
  },
  {
    index: '03',
    category: 'security',
    code: 'ENTERPRISE_OPS // GLOBAL_HOME',
    title: 'Enterprise IT Operations Casebook & FFmpeg Automation Pipeline',
    titleVi: 'Hồ sơ Vận hành Hạ tầng CNTT Doanh nghiệp & Tự động hóa Python/FFmpeg',
    period: '11/2025 – Present',
    badge: '130+ Incidents · -80% Storage',
    badgeTone: 'amber',
    summary:
      'Sanitized operational portfolio documenting 1+ year of multi-site Windows Server, Active Directory, Microsoft Entra ID/Intune, SQL Server, network redesign, IT asset compliance audits, and a Python + FFmpeg archival automation pipeline.',
    summaryVi:
      'Hồ sơ vận hành đã ẩn danh hóa ghi nhận hơn 1 năm quản trị hệ thống đa chi nhánh (Windows Server, AD, Entra ID/Intune, SQL Server, tối ưu WiFi nhà máy, kiểm kê bản quyền) cùng pipeline tự động hóa lưu trữ bằng Python + FFmpeg.',
    highlightsEn: [
      'Resolved 130+ L1–L2 incidents across 5+ locations (HQ, Showrooms, 3 Manufacturing Plants) including a 56-minute Dual-SID AD/Entra ID RCA with 0% data loss.',
      'Standardized 132 technical sessions (90+ hours) via Python + FFmpeg (libx264 CRF 28) + ffprobe validation, cutting storage by ~80% (>11.4 GB saved).',
    ],
    highlightsVi: [
      'Xử lý 130+ ca hỗ trợ L1–L2 tại 5+ điểm làm việc (Văn phòng, Showroom, 3 Nhà máy), nổi bật là ca RCA xung đột Dual-SID AD/Entra ID trong 56 phút với 0% mất dữ liệu.',
      'Chuẩn hóa kho 132 video tri thức (90+ giờ) bằng Python + FFmpeg + kiểm chứng ffprobe, giảm ~80% dung lượng (tiết kiệm >11,4 GB).',
    ],
    metric: '>11.4 GB Saved',
    tags: ['Windows Server 2022', 'Active Directory', 'Entra ID / Intune', 'SQL Server', 'PowerShell', 'Python', 'FFmpeg'],
    repoName: 'Enterprise-IT-Operations-Casebook',
    repoUrl: 'https://github.com/phat0x8/Enterprise-IT-Operations-Casebook',
  },
  {
    index: '04',
    category: 'embedded',
    code: 'IOT_SECURITY // CWE_798_125',
    title: 'Smart Digital Clock ESP8266 — Fault-Tolerant & Hardened Firmware',
    titleVi: 'Firmware ESP8266 Chịu lỗi & Gia cố Bảo mật (IOT102)',
    period: '2025 – 2026',
    badge: 'CWE-798 / CWE-125 Mitigated',
    badgeTone: 'rose',
    summary:
      'Hardened embedded ESP8266 firmware (1,053+ LOC) featuring Standalone Fail-Safe Offline Mode, decoupled credential injection via compile-time secrets.h isolation, Git history sanitization, and an accompanying IEEE-formatted technical report.',
    summaryVi:
      'Gia cố bảo mật firmware nhúng ESP8266 (1.053+ dòng code) với chế độ chạy độc lập Fail-Safe Offline, tách biệt hoàn toàn token/Wi-Fi qua cơ chế secrets.h lúc biên dịch, làm sạch lịch sử Git chống lộ secret và báo cáo chuẩn IEEE.',
    highlightsEn: [
      'Eliminated hardcoded Blynk/Wi-Fi credentials (CWE-798) and bounded sensor buffer operations (CWE-125).',
      'Includes standalone hardware verification sketches (DS1302/DHT11, MAX30102) and LaTeX IEEE conference paper source.',
    ],
    highlightsVi: [
      'Loại bỏ hoàn toàn thông tin xác thực cứng trong mã nguồn (CWE-798) và kiểm soát biên bộ đệm cảm biến (CWE-125).',
      'Đính kèm bộ sketch kiểm thử phần cứng độc lập (DS1302/DHT11, MAX30102) và mã nguồn báo cáo LaTeX chuẩn IEEE.',
    ],
    metric: 'Fail-Safe IoT',
    tags: ['C / C++', 'ESP8266', 'Arduino', 'IoT Security', 'CWE-798', 'LaTeX IEEE'],
    repoName: 'Smart_Digital_Clock_with_Arduino',
    repoUrl: 'https://github.com/phat0x8/Smart_Digital_Clock_with_Arduino',
  },
];

export const EXPERIENCE_TIMELINE = [
  {
    period: '05/2026 – Present',
    periodVi: '05/2026 – Hiện tại',
    roleEn: 'Technical Branch Member',
    roleVi: 'Thành viên Ban Kỹ thuật',
    org: 'FPT Information Assurance Club (FIA)',
    location: 'FPT University HCMC',
    type: 'community',
    bulletsEn: [
      'Collaborate on hands-on DFIR, Web AppSec, and Blue Team incident response labs under the IA Department.',
      'Represent the club in national Capture The Flag (CTF) competitions (Vietnam Student InfoSec Contest) and peer-led security workshops.',
    ],
    bulletsVi: [
      'Phối hợp tổ chức và thực hành các buổi lab DFIR, Web AppSec và ứng cứu sự cố Blue Team trực thuộc bộ môn An toàn Thông tin.',
      'Đại diện CLB tham gia các đấu trường CTF cấp quốc gia (Sinh viên An ninh mạng) và chia sẻ kỹ thuật nội bộ.',
    ],
  },
  {
    period: '11/2025 – Present',
    periodVi: '11/2025 – Hiện tại',
    roleEn: 'System Administrator & IT Support (Part-time)',
    roleVi: 'Quản trị Hệ thống & IT Support (Part-time)',
    org: 'Global Home Group',
    location: 'Multi-Site · Ho Chi Minh City (5+ Sites)',
    type: 'work',
    bulletsEn: [
      'Administer Windows Server 2022, Active Directory (ADUC/GPO), Microsoft Entra ID, Intune, and M365 across HQ, Showrooms, and 3 Manufacturing Plants (130+ documented L1–L2 incidents).',
      'Resolved a critical AD / Entra ID Dual-SID Temporary Profile outage via PowerShell & Registry in 56 minutes with 0% data loss and authored the internal RCA.',
      'Configured SQL Server 2022 TCP/IP remote access & T-SQL sync for FAST ERP; redesigned factory Ruijie/TP-Link/DrayTek WiFi networks and led multi-site IT Asset & License Compliance Audits.',
      'Built a Python + FFmpeg archival workflow standardizing 132 technical recordings (90+ hours), reducing storage by ~80% (>11.4 GB saved).',
    ],
    bulletsVi: [
      'Quản trị Windows Server 2022, Active Directory (ADUC/GPO), Microsoft Entra ID, Intune và M365 trên 5+ chi nhánh (Văn phòng, Showroom, 3 Nhà máy) với 130+ ca hỗ trợ L1–L2.',
      'Xử lý triệt để sự cố Windows Temporary Profile do xung đột Dual-SID (AD & Entra ID) trong 56 phút với 0% mất dữ liệu và viết báo cáo RCA chuẩn.',
      'Cấu hình kết nối từ xa SQL Server 2022 & đồng bộ T-SQL cho ERP kế toán FAST; tái cấu trúc WiFi nhà máy (Ruijie/TP-Link/DrayTek) và kiểm kê tài sản/bản quyền toàn hệ thống.',
      'Vận hành pipeline Python + FFmpeg chuẩn hóa 132 video kỹ thuật (90+ giờ), giảm ~80% dung lượng lưu trữ (tiết kiệm >11,4 GB).',
    ],
  },
  {
    period: '05/2025 – Present',
    periodVi: '05/2025 – Hiện tại',
    roleEn: 'B.Sc. in Information Assurance (IA)',
    roleVi: 'Cử nhân An toàn Thông tin (Information Assurance)',
    org: 'FPT University — Ho Chi Minh City',
    location: 'Completed Term 5 · Preparing OJT (Term 6)',
    type: 'education',
    bulletsEn: [
      'Core focus: Digital Forensics (FRS301), Web Security & DevSecOps (PWD301), AI for Cybersecurity (IAM302t), Cryptography, Networking, and Incident Response.',
      'Active researcher and builder within GitHub organization DevSecOps_Researchers_Labs.',
    ],
    bulletsVi: [
      'Trọng tâm học thuật: Điều tra số (FRS301), Bảo mật Web & DevSecOps (PWD301), AI trong An ninh mạng (IAM302t), Mật mã học, Mạng máy tính và Ứng cứu sự cố.',
      'Nghiên cứu và phát triển dự án thực hành cùng nhóm DevSecOps_Researchers_Labs trên GitHub.',
    ],
  },
  {
    period: '12/2021 – 03/2025',
    periodVi: '12/2021 – 03/2025',
    roleEn: 'Prior Studies — Graphic Design (Transferred to IA)',
    roleVi: 'Chuyên ngành trước đó — Thiết kế Đồ họa (Chuyển sang ATTT)',
    org: 'FPT University — Ho Chi Minh City',
    location: 'Visual Design & Media Foundation',
    type: 'education',
    bulletsEn: [
      'Built strong visual communication, UI systems thinking, and technical diagramming discipline before transitioning full-time into Information Assurance.',
    ],
    bulletsVi: [
      'Rèn luyện tư duy thẩm mỹ, thiết kế giao diện và trình bày sơ đồ kiến trúc rõ ràng trước khi chuyển hẳn sang chuyên ngành An toàn Thông tin.',
    ],
  },
];

export const CERTIFICATIONS = [
  {
    name: 'CyberOps Associate',
    issuer: 'Cisco Networking Academy',
    date: '03/2026',
    group: 'Cisco Credly',
    url: 'https://www.credly.com/users/nguyen-tan-phat.37e2d608',
    highlight: true,
  },
  {
    name: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco Networking Academy',
    date: '03/2026',
    group: 'Cisco Credly',
    url: 'https://www.credly.com/users/nguyen-tan-phat.37e2d608',
    highlight: true,
  },
  {
    name: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: '11/2025',
    group: 'Cisco Credly',
    url: 'https://www.credly.com/users/nguyen-tan-phat.37e2d608',
    highlight: true,
  },
  {
    name: 'Data Analytics Essentials',
    issuer: 'Cisco Networking Academy',
    date: '05/2026',
    group: 'Cisco Credly',
    url: 'https://www.credly.com/users/nguyen-tan-phat.37e2d608',
    highlight: false,
  },
  {
    name: 'IBM Generative AI for Cybersecurity Professionals',
    issuer: 'IBM · Coursera',
    date: '06/2026',
    group: 'AI Security',
    url: 'https://www.linkedin.com/in/tan-phat-nguyen-6a4860252/',
    highlight: true,
  },
  {
    name: 'AI Security Specialization',
    issuer: 'Edureka · Coursera',
    date: '06/2026',
    group: 'AI Security',
    url: 'https://www.linkedin.com/in/tan-phat-nguyen-6a4860252/',
    highlight: true,
  },
  {
    name: 'Cryptography and Information Theory',
    issuer: 'University of Colorado · Coursera',
    date: '10/2026',
    group: 'Security Core',
    url: 'https://www.linkedin.com/in/tan-phat-nguyen-6a4860252/',
    highlight: false,
  },
  {
    name: 'CertNexus Certified Ethical Emerging Technologist',
    issuer: 'CertNexus · Coursera',
    date: '06/2026',
    group: 'AI Ethics',
    url: 'https://www.linkedin.com/in/tan-phat-nguyen-6a4860252/',
    highlight: false,
  },
  {
    name: 'Hands-on Linux Commands & Shell Scripting',
    issuer: 'IBM · Coursera',
    date: '10/2025',
    group: 'Systems',
    url: 'https://www.linkedin.com/in/tan-phat-nguyen-6a4860252/',
    highlight: false,
  },
  {
    name: 'AI Fluency Framework & Foundations',
    issuer: 'Anthropic',
    date: '05/2026',
    group: 'AI Security',
    url: 'https://www.linkedin.com/in/tan-phat-nguyen-6a4860252/',
    highlight: false,
  },
];

export const AWARDS = [
  {
    titleEn: 'ICEEIS 2026 Accepted Research Abstract (IEEE Xplore Track #228)',
    titleVi: 'Chấp nhận Abstract Nghiên cứu ICEEIS 2026 (IEEE Xplore Track #228)',
    org: 'HCM-UTE · IEEE',
    date: '11/2026',
    descEn: 'First author of automated MITRE ATT&CK TTP classification study using SecBERT with CDA & Focal Loss.',
    descVi: 'Tác giả chính nghiên cứu phân loại tự động kỹ thuật MITRE ATT&CK bằng SecBERT kết hợp CDA & Focal Loss.',
  },
  {
    titleEn: 'Vietnam Student Information Security Contest (2025 & 2026)',
    titleVi: 'Cuộc thi Sinh viên An ninh mạng Toàn quốc (2025 & 2026)',
    org: 'VNISA · National CTF',
    date: '2025 – 2026',
    descEn: 'Two-time national collegiate cybersecurity & Capture The Flag (CTF) competitor representing FPT University.',
    descVi: 'Hai năm liên tiếp tham gia đấu trường CTF & An ninh mạng sinh viên cấp quốc gia đại diện ĐH FPT.',
  },
  {
    titleEn: 'Cisco NetAcad Riders 2026',
    titleVi: 'Cisco NetAcad Riders 2026',
    org: 'Cisco Networking Academy · APJC',
    date: '04/2026',
    descEn: 'Competed in Cisco Networking Academy’s Asia Pacific, Japan & Greater China networking & troubleshooting competition.',
    descVi: 'Tham gia tranh tài tại cuộc thi kỹ năng mạng & xử lý sự cố khu vực Châu Á – Thái Bình Dương của Cisco.',
  },
];

export const TOOLBOX = [
  {
    titleEn: 'SOC, DFIR & Threat Intelligence',
    titleVi: 'SOC, Điều tra số (DFIR) & CTI',
    items: [
      'MITRE ATT&CK',
      'Windows Event Logs',
      'Wireshark',
      'The Sleuth Kit (TSK)',
      'Autopsy',
      'RegRipper',
      'FTK Imager',
      'NTFS $UsnJrnl / Prefetch',
      'Security Onion / ELK',
      'Incident RCA & SOPs',
    ],
  },
  {
    titleEn: 'Enterprise Systems & Networking',
    titleVi: 'Quản trị Hệ thống & Mạng Doanh nghiệp',
    items: [
      'Windows Server 2022',
      'Active Directory (ADUC/GPO)',
      'Microsoft Entra ID',
      'Microsoft Intune (MDM)',
      'Microsoft 365 Admin',
      'Ubuntu / Kali Linux',
      'SQL Server (SSMS / T-SQL)',
      'TCP/IP · VLAN · OSPF',
      'Ruijie / DrayTek / VPN',
      'IT Asset & License Audit',
    ],
  },
  {
    titleEn: 'AppSec, DevSecOps & Streaming',
    titleVi: 'AppSec, DevSecOps & Hạ tầng Dữ liệu',
    items: [
      'OWASP Top 10:2021',
      'Cloudflare Zero Trust',
      'Cloudflare Workers',
      'Docker & Docker Swarm',
      'HAProxy',
      'Apache Kafka (KRaft)',
      'Spark Structured Streaming',
      'Cassandra',
      'Prometheus & Grafana',
      'Pytest Security Suite',
    ],
  },
  {
    titleEn: 'Programming, AI & Reverse Engineering',
    titleVi: 'Lập trình, AI Security & Dịch ngược',
    items: [
      'Python',
      'PowerShell',
      'Bash Shell',
      'Flask / SQLAlchemy',
      'PyTorch & SecBERT',
      'C / x86_64 Assembly',
      'Ghidra',
      'ESP8266 / Arduino',
      'FFmpeg Automation',
      'Git / GitHub Actions',
    ],
  },
];
