// app/work/page.tsx (and others)
import Container from "@/components/Container";




export const revalidate = 3600;

export default function About() {
    return (
        <main className="min-h-screen  px-6 md:px-10">
            <Container>
            <section className="mx-auto max-w-6xl py-20">
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">About</h1>
                    <div>
                <p className="text-white/70 leading-relaxed">
                    Designer & frontend developer building custom sites, shops, and automation workflows.
                    WordPress/WooCommerce, Shopify, Sanity, Next.js. UX, wireframes, and support systems (Zendesk, Zapier).
                        </p>
                    </div>
                </section>
            </Container>
        </main>
    );
}
