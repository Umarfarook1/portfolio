export function Footer() {
    return (
        <footer className="py-8 px-6 border-t border-white/5 bg-background/50 text-center text-sm text-muted-foreground">
            <p>
                &copy; {new Date().getFullYear()} AI Engineer. Built with Next.js &
                Deepmind.
            </p>
        </footer>
    );
}
