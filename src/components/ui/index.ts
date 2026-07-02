/**
 * Design System — Component Index
 *
 * Single entry point for all UI components.
 * Import from here only — never from individual files.
 *
 *   import { Button, TextField, Select, Persona } from "../components/ui";
 */

// ── Primitives ────────────────────────────────────────────────────────────────
export { Button }                        from "./Button";
export type { ButtonProps }              from "./Button";

export { Hamburger }                     from "./Hamburger";
export type { HamburgerProps, HamburgerSize } from "./Hamburger";

export { Divider }                       from "./Divider";
export type { DividerProps }             from "./Divider";

export { Spinner }                       from "./Spinner";
export type { SpinnerProps }             from "./Spinner";

export {
  Skeleton,
  SkeletonItem,
  SkeletonText,
  SkeletonCard,
}                                        from "./Skeleton";
export type { SkeletonTextProps, SkeletonCardProps } from "./Skeleton";

export { Icon }                          from "./Icon";
export type { IconProps }                from "./Icon";

export {
  Heading,
  Body,
  Caption,
  DSLabel,
  Display,
  LargeTitle,
  Title1,
  Title2,
  Title3,
  Subtitle1,
  Subtitle2,
  Subtitle2Stronger,
  Body1Strong,
  Body1Stronger,
  Body2,
  Caption1Strong,
  Caption1Stronger,
  Caption2,
  Caption2Strong,
}                                        from "./Typography";
export type {
  HeadingProps,
  BodyProps,
  CaptionProps,
  DSLabelProps,
  FluentTextScaleProps,
}                                        from "./Typography";

// ── Form inputs ───────────────────────────────────────────────────────────────
export { Label }                         from "./Label";
export type { LabelProps, LabelSize, LabelWeight } from "./Label";

export { Input }                         from "./Input";
export type { InputProps, InputAppearance as InputFieldAppearance, InputSize, InputType } from "./Input";

export { TextField }                     from "./TextField";
export type { TextFieldProps, InputAppearance } from "./TextField";

export { Textarea }                      from "./Textarea";
export type { TextareaProps }            from "./Textarea";

export { Select }                        from "./Select";
export type { SelectProps, SelectOption, SelectGroup } from "./Select";

export { Combobox }                      from "./Combobox";
export type { ComboboxProps, ComboboxOption, ComboboxGroup } from "./Combobox";

export { Dropdown }                      from "./Dropdown";
export type {
  DropdownProps,
  DropdownOption,
  DropdownOptionGroup,
  DropdownAppearance,
  DropdownSize,
}                                        from "./Dropdown";

export { Checkbox }                      from "./Checkbox";
export type { CheckboxProps }            from "./Checkbox";

export { RadioGroup }                    from "./RadioGroup";
export type { RadioGroupProps, RadioOption } from "./RadioGroup";

export { Switch }                        from "./Switch";
export type { SwitchProps }              from "./Switch";

export { Field }                         from "./Field";
export type { FieldProps, FieldValidationState, FieldOrientation, FieldSize } from "./Field";

// ── Display ───────────────────────────────────────────────────────────────────
export { StatusBadge }                   from "./StatusBadge";
export type { StatusBadgeProps }         from "./StatusBadge";

export { Tag, TagGroup }                 from "./Tag";
export type { TagProps, TagGroupProps, TagItem } from "./Tag";

export { UserAvatar }                    from "./UserAvatar";
export type { UserAvatarProps }          from "./UserAvatar";

export { Persona }                       from "./Persona";
export type { PersonaProps }             from "./Persona";

// ── Composite ─────────────────────────────────────────────────────────────────
export { SearchInput }                   from "./SearchInput";
export type { SearchInputProps }         from "./SearchInput";

export { DataCard }                      from "./DataCard";
export type { DataCardProps }            from "./DataCard";

export { EmptyState }                    from "./EmptyState";
export type { EmptyStateProps }          from "./EmptyState";

export { PageHeader }                    from "./PageHeader";
export type { PageHeaderProps }          from "./PageHeader";

export { ConfirmDialog }                 from "./ConfirmDialog";
export type { ConfirmDialogProps }       from "./ConfirmDialog";

// ── Phase 3 — Composite Components ───────────────────────────────────────────

// Step 1: Standalone / light deps
export { Tooltip }                       from "./Tooltip";
export type { TooltipProps }             from "./Tooltip";

export { ProgressBar }                   from "./ProgressBar";
export type { ProgressBarProps, ProgressColor, ProgressThickness } from "./ProgressBar";

export { MessageBar, MessageBarGroup }   from "./MessageBar";
export type { MessageBarProps, MessageBarIntent, MessageBarAction,
              MessageBarGroupProps }      from "./MessageBar";

// Step 2: Extended inputs / containers
export { Tabs }                          from "./Tabs";
export type { TabsProps, TabItem }       from "./Tabs";

