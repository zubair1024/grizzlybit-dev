import testimonials from 'data/testimonials';
import Image from 'next/image';
import Link from 'next/link';
import { MDiv } from './fx/m';

interface ITestimonialData {
  name: string;
  company: string;
  designation: string;
  place: string;
  imageUrl: string;
  linkedIn: string;
  message: string;
}

const TestimonialCard = ({
  data,
  index,
}: {
  data: ITestimonialData;
  index: number;
}) => (
  <MDiv
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{
      delay: (index % 6) * 0.08,
      type: 'spring',
      stiffness: 130,
      damping: 18,
    }}
    className="relative mb-5 break-inside-avoid rounded-2xl border border-white/10 bg-[#101218]/95 p-6 shadow-xl backdrop-blur-sm overflow-hidden hover:border-brand-glow/40 transition-colors"
  >
    <div
      aria-hidden
      className="absolute -top-10 -left-6 font-mono text-[140px] leading-none text-brand-glow/15 select-none pointer-events-none"
    >
      &ldquo;
    </div>

    <div className="relative flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <Image
          src={data.imageUrl}
          height={56}
          width={56}
          alt={`${data.name} - ${data.designation} at ${data.company}`}
          className="mask mask-circle h-14 w-14 object-cover"
          loading="lazy"
        />
        <div className="text-left">
          <p className="font-mono font-bold text-white text-sm">{data.name}</p>
          <p className="font-mono text-xs text-white/70">{data.designation}</p>
          <p className="font-mono text-xs text-brand-glow/90">{data.company}</p>
          <p className="font-mono text-[10px] text-white/40">{data.place}</p>
        </div>
      </div>
      <Link
        target="_blank"
        href={data.linkedIn}
        className="shrink-0"
        aria-label={`${data.name} on LinkedIn`}
      >
        <Image
          src="/social/linkedin.svg"
          width={20}
          height={20}
          alt={`View ${data.name}'s LinkedIn profile`}
        />
      </Link>
    </div>

    <p className="relative mt-4 font-mono text-sm leading-relaxed text-white/80 whitespace-pre-line">
      {data.message}
    </p>
  </MDiv>
);

const Testimonials = () => {
  return (
    <section
      id="my-testimonials"
      className="relative py-16 overflow-hidden"
    >
      <div className="text-center mb-10 px-4">
        <p className="font-mono text-xs tracking-[0.3em] text-brand-glow uppercase">
          Words
        </p>
        <h2 className="mt-2 font-mono text-2xl md:text-3xl tracking-wider uppercase text-white">
          Testimonials
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-5 columns-1 md:columns-2 lg:columns-3 gap-5">
        {testimonials.map((item, i) => (
          <TestimonialCard key={item.name} data={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
