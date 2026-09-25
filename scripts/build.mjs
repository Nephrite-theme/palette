// Builds every distributed format from palette.json. No dependencies.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const src = JSON.parse(readFileSync(new URL("../palette.json", import.meta.url)));
const { flavors, neutrals, accents, ansi, version } = src;
const keys = [...neutrals, ...accents];
const out = (path, text) => writeFileSync(new URL(`../${path}`, import.meta.url), text);

mkdirSync(new URL("../dist", import.meta.url), { recursive: true });
mkdirSync(new URL("../assets", import.meta.url), { recursive: true });

const banner = `Nephrite palette v${version} · MIT · https://getnephrite.dev/palette`;

// JSON: a clean copy without authoring comments.
const data = { name: src.name, version, flavors, neutrals, accents, ansi };
out("dist/palette.json", `${JSON.stringify(data, null, 2)}\n`);

// CSS: one file with every flavor, selected with data-nephrite; Forest is the default.
const vars = (colors) =>
	keys.map((k) => `  --nephrite-${k}: ${colors[k]};`).join("\n");
let css = `/* ${banner} */\n`;
for (const [key, f] of Object.entries(flavors)) {
	const selector =
		key === "forest"
			? `:root,\n[data-nephrite="forest"]`
			: `[data-nephrite="${key}"]`;
	css += `\n${selector} {\n  color-scheme: ${f.dark ? "dark" : "light"};\n${vars(f.colors)}\n}\n`;
	out(
		`dist/${key}.css`,
		`/* ${banner} · ${f.name} */\n:root {\n  color-scheme: ${f.dark ? "dark" : "light"};\n${vars(f.colors)}\n}\n`,
	);
}
out("dist/palette.css", css);

// SCSS: one map per flavor plus a map of flavors.
let scss = `// ${banner}\n`;
for (const [key, f] of Object.entries(flavors)) {
	scss += `\n$nephrite-${key}: (\n${keys.map((k) => `  "${k}": ${f.colors[k]},`).join("\n")}\n);\n`;
}
scss += `\n$nephrite-flavors: (\n${Object.keys(flavors)
	.map((k) => `  "${k}": $nephrite-${k},`)
	.join("\n")}\n);\n`;
out("dist/_palette.scss", scss);

// JS: ESM, CommonJS and types.
const js = JSON.stringify({ flavors, neutrals, accents, ansi }, null, 2);
out(
	"dist/index.js",
	`// ${banner}\nconst palette = ${js};\nexport const { flavors, neutrals, accents, ansi } = palette;\nexport default palette;\n`,
);
out(
	"dist/index.cjs",
	`// ${banner}\nconst palette = ${js};\nmodule.exports = palette;\nmodule.exports.default = palette;\n`,
);
const union = (arr) => arr.map((k) => `"${k}"`).join(" | ");
out(
	"dist/index.d.ts",
	`// ${banner}
export type NeutralName = ${union(neutrals)};
export type AccentName = ${union(accents)};
export type ColorName = NeutralName | AccentName;
export type FlavorName = ${union(Object.keys(flavors))};
export type AnsiName = ${union(Object.keys(ansi))};

export interface Flavor {
  name: string;
  dark: boolean;
  colors: Record<ColorName, string>;
}

export declare const flavors: Record<FlavorName, Flavor>;
export declare const neutrals: NeutralName[];
export declare const accents: AccentName[];
/** Suggested terminal mapping: ANSI slot to palette color name. */
export declare const ansi: Record<AnsiName, ColorName>;

declare const palette: {
  flavors: typeof flavors;
  neutrals: typeof neutrals;
  accents: typeof accents;
  ansi: typeof ansi;
};
export default palette;
`,
);

// README swatches: one strip per flavor (accents over neutrals).
for (const [key, f] of Object.entries(flavors)) {
	const size = 48;
	const gap = 8;
	const w = accents.length * (size + gap) + gap;
	const row = (names, y, h) =>
		names
			.map((k, i) => {
				const cw = (w - gap) / names.length - gap;
				return `<rect x="${gap + i * (cw + gap)}" y="${y}" width="${cw}" height="${h}" rx="10" fill="${f.colors[k]}"/>`;
			})
			.join("");
	out(
		`assets/${key}.svg`,
		`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${size + 32 + gap * 3}" viewBox="0 0 ${w} ${size + 32 + gap * 3}"><rect width="100%" height="100%" rx="16" fill="${f.colors.base}"/>${row(accents, gap, size)}${row(neutrals, size + gap * 2, 32)}</svg>\n`,
	);
}

console.log(`Built Nephrite palette v${version}: ${Object.keys(flavors).length} flavors, ${keys.length} colors each.`);
