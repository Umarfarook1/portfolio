import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative z-10 border-t border-stone-700/60 bg-stone-950/70 px-6 py-10">
            <div className="container mx-auto flex flex-col items-center justify-between gap-3 text-center font-mono text-xs text-stone-500 md:flex-row md:text-left">
                <p>
                    &copy; {new Date().getFullYear()} Umarfarook Gurramkonda.
                    Built with Next.js, Tailwind, and stubbornness.
                </p>
                <div className="flex items-center gap-4">
                    <Link
                        href="https://github.com/Umarfarook1"
                        target="_blank"
                        className="transition-colors hover:text-stone-100"
                    >
                        github
                    </Link>
                    <Link
                        href="https://linkedin.com/in/umarfarook-gurramkonda"
                        target="_blank"
                        className="transition-colors hover:text-stone-100"
                    >
                        linkedin
                    </Link>
                    <Link
                        href="mailto:umarfarook0yt@gmail.com"
                        className="transition-colors hover:text-stone-100"
                    >
                        email
                    </Link>
                </div>
            </div>
        </footer>
    );
}
