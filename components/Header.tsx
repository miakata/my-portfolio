"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"

export default function Header() {
    const pathname = usePathname();
    const link = (href: string, label: string) => {
        const active = pathname === href || (href !== "/" && pathname?.startsWith(href));
        return (
            <Link
                href={href}
                className={`px-3 py-1 text-shadow-yellow .text-shadow-animate transition ${active ? " underline" : "text-white font-bold hover:underline"
                    }`}
            >

                {label}
            </Link>
        );
    };

    return (
        <header className="sticky top-0 z-40 ">

            <div className="mx-auto max-w-6xl flex items-center justify-between px-6 md:px-10 h-14">
                {/* --- Logo --- */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <Image
                        src="/logo.svg"     // 👈 put your logo file in /public/logo.svg or .png
                        alt="Mia Katarina Logo"
                        width={50}
                        height={50}
                        priority
                        className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="text-white text-lg font-medium tracking-tight">
                        Mia Katarina
                    </span>
                </Link>
                <nav className="flex gap-2">
                    {link("/work", "Work")}
                    
                    {link("/contact", "Contact")}
                </nav>
            </div>
        </header>
    );
}
