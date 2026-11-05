import axios from 'axios';
import { CircleAlert, Loader2, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { trackEvent } from '@/util/ga';
import { Reveal, Section } from './Section';

interface IContactFormValues {
  name: string;
  email: string;
  message: string;
}

async function sendMessage({ name, email, message }: IContactFormValues) {
  return axios.post(`/api/contact`, { name, email, message });
}

const emails = [
  { label: 'Email', address: 'za@grizzlybit.dev', key: 'primary' },
  {
    label: 'Alternate email',
    address: 'zubair1024@gmail.com',
    key: 'alternate',
  },
];

const Contact = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IContactFormValues>();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit: SubmitHandler<IContactFormValues> = async (values) => {
    setSubmitError(null);
    setSent(false);
    try {
      await sendMessage(values);
      trackEvent('contact_submit', { status: 'success' });
      reset();
      setSent(true);
      toast.success('Message sent. Thanks for reaching out!');
    } catch {
      trackEvent('contact_submit', { status: 'error' });
      setSubmitError(
        'Please try again, or email me directly at za@grizzlybit.dev.',
      );
    }
  };

  const errorProps = (key: keyof IContactFormValues) => ({
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
  });

  return (
    <Section
      id="contact-form"
      muted
      eyebrow="Contact"
      title="Hire a full-stack engineer in Dubai"
      intro="Planning a product build, need CTO-level technical consulting, or looking for hands-on Node.js and React work? Tell me about your project and I'll get back to you."
    >
      <div className="grid gap-10 md:grid-cols-[2fr_3fr] md:gap-12">
        <Reveal>
          <address className="flex flex-col gap-6 not-italic">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center border-2 border-border bg-secondary text-secondary-foreground shadow">
                <MapPin aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="font-mono text-sm font-bold">Location</p>
                <p className="text-base">Dubai, United Arab Emirates</p>
              </div>
            </div>
            {emails.map(({ label, address, key }) => (
              <div key={key} className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center border-2 border-border bg-accent text-accent-foreground shadow">
                  <Mail aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-sm font-bold">{label}</p>
                  <a
                    href={`mailto:${address}`}
                    onClick={() =>
                      trackEvent('email_click', {
                        location: 'contact_section',
                        address: key,
                      })
                    }
                    className="inline-flex min-h-11 items-center text-base font-medium break-all underline decoration-2 underline-offset-4 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {address}
                  </a>
                </div>
              </div>
            ))}
          </address>
        </Reveal>

        <Reveal delay={0.1}>
          <Card>
            <CardContent>
              <p
                id="contact-form-note"
                className="mb-6 text-sm text-muted-foreground"
              >
                All fields are required.
              </p>
              <form
                noValidate
                aria-describedby="contact-form-note"
                onSubmit={handleSubmit(onSubmit)}
              >
                <FieldGroup>
                  <Field data-invalid={errors.name ? true : undefined}>
                    <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                    <Input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      aria-required="true"
                      {...errorProps('name')}
                      {...register('name', {
                        required: 'Please enter your name.',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters.',
                        },
                      })}
                    />
                    <FieldError
                      id="contact-name-error"
                      errors={[errors.name]}
                    />
                  </Field>

                  <Field data-invalid={errors.email ? true : undefined}>
                    <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                    <Input
                      id="contact-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      aria-required="true"
                      {...errorProps('email')}
                      {...register('email', {
                        required: 'Please enter your email.',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email address.',
                        },
                      })}
                    />
                    <FieldError
                      id="contact-email-error"
                      errors={[errors.email]}
                    />
                  </Field>

                  <Field data-invalid={errors.message ? true : undefined}>
                    <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                    <Textarea
                      id="contact-message"
                      rows={5}
                      placeholder="What are you building, and how can I help?"
                      aria-required="true"
                      {...errorProps('message')}
                      {...register('message', {
                        required: 'Please enter your message.',
                        minLength: {
                          value: 5,
                          message: 'Message must be at least 5 characters.',
                        },
                      })}
                    />
                    <FieldError
                      id="contact-message-error"
                      errors={[errors.message]}
                    />
                  </Field>

                  {submitError && (
                    <Alert variant="destructive">
                      <CircleAlert aria-hidden="true" />
                      <AlertTitle>Your message could not be sent</AlertTitle>
                      <AlertDescription>{submitError}</AlertDescription>
                    </Alert>
                  )}

                  {sent && (
                    <p className="text-base font-medium">
                      Thanks, your message is on its way. I&apos;ll reply by
                      email.
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto sm:self-start"
                  >
                    {isSubmitting && (
                      <Loader2 aria-hidden="true" className="animate-spin" />
                    )}
                    {isSubmitting ? 'Sending…' : 'Send message'}
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
};

export default Contact;
