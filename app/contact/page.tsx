// app/work/page.tsx (and others)
import Container from "@/components/Container";

export const revalidate = 3600;

export default function Contact() {
    return (
        <main className="min-h-screen bg-black text-white px-6 md:px-10">
            <Container>
                <section className="mx-auto max-w-6xl py-20">
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Contact</h1>
                <p className="text-white/70">Email: hello@yourdomain.com</p>
                {/* Replace with a real form service later (Formspree/Resend/etc.) */}
                <form className="space-y-4 max-w-lg">
                    <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Name" />
                    <input className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" placeholder="Email" />
                    <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3" rows={5} placeholder="Message" />
                    <button className="rounded-full bg-white text-black px-6 py-2">Send</button>
                </form>
                </section>
                </Container>
        </main>
    );
}
