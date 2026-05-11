import axios from 'axios';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoHome } from 'react-icons/io5';
import { MdMail } from 'react-icons/md';
import { trackEvent } from '@/util/ga';
import { useCapabilities } from './fx/CapabilityProvider';
import { MButton, MDiv, MSpan } from './fx/m';

interface IContactFormValues {
  name: string;
  email: string;
  message: string;
}

async function sendMessage({ name, email, message }: IContactFormValues) {
  return axios.post(`/api/contact`, { name, email, message });
}

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, type: 'spring', stiffness: 160 },
  }),
};

const Burst = () => (
  <>
    {Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const dist = 70 + Math.random() * 50;
      return (
        <MSpan
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            opacity: 0,
            scale: 0.3,
          }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-brand-glow"
          style={{
            boxShadow: '0 0 8px rgba(242,140,24,0.9)',
          }}
        />
      );
    })}
  </>
);

const SuccessModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    closeBtnRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <MDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          role="presentation"
        >
          <MDiv
            initial={{ y: 40, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            className="relative max-w-md rounded-2xl border border-white/10 bg-[#101218] p-8 text-white shadow-2xl"
          >
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close success dialog"
              className="absolute right-3 top-3 h-10 w-10 rounded-full border border-white/15 text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-glow"
            >
              ✕
            </button>
            <p className="font-mono text-xs tracking-[0.3em] text-brand-glow uppercase">
              Transmission Received
            </p>
            <h3
              id="contact-success-title"
              className="mt-2 font-mono text-xl"
            >
              Thank you
            </h3>
            <p className="mt-3 font-mono text-sm text-white/80">
              Thank you for your message. You can also email me directly with
              the email address provided on the page.
            </p>
          </MDiv>
        </MDiv>
      )}
    </AnimatePresence>
  );
};

