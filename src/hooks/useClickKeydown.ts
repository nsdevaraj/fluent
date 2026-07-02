/**
 * useClickKeydown — Unified click + keyboard (Enter/Space) handler
 *
 * Usage:
 *   const handlers = useClickKeydown(() => doSomething(), disabled);
 *   <div role="button" tabIndex={0} {...handlers}>…</div>
 *
 * Returns onClick and onKeyDown props that both trigger the same handler.
 * Skips execution when disabled is true.
 */
import { useCallback } from "react";
import type { KeyboardEvent, MouseEvent } from "react";

interface ClickKeydownHandlers {
  onClick: (e: MouseEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

export function useClickKeydown(
  handler: () => void,
  disabled?: boolean
): ClickKeydownHandlers {
  const onClick = useCallback(
    (e: MouseEvent) => {
      if (disabled) return;
      handler();
    },
    [handler, disabled]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handler();
      }
    },
    [handler, disabled]
  );

  return { onClick, onKeyDown };
}
