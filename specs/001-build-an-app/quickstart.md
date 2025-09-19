# Quickstart: Local digest PoC

Path: /Users/peng/MyCode/weeklyProject/podcast/specs/001-build-an-app/spec.md

Goal: Run a minimal local pipeline that aggregates mock messages, summarizes, synthesizes audio via Google TTS (or local mock), and uploads to local storage.

Prerequisites
- Node.js 18+
- PostgreSQL (optional for PoC) or use in-memory/mock
- Google Cloud credentials (for real TTS) or set TTS_MOCK=true for tests
- .env with GOOGLE_TTS_KEY, DATABASE_URL (if used), STORAGE_DIR

Steps
1. Clone repo and install dependencies:

```bash
# from repo root
npm install
```

2. Create `.env` with required keys (or set TTS_MOCK=true):

```bash
GOOGLE_TTS_KEY=...
DATABASE_URL=postgres://user:pass@localhost:5432/podcast
STORAGE_DIR=./tmp/audio
```

3. Run PoC script (example):

```bash
node scripts/poc-run-digest.js --topic=sample --lang=en
```

What the PoC does
- Loads 5-10 mock messages for topic
- Summarizes each message (local summarizer or external service)
- Calls Google TTS (or mock) to synthesize segments
- Concatenates audio segments and writes final file to STORAGE_DIR
- Writes JSON metadata to stdout with audio_url and duration

Verification
- Confirm audio file appears in STORAGE_DIR and duration <= 600s
- Confirm metadata JSON includes messages array and audio_url
