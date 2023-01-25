import socialLinks from 'data/socialLinks';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const date = new Date();
  return (
    <footer className="items-center p-4 bg-black footer text-neutral-content">
      <div className="items-center grid-flow-col">
        <Image
          src="/grizzlybit-dev-only-logo.svg"
          height={24}
          width={24}
          alt="Grizzlybit.dev"
        ></Image>
        <p>Copyright © {date.getFullYear()} - All right reserved</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        {socialLinks.map((i) => {
          return (
            <Link href={i.url} key={i.name}>
              <Image src={i.img} height={32} width={32} alt={i.name}></Image>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
