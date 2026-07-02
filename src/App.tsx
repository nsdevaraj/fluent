import React, { useState } from "react";
import {
  FluentProvider,
  makeStyles, tokens, Text, Input, Switch, Caption1, Body1,
} from "@fluentui/react-components";
import { lightTheme, darkTheme } from "./themes";
import {
  // Token icons
  Color20Regular, Color20Filled,
  TextFont20Regular, TextFont20Filled,
  SquareHintRegular, SquareHintFilled,
  PaddingDownRegular, PaddingDownFilled,
  AlignSpaceBetweenVerticalRegular, AlignSpaceBetweenVerticalFilled,
  // Component icons
  CursorClickRegular, CursorClickFilled,
  TextboxRegular, TextboxFilled,
  TextAlignLeftRegular, TextAlignLeftFilled,
  ChevronCircleDownRegular, ChevronCircleDownFilled,
  ToggleLeftRegular, ToggleLeftFilled,
  ShieldBadge20Regular, ShieldBadge20Filled,
  Person20Regular, Person20Filled,
  // Shell icons
  Search20Regular,
  WeatherMoon20Regular, WeatherSunny20Regular,
} from "@fluentui/react-icons";

// Token pages
import { ColorPage }        from "./showcase/pages/tokens/ColorPage";
import { TypographyPage }   from "./showcase/pages/TypographyPage";
import { CornerRadiusPage } from "./showcase/pages/tokens/CornerRadiusPage";
import { ShadowPage }       from "./showcase/pages/tokens/ShadowPage";
import { SpacingPage }      from "./showcase/pages/tokens/SpacingPage";

// Component pages
import { ButtonsPage }      from "./showcase/pages/ButtonsPage";
import { InputFieldPage }   from "./showcase/pages/components/InputFieldPage";
import { TextareaPage }     from "./showcase/pages/components/TextareaPage";
import { DropdownPage }     from "./showcase/pages/components/DropdownPage";
import { TogglesPage }      from "./showcase/pages/components/TogglesPage";
import { BadgesPage }       from "./showcase/pages/BadgesPage";
import { AvatarsPage }      from "./showcase/pages/AvatarsPage";

