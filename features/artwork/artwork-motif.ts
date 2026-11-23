// Every seeded item has an art-directed composition. Keyword matching is only the
// fallback for items added after the bundled catalog.
const itemMotifs: Record<string, number> = {
  'async patterns': 0,
  'websocket basics': 1,
  'server-sent events': 2,
  'hydration notes': 3,
  'hot module reload': 4,
  'localhost morning': 5,
  'readme starter': 6,
  'open source checklist': 7,
  'sunday deploy plan': 8,
  'package manifest': 9,
  'ship checklist': 10,
  'stack trace helper': 11,
  '3 am push guard': 12,
  'merge conflict diff': 13,
  'safe force push': 14,
  'pixel perfect layout': 15,
  'tailwind patterns': 16,
  'component chemistry': 17,
  'type safe forms': 18,
  'first contentful paint': 19,
  'slow build notes': 20,
  'console calm': 21,
  'soft reset': 22,
  'idle thread': 23,
  'sleep mode checklist': 24,
  'neon terminal': 25,
  'retro compiler': 26,
  'cyber monday': 27,
  'chrome dreams': 28,
  'midnight deploy': 29,
  'race condition': 30,
  deadlock: 31,
  backpressure: 32,
  'commit message': 33,
  'force push plan': 34,
  'cache hit': 35,
  'null pointer guard': 36,
  'vibe coding': 37,
  'pr approved': 38,
  'localhost notes': 39,
  'stack trace review': 40,
  'crt glow': 41,
  'modem handshake': 42,
  'bios boot': 43,
};

const motifs = [
  { index: 46, test: /love|crush|heart|feeling|romance|kiss|\bforms?\b/ },
  { index: 45, test: /sunset|sunrise|synth|morning|midnight|dawn|dusk|night|dream|sunday/ },
  { index: 51, test: /sleep|calm|idle|slow|soft|quiet|rest|dark|notes/ },
  { index: 47, test: /pixel|crt|terminal|bios|compil|console|retro|neon|paint|chrome|glow|render/ },
  { index: 50, test: /merge|conflict|stack|trace|overflow|deadlock|pointer|commit|cache|approv|reset|branch|diff/ },
  { index: 49, test: /async|await|chemistr|component|thread|race|condition|atom|orbit|cycle|promise/ },
  { index: 48, test: /energ|electro|push|force|ship|deploy|boot|monday|vibe|fast/ },
  {
    index: 44,
    test: /hydrat|water|ripple|backpressure|socket|stream|wave|flow|handshake|reload|hot|echo|pulse/,
  },
] as const;

const GENERIC_ITEM_MOTIF_COUNT = 8;
export const COLLECTION_VARIANT_COUNT = 4;

export type ArtworkKind = 'item' | 'group' | 'collection' | 'category';

/** Every movement is constructed to return to its origin over this live loop. */
export const COVER_LOOP_SECONDS = 12;

const categoryMotifs: Record<string, number> = {
  docs: 0,
  templates: 1,
  tools: 2,
  guides: 3,
};

const collectionMotifs: Record<string, number> = {
  mycollection: 0,
  'high energy': 1,
  'morning focus': 2,
  'late night coding': 3,
};

export function seedVector(value: string): [number, number, number, number] {
  let a = 0x9e3779b9;
  let b = 0x243f6a88;
  let c = 0xb7e15162;
  let d = 0xdeadbeef;

  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    a = Math.imul(a ^ code, 2654435761);
    b = Math.imul(b ^ code, 1597334677);
    c = Math.imul(c ^ code, 2246822519);
    d = Math.imul(d ^ code, 3266489917);
  }

  return [a, b, c, d].map(number => (number >>> 0) / 4294967295) as [number, number, number, number];
}

export function artworkVariant(label: string, kind: ArtworkKind, fallback: number) {
  if (kind === 'category') return categoryMotifs[label.toLowerCase()] ?? Math.floor(fallback * 6);
  if (kind === 'collection') {
    return (
      collectionMotifs[label.toLowerCase()] ??
      Math.min(COLLECTION_VARIANT_COUNT - 1, Math.floor(fallback * COLLECTION_VARIANT_COUNT))
    );
  }
  return motifForTitle(label, fallback);
}

export function motifForTitle(title: string, fallback: number) {
  const value = title.toLowerCase();
  const directed = itemMotifs[value];
  if (directed !== undefined) return directed;
  for (const motif of motifs) {
    if (motif.test.test(value)) return motif.index;
  }
  return 44 + Math.min(GENERIC_ITEM_MOTIF_COUNT - 1, Math.floor(fallback * GENERIC_ITEM_MOTIF_COUNT));
}
