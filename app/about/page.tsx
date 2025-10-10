export const revalidate = 3600;

export default function About() {
    return (
        <main className="min-h-screen bg-black text-white px-6 md:px-10 py-20">
            <section className="mx-auto max-w-3xl space-y-6">
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">About</h1>
                <p className="text-white/70 leading-relaxed">
                    Designer & frontend developer building custom sites, shops, and automation workflows.
                    WordPress/WooCommerce, Shopify, Sanity, Next.js. UX, wireframes, and support systems (Zendesk, Zapier).
                </p>
            </section>
        </main>
    );
}
