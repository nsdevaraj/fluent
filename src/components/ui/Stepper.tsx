/**
 * Stepper — Multi-step progress indicator for wizards and flows
 *
 * Usage:
 *   import { Stepper } from "../components/ui";
 *   <Stepper
 *     steps={[
 *       { label: "Account", status: "completed" },
 *       { label: "Details", status: "current" },
 *       { label: "Review", status: "upcoming" },
 *     ]}
 *   />
 *
 * Dependencies: DS Icon, Heading, Caption, Divider
 */

import React from "react";
import { makeStyles, tokens, mergeClasses } from "@fluentui/react-components";
import {
  CheckmarkCircle20Filled,
  DismissCircle20Filled,
  Circle20Regular,
  RadioButtonFilled as RecordCircle20Filled,
} from "@fluentui/react-icons";
import { Caption } from "./Typography";
import { DS_STEPPER_CIRCLE_SIZE } from "./CONSTANTS";

const useStyles = makeStyles({
  // Horizontal layout
  rootH: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
  },
  // Vertical layout
  rootV: {
    display: "flex",
    flexDirection: "column",
  },

  // Single step (horizontal)
  stepH: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  // Single step (vertical)
  stepV: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalM,
    paddingBottom: tokens.spacingVerticalM,
    position: "relative",
  },

  // Icon circle
  iconWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: DS_STEPPER_CIRCLE_SIZE,
    height: DS_STEPPER_CIRCLE_SIZE,
    borderRadius: tokens.borderRadiusCircular,
    flexShrink: 0,
    zIndex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  iconUpcoming: {
    color: tokens.colorNeutralForeground3,
  },
  iconCurrent: {
    color: tokens.colorBrandForeground1,
  },
  iconCompleted: {
    color: tokens.colorStatusSuccessForeground1,
  },
  iconError: {
    color: tokens.colorStatusDangerForeground1,
  },

  // Connector line (horizontal) — between steps
  connectorH: {
    position: "absolute",
    top: `calc(${DS_STEPPER_CIRCLE_SIZE} / 2)`,
    insetInlineStart: `calc(50% + ${DS_STEPPER_CIRCLE_SIZE} / 2)`,
    insetInlineEnd: `calc(-50% + ${DS_STEPPER_CIRCLE_SIZE} / 2)`,
    height: tokens.strokeWidthThin,
    backgroundColor: tokens.colorNeutralStroke1,
  },
  connectorHCompleted: {
    backgroundColor: tokens.colorStatusSuccessForeground1,
  },

  // Connector line (vertical)
  connectorV: {
    position: "absolute",
    insetInlineStart: `calc(${DS_STEPPER_CIRCLE_SIZE} / 2 - ${tokens.strokeWidthThin})`,
    top: DS_STEPPER_CIRCLE_SIZE,
    bottom: 0,
    width: tokens.strokeWidthThin,
    backgroundColor: tokens.colorNeutralStroke1,
  },
  connectorVCompleted: {
    backgroundColor: tokens.colorStatusSuccessForeground1,
  },

  // Labels (horizontal)
  labelGroupH: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: tokens.spacingVerticalXS,
    textAlign: "center",
  },
  // Labels (vertical)
  labelGroupV: {
    display: "flex",
    flexDirection: "column",
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
  },
});

export type StepStatus = "completed" | "current" | "upcoming" | "error";

export interface Step {
  label: string;
  description?: string;
  status: StepStatus;
}

export interface StepperProps {
  steps: Step[];
  orientation?: "horizontal" | "vertical";
}

const statusIcon: Record<StepStatus, React.ReactElement> = {
  completed: <CheckmarkCircle20Filled />,
  current:   <RecordCircle20Filled />,
  upcoming:  <Circle20Regular />,
  error:     <DismissCircle20Filled />,
};

/**
 * Stepper displays progress through a multi-step sequential workflow, with each step showing a number or icon, label, and completion state. Guides users through wizards, onboarding flows, and checkout processes.
 *
 * **When to use:** Sequential multi-step workflows where order matters and users benefit from seeing their overall progress — checkout, onboarding wizards, form sequences, installation flows.
 * **When NOT to use:** Non-sequential navigation where steps can be visited in any order (use Tabs). Simple two-state progress (use ProgressBar). More than 7–8 steps (consider breaking into sub-flows).
 */
export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, orientation = "horizontal" }: StepperProps, ref) => {
  const styles = useStyles();
  const isHorizontal = orientation === "horizontal";

  return (
    <ol
      className={isHorizontal ? styles.rootH : styles.rootV}
      aria-label="Progress steps"
      style={{ listStyle: "none", margin: 0, padding: 0 }}
    >
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const connectorCompleted = step.status === "completed";

        return (
          <li
            key={step.label}
            className={isHorizontal ? styles.stepH : styles.stepV}
            aria-current={step.status === "current" ? "step" : undefined}
          >
            {/* Connector line */}
            {!isLast && (
              <div
                className={mergeClasses(
                  isHorizontal ? styles.connectorH : styles.connectorV,
                  connectorCompleted
                    ? (isHorizontal ? styles.connectorHCompleted : styles.connectorVCompleted)
                    : undefined
                )}
                aria-hidden="true"
              />
            )}

            {/* Icon */}
            <div
              className={mergeClasses(
                styles.iconWrap,
                step.status === "upcoming" ? styles.iconUpcoming : undefined,
                step.status === "current"   ? styles.iconCurrent   : undefined,
                step.status === "completed" ? styles.iconCompleted : undefined,
                step.status === "error"     ? styles.iconError     : undefined
              )}
            >
              {statusIcon[step.status]}
            </div>

            {/* Labels */}
            <div className={isHorizontal ? styles.labelGroupH : styles.labelGroupV}>
              <Caption
                weight={step.status === "current" ? "semibold" : "regular"}
                color={
                  step.status === "upcoming" ? "subtle"
                  : step.status === "error"  ? "danger"
                  : "default"
                }
              >
                {step.label}
              </Caption>
              {step.description && (
                <Caption color="subtle">{step.description}</Caption>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
);
Stepper.displayName = "Stepper";
