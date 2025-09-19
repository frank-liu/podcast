<!--
Sync Impact Report

- Version change: unknown -> 1.0.0
- Modified principles:
	- PRINCIPLE_1_NAME -> I. Code Quality & Maintainability
	- PRINCIPLE_2_NAME -> II. Testing Standards (Test-First, TDD)
	- PRINCIPLE_3_NAME -> III. User Experience Consistency
	- PRINCIPLE_4_NAME -> IV. Performance & Resource Constraints
	- PRINCIPLE_5_NAME -> V. Observability, Versioning & Simplicity
- Added sections:
	- Constraints & Security Standards
	- Development Workflow & Quality Gates
- Removed sections: none
- Templates requiring updates:
	- .specify/templates/plan-template.md ⚠ pending (Constitution Check references may need precise gates)
	- .specify/templates/spec-template.md ⚠ pending (mandatory sections alignment)
	- .specify/templates/tasks-template.md ⚠ pending (TDD language / priority tasks)
	- .specify/templates/agent-file-template.md ⚠ pending (agent-specific guidance references)
- Follow-up TODOs:
	- TODO(RATIFICATION_DATE): confirm official ratification date if different from creation date
	- TODO: review and, if desired, update the templates listed above to reflect tightened gates
-->

# podcast Constitution

## Core Principles

### I. Code Quality & Maintainability
All code MUST be clear, modular, and reviewed. Each module or package MUST have a single responsibility,
meaningful public interfaces, and in-code documentation for non-obvious behaviour. Pull requests
MUST include a short design note when non-trivial choices are made. Technical debt is NOT forbidden
but MUST be tracked with an explicit ticket and an agreed remediation plan.

Rationale: High maintainability reduces onboarding time, prevents regressions, and enables safe
refactoring at scale.

### II. Testing Standards (Test-First, TDD)
Testing is non-negotiable. New behavior MUST be specified with testable acceptance criteria. Tests
MUST be written before implementation (TDD) for new features and bug fixes where feasible. Tests
are required at multiple levels: unit tests for logic, integration/contract tests for interactions, and
end-to-end or quickstart scenarios for user flows. CI pipelines MUST run the test suite and block
merges on failing critical tests.

Rationale: Test-first discipline ensures requirements are verifiable and prevents regressions.

### III. User Experience Consistency
User-facing interactions (APIs, CLIs, UIs) MUST follow consistent conventions across the project.
Error messages MUST be actionable and localizable; APIs MUST maintain stable, documented
contracts and semantic error codes. UX consistency includes accessibility and predictable
performance expectations for primary flows.

Rationale: Consistency reduces user cognitive load and support costs, and improves adoption.

### IV. Performance & Resource Constraints
Performance targets MUST be explicit in specifications (e.g., p95 latency, throughput, memory
budgets). New features MUST include a performance evaluation plan and automated performance
tests where applicable. Any change that can affect latency or resource consumption MUST include
benchmarks or a documented rationale for deviations.

Rationale: Clear, testable performance goals protect user experience and platform cost.

### V. Observability, Versioning & Simplicity
Systems MUST emit structured logs and expose metrics and traces for critical paths. Releases MUST
follow semantic versioning for public contracts; breaking changes require a migration plan,
deprecation windows, and communication. Favor simplicity: prefer clear, reliable solutions over
clever but opaque optimizations.

Rationale: Observability enables fast diagnosis; disciplined versioning reduces friction for
integrators; simplicity reduces maintenance burden.

## Constraints & Security Standards

All production code MUST follow baseline security practices: least privilege, input validation,
secure secret handling, and dependency vulnerability management. Compliance-sensitive
requirements (privacy, retention) MUST be documented per-feature and enforced by review gates.

Performance constraints from Principle IV and security constraints in this section are mandatory
acceptance criteria for releases that touch relevant areas.

## Development Workflow & Quality Gates

1. Specification: Every significant change starts with a spec that defines functional requirements,
	 acceptance criteria, and performance/security constraints. Specifications MUST be testable.
2. Plan & Research: Features follow the `/plan` flow: research unknowns, design contracts, and
	 prepare failing tests before implementation.
3. Code Review: All code changes MUST be reviewed by at least one peer and pass automated
	 checks (linting, formatting, tests). Reviews MUST verify alignment with the Constitution.
4. CI Gates: The CI pipeline MUST enforce tests, linting, and basic performance/regression checks.
5. Deployment: Releases MUST include changelogs, tagging, and migration instructions for breaking
	 changes.

## Governance

Amendments: Changes to this constitution are governed as follows:

- Minor edits (clarifications, typos) MAY be applied and recorded with a PATCH version bump.
- Additions of non-trivial principles or changes that broaden obligations SHOULD use a MINOR
	version bump and include an explanation and reference implementation or migration path.
- Removal or redefinition of existing principles that materially change obligations MUST use a
	MAJOR version bump, require explicit approval from the core maintainers, and a documented
	migration plan for dependent artifacts.

Compliance: Pull requests that introduce code or process changes that touch constitutional
principles MUST include a "Constitution Check" section showing how the change complies with
the relevant principles. The `/plan` command and templates MUST check for compliance and flag
violations.

Dispute resolution: If a disagreement arises about interpretation, parties SHOULD escalate to the
core maintainers for majority decision. Emergency changes (security or data-loss risk) may be
applied immediately but MUST be followed by a retrospective and a Constitution amendment if
policy-level changes were made.

**Version**: 1.0.0 | **Ratified**: 2025-09-19 | **Last Amended**: 2025-09-19