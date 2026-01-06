# Phase 01: Update Main package.json

**Parent**: [plan.md](./plan.md)
**Status**: DONE (2026-01-07)
**Priority**: High

## Overview

Replace local file path dependencies with npm v4.1.0 versions.

## Changes Required

File: `/package.json`

| Package | Current | Target |
|---------|---------|--------|
| @slide-computer/signer-storage | `file:/tmp/signer-js-fork/packages/signer-storage` | `4.1.0` |
| @slide-computer/signer-transport-auth-client | `file:/tmp/signer-js-fork/packages/signer-transport-auth-client` | `4.1.0` |
| @slide-computer/signer-transport-stoic | `file:/tmp/signer-js-fork/packages/signer-transport-stoic` | `4.1.0` |

## Implementation Steps

1. Edit `/package.json` lines 95-97
2. Replace file paths with version strings `"4.1.0"`
3. Run `npm install` to update lockfile
4. Verify build works

## Todo List

- [ ] Update signer-storage to 4.1.0
- [ ] Update signer-transport-auth-client to 4.1.0
- [ ] Update signer-transport-stoic to 4.1.0
- [ ] Run npm install
- [ ] Verify typecheck passes

## Success Criteria

- All signer-* deps point to npm registry
- `npm install` completes without errors
- `npm run typecheck` passes
- `npm run build` passes

## Risk Assessment

**Low Risk** - Version already confirmed published, other packages using same version
