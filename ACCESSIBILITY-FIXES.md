# ♿ AccessibilityGuard — Automated Fix Report

**Report ID:** scan_1794753373893_63db86
**Target URL:** https://moxsend-ui.vercel.app/
**Scan Date:** 2026-11-15T14:36:13.893Z
**Fix Date:** 2026-11-15T14:37:42.332Z
**Branch:** AG-Fix-scan_1794753373893_63db86-1794753454867

---

## 📊 Summary

| Metric | Count |
|---|---|
| ✅ Fully Fixed | 1 |
| ⚠️ Partially Fixed | 0 |
| 🔴 Needs Manual Review | 1 |
| 🎨 Design Decisions Required | 0 |
| 📌 Stubs Added | 0 |
| 📁 Files Modified | 2 |

---

## ✅ Applied Fixes

### 1. color-contrast — serious — `src/app/globals.css`

**WCAG Guideline:** 1.4.3 Contrast (Minimum) (AA)
**Reference:** https://dequeuniversity.com/rules/axe/4.13/color-contrast?application=axe-puppeteer

**Before:**
```html
/* Text */
  --color-text-primary: #1a1c1a;
  --color-text-secondary: #7b7b78;
  --color-text-tertiary: #5c4037;
  --color-off-black: #111111;
```

**After:**
```html
/* Text */
  --color-text-primary: #1a1c1a;
  --color-text-secondary: #727270;
  --color-text-tertiary: #5c4037;
  --color-off-black: #111111;
```

**Validation:** ✅ Passes re-check

---

## 🔴 Manual Review Required

### color-contrast-incomplete-0 — Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

**Affected Element:** `src/app/components/Header.tsx:56`
**Found on:** https://moxsend-ui.vercel.app/
**HTML:** `<div class="w-full h-full bg-gradient-to-br from-brand-orange to-brand-primary rounded-full flex items-center justify-center text-white text-xs font-bold">S</div>`
**How to fix manually:** No registered fix strategy for this rule; flag for manual review.
**WCAG Reference:** https://dequeuniversity.com/rules/axe/4.13/color-contrast?application=axe-puppeteer
**Details:** No fixer implemented for rule "color-contrast-incomplete-0" (No registered fix strategy for this rule; flag for manual review.). | AI attempt: AI fix rejected by evaluator: The change modifies the text color inside the button from 'text-white' to 'text-black' on a gradient background, which likely reduces contrast rather than improving it, thus not fixing the color contrast violation.

---

## 🔁 Re-Scan Instructions

After merging this PR and deploying:
1. Return to AccessibilityGuard
2. Start a new scan on https://moxsend-ui.vercel.app/
3. Compare results with Report ID: scan_1794753373893_63db86
