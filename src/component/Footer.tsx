import React from "react";
import Link from "next/link";
import Image from "next/image";
// Mailto component for mailto links with subject/body
type MailtoProps = {
  email: string;
  subject?: string;
  body?: string;
  className?: string;
  children: React.ReactNode;
};

const Mailto = ({ email, subject = '', body = '', className = '', children }: MailtoProps) => {
  let params = subject || body ? '?' : '';
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
  return <a href={`mailto:${email}${params}`} className={className}>{children}</a>;
};

export default function Footer() {
  return (
    <footer>
      <div className="w-full bg-[#f7f9fb] text-gray-900 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div className="flex flex-col gap-8">
          {/* Contact */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-1">Contact</h4>
            <h4 className="text-lg font-bold mb-2 capitalize">Tell us everything</h4>
            <div className="mb-2 text-black">Do you have any question regarding our services? <br />Feel free to reach out.</div>
            <Mailto
              email="info@jdpelectrical.com.au"
              subject="Enquire To JDP"
              body="Hello JDP!"
              className="blue-link font-semibold focus-outline"
            >
              <p>Let&apos;s Chat</p>
            </Mailto>
          </div>
          {/* General & Accounts */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-2">General &amp; Accounts</h4>
            <div className="mb-1"><a href="tel:02-9419-7947" className="blue-link">Ph: (02) 9419 7947</a></div>
            <Mailto
              email="info@jdpelectrical.com.au"
              subject="Enquire To JDP"
              body="Hello JDP!"
              className="blue-link"
            >
              Info@jdpelectrical.com.au
            </Mailto>
            <br />
            <Mailto
              email="accounts@jdpelectrical.com.au"
              subject="Enquire To JDP"
              body="Hello JDP!"
              className="blue-link"
            >
              Accounts@jdpelectrical.com.au
            </Mailto>
          </div>
        </div>
        {/* Column 2 */}
        <div className="flex flex-col gap-8">
          {/* Navigation */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-2">JDP Electrical Services</h4>
            <nav className="flex flex-col gap-1">
              <a className="blue-link" href="#home">Home</a>
              <a className="blue-link" href="#services">Services</a>
              <a className="blue-link" href="#about">About</a>
              <a className="blue-link" href="#reviews">Reviews</a>
              <a className="blue-link" href="#contact">Contact</a>
            </nav>
          </div>
          {/* Joe */}
          <div>
            <h4 className="text-lg font-bold mb-2">Joe Panetta</h4>
            <div className="mb-2"><a href="tel:0412-450-300" className="blue-link">Ph: 0412 450 300</a></div>
          </div>
        </div>
        {/* Column 3 */}
        <div className="flex flex-col gap-8">
          {/* Address */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg mb-2">ADDRESS</h4>
            <div>
              <a
                href="https://goo.gl/maps/hrBNba4G8a1EbgFg6"
                className="blue-link text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unit 17
              </a>
            </div>
            <div>
              <a
                href="https://goo.gl/maps/hrBNba4G8a1EbgFg6"
                className="blue-link text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                4-6 Chaplin Drive
              </a>
            </div>
            <div>
              <a
                href="https://goo.gl/maps/hrBNba4G8a1EbgFg6"
                className="blue-link text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lane Cove West NSW 2066
              </a>
            </div>
          </div>
          {/* Dominic */}
          <div>
            <h4 className="text-lg font-bold mb-2">Dominic Panetta</h4>
            <div><a href="tel:0412-479-557" className="blue-link">Ph: 0412 479 557</a></div>
          </div>
        </div>
      </div>
      </div>
      <div className="w-full bg-[#f7f9fb]">
        <hr className="border-t border-gray-300 max-w-6xl mx-auto" />
      </div>
      <div className="bg-white w-full">
        <div className="mt-8 max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-start gap-6">
          {/* Brand/Partner Icons */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-start md:justify-center">
              <Link href="/" className="flex items-center border-gray-300">
                <Image src="/images/JDP-BRANDING-04.png" alt="Logo" width={210} height={30} className="h-10 w-auto mr-4 cursor-pointer" priority />
              </Link>
            </div>
            <div className="flex items-center justify-start md:justify-center">
              <Image 
                src="/images/itc-logo-red.png" 
                alt="In The Cove" 
                width={160} 
                height={64} 
                className="h-16 object-contain" 
                style={{ width: 'auto', height: '4rem' }}
              />
            </div>
            <div className="flex items-center justify-start md:justify-center">
              <Image 
                src="/images/neca-nat-logo-text.png" 
                alt="Neca" 
                width={120} 
                height={48} 
                className="h-12 object-contain" 
                style={{ width: 'auto', height: '3rem' }}
              />
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-4 py-2">&copy; {new Date().getFullYear()} JDP Electrical Services. All rights reserved.</div>
      </div>
    </footer>
  );
}
