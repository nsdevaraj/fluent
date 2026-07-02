// jest-dom adds custom matchers like .toBeInTheDocument()
import "@testing-library/jest-dom/extend-expect";

// jest-axe: extend expect with toHaveNoViolations
import { configureAxe } from "jest-axe";
const { toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

// Configure axe — exclude known non-issues from Fluent UI portals
configureAxe({
  rules: {
    // Fluent UI renders portals outside the tested container; region rule false-positives
    region: { enabled: false },
  },
});

// Polyfill crypto.getRandomValues — required by tabster (FluentUI focus manager)
// jsdom does not expose window.crypto; Node's built-in webcrypto does.
if (typeof globalThis.crypto === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nodeCrypto = require("crypto");
  Object.defineProperty(globalThis, "crypto", {
    value: {
      getRandomValues: <T extends ArrayBufferView>(arr: T): T => {
        nodeCrypto.randomFillSync(arr);
        return arr;
      },
      randomUUID: () => nodeCrypto.randomUUID(),
    },
    writable: false,
  });
}
