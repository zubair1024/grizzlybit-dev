import testimonials from 'data/testimonials';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ITestimonialData {
  name: string;
  company: string;
  designation: string;
  place: string;
  imageUrl: string;
  linkedIn: string;
  message: string;
}

const TestimonialCard = ({ data }: { data: ITestimonialData }) => {
  return (
    <motion.div
      initial={{ y: '300px', opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 5,
          type: 'spring',
          stiffness: 100,
          mass: 0.3,
          // remove delay: 0.3,
        },
      }}
    >
      <div className="py-2 px-5 m-2 bg-[#272727] rounded-lg max-w-lg shadow-xl">
        <div className="flex justify-between">
          <div className="flex items-center justify-start space-x-2">
            <Image
              src={data.imageUrl}
              height={70}
              width={70}
              alt="name"
              className="mask mask-circle"
            ></Image>

            <div>
              <p className="pt-2 font-bold">{data.name}</p>
              <p className="text-sm">{data.designation}</p>
              <p className="text-xs font-semibold">{data.company}</p>
              <p className="text-xs font-light">{data.place}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Link target={'_blank'} href={data.linkedIn}>
              <Image
                src="social/linkedin.svg"
                width={24}
                height={24}
                alt="linkedin"
              ></Image>
            </Link>
          </div>
        </div>
        <div className="col-span-4 pt-2 pb-2">
          <p className="ml-2 text-sm text-justify ">
            <Image
              src="/quotation-mark.svg"
              height={10}
              width={10}
              alt="quotation-mark"
              style={{ display: 'inline' }}
              className="mr-2"
            />
            {data.message}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0, // this will set a delay before the children start animating
      staggerChildren: 1, // this will set the time in-between children animation
    },
  },
};

const Testimonials = () => {
  const copyTestimonials = [...testimonials];
  const leftTestimonials = copyTestimonials.splice(
    0,
    Math.ceil(copyTestimonials.length / 2 - 1),
  );
  const rightTestimonials = copyTestimonials;
  return (
    <>
      <div className="py-10 min-h-[100vh]" id="my-testimonials">
        <h2 className="py-10 font-mono text-2xl tracking-wider text-center uppercase">
          Testimonials
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="flex flex-wrap items-start justify-center"
        >
          <div className="left-testimonials">
            {leftTestimonials.map((item) => {
              return <TestimonialCard key={item.name} data={item} />;
            })}
          </div>
          <div className="right-testimonials">
            {rightTestimonials.map((item) => {
              return <TestimonialCard key={item.name} data={item} />;
            })}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Testimonials;
