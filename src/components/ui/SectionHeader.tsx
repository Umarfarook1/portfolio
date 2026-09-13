// Every section opens the same way: a small label, an optional aside on the
// right, then the section's one headline under a hairline.
export function SectionHeader({
  label,
  title,
  aside,
}: {
  label: string;
  title: string;
  aside?: string;
}) {
  return (
    <div className="border-b border-line pb-6">
      <div className="flex items-baseline justify-between gap-6">
        <p className="label">{label}</p>
        {aside && <p className="hidden text-[13px] text-muted sm:block">{aside}</p>}
      </div>
      <h2 className="h2 mt-4 max-w-3xl">{title}</h2>
    </div>
  );
}
