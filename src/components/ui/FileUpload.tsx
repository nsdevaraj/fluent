/**
 * FileUpload — Drag-and-drop + click-to-browse file upload zone
 *
 * Usage:
 *   import { FileUpload } from "../components/ui";
 *   <FileUpload
 *     label="Upload documents"
 *     accept=".pdf,.docx"
 *     multiple
 *     onFilesSelected={(files) => handleFiles(files)}
 *   />
 *
 * Dependencies: @fluentui/react-components, @fluentui/react-icons
 */

import React, { useRef, useState, useCallback, useId } from "react";
import { useClickKeydown } from "../../hooks/useClickKeydown";
import { makeStyles, tokens, mergeClasses, shorthands } from "@fluentui/react-components";
import { Field } from "./Field";
import { ArrowUpload20Regular, DocumentAdd20Regular } from "@fluentui/react-icons";
import { Caption, Body } from "./Typography";
import { DS_ICON_SIZE_LG } from "./CONSTANTS";

const useStyles = makeStyles({
  zone: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalXS,
    padding: tokens.spacingVerticalXXL,
    borderRadius: tokens.borderRadiusMedium,
    ...shorthands.border(tokens.strokeWidthThin, "dashed", tokens.colorNeutralStroke1),
    backgroundColor: tokens.colorNeutralBackground2,
    cursor: "pointer",
    textAlign: "center",
    ...shorthands.transition("border-color", tokens.durationFaster, tokens.curveEasyEase),
    outline: "none",
    ":hover": {
      ...shorthands.borderColor(tokens.colorBrandStroke1),
      backgroundColor: tokens.colorNeutralBackground2Hover,
    },
    ":focus-visible": {
      ...shorthands.borderColor(tokens.colorBrandStroke1),
      ...shorthands.outline(tokens.strokeWidthThick, "solid", tokens.colorBrandStroke1),
      outlineOffset: tokens.strokeWidthThick,
    },
  },
  zoneDragging: {
    ...shorthands.borderColor(tokens.colorBrandStroke1),
    backgroundColor: tokens.colorBrandBackground2,
  },
  // Error state: red border using status danger token (replaces neutral stroke)
  zoneError: {
    borderTopColor: tokens.colorStatusDangerBorder2,
    borderRightColor: tokens.colorStatusDangerBorder2,
    borderBottomColor: tokens.colorStatusDangerBorder2,
    borderLeftColor: tokens.colorStatusDangerBorder2,
    ":hover": {
      borderTopColor: tokens.colorStatusDangerBorder2,
      borderRightColor: tokens.colorStatusDangerBorder2,
      borderBottomColor: tokens.colorStatusDangerBorder2,
      borderLeftColor: tokens.colorStatusDangerBorder2,
    },
  },
  zoneDisabled: {
    // Use semantic disabled tokens — HC maps these to system GrayText / Canvas
    color: tokens.colorNeutralForegroundDisabled,
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    cursor: "not-allowed",
    ":hover": {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
    },
  },
  uploadIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: DS_ICON_SIZE_LG,
  },
  uploadIconDisabled: {
    // Explicitly override brand color in disabled state for all themes including HC
    color: tokens.colorNeutralForegroundDisabled,
  },
  hiddenInput: {
    display: "none",
  },
  fileList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    marginTop: tokens.spacingVerticalS,
    width: "100%",
  },
  fileItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingInlineStart: tokens.spacingHorizontalS,
    paddingInlineEnd: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  fileIcon: {
    color: tokens.colorNeutralForeground2,
    flexShrink: 0,
  },
  fileName: {
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export type FileUploadValidationState = "none" | "error" | "warning" | "success";

export interface FileUploadProps {
  label?: string;
  /** Accepted MIME types or file extensions, e.g. ".pdf,image/*" */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  /** Max file size in bytes (displayed to user, not enforced client-side) */
  maxSizeBytes?: number;
  onFilesSelected?: (files: File[]) => void;
  validationState?: FileUploadValidationState;
  validationMessage?: string;
  hint?: string;
  /** Custom prompt text inside the drop zone */
  promptText?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * FileUpload provides a drag-and-drop zone and file input button for uploading files. Displays selected file names and supports single or multiple file selection with MIME type filtering.
 *
 * **When to use:** Any form requiring file uploads — document submission, image upload, attachment addition. Provides a better UX than a raw `<input type='file'>` with drop zone support.
 * **When NOT to use:** When files are uploaded programmatically without user interaction. When a simple inline file input is sufficient and drag-and-drop is unnecessary.
 */
export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({
  label,
  accept,
  multiple = false,
  disabled = false,
  required,
  maxSizeBytes,
  onFilesSelected,
  validationState,
  validationMessage,
  hint,
  promptText,
}: FileUploadProps, ref) => {
  const styles = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const labelId = useId();

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || disabled) return;
      const arr = Array.from(files);
      setSelectedFiles(arr);
      onFilesSelected?.(arr);
    },
    [disabled, onFilesSelected]
  );

  const triggerInput = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const { onClick: handleClick, onKeyDown: handleKeyDown } = useClickKeydown(triggerInput, disabled);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const sizeHint = maxSizeBytes ? `Max size: ${formatBytes(maxSizeBytes)}` : undefined;
  const displayHint = hint ?? sizeHint;
  const prompt = promptText ?? (multiple ? "Drop files here or click to browse" : "Drop a file here or click to browse");

  return (
    <Field
      label={label ? `${label}${required ? " *" : ""}` : undefined}
      validationState={validationState && validationState !== "none" ? validationState : undefined}
      validationMessage={validationMessage}
      hint={displayHint}
    >
      <>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className={styles.hiddenInput}
          aria-labelledby={label ? labelId : undefined}
          onChange={(e) => handleFiles(e.target.files)}
          aria-required={required}
        />

        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          aria-label={label ?? "File upload area"}
          className={mergeClasses(
            styles.zone,
            isDragging ? styles.zoneDragging : undefined,
            disabled ? styles.zoneDisabled : undefined,
            !disabled && validationState === "error" ? styles.zoneError : undefined
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ArrowUpload20Regular className={mergeClasses(styles.uploadIcon, disabled ? styles.uploadIconDisabled : undefined)} />
          <Body size="sm">{prompt}</Body>
          {accept && (
            <Caption color="subtle">Accepted: {accept}</Caption>
          )}
        </div>

        {/* WCAG 4.1.3: aria-live announces additions; role="list" permits aria-label */}
        <ul
          role="list"
          className={styles.fileList}
          aria-label="Selected files"
          aria-live="polite"
          aria-atomic="false"
        >
          {selectedFiles.map((file) => (
            <li key={`${file.name}-${file.size}`} className={styles.fileItem}>
              <DocumentAdd20Regular className={styles.fileIcon} aria-hidden="true" />
              <span className={styles.fileName}>
                <Caption>{file.name}</Caption>
              </span>
              <Caption color="subtle">{formatBytes(file.size)}</Caption>
            </li>
          ))}
        </ul>
      </>
    </Field>
  );
}
);
FileUpload.displayName = "FileUpload";