const Contact = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IContactFormValues>();

  const { reducedMotion, isMobile } = useCapabilities();
  const [focusKey, setFocusKey] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const showBurst = sent && !reducedMotion && !isMobile;

  const onSubmit: SubmitHandler<IContactFormValues> = async (values) => {
    setSubmitError(null);
    try {
      await sendMessage(values);
      trackEvent('contact_submit', { status: 'success' });
      setSent(true);
      reset();
      setTimeout(() => {
        setModalOpen(true);
        setSent(false);
      }, 700);
    } catch {
      trackEvent('contact_submit', { status: 'error' });
      setSubmitError(
        'Could not send your message. Please try again or email za@grizzlybit.dev.',
      );
    }
  };

  const inputClass =
    'w-full bg-black/60 border border-white/10 rounded-md px-3 py-2.5 font-mono text-sm text-white placeholder-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-glow focus:border-brand-glow/60 transition-colors';

  const fields: Array<{
    key: 'name' | 'email' | 'message';
    label: string;
    placeholder: string;
    type: 'text' | 'textarea';
    validation: Record<string, unknown>;
  }> = [
    {
      key: 'name',
      label: 'name',
      placeholder: 'John Doe',
      type: 'text',
      validation: { required: 'Please enter your name.' },
    },
    {
      key: 'email',
      label: 'email',
      placeholder: 'info@site.com',
      type: 'text',
      validation: {
        required: 'Please enter your email.',
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Entered value does not match email format',
        },
      },
    },
    {
      key: 'message',
      label: 'message',
      placeholder: 'Your message...',
      type: 'textarea',
      validation: { required: 'Please enter your message.' },
    },
  ];

  return (
    <>
      <section
        id="contact-form"
        className="relative py-16 bg-gradient-to-t from-black via-[#0c0e13] to-[#16191f] overflow-hidden"
      >
        <div
          aria-hidden
          className="crt-scanlines absolute inset-0 opacity-30 pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-glow/60 to-transparent"
        />

        <div className="relative mx-auto max-w-5xl px-5">
          <div className="text-center mb-10">
            <p className="font-mono text-xs tracking-[0.3em] text-brand-glow uppercase">
              Signal
            </p>
            <h2 className="mt-2 font-mono text-2xl md:text-3xl tracking-wider uppercase text-white">
              Let&apos;s have a conversation
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2 p-6 md:p-10 rounded-2xl border border-white/10 bg-[#0b0d12]/70 backdrop-blur-sm shadow-2xl">
            <LayoutGroup>
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, i) => (
                  <MDiv
                    key={field.key}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fieldVariants}
                    className="relative"
                  >
                    <label
                      htmlFor={`contact-${field.key}`}
                      className="block font-mono text-[11px] tracking-[0.2em] text-white/70 uppercase mb-1.5"
                    >
                      <span className="text-brand-glow" aria-hidden="true">
                        $
                      </span>{' '}
                      {field.label}{' '}
                      <span className="text-red-400" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <div className="relative">
                      {focusKey === field.key && (
                        <MDiv
                          layoutId="focus-aura"
                          aria-hidden
                          className="absolute -inset-1 rounded-md pointer-events-none"
                          style={{
                            background:
                              'linear-gradient(120deg, rgba(242,140,24,0.45), rgba(169,145,247,0.45))',
                            filter: 'blur(10px)',
                            opacity: 0.7,
                          }}
                          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        />
                      )}
                      {field.type === 'textarea' ? (
                        <textarea
                          id={`contact-${field.key}`}
                          rows={4}
                          placeholder={field.placeholder}
                          className={inputClass}
                          aria-required="true"
                          aria-invalid={errors?.[field.key] ? true : false}
                          aria-describedby={
                            errors?.[field.key]
                              ? `contact-${field.key}-error`
                              : undefined
                          }
                          {...register(field.key, field.validation)}
                          onFocus={() => setFocusKey(field.key)}
                          onBlur={() => setFocusKey(null)}
                        />
                      ) : (
                        <input
                          id={`contact-${field.key}`}
                          type={field.key === 'email' ? 'email' : 'text'}
                          inputMode={field.key === 'email' ? 'email' : undefined}
                          autoComplete={
                            field.key === 'email'
                              ? 'email'
                              : field.key === 'name'
                              ? 'name'
                              : undefined
                          }
                          placeholder={field.placeholder}
                          className={inputClass}
                          aria-required="true"
                          aria-invalid={errors?.[field.key] ? true : false}
                          aria-describedby={
                            errors?.[field.key]
                              ? `contact-${field.key}-error`
                              : undefined
                          }
                          {...register(field.key, field.validation)}
                          onFocus={() => setFocusKey(field.key)}
                          onBlur={() => setFocusKey(null)}
                        />
                      )}
                    </div>
                    {errors?.[field.key]?.message && (
                      <p
                        id={`contact-${field.key}-error`}
                        role="alert"
                        className="mt-1.5 font-mono text-xs text-red-300"
                      >
                        {errors[field.key]?.message as string}
                      </p>
                    )}
                  </MDiv>
                ))}

                {submitError && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-200"
                  >
                    {submitError}
                  </div>
                )}

                <MDiv
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fieldVariants}
                  custom={fields.length}
                  className="relative flex justify-center"
                >
                  <MButton
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative rounded-md border border-brand-glow/50 bg-brand-glow/10 px-6 py-2.5 font-mono text-sm text-brand-glow hover:bg-brand-glow/20 transition-colors disabled:opacity-50"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'transmitting…' : 'transmit →'}
                    </span>
                    {showBurst && <Burst />}
                  </MButton>
                </MDiv>
              </form>
            </LayoutGroup>

            <div className="flex flex-col justify-center gap-6 font-mono md:border-l md:border-white/10 md:pl-10 text-white/85">
              <div>
                <p className="flex items-center font-semibold text-brand-glow">
                  <IoHome />
                  <span className="pl-2 text-white/70 tracking-wider uppercase text-xs">
                    Location
                  </span>
                </p>
                <p className="mt-1 text-sm">Dubai, United Arab Emirates</p>
              </div>
              <div>
                <p className="flex items-center font-semibold text-brand-glow">
                  <MdMail />
                  <span className="pl-2 text-white/70 tracking-wider uppercase text-xs">
                    Email
                  </span>
                </p>
                <a
                  href="mailto:za@grizzlybit.dev"
                  onClick={() =>
                    trackEvent('email_click', {
                      location: 'contact_section',
                      address: 'primary',
                    })
                  }
                  className="text-sm hover:text-brand-glow"
                >
                  za@grizzlybit.dev
                </a>
              </div>
              <div>
                <p className="flex items-center font-semibold text-brand-glow">
                  <MdMail />
                  <span className="pl-2 text-white/70 tracking-wider uppercase text-xs">
                    Alternate Email
                  </span>
                </p>
                <a
                  href="mailto:zubair1024@gmail.com"
                  onClick={() =>
                    trackEvent('email_click', {
                      location: 'contact_section',
                      address: 'alternate',
                    })
                  }
                  className="text-sm hover:text-brand-glow"
                >
                  zubair1024@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SuccessModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Contact;
