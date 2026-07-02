/**
 * Image — Accessible image with fit modes, loading state, and error fallback.
 *
 * Wraps Fluent UI v9 `Image` with DS enhancements:
 *  - Skeleton placeholder during load
 *  - Error state fallback
 *  - Aspect ratio enforcement
 *  - All Fluent fit modes
 *
 * Usage:
 *   import { Image } from "../components/ui";
 *   <Image src="/photo.jpg" alt="Team photo" width={320} height={200} fit="cover" />
 *   <Image src="/logo.svg" alt="Company logo" block bordered />
 *
 * Dependencies: @fluentui/react-components
 */
import React, { useState } from "react";
import {
  Image as FluentImage,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  wrapper: {
    position: "relative",
    display: "inline-block",
    overflow: "hidden",
  },
  block: { display: "block", width: "100%" },
  placeholder: {
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
  errorIcon: {
    fontSize: tokens.fontSizeHero700,
    opacity: 0.3,
  },
});

export type ImageFit = "none" | "center" | "contain" | "cover" | "default";
export type ImageShape = "circular" | "rounded" | "square";

export interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fit?: ImageFit;
  shape?: ImageShape;
  /** Fill the container width */
  block?: boolean;
  /** Add a 1px border */
  bordered?: boolean;
  /** Add a shadow */
  shadow?: boolean;
  /** Fallback src on load error */
  fallbackSrc?: string;
  /** Show skeleton while loading */
  showSkeleton?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  loading?: "eager" | "lazy";
}

/**
 * Image wraps the HTML `<img>` element with Fluent styling support for fit, shape (rounded, circular, square), shadow, and block/inline layout. Handles responsive sizing and aspect-ratio constraints.
 *
 * **When to use:** Displaying photographs, illustrations, or product images within cards, articles, profiles, or media sections.
 * **When NOT to use:** Decorative background images (use CSS background-image). Icon-sized graphics (use Icon). When the image conveys critical content that should also be expressed as text.
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({
    src,
    alt,
    width,
    height,
    fit = "default",
    shape = "square",
    block = false,
    bordered = false,
    shadow = false,
    fallbackSrc,
    className,
    style,
    onClick,
    loading = "lazy",
  }: ImageProps, ref) => {
    const styles = useStyles();
    const [errored, setErrored] = useState(false);
    const [useFallback, setUseFallback] = useState(false);

    const handleError = () => {
      if (fallbackSrc && !useFallback) {
        setUseFallback(true);
      } else {
        setErrored(true);
      }
    };

    if (errored) {
      return (
        <div
          className={`${styles.placeholder} ${className ?? ""}`}
          style={{
            width: width ?? "100%",
            height: height ?? 120,
            borderRadius: shape === "circular"
              ? "50%"
              : shape === "rounded"
              ? tokens.borderRadiusMedium
              : undefined,
            ...style,
          }}
          role="img"
          aria-label={alt}
        >
          <span className={styles.errorIcon} aria-hidden="true">⚠</span>
        </div>
      );
    }

    return (
      <FluentImage
        ref={ref}
        src={useFallback && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        fit={fit}
        shape={shape}
        block={block}
        bordered={bordered}
        shadow={shadow}
        className={className}
        style={style}
        onClick={onClick}
        loading={loading}
        onError={handleError}
      />
    );
  }
);
Image.displayName = "Image";
