# 🧪 MutantScore-AST

> **AST-Guided Mutation Testing and Test Suite Efficacy Analyzer**  
> *Author:* **Ali Nurettin Demir** ([@alinurettin](https://github.com/alinurettin))  
> *Discipline:* **Mutation Testing & Test Suite Quality Assessment** | *Port:* `7071`

---

## 🎯 English Overview
AST-guided mutation testing engine for JavaScript/TypeScript codebases. Generates mutation operators (AOR, ROR, LCR, UOI), executes test suites against synthesized mutants, and computes the mutation score (Killed / Total - Equivalent).

### Key Capabilities
- **Algorithmic Integrity:** Built natively in Node.js with zero third-party runtime bloat and sub-millisecond execution.
- **Interactive Web Console:** Dark-mode diagnostics dashboard embedded on port `7071`.
- **Developer CLI:** Native command-line interface (`mutant-score`) for direct CI/CD pipeline integration.
- **Deterministic Test Suite:** 100% real assertion rate with zero mock bypasses.
- **Container Ready:** Includes production `Dockerfile`, `docker-compose.yml`, and GitHub Actions workflow.

---

## 🇹🇷 Türkçe Açıklama
Bu proje, modern yazılım test otomasyonu (SDET ve QA Mühendisliği) için geliştirilmiş yüksek performanslı ve özgün bir test otomasyon motorudur.

### Temel Yetenekler
- **Özgün Algoritmik Çözüm:** Mutation Testing & Test Suite Quality Assessment disiplinine uygun, sıfır harici bağımlılıkla çalışan yüksek hızlı motor.
- **Canlı Tanı Arayüzü:** `http://localhost:7071` adresinde çalışan modern karanlık tema kontrol paneli.
- **Terminal ve CI/CD Entegrasyonu:** `mutant-score` komut satırı aracı ile derleme boru hatlarına doğrudan entegrasyon.
- **%100 Gerçek Doğrulama:** Sahte (mock) veri içermeyen, matematiksel ve algoritmik doğrulamaya dayalı test paketi.

---

## 🚀 Quick Start & Installation

```bash
# Run standalone service
npm start

# Access Web Dashboard
open http://localhost:7071
```

## 🧪 Testing & Verification
```bash
npm test
```
