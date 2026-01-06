# @slide-computer/signer-* v4.1.0 Package Research

**Date**: 2026-01-06
**Scope**: npm registry verification for @slide-computer signer packages

## Summary

All primary @slide-computer/signer packages have v4.1.0 published EXCEPT signer-transport-auth-client, which has v4.1.1 as latest (v4.1.0 exists but newer version available).

## Package Availability

### 1. @slide-computer/signer
- **v4.1.0**: ✅ Published (latest)
- **Published**: 2 weeks ago
- **Dependencies**: @icp-sdk/core: ^5.0.0
- **Unpacked Size**: 107.8 kB

### 2. @slide-computer/signer-storage
- **v4.1.0**: ✅ Published (latest)
- **Published**: 2 hours ago
- **Dependencies**: idb-keyval: ^6.2.2
- **Unpacked Size**: 113.6 kB

### 3. @slide-computer/signer-transport-auth-client
- **v4.1.0**: ✅ Published (available, NOT latest)
- **v4.1.1**: ✅ Published (latest)
- **Published**: 2 hours ago
- **Dependencies**: @icp-sdk/core: ^5.0.0
- **Unpacked Size**: 99.4 kB

### 4. @slide-computer/signer-transport-stoic
- **v4.1.0**: ✅ Published (latest)
- **Published**: 2 hours ago
- **Dependencies**: @icp-sdk/core: ^5.0.0
- **Unpacked Size**: 237.2 kB

## Version History (signer-transport-auth-client)

Full version history shows progression from v2.2.0 → v3.x.x → v4.1.0 → v4.1.1:

```
v3.20.0 (previous major version 3 latest)
v4.1.0
v4.1.1 (current latest)
```

## Key Findings

1. **4.1.0 Availability**: All 4 packages have v4.1.0 available
   - 3 packages: v4.1.0 is latest
   - 1 package: v4.1.0 exists but v4.1.1 is latest

2. **Recent Releases**: signer-storage, auth-client, stoic all published 2 hours ago (same batch)

3. **Dependency Consistency**:
   - Core packages depend on @icp-sdk/core: ^5.0.0
   - storage depends on idb-keyval: ^6.2.2

4. **Recommendation**:
   - Use v4.1.1 for signer-transport-auth-client (patch version newer, published same batch)
   - Use v4.1.0 for other packages (latest available)

## Unresolved Questions

- Should deps be locked to exact 4.1.0 or allow patch updates (4.1.1 for auth-client)?
- Are there breaking changes between 4.1.0 → 4.1.1 for auth-client?
