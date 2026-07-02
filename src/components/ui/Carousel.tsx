/**
 * Carousel — Slideshow / carousel components for cycling through content.
 *
 * Wraps Fluent UI v9 Carousel family. Re-exports all sub-components and
 * provides a composite DSCarousel that renders a complete carousel from
 * a slides array, with optional navigation dots, prev/next buttons, and
 * an autoplay toggle button.
 *
 * Composable usage:
 *   import {
 *     Carousel, CarouselViewport, CarouselSlider, CarouselCard,
 *     CarouselNav, CarouselNavButton, CarouselNavContainer,
 *     CarouselButton, CarouselAutoplayButton,
 *   } from "../components/ui";
 *
 *   <Carousel aria-label="Product images">
 *     <CarouselViewport>
 *       <CarouselSlider>
 *         <CarouselCard>Slide 1</CarouselCard>
 *         <CarouselCard>Slide 2</CarouselCard>
 *       </CarouselSlider>
 *     </CarouselViewport>
 *     <CarouselNavContainer>
 *       <CarouselButton navType="prev" />
 *       <CarouselNav>{() => <CarouselNavButton />}</CarouselNav>
 *       <CarouselButton navType="next" />
 *     </CarouselNavContainer>
 *   </Carousel>
 *
 * Composite usage:
 *   <DSCarousel
 *     aria-label="Feature highlights"
 *     slides={[
 *       { id: "s1", content: <img src="/a.png" alt="A" /> },
 *       { id: "s2", content: <img src="/b.png" alt="B" /> },
 *     ]}
 *     showNav
 *     showButtons
 *     autoplay={false}
 *   />
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  Carousel as FluentCarousel,
  CarouselCard as FluentCarouselCard,
  CarouselSlider as FluentCarouselSlider,
  CarouselViewport as FluentCarouselViewport,
  CarouselNav as FluentCarouselNav,
  CarouselNavButton as FluentCarouselNavButton,
  CarouselNavContainer as FluentCarouselNavContainer,
  CarouselNavImageButton as FluentCarouselNavImageButton,
  CarouselButton as FluentCarouselButton,
  CarouselAutoplayButton as FluentCarouselAutoplayButton,
  CarouselProvider as FluentCarouselProvider,
} from "@fluentui/react-components";

// ── Re-exports for composable usage ──────────────────────────────────────────
export {
  FluentCarousel              as Carousel,
  FluentCarouselCard          as CarouselCard,
  FluentCarouselSlider        as CarouselSlider,
  FluentCarouselViewport      as CarouselViewport,
  FluentCarouselNav           as CarouselNav,
  FluentCarouselNavButton     as CarouselNavButton,
  FluentCarouselNavContainer  as CarouselNavContainer,
  FluentCarouselNavImageButton as CarouselNavImageButton,
  FluentCarouselButton        as CarouselButton,
  FluentCarouselAutoplayButton as CarouselAutoplayButton,
  FluentCarouselProvider      as CarouselProvider,
};

// ── DSCarousel composite ──────────────────────────────────────────────────────

/** Describes a single slide. */
export interface CarouselSlide {
  /** Unique identifier for the slide (used as key and Carousel index key). */
  id: string;
  /** React content to render inside the CarouselCard. */
  content: React.ReactNode;
}

export interface DSCarouselProps {
  /** Slides to display. */
  slides: CarouselSlide[];
  /** Zero-based index of the initially active slide (uncontrolled). */
  defaultActiveIndex?: number;
  /** When true, the carousel autoplays and a pause/play button is shown. */
  autoplay?: boolean;
  /** Interval between auto-advances in milliseconds. Default: 4000. */
  autoplayInterval?: number;
  /** Show navigation dots below the viewport. Default: true. */
  showNav?: boolean;
  /** Show previous/next buttons. Default: true. */
  showButtons?: boolean;
  /** Whether the carousel wraps around from last slide to first. Default: true. */
  circular?: boolean;
  /** Accessible label for the carousel landmark. Required. */
  "aria-label": string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * DSCarousel — Data-driven carousel composed from Fluent's Carousel family.
 *
 * Renders:
 *   Carousel
 *     CarouselViewport
 *       CarouselSlider
 *         CarouselCard × N
 *     CarouselNavContainer (when showNav or showButtons)
 *       CarouselButton[prev] (when showButtons)
 *       CarouselNav > CarouselNavButton (when showNav)
 *       CarouselButton[next] (when showButtons)
 *     CarouselAutoplayButton (when autoplay)
 */
export const DSCarousel: React.FC<DSCarouselProps> = ({
  slides,
  defaultActiveIndex = 0,
  autoplay = false,
  autoplayInterval = 4000,
  showNav = true,
  showButtons = true,
  circular = true,
  "aria-label": ariaLabel,
  className,
  style,
}) => {
  const showControls = showNav || showButtons;

  return (
    <FluentCarousel
      defaultActiveIndex={defaultActiveIndex}
      circular={circular}
      aria-label={ariaLabel}
      className={className}
      style={style}
    >
      <FluentCarouselViewport>
        <FluentCarouselSlider>
          {slides.map((slide) => (
            <FluentCarouselCard key={slide.id}>
              {slide.content}
            </FluentCarouselCard>
          ))}
        </FluentCarouselSlider>
      </FluentCarouselViewport>

      {showControls && (
        <FluentCarouselNavContainer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          {showButtons && <FluentCarouselButton navType="prev" />}

          {showNav && (
            <FluentCarouselNav>
              {() => <FluentCarouselNavButton />}
            </FluentCarouselNav>
          )}

          {showButtons && <FluentCarouselButton navType="next" />}
        </FluentCarouselNavContainer>
      )}

      {autoplay && (
        <FluentCarouselAutoplayButton
          style={{ marginTop: "8px" }}
        />
      )}
    </FluentCarousel>
  );
};

DSCarousel.displayName = "DSCarousel";
