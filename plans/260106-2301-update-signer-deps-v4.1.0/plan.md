# Update @slide-computer/signer-* Dependencies to v4.1.0

**Plan ID**: 260106-2301-update-signer-deps-v4.1.0
**Created**: 2026-01-06
**Status**: Ready for Implementation

## Objective

Update all @slide-computer/signer-* dependencies from local file paths to npm v4.1.0.

## Current State

Main `package.json` has 3 packages pointing to local file paths:
- `@slide-computer/signer-storage` → `file:/tmp/signer-js-fork/...`
- `@slide-computer/signer-transport-auth-client` → `file:/tmp/signer-js-fork/...`
- `@slide-computer/signer-transport-stoic` → `file:/tmp/signer-js-fork/...`

Other signer packages already at v4.1.0:
- `@slide-computer/signer`: 4.1.0 ✅
- `@slide-computer/signer-agent`: 4.1.0 ✅
- `@slide-computer/signer-extension`: 4.1.0 ✅
- `@slide-computer/signer-web`: 4.1.0 ✅

## Implementation Phases

| # | Phase | Status | File |
|---|-------|--------|------|
| 1 | Update main package.json | DONE (2026-01-07) | [phase-01-update-main-package.md](./phase-01-update-main-package.md) |
| 2 | Verify & test | DONE (2026-01-07) | [phase-02-verify-and-test.md](./phase-02-verify-and-test.md) |

## Files to Modify

- `/package.json` - Update 3 dependencies

## Research

- [signer-packages-research.md](./research/signer-packages-research.md)

## Unresolved Questions

1. Use exact `4.1.0` or `^4.1.0`? (recommend `4.1.0` for consistency w/ existing)
2. `signer-transport-auth-client` has v4.1.1 - use 4.1.0 or 4.1.1?
