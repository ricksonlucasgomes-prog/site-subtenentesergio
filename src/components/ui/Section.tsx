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
    <section ref={ref} id={id} className={`py-16 md:py-24 ${className}`} {...props}>
      <Container>{children}</Container>
    </section>
  );
});
