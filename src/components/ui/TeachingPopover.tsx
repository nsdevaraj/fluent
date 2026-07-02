/**
 * TeachingPopover — Guided onboarding overlay with carousel steps.
 *
 * Wraps Fluent UI v9 TeachingPopover family. Used for feature discovery,
 * onboarding flows, and contextual help.
 *
 * Two usage patterns:
 *
 * 1. Single-step (simple):
 *   <TeachingPopover
 *     trigger={<Button>What's new</Button>}
 *     title="New feature"
 *     body="You can now export directly from the toolbar."
 *     primaryAction={{ label: "Try it", onClick: () => {} }}
 *     secondaryAction={{ label: "Dismiss" }}
 *   />
 *
 * 2. Multi-step carousel:
 *   <TeachingPopover
 *     trigger={<Button>Tour</Button>}
 *     title="Get started"
 *     steps={[
 *       { title: "Step 1", body: "Here's the dashboard…" },
 *       { title: "Step 2", body: "Use the toolbar for…" },
 *       { title: "Step 3", body: "Export your work…" },
 *     ]}
 *   />
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  TeachingPopover as FluentTeachingPopover,
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
  Button as FluentButton,
} from "@fluentui/react-components";
import type { PositioningShorthand } from "@fluentui/react-components";

// ── Re-exports for composable usage ──────────────────────────────────────────
export {
  FluentTeachingPopover as TeachingPopoverRoot,
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
};

// ── Data-driven types ─────────────────────────────────────────────────────────

export interface TeachingPopoverAction {
  label: string;
  onClick?: () => void;
}

export interface TeachingPopoverStep {
  title: string;
  body: React.ReactNode;
  media?: React.ReactNode;
}

export interface TeachingPopoverProps {
  /** The element that triggers the popover */
  trigger: React.ReactElement;
  /** Popover title (single-step mode) */
  title?: string;
  /** Popover body (single-step mode) */
  body?: React.ReactNode;
  /** Steps for carousel mode — takes priority over title/body */
  steps?: TeachingPopoverStep[];
  /** Primary CTA (e.g. "Got it", "Try it") */
  primaryAction?: TeachingPopoverAction;
  /** Secondary / dismiss action */
  secondaryAction?: TeachingPopoverAction;
  positioning?: PositioningShorthand;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Dismiss button in header */
  withDismiss?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * TeachingPopover is a specialized popover for onboarding users to new features. It supports multi-step pagination, title, body text, media, and dismiss controls — purpose-built for feature discovery flows.
 *
 * **When to use:** Feature discovery and onboarding when a new feature ships. Multi-step feature tours anchored to specific UI elements. Progressive disclosure of complex functionality. 'What's new' callouts.
 * **When NOT to use:** Standard help documentation (link to docs instead). Error messages or warnings (use Dialog or MessageBar). Content that should always be visible. Flows longer than 5–6 steps (use a dedicated onboarding page).
 */
export const TeachingPopover = React.forwardRef<HTMLDivElement, TeachingPopoverProps>(
  ({
    trigger,
    title,
    body,
    steps,
    primaryAction,
    secondaryAction,
    positioning = "below-start",
    open,
    onOpenChange,
    withDismiss = true,
    className,
    style,
  }: TeachingPopoverProps, _ref) => {
    const isCarousel = steps && steps.length > 1;

    return (
      <FluentTeachingPopover
        positioning={positioning}
        open={open}
        onOpenChange={(_e, data) => onOpenChange?.(data.open)}
      >
        <TeachingPopoverTrigger disableButtonEnhancement>
          {trigger}
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface className={className} style={style}>
          {isCarousel ? (
            // defaultValue must match the value of the first card ("0")
            // so the carousel knows which card to render initially.
            <TeachingPopoverCarousel defaultValue="0">
              {steps!.map((step, i) => (
                <TeachingPopoverCarouselCard key={i} value={String(i)}>
                  {withDismiss && (
                    <TeachingPopoverHeader>
                      {step.title}
                    </TeachingPopoverHeader>
                  )}
                  <TeachingPopoverTitle>{step.title}</TeachingPopoverTitle>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <TeachingPopoverBody media={step.media as any}>
                    {step.body}
                  </TeachingPopoverBody>
                  {/* initialStepText / finalStepText control the back/next button
                      labels at the first and last steps respectively.
                      `next` is a required slot — pass empty shorthand and let
                      Fluent render its label from the step text props. */}
                  <TeachingPopoverCarouselFooter
                    initialStepText="Get started"
                    finalStepText={primaryAction?.label ?? "Done"}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    next={{} as any}
                  >
                    <TeachingPopoverCarouselNav>
                      {(value: string) => (
                        <TeachingPopoverCarouselNavButton value={value} />
                      )}
                    </TeachingPopoverCarouselNav>
                  </TeachingPopoverCarouselFooter>
                </TeachingPopoverCarouselCard>
              ))}
            </TeachingPopoverCarousel>
          ) : (
            <>
              {withDismiss && (
                <TeachingPopoverHeader>
                  {title}
                </TeachingPopoverHeader>
              )}
              <TeachingPopoverTitle>{title ?? (steps?.[0]?.title)}</TeachingPopoverTitle>
              <TeachingPopoverBody>
                {body ?? steps?.[0]?.body}
              </TeachingPopoverBody>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <TeachingPopoverFooter
                primary={(primaryAction
                  ? <FluentButton appearance="primary" onClick={primaryAction.onClick}>{primaryAction.label}</FluentButton>
                  : <FluentButton appearance="primary">{/* fallback */}</FluentButton>
                ) as any}
                secondary={secondaryAction ? (
                  <FluentButton onClick={secondaryAction.onClick}>{secondaryAction.label}</FluentButton>
                ) as any : undefined}
              />
            </>
          )}
        </TeachingPopoverSurface>
      </FluentTeachingPopover>
    );
  }
);
TeachingPopover.displayName = "TeachingPopover";
