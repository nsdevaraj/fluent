/**
 * Listbox — Bare listbox primitive for building custom select/dropdown controls.
 *
 * Wraps Fluent UI v9 `Listbox` and `ListboxProvider`. Use these when building
 * fully custom dropdown-style controls that need proper listbox ARIA semantics
 * but aren't covered by Dropdown, Select, or Combobox composites.
 *
 * Usage:
 *   import { Listbox, ListboxProvider } from "../components/ui";
 *
 *   <Listbox>
 *     <Option value="a">Option A</Option>
 *     <Option value="b">Option B</Option>
 *   </Listbox>
 *
 * Dependencies: @fluentui/react-components
 */
import {
  Listbox as FluentListbox,
  ListboxProvider as FluentListboxProvider,
  Option,
  OptionGroup,
} from "@fluentui/react-components";

export {
  FluentListbox         as Listbox,
  FluentListboxProvider as ListboxProvider,
  Option,
  OptionGroup,
};
