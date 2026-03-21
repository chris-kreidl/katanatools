---
"@ckreidl/katana-client": minor
---

Add typed `extend` parameter support with conditional return types. When callers specify `extend` values (e.g., `extend: ["supplier"]`), method overloads narrow the return type so extended fields are required instead of optional. Includes `WithExtend` utility type, pre-built type aliases, type-level tests, and `SPEC_GAPS.md` documenting undocumented API response fields.
