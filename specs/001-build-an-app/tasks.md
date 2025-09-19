# Tasks (Phase 2) — detailed, dependency-ordered, TDD-first

This file was generated from Phase 0/1 artifacts (research.md, data-model.md, quickstart.md, contracts/) and lists concrete tasks (T001..). Tasks are ordered by dependency. Follow the developer checklist below for each task: create failing test(s) first, commit (failing), implement, then make tests pass.

Priority legend: P0 (spike/critical), P1 (required for MVP), P2 (nice-to-have / optional)

Estimate: ~25–35 tasks; start with P0 spikes and P1 model/service tasks.

## Contract (tiny)

- Inputs: topicId, date, language
- Output: Digest record created with status `published` and audio_url (or a clear failure status)
- Success criteria: PoC produces an audio file <= 600s and a Digest row with audio_url

---

T001 — Spike: Google TTS PoC (P0) — 4h
 - Goal: Verify synthesis of sample text in `en` and `zh` using Google TTS; measure latency and costs.
 - Files/places: scripts/poc-tts/poctts.js, specs/001-build-an-app/research.md (notes)
 - Failing test (create first):
   - path: test/poc/tts.poc.test.js
   - description: "calls TTS adapter with sample text and expects a Buffer/stream response or deterministic mock buffer when TTS_MOCK=true"

T002 — Spike: Audio concat & duration enforcement (P0) — 4h
 - Goal: Concatenate several short audio blobs, compute duration, and assert final duration <= 600s
 - Files: packages/audio/concat.js or src/lib/audio/concat.ts
 - Failing test:
   - path: test/poc/audio.concat.test.js
   - description: "concatenates provided mock audio files and asserts final duration and file integrity"

T003 — Spike: Storage adapter (local/S3) (P0) — 2h
 - Goal: Upload artifact to STORAGE_DIR or S3 and return a public URL
 - Files: src/adapters/storage/local-adapter.ts, src/adapters/storage/s3-adapter.ts
 - Failing test:
   - path: test/poc/storage.upload.test.js
   - description: "uploads a small file to local STORAGE_DIR (mock S3) and returns accessible path"

