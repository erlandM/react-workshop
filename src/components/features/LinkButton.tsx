export function LinkButton({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="link-button">
      {label}
    </a>
  );
}