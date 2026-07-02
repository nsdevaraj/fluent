/**
 * AnnounceProvider — Screen reader live-region utilities.
 *
 * Wraps Fluent UI v9 `AnnounceProvider`, `AriaLiveAnnouncer`, and the
 * `useAnnounce` hook. Place `AnnounceProvider` near the root of your app
 * so any child component can call `useAnnounce()` to push polite or assertive
 * announcements to screen readers without touching the DOM directly.
 *
 * Usage:
 *   import { AnnounceProvider, useAnnounce } from "../components/ui";
 *
 *   // App root:
 *   <AnnounceProvider>
 *     <App />
 *   </AnnounceProvider>
 *
 *   // Inside a component:
 *   const { announce } = useAnnounce();
 *   const handleSave = () => {
 *     saveData();
 *     announce("Changes saved", { politeness: "polite" });
 *   };
 *
 * Dependencies: @fluentui/react-components
 */
import {
  AnnounceProvider as FluentAnnounceProvider,
  AriaLiveAnnouncer as FluentAriaLiveAnnouncer,
  useAnnounce,
} from "@fluentui/react-components";

export {
  FluentAnnounceProvider  as AnnounceProvider,
  FluentAriaLiveAnnouncer as AriaLiveAnnouncer,
  useAnnounce,
};
