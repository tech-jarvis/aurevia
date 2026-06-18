import { cn } from "@/lib/utils";
import { Container } from "./container";

/** Vertical-rhythm section wrapper. */
export function Section({
  className,
  containerClassName,
  children,
  id,
}: {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Consistent eyebrow + heading + optional lead block. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="heading text-4xl text-cream sm:text-5xl">{title}</h2>
      {lead && (
        <p className={cn("max-w-2xl text-base text-muted sm:text-lg", align === "center" && "mx-auto")}>
          {lead}
        </p>
      )}
    </div>
  );
}
