import PageTransition from "@/components/PageTransition";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import Container from "@/components/Container";

export default function Home() {
    return (
        <PageTransition>
            <main className="px-6 md:px-10">
                <Container>
                   
                    <section className="relative min-h-[70vh] grid place-content-center justify-start">
                        <Reveal>
                            <h1 className="tracking-tight text-6xl md:text-8xl font-bold leading-[1.1] text-shadow-yellow text-glow-animate">
                                Web and Digital <br /> Media specialist
                            </h1>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <span className="text-5xl leading-[1.5]">
                                focusing on <span className="underline">holistic</span> approach
                            </span>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <span className="text-3xl leading-[1.5]">
                                to tailoring <span className="underline">solutions</span> for businesses
                            </span>
                        </Reveal>

                        <Reveal delay={0.8}>
                            <div className="mt-6 text-lg text-neutral-500 space-y-1">
                                <p>Based in Copenhagen</p>
                                <p>Available for freelance</p>
                                <p>
                                    Say hello —{" "}
                                    <a href="mailto:hello@yourdomain.com" className="underline">
                                        hello@yourdomain.com
                                    </a>
                                </p>
                            </div>
                        </Reveal>

                        
                    </section>
                </Container>

                {/* Optional: show marquee on the homepage */}
                <div className="mt-12">
                    <Marquee />
                </div>
            </main>
        </PageTransition>
    );
}
