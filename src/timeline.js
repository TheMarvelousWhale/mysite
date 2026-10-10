import { load } from "js-yaml";
import raw from "./timeline.yml?raw";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

const data = load(raw);

export const SHORT_MAX = Number(data.shortMax) || 46;

function readSections(year) {
  const source = Array.isArray(year.sections)
    ? year.sections.flatMap((section) =>
        (section.items ?? []).map((item) => ({ ...item, tag: section.tag ?? item.tag ?? "" })),
      )
    : (year.items ?? []);
  const order = [];
  const groups = new Map();
  for (const item of source) {
    const tag = item.tag ?? "";
    if (!groups.has(tag)) {
      groups.set(tag, []);
      order.push(tag);
    }
    groups.get(tag).push(item);
  }
  return order.map((tag) => ({ tag, items: groups.get(tag) }));
}

export const YEARS = (data.years ?? []).map((year, index) => {
  let cursor = 0;
  const sections = readSections(year).map((section) => ({
    tag: section.tag ?? "",
    items: (section.items ?? []).map((item) => ({
      tag: section.tag ?? item.tag ?? "",
      text: item.text ?? "",
      short: item.short ?? "",
      detail: item.detail ?? "",
      index: cursor++,
    })),
  }));

  return {
    id: String(year.year),
    badge: ROMAN[index] ?? String(index + 1),
    title: String(year.year),
    subtitle: year.label ?? "",
    sections,
    entries: sections.flatMap((section) => section.items),
  };
});

export function shorten(entry, max = SHORT_MAX) {
  const source = (entry.short || entry.text || "").trim();
  if (source.length <= max) return source;
  return `${source.slice(0, max).trimEnd()}…`;
}
