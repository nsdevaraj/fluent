import { COMPONENTS, CATEGORIES } from "./componentManifest";

export interface NavItem {
  id: string;
  label: string;
  path: string;
  children?: NavItem[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

// ── Component navigation — auto-generated from the manifest ──────────────────
const componentNavItems: NavItem[] = CATEGORIES.map((cat) => ({
  id: `cat-${cat.toLowerCase().replace(/\s+/g, "-")}`,
  label: cat,
  path: "/components",
  children: COMPONENTS.filter((c) => c.category === cat).map((c) => ({
    id: `comp-${c.id}`,
    label: c.name,
    path: `/components/${c.id}`,
  })),
})).filter((item) => (item.children?.length ?? 0) > 0);

// ── Nav groups ────────────────────────────────────────────────────────────────
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Foundations",
    items: [
      { id: "introduction", label: "Introduction", path: "/" },
      {
        id: "tokens",
        label: "Design Tokens",
        path: "/tokens",
        children: [
          { id: "tokens-colors", label: "Colors", path: "/tokens/colors" },
          { id: "tokens-typography", label: "Typography", path: "/tokens/typography" },
          { id: "tokens-spacing", label: "Spacing", path: "/tokens/spacing" },
          { id: "tokens-shadows", label: "Shadows", path: "/tokens/shadows" },
          { id: "tokens-motion", label: "Motion", path: "/tokens/motion" },
        ],
      },
      {
        id: "themes",
        label: "Themes",
        path: "/themes",
        children: [
          { id: "themes-light", label: "Light Theme", path: "/themes/light" },
          { id: "themes-dark", label: "Dark Theme", path: "/themes/dark" },
          { id: "themes-high-contrast", label: "High Contrast", path: "/themes/high-contrast" },
          { id: "themes-compare", label: "Comparison", path: "/themes/compare" },
        ],
      },
    ],
  },
  {
    label: "Components",
    items: componentNavItems,
  },
  {
    label: "Library",
    items: [
      { id: "patterns", label: "Patterns", path: "/patterns" },
      { id: "templates", label: "Templates", path: "/templates" },
    ],
  },
  {
    label: "Quality",
    items: [
      { id: "accessibility", label: "Accessibility", path: "/accessibility" },
    ],
  },
  {
    label: "Project",
    items: [
      { id: "releases", label: "Release Notes", path: "/releases" },
      { id: "feedback", label: "Feedback", path: "/feedback" },
    ],
  },
];

/** Flatten nav tree for active-path matching */
export function getAllNavItems(groups: NavGroup[]): NavItem[] {
  const items: NavItem[] = [];
  function collect(list: NavItem[]) {
    for (const item of list) {
      items.push(item);
      if (item.children) collect(item.children);
    }
  }
  groups.forEach((g) => collect(g.items));
  return items;
}

/** Find the nav item ID for a given pathname */
export function getActiveNavId(pathname: string, groups: NavGroup[]): string {
  const all = getAllNavItems(groups);
  // Exact match first
  const exact = all.find((i) => i.path === pathname);
  if (exact) return exact.id;
  // Prefix match (longest wins)
  const prefix = all
    .filter((i) => pathname.startsWith(i.path) && i.path !== "/")
    .sort((a, b) => b.path.length - a.path.length)[0];
  return prefix?.id ?? "introduction";
}
