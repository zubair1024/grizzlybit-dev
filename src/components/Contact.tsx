import { IoHome } from 'react-icons/io5';
import { MdMail } from 'react-icons/md';
const Contact = () => {
  return (
    <>
      <div
        id="contact-form"
        className="py-20 bg-gradient-to-t from-black to-[#212121]"
      >
        <h2 className="my-10 font-mono text-2xl font-thin tracking-wider text-center capitalize">
          Let&apos;s have a conversation
        </h2>
        <div className="grid max-w-4xl gap-6 p-10 mx-auto rounded-lg md:grid-cols-2 ">
          <form className="space-y-6 font-mono">
            <div className="form-control">
              <label className="input-group">
                <span className="bg-black border">Name</span>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-black input input-bordered"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input-group">
                <span className="bg-black border">Email</span>
                <input
                  type="text"
                  placeholder="info@site.com"
                  className="w-full bg-black input input-bordered"
                />
              </label>
            </div>
            <div className="form-control">
              <textarea
                className="bg-black textarea textarea-bordered"
                placeholder="Message"
              ></textarea>
            </div>
            <div className="form-control">
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
          <div className="flex flex-col items-start justify-center pl-6 space-y-6 font-mono md:border-l-2">
            <div>
              <p className="flex items-center font-semibold">
                <IoHome />
                <span className="pl-2">Location</span>
              </p>
              <p>Dubai, United Arab Emirates</p>
            </div>
            <div>
              <p className="flex items-center font-semibold">
                <MdMail />
                <span className="pl-2">Email</span>
              </p>
              <a href="mailto:za@grizzlybit.dev">
                <p>za@grizzlybit.dev</p>
              </a>
            </div>
            <div>
              <p className="flex items-center font-semibold">
                <MdMail />
                <span className="pl-2">Alternate Email</span>
              </p>
              <a href="mailto:zubair1024@gmail.com">
                <p>zubair1024@gmail.com</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
