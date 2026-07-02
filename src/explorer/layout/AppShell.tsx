import React, { useState, useCallback } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  makeStyles,
  tokens,
  mergeClasses,
} from "@fluentui/react-components";
import {
  WeatherSunny20Regular,
  WeatherMoon20Regular,
  Navigation20Regular,
  Dismiss20Regular,
  DesignIdeas20Regular,
  Home20Regular,
  Color20Regular,
  AppsListDetail20Regular,
  TextFont20Regular,
  DocumentText20Regular,
  Chat20Regular,
  TableSimple20Regular,
  PaddingTop20Regular,
  Document20Regular,
  DocumentMultiple20Regular,
  Accessibility20Regular,
  Rocket20Regular,
  Code20Regular,
} from "@fluentui/react-icons";

import { SideNav, type SideNavGroup, type SideNavItem } from "../../components/ui/SideNav";
import { SearchInput } from "../../components/ui/SearchInput";
import { Button } from "../../components/ui/Button";
import { Tag } from "../../components/ui/Tag";
import { Body, Caption } from "../../components/ui/Typography";
import { Divider } from "../../components/ui/Divider";
import { useThemeContext } from "../ThemeContext";
import { NAV_GROUPS, getActiveNavId, type NavItem } from "../data/navItems";
import { COMPONENTS } from "../data/componentManifest";

