# oud — Salla store scripts

Standalone JS/CSS snippets loaded via jsDelivr CDN into Salla custom-code fields.

---

## Script URLs

Every file in this repo is instantly available at:

```
https://cdn.jsdelivr.net/gh/7azemaamer/oud@<tag>/<file>
```

**Latest of a specific script (by release tag):**

| Script | Tag | URL |
|--------|-----|-----|
| cross-sell.js | `cross-sell-v1.1.0` | `https://cdn.jsdelivr.net/gh/7azemaamer/oud@cross-sell-v1.1.0/cross-sell.js` |
| float-cluster.js | `float-v1.0.0` | `https://cdn.jsdelivr.net/gh/7azemaamer/oud@float-v1.0.0/float-cluster.js` |
| upsell-tiers.js | `upsell-v1.0.0` | `https://cdn.jsdelivr.net/gh/7azemaamer/oud@upsell-v1.0.0/upsell-tiers.js` |
| product-page-refinement.js | `refinement-v1.0.0` | `https://cdn.jsdelivr.net/gh/7azemaamer/oud@refinement-v1.0.0/product-page-refinement.js` |
| hamtaro.js | `hamtaro-v1.0.0` | `https://cdn.jsdelivr.net/gh/7azemaamer/oud@hamtaro-v1.0.0/hamtaro.js` |

> Tip: replace the tag with `@main` for always-latest (not for production — no cache busting).

---

## How to ship a change

### 1. Edit the JS file

Only edit `.js` files — HTML components in `/components` are dev previews only, not deployed.

### 2. Bump the version comment at the top of the file

```js
/* cross-sell.js — hamtaro.sa cross-sell popup | v1.1.0 */
```

### 3. Commit and push

```bash
git add cross-sell.js
git commit -m "fix cross-sell.js: short description of what changed"
git push
```

### 4. Create a release (new tag = new CDN URL)

```bash
# Format: <script-slug>-v<semver>
gh release create cross-sell-v1.1.0 \
  --title "cross-sell.js v1.1.0 — short description" \
  --notes "- what changed
- why"
```

### 5. Get the CDN link

```
https://cdn.jsdelivr.net/gh/7azemaamer/oud@cross-sell-v1.1.0/cross-sell.js
```

Paste that into the Salla custom-code field wrapped in a `<script>` tag:

```html
<script src="https://cdn.jsdelivr.net/gh/7azemaamer/oud@cross-sell-v1.1.0/cross-sell.js" defer></script>
```

---

## Tag naming convention

```
<script-slug>-v<major>.<minor>.<patch>
```

Examples: `cross-sell-v1.1.0`, `float-v1.0.1`, `hamtaro-v2.0.0`

Patch = bug fix · Minor = new feature, backwards-compatible · Major = breaking change

---

## Repo structure

```
cross-sell.js              ← cross-sell popup (shown after add-to-cart)
float-cluster.js           ← right-side floating widget cluster
upsell-tiers.js            ← quantity tier price selector
product-page-refinement.js ← product page UI tweaks
hamtaro.js                 ← cart milestone progress widget
oud.js                     ← misc utility tweaks
reset.js                   ← CSS reset overrides
effectx-critical.css       ← critical CSS injected in <head>
```
