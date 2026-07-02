/// <reference types="react-scripts" />

declare module "jest-axe" {
  import type { AxeResults } from "axe-core";
  export interface JestAxeConfigureOptions {
    rules?: Record<string, { enabled: boolean }>;
  }
  export function configureAxe(options: JestAxeConfigureOptions): void;
  export function axe(html: Element | string): Promise<AxeResults>;
  export const toHaveNoViolations: {
    toHaveNoViolations(results: AxeResults): { pass: boolean; message: () => string };
  };
}
