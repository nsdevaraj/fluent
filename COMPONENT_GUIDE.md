# Lumel Design System — Component Reference Guide

**Version:** 1.0.0-phase1 · **Date:** July 2026  
**59 components** across 9 categories · Built on Fluent UI v9

> **How to read this guide**  
> Each table row covers one component. **Sizes** lists the `size` prop values available in our library (not all Fluent sizes are exposed — see `PHASE1_RELEASE.md § 9` for Phase 2 gaps). **Appearances** lists the `appearance` prop values. **Key States** lists the interactive/validation states supported. **Type** = Official (wraps Fluent v9) or Custom (built with Fluent tokens).

---

## Table of Contents

1. [Buttons & Actions](#1-buttons--actions)
2. [Input Components](#2-input-components)
3. [Date / Time / Pickers](#3-date--time--pickers)
4. [Selection Controls](#4-selection-controls)
5. [Navigation & Layout](#5-navigation--layout)
6. [Overlays & Popovers](#6-overlays--popovers)
7. [Feedback & Status](#7-feedback--status)
8. [Display & Content](#8-display--content)
9. [Custom Business Components](#9-custom-business-components)

---

## 1. Buttons & Actions

| Component | Type | When to Use | When NOT to Use | Sizes | Appearances | Key States |
|---|---|---|---|---|---|---|
| **Button** | Official | Primary call-to-action, form submission, any user-triggered action. Use `primary` for the single most important action on a page. Use `secondary` for supporting actions. Use `subtle` for low-emphasis actions in toolbars or lists. | Do not use for navigation — use `Link` instead. Avoid stacking multiple `primary` buttons on the same view. | `small` `medium` | `primary` `secondary` `subtle` | default · hover · pressed · focused · disabled · loading · icon-only |
| **ToggleButton** | Official | Toolbar formatting controls (bold, italic, align), view-mode switchers, feature toggles that need a button-style affordance. Shows pressed/unpressed state visually. | Don't use for binary settings that are ON/OFF — use `Switch` instead. Don't use for navigation. | `small` `medium` | `primary` `secondary` `subtle` | default · checked · hover · focused · disabled |
| **SplitButton** | Official | When the primary action has one obvious default (e.g. "Save") but also needs access to related secondary actions (e.g. "Save as draft", "Save and close") via a dropdown. | Avoid if there is only one action — use `Button`. Avoid if all actions are equally important — use `Menu`. | `small` `medium` | `primary` `secondary` `outline` | default · hover · focused · disabled · menu-open |
| **MenuButton** | Official | A button that opens a dropdown menu of actions. Use when a button must expose a list of choices without a primary default action. Common in toolbars and action bars. | Don't use if there's a clear primary action — use `SplitButton`. Don't use for navigation links. | `small` `medium` | `primary` `secondary` `subtle` | default · hover · focused · disabled · menu-open |
| **Link** | Official | Inline navigation within text, breadcrumb links, "See more" labels, any clickable text that takes the user to a different location or page. | Don't use for triggering actions — use `Button`. Don't use as a standalone element that looks like a button. | — | `default` `subtle` | default · hover · visited · focused · disabled · inline |
| **Toolbar** | Official | A horizontal or vertical row of related actions, toggle buttons, and dividers — typically above a content area like a rich text editor, table, or canvas. | Don't use for primary page navigation — use `SideNav` or `Tabs`. Don't use if there are fewer than 2 actions — use standalone `Button`. | `small` `medium` | — | default · overflow (auto-collapses items) |
| **Menu** | Official | Contextual action lists that appear on button click or right-click. Use for grouped actions, keyboard shortcuts display, or when actions don't all need to be visible at once. | Don't use for navigation — use `SideNav` or `Tabs`. Don't use when there are fewer than 2 options. | — | — | default · with-dividers · with-icons · with-shortcuts · with-submenus · with-disabled-items |

---

## 2. Input Components

| Component | Type | When to Use | When NOT to Use | Sizes | Appearances | Key States |
|---|---|---|---|---|---|---|
| **TextField** | Official | Single-line text entry — names, email addresses, search queries, short free-form values. Supports label, hint text, character count, and full validation states. | Don't use for multi-line content — use `Textarea`. Don't use for structured data like dates — use `DatePicker`. | `small` `medium` | `outline` | default · focused · error · warning · success · disabled · required · with-char-count |
| **Textarea** | Official | Multi-line text entry — comments, descriptions, notes, message bodies. Supports resize and character counting. | Don't use for single-line values — use `TextField`. Don't use for rich formatted content — use a RichTextEditor (Phase 2). | — | — | default · focused · error · disabled · required · with-char-count |
| **SearchInput** | Official | Search bars and filter fields. Includes a built-in search icon and a clear button. Supports debounced input for live filtering. | Don't use for general text input — use `TextField`. Don't use inside a form that submits a value — use `TextField` with a search icon instead. | `small` `medium` | — | default · focused · with-value · cleared · disabled |
| **Combobox** | Official | Selecting from a predefined list while also allowing the user to type to filter options. Use for long lists (20+ items) where free-text filtering helps. Supports grouped options. | Don't use when the list is short (< 8 items) and filtering isn't needed — use `Dropdown`. Don't use when free text entry is the primary goal — use `TextField`. | `small` `medium` | `outline` | default · focused · open · selected · error · disabled · required · grouped |
| **Dropdown** | Official | Selecting a single value from a bounded list. Simpler than Combobox — no filtering, button-trigger style. Use for short-to-medium lists and form selects. Supports multiselect and grouped options. | Don't use for lists longer than ~30 items — use `Combobox` with filtering. Don't use when the user needs to type a custom value. | `small` `medium` | `outline` | default · open · selected · multiselect · error · disabled · grouped |
| **Select** | Official | A native browser `<select>` element with Fluent styling. Best for mobile-first forms and situations where the native picker UX is preferred (e.g. date/time on iOS). | Don't use when you need custom option rendering or grouping — use `Dropdown`. Don't use on desktop-only UIs where consistent cross-platform appearance matters. | `small` `medium` | — | default · selected · error · disabled · required · with-groups |
| **SpinButton** | Official | Numeric input with increment/decrement buttons. Use for quantities, prices, percentages, page numbers — any bounded numeric value that benefits from step controls. | Don't use for unbounded or very large numeric ranges — use `TextField` with type="number". Don't use for non-numeric inputs. | `small` `medium` | `outline` | default · focused · bounded · with-prefix · with-suffix · with-precision · disabled · error |
| **Slider** | Official | Selecting a numeric value within a range by dragging. Use for volume, brightness, opacity, zoom level, or any value where the relative position is meaningful. | Don't use when the exact value matters and the user needs to type it — use `SpinButton` or `TextField`. Don't use for very precise values (many decimal places). | `small` | — | default · focused · with-value · disabled · error |

---

## 3. Date / Time / Pickers

| Component | Type | When to Use | When NOT to Use | Sizes | Appearances | Key States |
|---|---|---|---|---|---|---|
| **DatePicker** | Official (compat) | Selecting a calendar date — date of birth, deadline, event date, booking date. Shows a calendar popup with keyboard navigation. Supports min/max bounds and text input fallback. | Don't use for time selection — use `TimePicker`. Don't use when you only need a year or month — use `Select` or `Dropdown`. | — | — | default · open · selected · with-min-max · text-input · error · disabled · required |
| **TimePicker** | Official (compat) | Selecting a specific time — meeting start time, alarm, schedule entry. Supports 12/24-hour formats, custom step intervals, and business-hours filtering. | Don't use for durations or time spans — use `TextField` with a mask. Don't use when a full date-time is needed — combine with `DatePicker`. | `small` `medium` | `outline` `underline` `filled-darker` | default · open · 12-hour · 24-hour · step-intervals · business-hours · error · disabled |
| **TagPicker** | Official | Selecting multiple items from a list and displaying them as removable tags — assigning labels, adding team members, tagging records. Supports free-text entry and option filtering. | Don't use for single-selection — use `Combobox` or `Dropdown`. Don't use when tags are static and unremovable — use `Tag` components in display mode. | — | — | default · focused · with-tags · filtered · error · disabled · required |

---

## 4. Selection Controls

| Component | Type | When to Use | When NOT to Use | Sizes | Appearances | Key States |
|---|---|---|---|---|---|---|
| **Checkbox** | Official | Selecting one or more options from a list, or toggling a single boolean setting (e.g. "I agree to terms"). Supports indeterminate state for parent/child group selection. | Don't use for mutually exclusive choices — use `RadioGroup`. Don't use for a prominent ON/OFF setting — use `Switch`. | — | — | unchecked · checked · indeterminate · focused · disabled · with-hint |
| **RadioGroup** | Official | Selecting exactly one option from a small set of mutually exclusive choices. Renders options in vertical (default) or horizontal layout. | Don't use when multiple selections are allowed — use `Checkbox`. Don't use for more than ~6 options — use `Dropdown` or `Combobox`. | — | — | unselected · selected · focused · disabled · required · vertical · horizontal |
| **Switch** | Official | Toggling a single binary setting that takes effect immediately — feature flags, notification preferences, dark mode, enabling/disabling a section. Think of it as a physical on/off switch. | Don't use inside a form where the user needs to explicitly submit — use `Checkbox`. Don't use for multi-choice selection — use `Checkbox` group. | — | — | off · on · focused · disabled · with-validation |
| **Slider** | Official | *(Also listed in Input Components — included here for selection context.)* Range selection within a min/max bound, e.g. price range filter, quantity picker with a visual range. | Don't use for categorical choices — use `RadioGroup`. | `small` | — | default · focused · disabled |

---

## 5. Navigation & Layout

| Component | Type | When to Use | When NOT to Use | Sizes | Appearances | Key States |
|---|---|---|---|---|---|---|
| **Accordion** | Official | Collapsible sections that reveal content on demand — FAQs, settings panels, sidebar filters, grouped form sections. Reduces visual clutter by hiding less-used content. | Don't use if all sections are likely to be open at once — use plain headings. Don't use for step-by-step flows — use `Stepper`. | — | — | collapsed · expanded · multiple-open · disabled-panel |
| **Tabs** | Official | Switching between related views or categories within the same page context — e.g. Details / Activity / Documents on a record page, or Overview / Settings in a dialog. | Don't use for primary app navigation — use `SideNav`. Don't use for wizard steps — use `Stepper`. Don't use when content must be visible simultaneously. | `small` `medium` | `transparent` `subtle` | default · selected · hover · focused · disabled · vertical |
| **Breadcrumb** | Official | Showing the current page's location within a multi-level hierarchy. Helps users understand where they are and navigate up the tree. Essential for deep navigation structures. | Don't use on top-level pages with no parent. Don't use for step progress — use `Stepper`. | `small` `medium` | — | default · hover · focused · truncated (many levels) |
| **Tree** | Official | Displaying and navigating hierarchical data — file trees, org charts, folder structures, nested category lists. Supports single and multi-select. | Don't use for flat lists — use `List` or `DataTable`. Don't use for navigation menus — use `SideNav` or `Accordion`. | `small` `medium` | `subtle` `transparent` | collapsed · expanded · selected · multi-select · focused · disabled |
| **SideNav** | **Custom** | Primary application navigation — a persistent left sidebar with icon + label nav items, section headers, and a collapse toggle. Used as the main navigation shell for dashboards and apps. | Don't use inside a page — it's an app-level shell component. Don't use for in-page section switching — use `Tabs`. | — | — | expanded · collapsed (icon-only) · active-item · with-groups · dark mode · RTL |
| **NavDrawer** | Official | A slide-in navigation panel triggered by a hamburger button — used on smaller screens or when the sidebar should be hidden by default and revealed on demand. | Don't use as a permanent sidebar — use `SideNav`. Don't use for non-navigation content — use `Drawer`. | — | — | closed · open · overlay · inline |

---

## 6. Overlays & Popovers

| Component | Type | When to Use | When NOT to Use | Sizes | Appearances | Key States |
|---|---|---|---|---|---|---|
| **Dialog** | Official | Modal confirmations, forms, and detailed views that require the user's full attention before proceeding. Blocks interaction with the rest of the page. Supports primary and secondary actions. | Don't use for quick contextual info — use `Popover` or `Tooltip`. Don't use for navigation — use routing. Don't stack multiple dialogs. | `small` `medium` `large` | — | default · open · alert · with-footer-actions · controlled |
| **Drawer** | Official | A slide-in panel for secondary workflows — editing a record, viewing details, filling a form — without leaving the current page. Less disruptive than a Dialog. Supports inline and overlay modes. | Don't use for critical blocking actions — use `Dialog`. Don't use for tiny content — use `Popover`. | `small` `medium` `large` `full` | — | closed · open · from-start (left) · from-end (right) · overlay · inline |
| **Popover** | Official | Contextual panels anchored to a trigger element — showing rich content like forms, settings panels, or detailed info cards on hover or click. | Don't use for simple one-line info — use `Tooltip`. Don't use for blocking flows — use `Dialog`. | — | — | closed · open · with-heading · no-arrow · trap-focus · positioned (top/bottom/start/end) |
| **Tooltip** | Official | Short, one-line descriptive text shown on hover or focus. Explains icon buttons, truncated labels, and non-obvious UI elements. | Don't use for content the user must interact with — use `Popover`. Don't use for error messages — use validation states on the input. | — | — | hidden · visible · no-arrow · positioned (top/bottom/start/end) · slow-reveal |
| **TeachingPopover** | Official | Onboarding walkthroughs and feature discovery — a popover that guides users through a new feature step by step with Next/Previous controls. | Don't use for general contextual info — use `Popover` or `Tooltip`. Don't use after a user is already familiar with the feature. | — | — | single-step · multi-step · no-dismiss-button · positioned |
| **ConfirmDialog** | **Custom** | Destructive or irreversible action confirmations — deleting a record, clearing data, logging out. A simplified Dialog with a title, optional description, and two actions (confirm + cancel). | Don't use for non-destructive actions — use `Button` directly. Don't use when the action is easily reversible. | — | — | default · destructive (red confirm button) · no-description |

---

## 7. Feedback & Status

| Component | Type | When to Use | When NOT to Use | Sizes | Appearances | Key States |
|---|---|---|---|---|---|---|
| **Toast** | Official | Transient, non-blocking notifications that appear briefly at the edge of the screen. Use for operation results — "Saved", "Deleted", "Error saving". Disappears automatically. | Don't use when the message requires action or acknowledgment — use `MessageBar`. Don't use for persistent status — use `Badge` or `StatusBadge`. | — | `info` `success` `warning` `error` | info · success · warning · error |
| **MessageBar** | Official | Persistent inline messages that communicate important status about the current page — system errors, warnings, informational notices, success confirmations after a form submit. Unlike Toast, it stays visible until dismissed. | Don't use for transient feedback — use `Toast`. Don't use for loading state — use `Spinner` or `ProgressBar`. | — | `info` `success` `warning` `error` | info · success · warning · error · dismissible · with-actions |
| **ProgressBar** | Official | Showing determinate or indeterminate progress for a file upload, data load, or multi-step background operation. | Don't use for page-level loading — use `Skeleton`. Don't use to show a step count — use `Stepper`. | — | — | determinate (0–100%) · indeterminate · success · error · warning · large |
| **Spinner** | Official | Indicating that content or an action is loading — page load, async data fetch, form submit in progress. | Don't use for progress where a percentage is known — use `ProgressBar`. Don't use for skeleton screens — use `Skeleton`. | `tiny` `extra-small` `small` `medium` `large` `extra-large` `huge` | — | default · with-label · label-above · label-below |
| **Skeleton** | Official | Placeholder loading state that mimics the shape of the content about to load — text blocks, cards, avatars. Reduces perceived wait time and prevents layout shifts. | Don't use when load time is < 300 ms — show content directly. Don't use for single-item loaders — use `Spinner`. | — | — | pulse · wave · text-block · card · custom-layout |
| **Rating** | Official | Collecting or displaying a star (or custom icon) rating — product reviews, satisfaction scores, content quality ratings. Supports read-only display and interactive input modes. | Don't use for binary thumbs-up/down — use two `ToggleButton` components. Don't use for progress — use `ProgressBar`. | `small` `medium` `large` | — | interactive · read-only · controlled · 5-star · 10-star · disabled · with-label |
| **CounterBadge** | Official | Displaying a numeric count on or near another element — unread notifications, pending items, error counts in a nav item. | Don't use for non-numeric status — use `Badge` or `StatusBadge`. Don't use standalone — it should always be anchored to another element. | `tiny` `extra-small` `small` `medium` `large` `extra-large` | `filled` `ghost` | brand · danger · important · informative · overflow (99+) · dot · show-zero |
| **PresenceBadge** | Official | Showing a user's real-time presence/availability status — available, busy, away, do-not-disturb, offline. Always paired with an avatar. | Don't use without a corresponding avatar. Don't use to represent non-person statuses — use `StatusBadge`. | `tiny` `extra-small` `small` `medium` `large` `extra-large` | — | available · away · busy · do-not-disturb · offline · out-of-office |
| **StatusBadge** | **Custom** | Displaying the status of a task, ticket, order, or record in dashboards and tables — Completed, In Progress, Blocked, Pending, Warning. | Don't use for user presence — use `PresenceBadge`. Don't use for numeric counts — use `CounterBadge`. | `small` `medium` | — | completed · in-progress · blocked · pending · warning · custom-label |

---

## 8. Display & Content

| Component | Type | When to Use | When NOT to Use | Sizes | Appearances | Key States |
|---|---|---|---|---|---|---|
| **Divider** | Official | Visually separating sections of content — between form groups, list items, card sections, or menu items. Can include a label in the center. | Don't use as a decorative element. Use spacing tokens (`gap`, `padding`) for layout separation instead where a visible line isn't necessary. | — | — | horizontal · vertical · with-label · center · start · end |
| **Card** | Official | Grouping related content into a visually contained unit — dashboard widgets, product tiles, user profile cards, data summaries. Can be clickable/navigable. | Don't use for simple list items — use `List`. Don't wrap a single piece of text in a Card for padding. | `small` `medium` `large` | `filled-alternative` `subtle` | default · hover (clickable) · selected · with-footer · focused |
| **DataCard** | **Custom** | KPI and metric cards in dashboards — showing a single number with a label, trend indicator (up/down), and optional description. Purpose-built for analytics views. | Don't use for general content grouping — use `Card`. Don't use when the metric has no numeric value. | — | — | with-trend-up · with-trend-down · with-description · minimal (no icon) |
| **DataTable** | **Custom** | Displaying tabular data with sortable columns, row selection, pagination, and loading/empty states. The primary component for data grids in admin panels and dashboards. | Don't use for simple key-value pairs — use a list or description list. Don't use when data is not tabular. | — | — | default · with-selection · with-pagination · loading · empty · dark-mode |
| **Pagination** | **Custom** | Navigating large, paged data sets beneath a `DataTable` or long list — jump to first/last, previous/next, or a specific page. Shows nearby pages with ellipses. | Don't use for infinite-scroll feeds — use lazy loading. Don't use when the total count is unknown — use "Load more". Don't use for fewer than 2 pages (auto-hides). | `small` `medium` | — | default · with-first-last · numbers-only · disabled |
| **Persona** | Official | Representing a person with their name, avatar/initials, job title, and presence status — people pickers, meeting attendee lists, comments, user mentions. | Don't use just to show an avatar without identity context — use `UserAvatar`. | `extra-small` `small` `medium` `large` `extra-large` `huge` | — | default · with-presence · no-avatar · focused |
| **UserAvatar** | Official | Displaying a user's profile picture or generated initials in a compact circle. Used in nav bars, comment threads, assignee indicators, and anywhere a person's identity needs a visual marker. | Don't use when you also need the person's name — use `Persona`. | `16` `20` `24` `28` `32` `36` `40` `48` `56` `64` `72` `96` `120` `128` | — | with-image · with-initials · with-icon · with-presence · square · circular · active-ring |
| **AvatarGroup** | Official | Showing a collection of user avatars in a compact stack or spread — meeting participants, document collaborators, team members on a project. Handles overflow automatically. | Don't use if you need to show names — use a list of `Persona` components. | `16` `20` `24` `28` `32` `36` `40` `48` `56` `64` `72` `96` `120` `128` | — | spread · stack · pie · with-overflow · small · large |
| **Tag** | Official | Displaying metadata labels, categories, or filters on a content item — topic tags on an article, labels on a ticket, filter chips in a search bar. Can be dismissible. | Don't use for interactive selection from a list — use `TagPicker`. Don't use for status — use `StatusBadge` or `CounterBadge`. | `extra-small` `small` `medium` | `filled` `outline` `brand` | default · dismissible · with-icon · group · focused |
| **InteractionTag** | Official | Like `Tag`, but designed for user interaction — clicking opens a detail panel or triggers an action. Has a built-in primary area and optional secondary action (dismiss). | Don't use for purely decorative labels — use `Tag`. | `extra-small` `small` `medium` | `filled` `outline` `brand` | default · with-icon · dismissible · focused · hover |
| **Typography** | **Custom** | Applying consistent text styles across the app — headings (H1–H6), body text, captions, labels. Wraps Fluent's `Text` component with the design system's type scale. | Don't use when Fluent's native `Text` component with a `size` prop is sufficient. | — | — | Display · Title1–3 · Subtitle1–2 · Body1–2 · Caption1–2 · Label1–3 |
| **Icon** | **Custom** | Displaying Fluent icons with consistent sizing and semantic colour — decorative (visual aid) or meaningful (conveys information). Wraps `@fluentui/react-icons`. | Don't use custom SVGs that haven't been reviewed for accessibility. Don't use icons alone to convey meaning without a label or tooltip. | `20` `24` `32` | — | decorative · meaningful · brand-coloured · warning · danger · large |
| **Image** | Official | Displaying photos, illustrations, and graphics with consistent aspect ratio handling and optional caption. Supports `cover`, `contain`, and `none` fit modes. | Don't use for icons — use `Icon`. Don't use for user avatars — use `UserAvatar`. | — | — | default · rounded-corners · circular · cover · contain · with-caption · bordered |
| **InfoLabel** | Official | A label with a built-in info icon (ⓘ) that opens a tooltip with additional context. Use on form fields or settings where the label alone isn't self-explanatory. | Don't use when the hint can be shown inline below the input as `hint` text — that's less disruptive. | `small` `medium` `large` | — | default · required · with-tooltip · focused |

---

## 9. Custom Business Components

These components are not in the Fluent v9 core library. They are built entirely with Fluent design tokens and follow the same visual language.

| Component | When to Use | When NOT to Use | Sizes | Key Variants / States |
|---|---|---|---|---|
| **EmptyState** | Displaying a helpful zero-data state when a list, table, search result, or folder is empty. Each variant has a matching illustration, heading, and optional CTA button. | Don't use for loading states — use `Skeleton` or `Spinner`. Don't use for errors — use `MessageBar`. | — | no-results · empty-folder · no-documents · with-action-button |
| **PageHeader** | The top section of every page — displays the page title, optional description, optional breadcrumb trail, and a slot for action buttons (e.g. "New", "Export"). Ensures consistent page-level layout across the app. | Don't use inside dialogs or drawers — those have their own header patterns. Don't use for section headers within a page — use `Typography` headings. | — | default · with-description · with-breadcrumbs · with-actions · full-featured · long-title (truncates) |
| **Stepper** | Showing progress through a multi-step wizard or form — onboarding flows, checkout sequences, configuration wizards. Each step shows a status (complete, active, pending, error). | Don't use for tabs-style navigation where steps can be visited in any order — use `Tabs`. Don't use for progress percentage — use `ProgressBar`. | — | horizontal · vertical · with-error · all-completed · step-click-navigation |
| **FileUpload** | Drag-and-drop or click-to-browse file upload with validation for file type, size limit, and count. Shows upload progress and error states. | Don't use for structured data entry — use form inputs. Don't use when only a URL string is needed — use `TextField`. | — | default · multiple-files · with-size-limit · required · disabled · with-error · custom-prompt-text |
| **SideNav** | The main collapsible sidebar navigation shell for the application. Contains icon + label nav items, optional group headers, and a hamburger toggle to collapse to icon-only mode. | Don't use inside a page section. Don't use for in-page switching — use `Tabs`. Only one `SideNav` should exist per app layout. | — | expanded · collapsed (icon-only) · active-item-highlight · with-group-headers · dark-mode · RTL |

---

## Quick Reference — Size Tokens

| Size Label | Approx. Height | Used In |
|---|---|---|
| `tiny` | 16px | Spinner, CounterBadge, PresenceBadge |
| `extra-small` | 20px | Spinner, Badge, Persona, UserAvatar |
| `small` | 24px | Button, Input, Tabs, Breadcrumb, Tree, Slider, Rating, Card, Tag |
| `medium` | 32px | Button, Input, Tabs, Breadcrumb, Tree, Rating, Card, Tag (default) |
| `large` | 40px | Drawer, Card, Rating, Persona, Spinner |
| `extra-large` | 48px+ | Spinner, Persona, UserAvatar |
| `huge` | 72–128px | Spinner, Persona, UserAvatar |

---

## Quick Reference — Appearance Tokens

| Appearance | Meaning | Components |
|---|---|---|
| `primary` | Brand-coloured, filled — highest emphasis | Button, ToggleButton, MenuButton, SplitButton |
| `secondary` | Outlined with border — medium emphasis | Button, ToggleButton, MenuButton, SplitButton |
| `subtle` | No background or border — lowest emphasis | Button, ToggleButton, MenuButton, Tabs, Tree |
| `outline` | Border only, transparent fill | SplitButton, Combobox, Dropdown, SpinButton, TimePicker |
| `transparent` | No border, no background | Tabs, Tree |
| `filled` | Solid background | Tag, CounterBadge |
| `ghost` | Background on hover only | CounterBadge |
| `brand` | Uses brand colour | Tag, InteractionTag, CounterBadge |
| `filled-alternative` | Slightly tinted fill | Card |
| `subtle` (Card) | Minimal, no shadow | Card |

---

*Lumel Design System — Phase 1 — July 2026*  
*For variant gaps and Phase 2 targets, see `PHASE1_RELEASE.md § 9`*
