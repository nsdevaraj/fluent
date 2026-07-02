/**
 * Persona — Avatar + name + metadata + presence
 *
 * Usage:
 *   import { Persona } from "../components/ui";
 *   <Persona name="Alice Martin" secondaryText="Product Designer" presence="available" />
 *   <Persona name="Bob Kim" size="large" imageUrl="https://..." presence="busy" />
 */
import React from "react";
import {
  Persona as FluentPersona,
} from "@fluentui/react-components";
import type { PersonaProps as FluentPersonaProps } from "@fluentui/react-components";

export type PersonaPresence =
  | "available"
  | "away"
  | "busy"
  | "do-not-disturb"
  | "offline"
  | "out-of-office"
  | "unknown";

export type PersonaSize =
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large"
  | "huge";

export interface PersonaProps {
  name: string;
  secondaryText?: string;
  tertiaryText?: string;
  quaternaryText?: string;
  presence?: PersonaPresence;
  presenceTitle?: string;
  imageUrl?: string;
  imageAlt?: string;
  size?: PersonaSize;
  textAlignment?: "start" | "center";
  /** Position of the text block relative to the avatar — "after" (default) | "below" | "before" */
  textPosition?: "after" | "below" | "before";
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
}

/**
 * Persona combines an Avatar with a person's name, secondary text (job title), and tertiary text (status), providing a consistent way to represent a person's identity with contextual information.
 *
 * **When to use:** People-picker results, contact lists, comment threads, assignment fields — any surface where a person needs to be identified with role or availability context.
 * **When NOT to use:** When only an avatar is needed (use Avatar). Non-person entities. When space is too constrained to render text alongside the avatar.
 */
export const Persona = React.forwardRef<HTMLDivElement, PersonaProps>(
  ({
  name,
  secondaryText,
  tertiaryText,
  quaternaryText,
  presence,
  presenceTitle,
  imageUrl,
  imageAlt,
  size = "medium",
  textAlignment = "start",
  textPosition = "after",
}: PersonaProps, ref) => {
  return (
    <FluentPersona
      name={name}
      secondaryText={secondaryText}
      tertiaryText={tertiaryText}
      quaternaryText={quaternaryText}
      presence={
        presence
          ? { status: presence, title: presenceTitle }
          : undefined
      }
      avatar={
        imageUrl
          ? { image: { src: imageUrl, alt: imageAlt ?? name } }
          : { name }
      }
      size={size}
      textAlignment={textAlignment}
      textPosition={textPosition}
    />
  );
}
);
Persona.displayName = "Persona";
