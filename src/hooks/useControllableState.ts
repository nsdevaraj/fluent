/**
 * useControllableState — Unified controlled/uncontrolled state hook
 *
 * Usage:
 *   const [value, setValue] = useControllableState(controlledProp, defaultValue);
 *
 * Returns the current value (controlled prop if provided, otherwise internal state)
 * and a setter that updates internal state when uncontrolled.
 */
import { useState, useCallback } from "react";

export function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T
): [T, (next: T) => void] {
  const [internal, setInternal] = useState<T>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internal;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
    },
    [isControlled]
  );

  return [value, setValue];
}
