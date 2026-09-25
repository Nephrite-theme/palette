// Nephrite palette v0.1.0 · MIT · https://getnephrite.dev/palette
export type NeutralName = "crust" | "mantle" | "base" | "surface0" | "surface1" | "surface2" | "overlay0" | "overlay1" | "subtext" | "text";
export type AccentName = "garnet" | "carnelian" | "citrine" | "jade" | "mint" | "lagoon" | "sapphire" | "amethyst" | "rhodonite";
export type ColorName = NeutralName | AccentName;
export type FlavorName = "forest" | "jade" | "mint";
export type AnsiName = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "brightBlack" | "brightRed" | "brightGreen" | "brightYellow" | "brightBlue" | "brightMagenta" | "brightCyan" | "brightWhite";

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
