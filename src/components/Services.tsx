import { motion } from 'framer-motion';

type ServicesData = {
  title: string;
  description: string;
  enjoyment: string[];
  tools: string[];
  img: string;
};

const servicesData: ServicesData[] = [
  {
    title: 'Front-end',
    description:
      'I like to code things from scratch, and enjoy bringing ideas to life in the browser. Be it SEO optimized landing pages or complex web applications.',
    enjoyment: [
      'Complex Web Applications',
      'E-commerce Websites',
      'Landing Pages',
      'Hybrid Mobile Applications',
    ],
    tools: ['JavaScript', 'React', 'HTML', 'CSS'],
    img: '/services/web-development.svg',
  },
  {
    title: 'Back-end',
    description:
      'I like to work on complex ideas to create efficient and reliable solutions that power the functionality that changes peoples lives.',
    enjoyment: [
      'Complex Backend Applications',
      'System Integrations',
      'IOT Applications',
      'Building APIs',
    ],
    tools: ['Node.JS', 'Next.JS', 'Express', 'Mongoose', 'Prisma'],
    img: '/services/coding.svg',
  },
  {
    title: 'Designer',
    description:
      "I like using the Jokob's Principle to design visually stunning, user-friendly UX/UI projects. More of a hobbyist in this field.",
    enjoyment: [
      'Design Systems',
      'Mobile Applications',
      'Websites',
      'Admin Portals',
      'Social Media',
      'Banners',
      'Brochures',
    ],
    tools: ['Figma'],
    img: '/services/designer.svg',
  },
  {
    title: 'Mentor',
    description:
      'I love to impart my knowledge and see people achieve great potential of their own. The leadership positions I have taken up at my positions have given be pleasure to mentor multiple cross-functional teams.',
    enjoyment: [
      'Complex Web Applications',
      'Ecommerce Websites',
      'Landing Pages',
    ],
    tools: ['JavaScript', 'React', 'HTML', 'CSS'],
    img: '/services/leadership.svg',
  },
];

const dropUpVariants = {
  hidden: {
    y: '50px',
  },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      mass: 0.3,
      // remove delay: 0.3,
    },
  },
};

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0, // this will set a delay before the children start animating
      staggerChildren: 0.3, // this will set the time inbetween children animation
    },
  },
};

const Card = (props: { data: ServicesData }) => {
  return (
    <motion.div
      variants={dropUpVariants}
      className="flex flex-col items-center justify-center w-full py-10 text-white border border-gray-600 shadow-lg bg-base-300 font-extralight"
    >
      <motion.img
        src={props.data.img}
        alt="Shoes"
        className="w-24"
        whileHover={{
          rotate: [-1, 10, 0],
          scale: 1.1,
        }}
      />

      <div className="card-body">
        <div>
          <h2 className="font-mono text-xl text-center">{props.data.title}</h2>
        </div>
        <p className="pt-4 font-mono tracking-widest text-left text-justify">
          {props.data.description}
        </p>
        {/* <div className="py-2">
          <p className="font-normal text-left">Things I like to make:</p>
          <p className="tracking-wide text-left">
            {props.data.enjoyment.join(', ')}
          </p>
        </div>
        <div className="py-2">
          <p className="font-normal text-left">
            Tools I use to make that happen:
          </p>
          <ul className="pt-2 text-left">
            {props.data.tools.map((i) => (
              <>
                <li key={i}>
                  {' '}
                  <IoFlash className="inline w-10 pr-[0.1]" />
                  {i}
                </li>
              </>
            ))}
          </ul>
        </div> */}
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <>
      <div className="text-white mt-[-100px]">
        {/* <h1 className="my-4 text-3xl font-bold text-center uppercase">
          What I do
        </h1> */}
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="p-5 lg:mx-20 rounded-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-4">
          {servicesData.map((i) => (
            <Card key={i.title} data={i}></Card>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Services;
