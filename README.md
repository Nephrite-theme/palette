<div align="center">

<img src="https://raw.githubusercontent.com/Nephrite-theme/web/main/public/logo.svg" alt="Nephrite logo" width="80" height="80">

# Nephrite palette

**English** · [Español](README.es.md)

Three jade flavors with ten neutrals and nine mineral accents. The source for every Nephrite port.

[![License: MIT](https://img.shields.io/badge/license-MIT-3db87a)](LICENSE)
[![Palette](https://img.shields.io/badge/preview-getnephrite.dev%2Fpalette-1f6b45)](https://getnephrite.dev/palette)

</div>

## Flavors

| Flavor | Preview | For |
| --- | --- | --- |
| **Forest** | <img src="assets/forest.svg" alt="Forest swatches" width="360"> | Deep and dark, for late nights |
| **Jade** | <img src="assets/jade.svg" alt="Jade swatches" width="360"> | Dark with more green, for long days |
| **Mint** | <img src="assets/mint.svg" alt="Mint swatches" width="360"> | Light and airy, for daylight |

Neutrals carry a slight jade tint, and every accent clears 4.5:1 contrast on its flavor's `base`. Try them live at [getnephrite.dev/palette](https://getnephrite.dev/palette).

## Colors

| Name | Forest | Jade | Mint |
| --- | --- | --- | --- |
| crust | `#050e09` | `#0b1d13` | `#c7ded1` |
| mantle | `#09150e` | `#0e2419` | `#d7eadf` |
| base | `#0d1c14` | `#132e20` | `#edfbf3` |
| surface0 | `#192820` | `#20392c` | `#daeee2` |
| surface1 | `#25342c` | `#2e4639` | `#cbe1d4` |
| surface2 | `#324139` | `#3c5346` | `#bdd5c7` |
| overlay0 | `#59675f` | `#63776c` | `#83988c` |
| overlay1 | `#76847c` | `#7f9187` | `#607268` |
| subtext | `#b4c1ba` | `#bdccc3` | `#3f5247` |
| text | `#e0ebe5` | `#e7f2eb` | `#192e23` |
| garnet | `#ffa09c` | `#ffaaa7` | `#ad4b4b` |
| carnelian | `#fba773` | `#ffaf7e` | `#a85514` |
| citrine | `#d9bb5c` | `#e0c262` | `#866c02` |
| jade | `#4dbf74` | `#4dbf74` | `#048149` |
| mint | `#5ed7b5` | `#65ddbb` | `#037e65` |
| lagoon | `#43d5dc` | `#4cdbe3` | `#017b80` |
| sapphire | `#89c3fe` | `#96c9fe` | `#2672b7` |
| amethyst | `#d0aafc` | `#d5b2ff` | `#8058ab` |
| rhodonite | `#f99dc6` | `#fea4cc` | `#a54a77` |

## Usage

### CSS

```css
@import "@nephrite-theme/palette/css";

body {
  background: var(--nephrite-base);
  color: var(--nephrite-text);
}
```

Forest is the default. Switch flavors with an attribute: `<html data-nephrite="mint">`. Single-flavor files are at `@nephrite-theme/palette/css/forest` (and `jade`, `mint`).

### SCSS

```scss
@use "@nephrite-theme/palette/scss" as nephrite;

.button {
  background: map-get(nephrite.$nephrite-forest, "jade");
}
```

### JavaScript and TypeScript

```js
import { flavors, ansi } from "@nephrite-theme/palette";

flavors.forest.colors.jade; // "#4dbf74"
flavors.mint.dark; // false
ansi.red; // "garnet"
```

Types are included (`FlavorName`, `ColorName`, `Flavor`).

### Without npm

Every format is committed under [`dist/`](dist), so you can copy a file or load it from a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Nephrite-theme/palette@main/dist/palette.css">
```

> [!NOTE]
> The npm package is not published yet. Until it is, use the files in `dist/` or the CDN link above.

## Building a port

Use the colors by role so every Nephrite port feels like the same stone:

| Role | Color |
| --- | --- |
| Main background | `base` |
| Sidebars, panels, inactive tabs | `mantle` |
| Borders, title bars, the deepest layer | `crust` |
| Hover, selection, raised surfaces | `surface0` to `surface2` |
| Comments, disabled text, line numbers | `overlay0`, `overlay1` |
| Secondary text | `subtext` |
| Main text | `text` |
| Primary accent: links, focus, cursor, active items | `jade` |
| Errors, deletions | `garnet` |
| Warnings | `citrine` |
| Additions, success | `jade` or `mint` |
| Info | `sapphire` or `lagoon` |

### Syntax highlighting

| Token | Color |
| --- | --- |
| Keywords | `amethyst` |
| Strings | `jade` |
| Functions | `sapphire` |
| Types, classes | `citrine` |
| Numbers, constants | `carnelian` |
| Properties, object keys | `lagoon` |
| Template and regex escapes | `rhodonite` |
| Comments | `overlay1` |
| Punctuation | `subtext` |

### Terminal

`palette.json` includes a suggested ANSI mapping (`ansi`): red is `garnet`, green `jade`, yellow `citrine`, blue `sapphire`, magenta `amethyst`, cyan `lagoon`, and black and white come from the neutrals.

## Changing the palette

`palette.json` is the only file to edit. Then rebuild every format:

```sh
npm run build
```

The build has no dependencies and regenerates `dist/` and the swatches in `assets/`.
