import socialLinks from 'data/socialLinks';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const date = new Date();
  return (
    <footer className="flex items-center justify-between p-4 bg-black footer text-neutral-content">
      <div className="">
        <Image
          src="/grizzlybit-dev-only-logo.svg"
          height={24}
          width={24}
          alt="Grizzlybit.dev"
        ></Image>
        <p>Copyright © {date.getFullYear()} - All right reserved</p>
      </div>
      {/* <div className="flex items-center justify-center text-sm">
        Built using{' '}
        <Image
          src="/toolbelt/nextjs-icon.svg"
          className="inline"
          height={30}
          width={30}
          alt="nextjs"
        />{' '}
        with ❤️
      </div> */}
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        {socialLinks.map((i) => {
          return (
            <Link target={'_blank'} href={i.url} key={i.name}>
              <Image src={i.img} height={32} width={32} alt={i.name}></Image>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
