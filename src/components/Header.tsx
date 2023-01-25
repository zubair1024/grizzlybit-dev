import Image from 'next/image';
import { useEffect } from 'react';

const Header = () => {
  useEffect(() => {
    const header = document.getElementById('header');

    const onScroll = () => {
      if (window.scrollY !== 0) {
        header?.classList.add('shadow-xl');
        header?.classList.remove('bg-transparent');
        header?.classList.add('bg-base-300');
      } else {
        header?.classList.remove('shadow-xl');
        header?.classList.add('bg-transparent');
        header?.classList.remove('bg-base-300');
      }
    };
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <>
      <header id="header" className="fixed z-50 navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="p-2 mt-3 uppercase shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>About Me</a>
              </li>
              <li>
                <a>Timeline</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost">
            <Image
              src="/grizzlybit-dev-logo.svg"
              width={100}
              height={100}
              alt="grizzlybit.dev"
            ></Image>
          </a>
        </div>
        <div className="hidden navbar-center lg:flex lg:justify-between">
          <ul className="px-1 uppercase menu menu-horizontal menu-compact">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>About Me</a>
            </li>
            <li>
              <a>Timeline</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Contact Me</a>
        </div>
      </header>
    </>
  );
};

export default Header;