// ─── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  // ── Sidebar ──────────────────────────────────────────────────────────────
  sidebar: {
    display: "flex",
    flexDirection: "column",
    width: "240px",
    minWidth: "240px",
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground2,
    borderInlineEndWidth: tokens.strokeWidthThin,
    borderInlineEndStyle: "solid",
    borderInlineEndColor: tokens.colorNeutralStroke1,
    overflow: "hidden",
    flexShrink: 0,
    transitionProperty: "width, min-width",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    "@media (max-width: 768px)": {
      position: "fixed",
      top: "0",
      insetInlineStart: "0",
      zIndex: "200",
      height: "100%",
      boxShadow: tokens.shadow16,
    },
  },
  sidebarHidden: {
    "@media (max-width: 768px)": {
      width: "0",
      minWidth: "0",
    },
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    flexShrink: 0,
  },
  brandIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
  },
  brandText: {
    flex: 1,
    overflow: "hidden",
  },
  brandName: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
  },
  navScroll: {
    flex: 1,
    overflowY: "auto",
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXXL,
  },
  // ── Main area ─────────────────────────────────────────────────────────────
  main: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    // NOTE: Do NOT set overflow: hidden here — it creates a scroll container
    // boundary that confuses Floating UI's overlay positioning (Popover,
    // Tooltip, TeachingPopover would render at the top of the screen).
    minWidth: 0,
  },
  // ── Top bar ───────────────────────────────────────────────────────────────
  topbar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    height: "52px",
    minHeight: "52px",
    padding: `0 ${tokens.spacingHorizontalL}`,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    flexShrink: 0,
    boxShadow: tokens.shadow2,
  },
  hamburger: {
    display: "none",
    "@media (max-width: 768px)": {
      display: "flex",
    },
  },
  searchWrap: {
    flex: 1,
    maxWidth: "380px",
  },
  topbarRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    marginInlineStart: "auto",
  },
  themeLabel: {
    "@media (max-width: 480px)": {
      display: "none",
    },
  },
  // ── Content ───────────────────────────────────────────────────────────────
  content: {
    flex: 1,
    overflowY: "auto",
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXXL}`,
    "@media (max-width: 768px)": {
      padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    },
  },
  // ── Mobile overlay ────────────────────────────────────────────────────────
  overlay: {
    display: "none",
    "@media (max-width: 768px)": {
      display: "block",
      position: "fixed",
      inset: "0",
      backgroundColor: tokens.colorNeutralBackgroundInverted,
      opacity: "0.4",
      zIndex: "199",
    },
  },
});

// ─── Icon map for nav item IDs ────────────────────────────────────────────────

const NAV_ICONS: Record<string, React.ReactElement> = {
  // Foundations
  introduction:        <Home20Regular />,
  tokens:              <Color20Regular />,
  themes:              <WeatherSunny20Regular />,
  // Component categories
  "cat-form-inputs":   <DocumentText20Regular />,
  "cat-feedback":      <Chat20Regular />,
  "cat-navigation":    <AppsListDetail20Regular />,
  "cat-overlay":       <Document20Regular />,
  "cat-data-display":  <TableSimple20Regular />,
  "cat-layout":        <PaddingTop20Regular />,
  "cat-typography":    <TextFont20Regular />,
  "cat-action":        <Rocket20Regular />,
  // Library
  patterns:            <Code20Regular />,
  templates:           <DocumentMultiple20Regular />,
  // Quality
  accessibility:       <Accessibility20Regular />,
  // Project
  releases:            <Document20Regular />,
  feedback:            <Chat20Regular />,
};

// ─── Build SideNav groups from navItems data ──────────────────────────────────

function mapNavItem(item: NavItem): SideNavItem {
  return {
    id: item.id,
    label: item.label,
    icon: NAV_ICONS[item.id],
    children: item.children?.map(mapNavItem),
  };
}

function buildNavGroups(): SideNavGroup[] {
  return NAV_GROUPS.map((g) => ({
    label: g.label,
    items: g.items.map(mapNavItem),
  }));
}

// ─── Search: build a flat search index ───────────────────────────────────────

interface SearchResult {
  label: string;
  path: string;
  type: "page" | "component" | "token";
}

function buildSearchIndex(): SearchResult[] {
  const pages: SearchResult[] = [
    { label: "Introduction", path: "/", type: "page" },
    { label: "Design Tokens", path: "/tokens", type: "page" },
    { label: "Colors", path: "/tokens/colors", type: "token" },
    { label: "Typography Tokens", path: "/tokens/typography", type: "token" },
    { label: "Spacing Tokens", path: "/tokens/spacing", type: "token" },
    { label: "Shadows Tokens", path: "/tokens/shadows", type: "token" },
    { label: "Motion Tokens", path: "/tokens/motion", type: "token" },
    { label: "Themes", path: "/themes", type: "page" },
    { label: "Light Theme", path: "/themes/light", type: "page" },
    { label: "Dark Theme", path: "/themes/dark", type: "page" },
    { label: "Components", path: "/components", type: "page" },
    { label: "Patterns", path: "/patterns", type: "page" },
    { label: "Templates", path: "/templates", type: "page" },
    { label: "Accessibility", path: "/accessibility", type: "page" },
    { label: "Release Notes", path: "/releases", type: "page" },
    { label: "Feedback", path: "/feedback", type: "page" },
  ];
  const components: SearchResult[] = COMPONENTS.map((c) => ({
    label: c.name,
    path: `/components/${c.id}`,
    type: "component",
  }));
  return [...pages, ...components];
}

const SEARCH_INDEX = buildSearchIndex();

// ─── AppShell ─────────────────────────────────────────────────────────────────

export function AppShell() {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useThemeContext();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const activeId = getActiveNavId(location.pathname, NAV_GROUPS);

  const handleNavSelect = useCallback(
    (id: string) => {
      // Find path from id across all nav items
      const findPath = (items: typeof NAV_GROUPS[0]["items"]): string | null => {
        for (const item of items) {
          if (item.id === id) return item.path;
          if (item.children) {
            const found = findPath(item.children);
            if (found) return found;
          }
        }
        return null;
      };
      for (const group of NAV_GROUPS) {
        const path = findPath(group.items);
        if (path) {
          navigate(path);
          setMobileNavOpen(false);
          return;
        }
      }
    },
    [navigate]
  );

  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const q = query.toLowerCase();
    setSearchResults(
      SEARCH_INDEX.filter((r) => r.label.toLowerCase().includes(q)).slice(0, 8)
    );
  }, []);

  const navGroups = buildNavGroups();

  return (
    <div className={styles.root}>
      {/* Mobile overlay */}
      {mobileNavOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={mergeClasses(
          styles.sidebar,
          !mobileNavOpen ? styles.sidebarHidden : undefined
        )}
        aria-label="Design System navigation"
      >
        {/* Brand */}
        <div className={styles.brand}>
          <span className={styles.brandIcon} aria-hidden="true">
            <DesignIdeas20Regular />
          </span>
          <div className={styles.brandText}>
            <div className={styles.brandName}>
              <Body as="span">Lumel DS</Body>
            </div>
            <Caption color="subtle">v0.1.0-alpha.1</Caption>
          </div>
          <Tag appearance="brand" size="extra-small">Alpha</Tag>
        </div>

        {/* Nav */}
        <div className={styles.navScroll}>
          <SideNav
            groups={navGroups}
            selectedId={activeId}
            onSelect={handleNavSelect}
          />
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        {/* Top bar */}
        <header className={styles.topbar}>
          {/* Hamburger (mobile only) */}
          <div className={styles.hamburger}>
            <Button
              appearance="subtle"
              size="small"
              icon={mobileNavOpen ? <Dismiss20Regular /> : <Navigation20Regular />}
              onClick={() => setMobileNavOpen((o) => !o)}
              aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
            />
          </div>

          {/* Search */}
          <div className={styles.searchWrap} role="search">
            <SearchInput
              onSearch={handleSearch}
              placeholder="Search components, tokens, patterns…"
              size="medium"
              debounceMs={150}
            />
          </div>

          {/* Right actions */}
          <div className={styles.topbarRight}>
            <Divider vertical />
            <Button
              appearance="subtle"
              size="small"
              icon={isDark ? <WeatherSunny20Regular /> : <WeatherMoon20Regular />}
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className={styles.themeLabel}>
                {isDark ? "Light" : "Dark"}
              </span>
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className={styles.content} id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