// ─── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  sidebar: {
    width: "240px",
    flexShrink: 0,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  sidebarHeader: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  logoBox: {
    width: "28px",
    height: "28px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  navScroll: {
    flex: 1,
    overflowY: "auto",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalS}`,
    display: "flex",
    flexDirection: "column",
  },
  groupLabel: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginTop: tokens.spacingVerticalS,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    marginBottom: "2px",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1,
    },
  },
  navItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
    "&:hover": { backgroundColor: tokens.colorBrandBackground2 },
  },
  sidebarFooter: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {
    flex: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    height: "52px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    padding: `0 ${tokens.spacingHorizontalXXL}`,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexShrink: 0,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    maxWidth: "900px",
  },
  pageTitle: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalL,
    borderBottom: `2px solid ${tokens.colorBrandBackground}`,
  },
});

// ─── Nav Config ───────────────────────────────────────────────────────────────

type PageId =
  | "token-color" | "token-typography" | "token-radius" | "token-shadow" | "token-spacing"
  | "comp-button" | "comp-input" | "comp-textarea" | "comp-dropdown" | "comp-toggles"
  | "comp-badges" | "comp-avatars";

interface NavItem {
  id: PageId;
  label: string;
  description: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Tokens",
    items: [
      { id: "token-color",      label: "Color Hierarchy", description: "Brand, neutral, semantic and stroke color tokens",
        icon: <Color20Regular />,                        activeIcon: <Color20Filled /> },
      { id: "token-typography", label: "Typography",      description: "Type ramp, weights, colors and semantic components",
        icon: <TextFont20Regular />,                     activeIcon: <TextFont20Filled /> },
      { id: "token-radius",     label: "Corner Radius",   description: "Border radius tokens for consistent rounded corners",
        icon: <SquareHintRegular />,                     activeIcon: <SquareHintFilled /> },
      { id: "token-shadow",     label: "Shadow",          description: "Elevation shadow tokens — never write custom box-shadow",
        icon: <PaddingDownRegular />,                    activeIcon: <PaddingDownFilled /> },
      { id: "token-spacing",    label: "Spacing",         description: "Spacing tokens for padding, gap and margin",
        icon: <AlignSpaceBetweenVerticalRegular />,      activeIcon: <AlignSpaceBetweenVerticalFilled /> },
    ],
  },
  {
    label: "UI Components",
    items: [
      { id: "comp-button",   label: "Button",             description: "All button variants, sizes and states",
        icon: <CursorClickRegular />,                    activeIcon: <CursorClickFilled /> },
      { id: "comp-input",    label: "Input Field",        description: "Text input — outline, small & medium, all states",
        icon: <TextboxRegular />,                        activeIcon: <TextboxFilled /> },
      { id: "comp-textarea", label: "Textarea",           description: "Multi-line text input",
        icon: <TextAlignLeftRegular />,                  activeIcon: <TextAlignLeftFilled /> },
      { id: "comp-dropdown", label: "Dropdown",           description: "Dropdown for fixed lists, Combobox for searchable lists",
        icon: <ChevronCircleDownRegular />,              activeIcon: <ChevronCircleDownFilled /> },
      { id: "comp-toggles",  label: "Switch & Checkbox",  description: "Switch, Checkbox, and Radio Group",
        icon: <ToggleLeftRegular />,                     activeIcon: <ToggleLeftFilled /> },
      { id: "comp-badges",   label: "Badges",             description: "Badge, CounterBadge and PresenceBadge",
        icon: <ShieldBadge20Regular />,                  activeIcon: <ShieldBadge20Filled /> },
      { id: "comp-avatars",  label: "Avatars",            description: "Avatar sizes, colors, shapes and AvatarGroup",
        icon: <Person20Regular />,                       activeIcon: <Person20Filled /> },
    ],
  },
];

const pageComponents: Record<PageId, React.ReactNode> = {
  "token-color":      <ColorPage />,
  "token-typography": <TypographyPage />,
  "token-radius":     <CornerRadiusPage />,
  "token-shadow":     <ShadowPage />,
  "token-spacing":    <SpacingPage />,
  "comp-button":      <ButtonsPage />,
  "comp-input":       <InputFieldPage />,
  "comp-textarea":    <TextareaPage />,
  "comp-dropdown":    <DropdownPage />,
  "comp-toggles":     <TogglesPage />,
  "comp-badges":      <BadgesPage />,
  "comp-avatars":     <AvatarsPage />,
};

// ─── App ──────────────────────────────────────────────────────────────────────

function ShowcaseApp() {
  const styles = useStyles();
  const [page, setPage] = useState<PageId>("token-color");
  const [dark, setDark] = useState(false);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const [search, setSearch] = useState("");

  const allItems = navGroups.flatMap(g => g.items);
  const currentNav = allItems.find(n => n.id === page)!;

  const filteredGroups = navGroups.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.label.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(group => group.items.length > 0);

  return (
    <FluentProvider theme={dark ? darkTheme : lightTheme} dir={dir}>
      <div className={styles.root}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.logoRow}>
              <div className={styles.logoBox}>
                <Text style={{ color: "#fff", fontSize: "13px", fontWeight: 700 }}>F2</Text>
              </div>
              <div>
                <Text weight="semibold" size={300} block>Fluent 2</Text>
                <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>Component Library</Caption1>
              </div>
            </div>
            <Input
              contentBefore={<Search20Regular />}
              placeholder="Search..."
              size="small"
              value={search}
              onChange={(_, d) => setSearch(d.value)}
            />
          </div>

          <nav className={styles.navScroll}>
            {filteredGroups.map(group => (
              <div key={group.label}>
                <div className={styles.groupLabel}>{group.label}</div>
                {group.items.map(item => (
                  <div
                    key={item.id}
                    className={`${styles.navItem} ${page === item.id ? styles.navItemActive : ""}`}
                    onClick={() => { setPage(item.id); setSearch(""); }}
                  >
                    {page === item.id ? item.activeIcon : item.icon}
                    {item.label}
                  </div>
                ))}
              </div>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            {dark ? <WeatherMoon20Regular /> : <WeatherSunny20Regular />}
            <Switch
              label={dark ? "Dark" : "Light"}
              checked={dark}
              onChange={(_, d) => setDark(d.checked)}
            />
            <Switch
              label={dir === "rtl" ? "RTL" : "LTR"}
              checked={dir === "rtl"}
              onChange={(_, d) => setDir(d.checked ? "rtl" : "ltr")}
            />
          </div>
        </aside>

        {/* Main */}
        <main className={styles.main}>
          <div className={styles.topBar}>
            <Text weight="semibold" size={300}>{currentNav.label}</Text>
            <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>
              {currentNav.description}
            </Caption1>
          </div>

          <div className={styles.content}>
            <div className={styles.pageTitle}>
              <Text size={700} weight="bold">{currentNav.label}</Text>
              <Body1 style={{ color: tokens.colorNeutralForeground2 }}>
                {currentNav.description}
              </Body1>
            </div>
            {pageComponents[page]}
          </div>
        </main>
      </div>
    </FluentProvider>
  );
}

export default ShowcaseApp;
