import {
  BookOpenCheck,
  Bot,
  Clock3,
  Download,
  LibraryBig,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  type LucideIcon,
} from "lucide-react";

/**
 * Homepage *structure*. The copy lives in `messages/{locale}.json` under the
 * `home` namespace and is read with `t.raw()` by the sections themselves.
 *
 * Why the homepage uses the JSON catalogues while the tool pages use per-locale
 * TS modules: every homepage section is a client component (they all use
 * `useScrollReveal`), and `NextIntlClientProvider` only ships the active
 * locale's messages. Importing a TS content module into a client component
 * would put *both* locales' copy in the browser bundle. The tool pages render
 * on the server, where that trade-off does not apply, and their deeply nested
 * arrays are far better served by a typed module than by flat message keys.
 *
 * What stays here is anything the JSON cannot carry: Lucide icon components,
 * screenshot keys and the numeric review ratings that feed Product schema. Each
 * array is positional — index N lines up with index N of the matching message
 * array, so adding an item means adding it in both places.
 */

export type InfoItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type StepItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type OutputKind = "plan" | "worksheet" | "test";

export type OutputItem = {
  label: string;
  title: string;
  description: string;
  alt: string;
  kind: OutputKind;
};

export type QuoteItem = {
  quote: string;
  role: string;
  rating: number;
};

/** Matches `home.problem.painPoints`. */
export const painPointIcons: LucideIcon[] = [Clock3, Bot, SlidersHorizontal];

/** Matches `home.howItWorks.steps`. */
export const stepIcons: LucideIcon[] = [Upload, Bot, Download];

/** Matches `home.valueProps.items`. */
export const valuePropIcons: LucideIcon[] = [
  BookOpenCheck,
  SlidersHorizontal,
  ShieldCheck,
  LibraryBig,
];

/** Matches `home.outputs.items`; selects the screenshot in `OutputCard`. */
export const outputKinds: OutputKind[] = ["plan", "worksheet", "test"];

/**
 * Matches `home.socialProof.quotes`. Ratings are not copy — they are the values
 * marked up as `AggregateRating` on the pricing page, so they must be identical
 * in every locale.
 */
export const socialProofRatings = [5, 4, 4.7];

type CopyItem = { title: string; description: string };

/** Zips translated copy with the positional icon list above. */
export function withIcons<T extends CopyItem>(
  items: T[],
  icons: LucideIcon[],
): (T & { icon: LucideIcon })[] {
  return items.map((item, index) => ({
    ...item,
    icon: icons[index] ?? icons[icons.length - 1],
  }));
}

/** Zips translated quotes with their (locale-independent) ratings. */
export function withRatings(
  quotes: { quote: string; role: string }[],
): QuoteItem[] {
  return quotes.map((quote, index) => ({
    ...quote,
    rating: socialProofRatings[index] ?? socialProofRatings[socialProofRatings.length - 1],
  }));
}

/** Zips translated output copy with its screenshot kind. */
export function withKinds(
  items: { label: string; title: string; description: string; alt: string }[],
): OutputItem[] {
  return items.map((item, index) => ({
    ...item,
    kind: outputKinds[index] ?? outputKinds[outputKinds.length - 1],
  }));
}
