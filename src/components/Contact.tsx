const Contact = () => {
  return (
    <>
      <div className="py-20 bg-gray-900">
        <h2 className="my-10 font-mono text-2xl font-thin tracking-wider text-center capitalize">
          Let&apos;s have a conversation
        </h2>
        <div className="grid max-w-4xl grid-cols-2 gap-6 p-10 mx-auto rounded-lg shadow-xl bg-base-300">
          <form className="space-y-6 font-mono">
            <div className="form-control">
              <label className="input-group">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full input input-bordered"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="input-group">
                <span>Email</span>
                <input
                  type="text"
                  placeholder="info@site.com"
                  className="w-full input input-bordered"
                />
              </label>
            </div>
            <div className="form-control">
              <textarea
                className="textarea textarea-bordered"
                placeholder="Message"
              ></textarea>
            </div>
            <div className="form-control">
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
          <div className="flex flex-col items-start justify-center pl-6 space-y-6 font-mono border-l-2">
            <div>
              <p className="font-semibold">Location</p>
              <p>Dubai, United Arab Emirates</p>
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p>za@grizzlybit.dev</p>
            </div>
            <div>
              <p className="font-semibold">Alternate Email</p>
              <p>zubair1024@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
