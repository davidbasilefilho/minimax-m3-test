import { useReveal } from "../lib/reveal";
import type { ReactNode } from "react";

type Tag = "div" | "section" | "span" | "p" | "h1" | "h2" | "h3" | "article" | "header" | "footer";

interface RevealProps {
  children: ReactNode;
  as?: Tag;
  delay?: number;
  className?: string;
}

export function Reveal({ children, as: As = "div", delay = 0, className = "" }: RevealProps) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const Tag = As as "div";
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
