import Link from "next/link";

const links = [
  { name: "Services", href: "/services" },
  { name: "GitHub", href: "https://github.com/Umarfarook1", external: true },
  { name: "LinkedIn", href: "https://linkedin.com/in/umarfarook-gurramkonda", external: true },
  { name: "Email", href: "mailto:umarfarook0yt@gmail.com" },
  { name: "Resume", href: "/Umarfarook_Gurramkonda_ML_Engineer.pdf", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-10 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <p>© {new Date().getFullYear()} Umarfarook Gurramkonda</p>
          <p>open to applied ML roles · remote or contract</p>
        </div>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map((l) => (
            <li key={l.name}>
              <Link
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
                className="navlink text-[13px]"
              >
                {l.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
