import React, { useState } from "react";
import { makeStyles, tokens, Button, Text } from "@fluentui/react-components";
import { Copy20Regular, Checkmark20Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  wrapper: {
    position: "relative",
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground3,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
  },
  pre: {
    margin: "0",
    padding: tokens.spacingVerticalM,
    backgroundColor: "#1e1e1e",
    overflowX: "auto",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase400,
    fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace",
    color: "#d4d4d4",
    maxHeight: "320px",
    overflowY: "auto",
  },
  copied: {
    color: tokens.colorPaletteGreenForeground2,
  },
});

interface CodeBlockProps {
  code: string;
  label?: string;
}

export function CodeBlock({ code, label = "TSX" }: CodeBlockProps) {
  const styles = useStyles();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Text size={100} style={{ color: tokens.colorNeutralForeground3, fontFamily: "monospace" }}>
          {label}
        </Text>
        <Button
          appearance="subtle"
          size="small"
          icon={copied ? <Checkmark20Regular /> : <Copy20Regular />}
          className={copied ? styles.copied : undefined}
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <pre className={styles.pre}>
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