export { Accordion }                     from "./Accordion";
export type { AccordionProps, AccordionItemDef } from "./Accordion";

export { Slider }                        from "./Slider";
export type { SliderProps } from "./Slider";
export type { ValidationState } from "./CONSTANTS";

// Step 3: Card / Stepper / DatePicker
export { Card }                          from "./Card";
export type { CardProps, CardHeaderConfig } from "./Card";

export { Stepper }                       from "./Stepper";
export type { StepperProps, Step, StepStatus } from "./Stepper";

export { DatePicker }                    from "./DatePicker";
export type { DatePickerProps, DatePickerValidationState } from "./DatePicker";

export { TimePicker }                    from "./TimePicker";
export type { TimePickerProps, TimePickerAppearance } from "./TimePicker";

// Step 4: Provider / focus-managed
export { DSToaster, useToast }           from "./Toast";
export type { DSToasterProps, ShowToastOptions, ToastAction, UseToastReturn } from "./Toast";

export { Drawer }                        from "./Drawer";
export type { DrawerProps, DrawerType }  from "./Drawer";

export { Popover }                       from "./Popover";
export type { PopoverProps }             from "./Popover";

export { FileUpload }                    from "./FileUpload";
export type { FileUploadProps, FileUploadValidationState } from "./FileUpload";

// Step 5: Complex / data-heavy
export { DataTable }                     from "./DataTable";
export type { DataTableProps, DataTableColumn, DataTableSelectionMode, DataTableGroup } from "./DataTable";

export { Pagination }                    from "./Pagination";
export type { PaginationProps, PaginationSize } from "./Pagination";

export {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
  TableCellActions,
  TableResizeHandle,
  useTableFeatures,
  useTableSort,
  useTableSelection,
  useTableColumnSizing_unstable,
  createTableColumn,
}                                        from "./Table";

export { SideNav }                       from "./SideNav";
export type { SideNavProps, SideNavItem, SideNavGroup } from "./SideNav";

export {
  Nav,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavDrawerFooter,
  NavItem,
  NavCategory,
  NavCategoryItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
  NavDivider,
  SplitNavItem,
  NavCategoryItemProvider,
  NavProviderRoot,
  AppItem,
  AppItemStatic,
  DSNavDrawer,
}                                        from "./NavDrawer";
export type { DSNavDrawerProps, DSNavItem } from "./NavDrawer";

// ── Phase Next — New Fluent components ───────────────────────────────────────

// Actions
export { Link }                          from "./Link";
export type { LinkProps, LinkAppearance }  from "./Link";

export { ToggleButton }                  from "./ToggleButton";
export type { ToggleButtonProps, ToggleButtonAppearance, ToggleButtonSize } from "./ToggleButton";

export { CompoundButton }                from "./CompoundButton";
export type { CompoundButtonProps, CompoundButtonAppearance, CompoundButtonSize } from "./CompoundButton";

// Menu system
export {
  Menu,
  MenuRoot,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuItemLink,
  MenuItemSwitch,
}                                        from "./Menu";
export type { MenuProps, MenuItemDef }   from "./Menu";

export { MenuButton }                    from "./MenuButton";
export type { MenuButtonProps, MenuButtonAppearance, MenuButtonSize } from "./MenuButton";

export { SplitButton }                   from "./SplitButton";
export type { SplitButtonProps, SplitButtonAppearance, SplitButtonSize } from "./SplitButton";

// Toolbar
export {
  Toolbar,
  ToolbarRoot,
  ToolbarBtn,
  ToolbarToggleBtn,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioBtn,
  ToolbarRadioGroup,
}                                        from "./Toolbar";
export type { ToolbarProps, ToolbarItem, ToolbarButtonItem, ToolbarToggleItem, ToolbarDividerItem } from "./Toolbar";

// Layout utilities
export {
  Overflow,
  OverflowItem,
  OverflowDivider,
  OverflowReorderObserver,
  OverflowWrapper,
  useOverflowMenu,
  useIsOverflowItemVisible,
  useIsOverflowGroupVisible,
}                                        from "./Overflow";
export type { OverflowProps, OverflowItemProps, OverflowWrapperProps } from "./Overflow";

// Surfaces
export { Dialog, DialogRoot, DialogTrigger, DialogSurface,
         DialogTitle, DialogBody, DialogContent, DialogActions } from "./Dialog";
export type { DialogProps, DialogSize, DialogModalType } from "./Dialog";

// Navigation
export { Breadcrumb, BreadcrumbRoot, BreadcrumbItem,
         BreadcrumbBtn, BreadcrumbDivider }  from "./Breadcrumb";
export type { BreadcrumbProps, BreadcrumbItemDef, BreadcrumbSize } from "./Breadcrumb";

// Forms
export { InfoLabel, InfoButton }         from "./InfoLabel";
export type { InfoLabelProps, InfoButtonProps, InfoLabelSize, InfoLabelWeight } from "./InfoLabel";

