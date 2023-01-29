import testimonials from 'data/testimonials';
import Image from 'next/image';

interface ITestimonialData {
  name: string;
  company: string;
  designation: string;
  place: string;
  imageUrl: string;
  message: string;
}

const TestimonialCard = ({ data }: { data: ITestimonialData }) => {
  return (
    <div>
      <div className="grid items-center justify-center grid-cols-4 py-2 px-5 m-2 bg-[#272727] rounded-lg max-w-lg shadow-xl">
        <div className="flex flex-col justify-center col-span-1">
          <Image
            src={data.imageUrl}
            height={100}
            width={100}
            alt="name"
            className="mask mask-circle"
          ></Image>
          <p className="pt-2 font-bold">{data.name}</p>
          <p className="text-xs">{data.designation}</p>
          <p className="text-sm font-semibold">{data.company}</p>
        </div>
        <div className="col-span-3 py-10">
          <p className="ml-2 text-sm text-justify ">
            <Image
              src="/quotation-mark.svg"
              height={15}
              width={15}
              alt="quotation-mark"
              style={{ display: 'inline' }}
              className="mr-2"
            />
            {data.message}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <>
      <div className="py-10">
        <h2 className="py-10 font-mono text-2xl tracking-wider text-center uppercase">
          Testimonials
        </h2>
        {/* <div className="grid grid-cols-1 px-10 md:grid-cols-2 lg:grid-cols-3 "> */}
        <div className="flex flex-wrap items-center justify-center">
          {testimonials.map((item) => {
            return <TestimonialCard key={item.name} data={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Testimonials;
