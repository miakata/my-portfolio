import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen grid place-items-center bg-black text-white p-10">
            <div className="text-center">
                <h1 className="text-4xl font-semibold">Page not found</h1>
                <p className="text-gray-400 mt-2">Let’s get you back to the work.</p>
                <Link href="/work" className="inline-block mt-6 rounded-full bg-white text-black px-6 py-2">
                    View Work
                </Link>
            </div>
        </main>
    );
}
