import { useState } from 'react';
import { IoHome } from 'react-icons/io5';
import { MdMail } from 'react-icons/md';

const formDataDefault = {
  name: '',
  email: '',
  message: '',
};

const FormCompletionModal = () => {
  const handleHideModal = () => {
    const elm = document.getElementById(
      'contact-form-completed',
    ) as HTMLInputElement | null;
    if (elm) elm.checked = false;
  };
  return (
    <>
      <input
        type="checkbox"
        id="contact-form-completed"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="relative modal-box">
          <label
            onClick={handleHideModal}
            htmlFor="my-modal-3"
            className="absolute btn btn-sm btn-circle right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Thank you</h3>
          <p className="py-4">
            Thank you for your message. You can also email be directly with the
            email address provided on the page.
          </p>
        </div>
      </div>
    </>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState(formDataDefault);
  const handleModalOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const elm = document.getElementById(
      'contact-form-completed',
    ) as HTMLInputElement | null;
    if (elm) elm.checked = true;
    setFormData(formDataDefault);
  };

  const handleFormChange = (
    field: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const str = e.target.value;
    setFormData({ ...formData, [field]: str });
  };
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
                  value={formData.name}
                  onChange={(e) => {
                    handleFormChange('name', e);
                  }}
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
                  value={formData.email}
                  onChange={(e) => {
                    handleFormChange('email', e);
                  }}
                />
              </label>
            </div>
            <div className="form-control">
              <textarea
                className="bg-black textarea textarea-bordered"
                placeholder="Message"
                value={formData.message}
                onChange={(e) => {
                  handleFormChange('message', e);
                }}
              ></textarea>
            </div>
            <div className="form-control">
              <button onClick={handleModalOpen} className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <FormCompletionModal />
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
