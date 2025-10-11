export default function Footer() {
    return (
        <footer className="mt-24">
            <div className="mx-auto max-w-6xl px-6 md:px-10 py-10 text-sm text-white/80">
                © {new Date().getFullYear()} Mia Katarina — Portfolio
            </div>
        </footer>
    );
}
