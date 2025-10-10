"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const link = (href: string, label: string) => {
        const active = pathname === href || (href !== "/" && pathname?.startsWith(href));
        return (
            <Link
                href={href}
                className={`px-3 py-1 rounded-full transition ${active ? "bg-white text-black" : "text-white/80 hover:text-white"
                    }`}
            >
                {label}
            </Link>
        );
    };

    return (
        <header className="sticky top-0 z-40 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40">
            <div className="mx-auto max-w-6xl flex items-center justify-between px-6 md:px-10 h-14">
                <Link href="/" className="font-medium tracking-tight">Mia Katarina</Link>
                <nav className="flex gap-2">
                    {link("/work", "Work")}
                    {link("/about", "About")}
                    {link("/contact", "Contact")}
                </nav>
            </div>
        </header>
    );
}
