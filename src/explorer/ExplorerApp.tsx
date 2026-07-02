import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FluentProvider } from "@fluentui/react-components";
import { ThemeProvider, useThemeContext } from "./ThemeContext";
import { AppShell } from "./layout/AppShell";
import { Spinner } from "../components/ui/Spinner";

// ─── Lazy page imports ────────────────────────────────────────────────────────
const Introduction       = lazy(() => import("./pages/Introduction").then((m) => ({ default: m.Introduction })));
const ComponentsIndex    = lazy(() => import("./pages/components/ComponentsIndex").then((m) => ({ default: m.ComponentsIndex })));
const ComponentDetail    = lazy(() => import("./pages/components/ComponentDetail").then((m) => ({ default: m.ComponentDetail })));
const TokensIndex        = lazy(() => import("./pages/tokens/TokensIndex").then((m) => ({ default: m.TokensIndex })));
const ColorsPage         = lazy(() => import("./pages/tokens/ColorsPage").then((m) => ({ default: m.ColorsPage })));
const TypographyPage     = lazy(() => import("./pages/tokens/TypographyPage").then((m) => ({ default: m.TypographyPage })));
const SpacingPage        = lazy(() => import("./pages/tokens/SpacingPage").then((m) => ({ default: m.SpacingPage })));
const ShadowsPage        = lazy(() => import("./pages/tokens/ShadowsPage").then((m) => ({ default: m.ShadowsPage })));
const MotionPage         = lazy(() => import("./pages/tokens/MotionPage").then((m) => ({ default: m.MotionPage })));
const ThemesPage         = lazy(() => import("./pages/themes/ThemesPage").then((m) => ({ default: m.ThemesPage })));
const PatternsPage       = lazy(() => import("./pages/patterns/PatternsPage").then((m) => ({ default: m.PatternsPage })));
const TemplatesPage      = lazy(() => import("./pages/templates/TemplatesPage").then((m) => ({ default: m.TemplatesPage })));
const AccessibilityPage  = lazy(() => import("./pages/AccessibilityPage").then((m) => ({ default: m.AccessibilityPage })));
const ReleaseNotesPage   = lazy(() => import("./pages/ReleaseNotesPage").then((m) => ({ default: m.ReleaseNotesPage })));
const FeedbackPage       = lazy(() => import("./pages/FeedbackPage").then((m) => ({ default: m.FeedbackPage })));

// ─── Loading fallback ─────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "80px" }}>
      <Spinner label="Loading…" size="medium" />
    </div>
  );
}

// ─── Inner app (needs theme context) ─────────────────────────────────────────
function AppWithTheme() {
  const { theme } = useThemeContext();
  return (
    <FluentProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<AppShell />}>
              <Route index element={<Introduction />} />

              {/* Tokens */}
              <Route path="tokens" element={<TokensIndex />} />
              <Route path="tokens/colors" element={<ColorsPage />} />
              <Route path="tokens/typography" element={<TypographyPage />} />
              <Route path="tokens/spacing" element={<SpacingPage />} />
              <Route path="tokens/shadows" element={<ShadowsPage />} />
              <Route path="tokens/motion" element={<MotionPage />} />

              {/* Themes */}
              <Route path="themes" element={<ThemesPage />} />
              <Route path="themes/light" element={<ThemesPage initialTab="light" />} />
              <Route path="themes/dark" element={<ThemesPage initialTab="dark" />} />
              <Route path="themes/high-contrast" element={<ThemesPage initialTab="high-contrast" />} />
              <Route path="themes/compare" element={<ThemesPage initialTab="compare" />} />

              {/* Components */}
              <Route path="components" element={<ComponentsIndex />} />
              <Route path="components/:componentId" element={<ComponentDetail />} />

              {/* Library */}
              <Route path="patterns" element={<PatternsPage />} />
              <Route path="templates" element={<TemplatesPage />} />

              {/* Quality */}
              <Route path="accessibility" element={<AccessibilityPage />} />

              {/* Project */}
              <Route path="releases" element={<ReleaseNotesPage />} />
              <Route path="feedback" element={<FeedbackPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </FluentProvider>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────
export function ExplorerApp() {
  return (
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  );
}