T004 — Models & DB migrations (P1) — 2d
 - Goal: Implement DB models (Publisher, Topic, Source, Message, Digest) and migrations matching data-model.md
 - Files: prisma/schema.prisma OR src/db/migrations/*, src/models/*
 - Failing test(s):
   - path: test/models/digest.model.test.ts
   - description: "attempts to create Digest without required fields -> expects DB validation error; unique constraint on (topic_id,date,language) enforced"

T005 — Message snapshot helper (P1) — 4h
 - Goal: Implement helper to snapshot Message fields (license_meta, timestamp, body) into Digest.messages
 - Files: src/services/message-snapshot.ts
 - Failing test:
   - path: test/services/message-snapshot.test.ts
   - description: "given messages returns snapshot JSON with preserved license_meta and timestamps"

T006 — Aggregator service (select top N messages) (P1) — 1d
 - Goal: Select up to 10 messages per topic ordered by timestamp & publisher policy
 - Files: src/services/aggregator.ts
 - Failing test:
   - path: test/services/aggregator.test.ts
   - description: "returns <=10 messages and honors publisher publish_policies"

T007 — Summarizer service (per-message summarization) (P1) — 1d
 - Goal: Summarize message bodies into short narration segments efficiently for TTS
 - Files: src/services/summarizer.ts
 - Failing test:
   - path: test/services/summarizer.test.ts
   - description: "summarize text to <= X chars and retain necessary metadata"

T008 — Duration budget planner (P1) — 4h
 - Goal: Given N summaries, estimate TTS duration and reduce content to fit 600s budget
 - Files: src/services/budget-planner.ts
 - Failing test:
   - path: test/services/budget-planner.test.ts
   - description: "given per-char duration estimates returns per-message char budgets to keep total <=600s"

T009 — TTS adapter (Google + mock) (P1) — 1d
 - Goal: Implement Google TTS adapter and a deterministic mock when TTS_MOCK=true
 - Files: src/adapters/tts/google-tts.ts, src/adapters/tts/mock-tts.ts
 - Failing test:
   - path: test/adapters/google-tts.adapter.test.ts
   - description: "adapter returns audio buffer/stream; mock returns deterministic buffer"

T010 — Worker orchestration (Aggregator -> Summarizer -> TTS -> Concat -> Upload -> Digest update) (P1) — 2d
 - Goal: Implement digest worker and scheduling (e.g., BullMQ or Scheduler)
 - Files: src/workers/digest-worker.ts, src/jobs/schedule.ts
 - Failing integration test:
   - path: test/integration/digest.worker.integration.test.ts
   - description: "runs digest job with mocks and results in Digest.status 'published' and audio_url present"

T011 — API: publish endpoint (on-demand) (P1) — 1d
 - Goal: Implement POST /publishTopics/{topicId}/digest to enqueue digest job and return 202
 - Files: src/api/topics.ts, src/routes/publish.ts
 - Failing test:
   - path: test/api/publish.endpoint.test.ts
   - description: "calls endpoint and expects 202 and job id; contract validated against contracts/openapi.yaml"

T012 — Contract test harness (OpenAPI) (P1) — 4h
 - Goal: Add contract tests validating API shapes against contracts/openapi.yaml
 - Files: test/contract/openapi.test.js
 - Failing test:
   - path: test/contract/openapi.test.js
   - description: "validates POST /publishTopics/{topicId}/digest 202 response shape"

T013 — Storage/Host adapter integration (S3 or host API) (P2) — 1d
 - Goal: Implement host adapter to upload audio and return publishable URL
 - Files: src/adapters/storage/*
 - Failing test:
   - path: test/integration/storage.adapter.test.ts
   - description: "uploads produced audio and asserts returned URL is reachable (mocked)"

T014 — Publish pipeline: RSS generation or host API call (P2) — 1d
 - Goal: Given a published Digest produce RSS item or call host API to publish episode
 - Files: src/services/publisher.ts
 - Failing test:
   - path: test/services/publisher.test.ts
   - description: "given a digest generates RSS item or calls host adapter"

T015 — Frontend: Topic management CRUD (optional P2) — 2d
 - Goal: Simple React + shadcn/ui dashboard for Topics and publish logs
 - Files: apps/dashboard/src/pages/topics/*
 - Failing test:
   - path: test/frontend/topics.crud.test.tsx
   - description: "renders topic list, opens create modal, submits form (mock API)"

T016 — Observability & metrics (P2) — 1d
 - Goal: Emit metrics (digest_duration_ms, tts_latency_ms, publish_success)
 - Files: src/lib/metrics.ts, instrumentation in worker
 - Failing test:
   - path: test/observability/metrics.test.ts
   - description: "worker emits expected metrics for a standard run (mocked)"

T017 — CI: Constitution Check + test jobs (P1) — 4h
 - Goal: Add CI job ensuring spec contains Constitution Check and runs contract/integration tests
 - Files: .github/workflows/ci.yml
 - Failing condition: CI job fails if SPEC missing gate or tests fail

T018 — E2E Smoke: PoC run (P2) — 4h
 - Goal: Run PoC script to produce final audio <=600s and verify Digest DB row + audio exists
 - Files: scripts/poc-run-digest.js
 - Failing test:
   - path: test/e2e/poc.smoke.test.js
   - description: "runs PoC end-to-end (mock or real TTS) and expects audio file and DB Digest record"

T019 — Docs & quickstart polish (P2) — 2h
 - Goal: Update quickstart.md with exact commands and example env; add notes on costs and quotas
 - Files: specs/001-build-an-app/quickstart.md

T020 — Polish: retries/backoff, error states, admin approval UI (P2) — 1d
 - Goal: Implement retry/backoff, mark partial/no-content states, and admin review for Source approval
 - Files: src/lib/retries.ts, src/api/admin/*
 - Failing test:
   - path: test/retries/backoff.test.ts
   - description: "worker retries failed TTS/upload tasks with exponential backoff (mocked)"

---

## Developer checklist (for each task)
- 1) Create failing test(s) listed above and commit (should fail)
- 2) Implement minimal code to make test pass
- 3) Add unit + small integration tests
- 4) Run CI locally and push

## Next steps
- Create failing test skeletons for T001..T006 (I can do this next)
- Commit tasks.md and push to feature branch

---

Generated by the plan automation.
