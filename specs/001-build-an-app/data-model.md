# Data Model: Daily Topic Audio Digest

Path: /Users/peng/MyCode/weeklyProject/podcast/specs/001-build-an-app/spec.md

Entities

1. Publisher
- id: uuid (PK)
- name: string
- contact_email: string
- approved: boolean
- created_at, updated_at
- publish_policies: jsonb (e.g., publish_when_empty, language_variants)

2. Topic
- id: uuid (PK)
- publisher_id: uuid (FK -> Publisher)
- title: string
- description: text
- feed_config: jsonb (metadata for RSS mapping)
- publish_enabled: boolean
- language_variants: ["en","zh"]
- created_at, updated_at

3. Source
- id: uuid
- provider_name: string
- api_config: jsonb
- license_type: string
- license_meta: jsonb
- approved: boolean

4. Message
- id: uuid
- topic_id: uuid (FK)
- source_id: uuid (FK)
- title: string
- body: text
- summary_text: text
- language: string
- timestamp: timestamptz
- license_info: jsonb

5. Digest
- id: uuid
- publisher_id: uuid
- topic_id: uuid
- date: date
- messages: jsonb (array of message ids / snapshots)
- audio_url: string
- language: string
- status: enum(pending, generating, published, failed, no-content, partial)
- length_seconds: integer
- publish_attempts: integer
- partial_flag: boolean
- created_at, updated_at

Indexes & constraints
- Index on Topic(publisher_id)
- Unique constraint on Digest(topic_id, date, language)
- FK constraints for integrity

Validation rules
- Max messages per digest: 10
- Audio duration must be <= 600 seconds

Notes
- Messages may be stored as snapshots in Digest.messages to preserve original content even if source changes or is removed.
- License metadata must be preserved per-message.
