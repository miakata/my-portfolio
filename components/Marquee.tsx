export default function Marquee({
    textList = [
        "design systems",
        "brand identity",
        "web development",
        "UX strategy",
        "motion",
        "interaction design",
        "frontend",
        "art direction",
    ],
}: {
    textList?: string[];
}) {
    const Sequence = () => (
        <div className="flex items-center whitespace-nowrap">
            {textList.map((word, i) => (
                <span
                    key={`seq-${i}`}
                    className="marquee__cell px-6 text-white text-lg md:text-xl font-light tracking-wide text-center"
                >
                    {word}
                </span>
            ))}
        </div>
    );

    return (
        <div className="marquee py-4 mt-12">
            <div className="marquee__track">
                <Sequence />
                <Sequence />
            </div>
        </div>
    );
}
