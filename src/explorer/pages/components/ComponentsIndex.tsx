import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, tokens, shorthands } from "@fluentui/react-components";
import {
  ArrowRight16Regular,
  DocumentText20Regular,
  Chat20Regular,
  AppsListDetail20Regular,
  Document20Regular,
  TableSimple20Regular,
  PaddingTop20Regular,
  TextFont20Regular,
  Rocket20Regular,
} from "@fluentui/react-icons";

import { SearchInput } from "../../../components/ui/SearchInput";
import { Body, Caption } from "../../../components/ui/Typography";
import { Tag } from "../../../components/ui/Tag";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Button } from "../../../components/ui/Button";
import { ToggleButton } from "../../../components/ui/ToggleButton";
import {
  COMPONENTS,
  CATEGORIES,
  CATEGORY_COUNTS,
  type ComponentCategory,
} from "../../data/componentManifest";

// ── Category icons ─────────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<ComponentCategory, React.ReactElement> = {
  "Form Inputs":  <DocumentText20Regular />,
  "Feedback":     <Chat20Regular />,
  "Navigation":   <AppsListDetail20Regular />,
  "Overlay":      <Document20Regular />,
  "Data Display": <TableSimple20Regular />,
  "Layout":       <PaddingTop20Regular />,
  "Typography":   <TextFont20Regular />,
  "Action":       <Rocket20Regular />,
};

// ── Category accent colours (brand token each) ───────────────────────────────

const CATEGORY_COLOR: Record<ComponentCategory, string> = {
  "Form Inputs":  tokens.colorBrandForeground1,
  "Feedback":     tokens.colorPaletteTealForeground2,
  "Navigation":   tokens.colorPaletteMarigoldForeground2,
  "Overlay":      tokens.colorPalettePurpleForeground2,
  "Data Display": tokens.colorPaletteGreenForeground2,
  "Layout":       tokens.colorPaletteCranberryForeground2,
  "Typography":   tokens.colorNeutralForeground2,
  "Action":       tokens.colorPaletteDarkOrangeForeground2,
};

const CATEGORY_BG: Record<ComponentCategory, string> = {
  "Form Inputs":  tokens.colorBrandBackground2,
  "Feedback":     tokens.colorPaletteTealBackground2,
  "Navigation":   tokens.colorPaletteMarigoldBackground2,
  "Overlay":      tokens.colorPalettePurpleBackground2,
  "Data Display": tokens.colorPaletteGreenBackground2,
  "Layout":       tokens.colorPaletteCranberryBackground2,
  "Typography":   tokens.colorNeutralBackground3,
  "Action":       tokens.colorPaletteDarkOrangeBackground2,
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    maxWidth: "1100px",
  },

  titleBar: {
    display: "flex",
    alignItems: "baseline",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  pageTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorNeutralForeground1,
  },
  pageCount: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase300,
  },

  controls: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  searchWrap: {
    maxWidth: "400px",
  },
  filterBar: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    flexWrap: "wrap",
    alignItems: "center",
  },

  // ── Category section ────────────────────────────────────────────────────────
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingBottom: tokens.spacingVerticalXS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },

  // ── Card grid ───────────────────────────────────────────────────────────────
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: tokens.spacingHorizontalM,
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    padding: tokens.spacingVerticalM,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    transitionProperty: "border-color, box-shadow",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      ...shorthands.borderColor(tokens.colorBrandStroke1),
      boxShadow: tokens.shadow4,
    },
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalXXS,
  },
  cardIcon: {
    width: "32px",
    height: "32px",
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "18px",
  },
  cardName: {
    flex: 1,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  cardArrow: {
    color: tokens.colorNeutralForeground3,
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  cardDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
    overflow: "hidden",
    maxHeight: "32px",
  },
  cardMeta: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginTop: "auto",
    paddingTop: tokens.spacingVerticalXXS,
  },
  propsCount: {
    marginLeft: "auto",
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground4,
  },
});

// ─── Component ────────────────────────────────────────────────────────────────

const ALL_FILTER = "All";

export function ComponentsIndex() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(ALL_FILTER);

  const filtered = useMemo(() => {
    let list = COMPONENTS;
    if (activeCategory !== ALL_FILTER) {
      list = list.filter((c) => c.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeCategory]);

  const grouped = useMemo(() => {
    const map: Partial<Record<ComponentCategory, typeof COMPONENTS>> = {};
    for (const comp of filtered) {
      if (!map[comp.category]) map[comp.category] = [];
      map[comp.category]!.push(comp);
    }
    return map;
  }, [filtered]);

  const visibleCategories = CATEGORIES.filter((cat) => grouped[cat]?.length);

  return (
    <div className={styles.root}>
      {/* Title */}
      <div className={styles.titleBar}>
        <span className={styles.pageTitle}>Components</span>
        <span className={styles.pageCount}>{COMPONENTS.length} components</span>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <SearchInput
            onSearch={setSearch}
            placeholder="Search components…"
            debounceMs={150}
          />
        </div>
        <div className={styles.filterBar} role="group" aria-label="Filter by category">
          {[ALL_FILTER, ...CATEGORIES].map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === ALL_FILTER
                ? COMPONENTS.length
                : CATEGORY_COUNTS[cat as ComponentCategory];
            return (
              <ToggleButton
                key={cat}
                size="small"
                appearance={isActive ? "primary" : "secondary"}
                checked={isActive}
                onChange={() => setActiveCategory(cat)}
                aria-pressed={isActive}
              >
                {cat} {count}
              </ToggleButton>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No components found"
          description={`No components match "${search}"${activeCategory !== ALL_FILTER ? ` in ${activeCategory}` : ""}.`}
          action={
            <Button
              appearance="primary"
              onClick={() => { setSearch(""); setActiveCategory(ALL_FILTER); }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        visibleCategories.map((category) => (
          <div key={category} className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>{category}</span>
              <Tag appearance="filled" size="extra-small">{grouped[category]!.length}</Tag>
            </div>
            <div className={styles.cardGrid}>
              {grouped[category]!.map((comp) => {
                const iconColor = CATEGORY_COLOR[comp.category];
                const iconBg = CATEGORY_BG[comp.category];
                const icon = CATEGORY_ICONS[comp.category];
                return (
                  <div
                    key={comp.id}
                    className={styles.card}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/components/${comp.id}`)}
                    onKeyDown={(e) => e.key === "Enter" && navigate(`/components/${comp.id}`)}
                    aria-label={`${comp.name} — ${comp.description}`}
                  >
                    <div className={styles.cardTop}>
                      <div
                        className={styles.cardIcon}
                        style={{ backgroundColor: iconBg, color: iconColor }}
                        aria-hidden="true"
                      >
                        {icon}
                      </div>
                      <span className={styles.cardName}>{comp.name}</span>
                      <span className={styles.cardArrow} aria-hidden="true">
                        <ArrowRight16Regular />
                      </span>
                    </div>
                    <div className={styles.cardDesc}>{comp.description}</div>
                    <div className={styles.cardMeta}>
                      <StatusBadge status="completed" label={comp.status} size="small" />
                      <span className={styles.propsCount}>{comp.props.length} props</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
