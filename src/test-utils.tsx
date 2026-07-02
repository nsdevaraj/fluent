import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import type { RenderOptions, RenderResult } from "@testing-library/react";
import { axe } from "jest-axe";

function makeProviders(dir: "ltr" | "rtl") {
  return function AllProviders({ children }: { children: React.ReactNode }) {
    return (
      <FluentProvider theme={webLightTheme} dir={dir}>
        {children}
      </FluentProvider>
    );
  };
}

/** Render wrapped in FluentProvider (LTR). */
function render(ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">): RenderResult {
  return rtlRender(ui, { wrapper: makeProviders("ltr"), ...options });
}

/** Render wrapped in FluentProvider with `dir="rtl"` — for RTL layout assertions. */
function renderRTL(ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">): RenderResult {
  return rtlRender(ui, { wrapper: makeProviders("rtl"), ...options });
}

/**
 * Runs jest-axe against a container and returns the axe results.
 * Pair with `expect(results).toHaveNoViolations()` (matcher wired in setupTests).
 *
 *   const { container } = render(<Button>Ok</Button>);
 *   expect(await checkA11y(container)).toHaveNoViolations();
 */
async function checkA11y(container: Element): Promise<unknown> {
  return axe(container);
}

export * from "@testing-library/react";
export { render, renderRTL, checkA11y, axe };
