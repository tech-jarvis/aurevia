import { icons, type LucideProps } from "lucide-react";

type IconProps = LucideProps & { name: string };

/**
 * Render a lucide icon by name. Content data references icons as strings so
 * the content modules stay free of component imports. Falls back silently if
 * a name is unknown.
 */
export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = icons[name as keyof typeof icons];
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
}
