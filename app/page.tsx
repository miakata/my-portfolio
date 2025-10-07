import PageTransition from "@/components/PageTransition";
import Marquee from "@/components/Marquee"

export default function Home() {
    return (
        <PageTransition>
            <main className="px-6 md:px-10">
                <section className="min-h-[70vh] grid place-content-center">
                    <h1 className="text-6xl md:text-8xl font-bold leading-[0.95]">
                        Developer specialising in <span className="italic">interactive</span> experiences
                    </h1>
                    <div className="mt-6 text-lg text-neutral-500 space-y-1">
                        <p>Based in Copenhagen</p>
                        <p>Available for freelance</p>
                        <p>
                            Say hello — <a href="mailto:hello@yourdomain.com" className="underline">hello@yourdomain.com</a>
                        </p>
                    </div>
                </section>
            </main>
        </PageTransition>


    );
    <Marquee text="let’s work together" />

}