export { SpinButton }                    from "./SpinButton";
export type { SpinButtonProps, SpinButtonAppearance } from "./SpinButton";

export {
  TagPicker,
  TagPickerButton,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerOptionGroup,
}                                        from "./TagPicker";
export type { TagPickerProps, TagPickerOption as TagPickerOptionDef } from "./TagPicker";

// Badges
export { Badge }                         from "./Badge";
export type { BadgeProps, BadgeAppearance, BadgeColor, BadgeSize, BadgeShape } from "./Badge";

export { CounterBadge }                  from "./CounterBadge";
export type { CounterBadgeProps, CounterBadgeColor, CounterBadgeSize } from "./CounterBadge";

export { PresenceBadge }                 from "./PresenceBadge";
export type { PresenceBadgeProps, PresenceStatus, PresenceBadgeSize } from "./PresenceBadge";

export { PresenceGroup }                 from "./PresenceGroup";
export type { PresenceGroupProps, PresenceGroupSize } from "./PresenceGroup";

// Avatars
export { AvatarGroup, AvatarGroupItem, AvatarGroupPopover } from "./AvatarGroup";
export type { AvatarGroupProps, AvatarGroupMember, AvatarGroupLayout, AvatarGroupSize } from "./AvatarGroup";

// Data display
export { List, ListItem }                from "./List";
export type { ListProps, ListItemProps } from "./List";

export { Rating, RatingDisplay }         from "./Rating";
export type { RatingProps, RatingDisplayProps, RatingSize, RatingColor, RatingShape } from "./Rating";

export { Tree, TreeProvider, TreeRootReset } from "./Tree";
export type { TreeProps, TreeItemDef, TreeSelectionMode } from "./Tree";

export { InteractionTag, InteractionTagGroup } from "./InteractionTag";
export type { InteractionTagProps, InteractionTagGroupProps,
              InteractionTagSize, InteractionTagShape, InteractionTagAppearance } from "./InteractionTag";

// Media
export { Image }                         from "./Image";
export type { ImageProps, ImageFit, ImageShape } from "./Image";

export {
  Carousel,
  CarouselCard,
  CarouselSlider,
  CarouselViewport,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselNavImageButton,
  CarouselButton,
  CarouselAutoplayButton,
  CarouselProvider,
  DSCarousel,
}                                        from "./Carousel";
export type { CarouselSlide, DSCarouselProps } from "./Carousel";

// ── Color ─────────────────────────────────────────────────────────────────────
export {
  ColorPicker,
  ColorArea,
  ColorSlider,
  AlphaSlider,
  ColorSwatch,
  DSColorPicker,
}                                        from "./ColorPicker";
export type { DSColorPickerProps }       from "./ColorPicker";

export {
  SwatchPicker,
  SwatchPickerRow,
  SwatchPickerProvider,
  ImageSwatch,
  EmptySwatch,
  DSSwatchPicker,
}                                        from "./SwatchPicker";
export type { SwatchOption, DSSwatchPickerProps } from "./SwatchPicker";

// Utilities
export { Portal, PortalMountNodeProvider } from "./Portal";
export type { PortalProps }              from "./Portal";

export { Listbox, ListboxProvider, Option, OptionGroup } from "./Listbox";

export { AnnounceProvider, AriaLiveAnnouncer, useAnnounce } from "./AnnounceProvider";

// Onboarding
export {
  TeachingPopover,
  TeachingPopoverRoot,
  TeachingPopoverTrigger,
  TeachingPopoverSurface,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverBody,
  TeachingPopoverFooter,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton,
  TeachingPopoverCarouselPageCount,
}                                        from "./TeachingPopover";
export type { TeachingPopoverProps, TeachingPopoverAction, TeachingPopoverStep } from "./TeachingPopover";

// ── Missing type aliases (PKG-05) ─────────────────────────────────────────────
export type { ButtonAppearance, ButtonSize }       from "./Button";
export type { ComboboxOptions }                    from "./Combobox";
export type { IconColor }                          from "./Icon";
export type { PersonaPresence, PersonaSize }       from "./Persona";
export type { SelectOptions }                      from "./Select";
export type { SpinnerSize }                        from "./Spinner";

// ── Design constants (PKG-06) ─────────────────────────────────────────────────
export {
  DS_STROKE_1PX,
  DS_ICON_SIZE_SM,
  DS_ICON_SIZE_LG,
  DS_STEPPER_CIRCLE_SIZE,
  DS_SIDENAV_COLLAPSED_WIDTH,
  DS_SIDENAV_EXPANDED_WIDTH,
  DS_EMPTY_ICON_SIZE,
  DS_EMPTY_DESCRIPTION_MAX_WIDTH,
  DS_DATA_CARD_MIN_WIDTH,
  DS_POPOVER_MAX_WIDTH,
}                                                  from "./CONSTANTS";
