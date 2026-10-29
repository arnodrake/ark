import type { Locale } from "../config";
import type { Dictionary } from "../types";
import de from "./de";
import en from "./en";
import es from "./es";
import fr from "./fr";
import ja from "./ja";
import zh from "./zh";

export const dictionaries: Record<Locale, Dictionary> = { en, es, de, fr, zh, ja };
