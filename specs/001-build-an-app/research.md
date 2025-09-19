# Research: Daily Topic Audio Digest

Path: /Users/peng/MyCode/weeklyProject/podcast/specs/001-build-an-app/spec.md

Summary
- Goal: Decide concrete providers, hosting, and policies for MVP: Node.js backend, PostgreSQL for persistence, Google Cloud Text-to-Speech (TTS) for audio, central podcast hosting for RSS/Spotify distribution, React + shadcn/ui for optional publisher dashboard.

Research questions
1. TTS provider evaluation (Google TTS)
   - Decision: Use Google Cloud Text-to-Speech (neural voices). Rationale: high-quality Mandarin + English neural voices, SDKs for Node.js, stable SLA.
   - Tasks: validate voice list, cost per character/minute, latency for full digest (parallel synthesis approach), quota and rate limits.

2. Audio hosting & publishing
   - Decision: Use a central podcast host (Podbean/Libsyn) or self-host via S3 + RSS generator. Rationale: MVP faster with central host; long-term consider per-publisher hosting.
   - Tasks: evaluate RSS requirements for Spotify, hosting API for programmatic uploads, object storage (S3) for backups.

3. Licensing & sources
   - Decision: Only ingest sources with redistribution rights; admin approval required. Rationale: avoid takedown risk.
   - Tasks: legal checklist per-source, store license metadata in Source records.

4. Database and data retention
   - Decision: Use PostgreSQL for durable metadata (Publishers, Topics, Messages, Digests). Audio files stored in object storage; retention policy configurable per-publisher.
   - Tasks: define retention defaults, cleanup job, archive policy.

5. Scheduling & workers
   - Decision: Use a job worker (BullMQ with Redis) or managed Cloud Tasks / Cloud Scheduler for scheduled jobs. Rationale: resilient retries, priority control.
   - Tasks: prototype a worker that runs a daily digest job for a topic, test retries/exponential backoff.

6. Security & secrets
   - Decision: Local dev uses `.env` (dotenv). Production uses secret manager (GCP Secret Manager or Vault). Store minimal secrets and rotate regularly.
   - Tasks: document secret list (Google TTS key, hosting credentials, DB creds) and access controls.

7. Frontend dashboard
   - Decision: Optional React + shadcn/ui publisher dashboard for topic management and publish logs.
   - Tasks: prototype a simple Topic CRUD + publish log page.

Cost estimate (MVP rough)
- Google TTS: depends on characters/minutes; budget a small monthly amount for initial pilot (~$50-$200/mo).
- Hosting: central host fees + S3 storage (~$20-$100/mo) depending on traffic.

Next steps
- Run small PoC: aggregate sample messages, summarize, synthesize 1 digest via Google TTS, upload to S3, and verify RSS publishing workflow.
- Complete Phase 1 artifacts (data-model, quickstart, contracts).
