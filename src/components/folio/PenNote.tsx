import type { CSSProperties, ReactNode } from "react";

/*
  The handwriting. Caveat appears three times on the whole site and nowhere
  else: once beside the ablation figure, once beside the form, once beside the
  related work. Each note is rotated by its own modifier class.
*/
export function PenNote({
  variant,
  anchor,
  style,
  children,
}: {
  variant: "a" | "b" | "c";
  anchor?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span
      className={`margin-note margin-note--${variant}`}
      data-margin-note
      data-note-anchor={anchor}
      style={style}
    >
      {children}
    </span>
  );
}
