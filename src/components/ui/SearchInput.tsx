/**
 * SearchInput — Copy-paste ready search input with debounce + clear button
 *
 * Usage:
 *   import { SearchInput } from "./components/ui/SearchInput";
 *   <SearchInput onSearch={(q) => handleSearch(q)} placeholder="Search projects..." />
 *
 * Dependencies: @fluentui/react-components, @fluentui/react-icons
 */

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Input, makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { Search20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import { Button } from "./Button";

const useStyles = makeStyles({
  /**
   * Wrapper clips ::after at the corner radius so the accent line is
   * always straight — never curved like Fluent's own ::after.
   */
  inputWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    clipPath: "inset(0px round 4px)",
  },

  /** Rest / hover: 1px dark-grey accent line via the wrapper's ::after. */
  inputWrapperRest: {
    "::after": {
      content: '""',
      position: "absolute",
      bottom: "0px",
      left: "0px",
      right: "0px",
      height: "1px",
      backgroundColor: tokens.colorNeutralStrokeAccessible,
      pointerEvents: "none",
      zIndex: 1,
    },
  },

  /** Focus: 2px brand-teal accent line via the wrapper's ::after. */
  inputWrapperFocused: {
    "::after": {
      content: '""',
      position: "absolute",
      bottom: "0px",
      left: "0px",
      right: "0px",
      height: "2px",
      backgroundColor: tokens.colorBrandStroke1,
      pointerEvents: "none",
      zIndex: 1,
    },
  },

  /**
   * Disable Fluent's built-in curved ::after entirely, and normalise
   * border-bottom-color so all four sides use the same token.
   */
  inputRoot: {
    width: "100%",
    borderBottomColor: tokens.colorNeutralStroke1,
    ":hover": { borderBottomColor: tokens.colorNeutralStroke1Hover },
    "::after": { display: "none" },
    ":focus-within::after": { display: "none" },
  },
});

export interface SearchInputProps {
  /** Called with the search query — debounced by default */
  onSearch: (query: string) => void;
  placeholder?: string;
  /** Debounce delay in ms. Set to 0 to disable. Default: 300 */
  debounceMs?: number;
  defaultValue?: string;
  size?: "small" | "medium";
  disabled?: boolean;
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
}

/**
 * SearchInput is a text input pre-configured for search interactions, with a built-in search icon and dismiss button. It exposes the correct ARIA role='searchbox' semantics for assistive technologies.
 *
 * **When to use:** Filtering a list, searching a dataset, or global app search. The search icon and dismiss affordance communicate intent clearly.
 * **When NOT to use:** General text input unrelated to search (use TextField). Inside a form where the search semantic would be confusing.
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({
    onSearch,
    placeholder = "Search...",
    debounceMs = 300,
    defaultValue = "",
    size = "medium",
    disabled,
  }: SearchInputProps, _ref) => {
    const styles = useStyles();
    const [value, setValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = useCallback(
      (_: React.ChangeEvent<HTMLInputElement>, data: { value: string }) => {
        setValue(data.value);
        if (timerRef.current) clearTimeout(timerRef.current);
        if (debounceMs === 0) {
          onSearch(data.value);
        } else {
          timerRef.current = setTimeout(() => onSearch(data.value), debounceMs);
        }
      },
      [onSearch, debounceMs]
    );

    const handleClear = useCallback(() => {
      setValue("");
      onSearch("");
      if (timerRef.current) clearTimeout(timerRef.current);
    }, [onSearch]);

    // Cleanup on unmount
    useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

    return (
      <div
        className={mergeClasses(
          styles.inputWrapper,
          !disabled && !isFocused && styles.inputWrapperRest,
          !disabled && isFocused && styles.inputWrapperFocused,
        )}
      >
        <Input
          root={{ className: styles.inputRoot }}
          contentBefore={<Search20Regular />}
          contentAfter={
            value ? (
              <Button
                appearance="subtle"
                size="small"
                icon={<Dismiss20Regular />}
                onClick={handleClear}
                aria-label="Clear search"
              />
            ) : undefined
          }
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          size={size}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";
