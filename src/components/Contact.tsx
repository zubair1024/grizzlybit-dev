import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoHome } from 'react-icons/io5';
import { MdMail } from 'react-icons/md';

const FormCompletionModal = () => {
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
            htmlFor="contact-form-completed"
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

interface IContactFormValues {
  name: string;
  email: string;
  message: string;
}

async function sendMessage({ name, email, message }: IContactFormValues) {
  return axios.post(`/api/contact`, { name, email, message });
}

const Contact = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IContactFormValues>();

  const handleModalOpen = () => {
    const elm = document.getElementById(
      'contact-form-completed',
    ) as HTMLInputElement | null;
    if (elm) elm.checked = true;
  };
  const onSubmit: SubmitHandler<IContactFormValues> = async ({
    name,
    email,
    message,
  }) => {
    try {
      await sendMessage({ name, email, message });
      reset();
      handleModalOpen();
    } catch (err) {
      alert('An error occurred while sending message. Please try again later');
    }
  };

  return (
    <>
      <div
        id="contact-form"
        className="py-20 bg-gradient-to-t from-black to-[#212121] min-h-[100vh]"
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
                  {...register('name', {
                    required: 'Please enter your name.',
                  })}
                />
              </label>

              {errors?.name?.message && (
                <div className="text-[red] py-2 text-left">
                  {' '}
                  <p>{errors.name.message}</p>
                </div>
              )}
            </div>
            <div className="form-control">
              <label className="input-group">
                <span className="bg-black border">Email</span>
                <input
                  type="text"
                  placeholder="info@site.com"
                  className="w-full bg-black input input-bordered"
                  {...register('email', {
                    required: 'Please enter your email.',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Entered value does not match email format',
                    },
                  })}
                />
              </label>
              {errors?.email?.message && (
                <div className="text-[red] py-2 text-left">
                  {' '}
                  <p>{errors.email.message}</p>
                </div>
              )}
            </div>
            <div className="form-control">
              <textarea
                className="bg-black textarea textarea-bordered"
                placeholder="Message"
                {...register('message', {
                  required: 'Please enter your message.',
                })}
              ></textarea>
              {errors?.message?.message && (
                <div className="text-[red] py-2 text-left">
                  {' '}
                  <p>{errors.message.message}</p>
                </div>
              )}
            </div>
            <div className="form-control">
              <button
                onClick={handleSubmit(onSubmit)}
                className="btn btn-primary"
              >
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
