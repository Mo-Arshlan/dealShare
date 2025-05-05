import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
} from "react-icons/bi";
import { Link } from 'react-router-dom';

const Footer = (props) => {
  const {
    logo,
    address,
    contact,
    columnLinks,
    socialMediaLinks,
    footerText,
    footerLinks,
  } = { ...Footer3Defaults, ...props };

  return (
    <footer id="relume" className="px-[5%] py-12 md:py-18 lg:py-20 bg-white border-t border-gray-300">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-[4vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4 lg:pb-20">
          <div className='flex flex-col lg:text-left'>
            <div className="rb-6 mb-6 md:mb-8">
              <Link to={logo.url}>
                <img src={logo.src} alt={logo.alt} className="inline-block h-10 w-auto" />
              </Link>
            </div>
            <div className="rb-6 mb-6 md:mb-8">
              <div>
                <p className="mb-1 text-sm font-semibold">{address.label}</p>
                <p className="mb-5 text-sm md:mb-6">{address.value}</p>
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold">{contact.label}</p>
                <p className="flex flex-col text-sm underline decoration-black underline-offset-1 md:mb-6">
                  <span href={`tel:${contact.phone}`} className="hover:text-gray-600 transition-colors duration-300">{contact.phone}</span>
                  <span href={`mailto:${contact.email}`} className="hover:text-gray-600 transition-colors duration-300">{contact.email}</span>
                </p>
              </div>
            </div>
            <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-center lg:justify-start gap-x-3">
              {socialMediaLinks.map((link, index) => (
                <Link key={index} to={link.url} className="hover:text-gray-600 transition-colors duration-300">
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
            {columnLinks.map((column, index) => (
              <ul key={index}>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="py-2 text-sm font-semibold">
                    <Link to={link.url} className="hover:text-gray-600 transition-colors duration-300">{link.title}</Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-black" />

        <div className="text-center pb-4 pt-6 text-sm md:flex-row md:items-center md:pb-0 md:pt-8">
          <p className="mt-8 md:mt-0">© 2025 QadriTech. All rights reserved.</p>
          {/* <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
            {footerLinks.map((link, index) => (
              <li key={index} className="underline">
                <a href={link.url} className="hover:text-gray-600 transition-colors duration-300">{link.title}</a>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </footer>
  );
};

export const Footer3Defaults = {
  logo: {
    url: "/",
    src: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600",
    alt: "Logo image",
  },
  address: {
    label: "Address:",
    value: "Level 1, 12 Sample St, Sydney NSW 2000",
  },
  contact: {
    label: "Contact:",
    phone: "1800 123 4567",
    email: "info@relume.io",
  },
  columnLinks: [
    {
      links: [
        { title: "Home", url: "/" },
        { title: "About", url: "/about" },
        { title: "Contact Us", url: "/contact" }
      ],
    },
    {
      links: [
        { title: "Link Six", url: "#" },
        { title: "Link Seven", url: "#" },
        { title: "Link Eight", url: "#" }
      ],
    },
  ],
  socialMediaLinks: [
    { url: "#", icon: <BiLogoFacebookCircle className="size-6" /> },
    { url: "#", icon: <BiLogoInstagram className="size-6" /> },
    { url: "#", icon: <FaXTwitter className="size-6 p-0.5" /> },
    { url: "#", icon: <BiLogoLinkedinSquare className="size-6" /> },
    { url: "#", icon: <BiLogoYoutube className="size-6" /> },
  ],
  // footerText: "© 2025 QadriTech. All rights reserved.",
  footerLinks: [
    { title: "Privacy Policy", url: "#" },
    { title: "Terms of Service", url: "#" },
    { title: "Cookies Settings", url: "#" },
  ],
};

export default Footer