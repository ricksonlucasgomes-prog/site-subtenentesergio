import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { children, id, className = "", ...props },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      className={`relative isolate py-[var(--section-spacing)] ${className}`}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
});
