// src/components/layout-parts/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'; // Import MapPin

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0A1128] text-gray-400 py-12 px-4 md:px-8 relative z-30 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="col-span-1">
          <Link href="/" passHref className="block mb-4" data-cursor="hover">
            {/* >>> CRITICAL: Ensure 'relative' is on this parent div for Image fill prop <<< */}
            <div className="relative w-36 h-9">
              <Image
                src="/images/WLogo.svg" // Your white logo
                alt="Falcon ERP Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <p className="text-sm leading-relaxed">
            FALCON ERP provides cutting-edge enterprise resource planning solutions designed to streamline your business operations.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="https://facebook.com/falconerp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Facebook" data-cursor="hover">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com/falconerp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter" data-cursor="hover">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com/company/falconerp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="LinkedIn" data-cursor="hover">
              <Linkedin size={20} />
            </a>
            <a href="https://instagram.com/falconerp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram" data-cursor="hover">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors" data-cursor="hover">About Us</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors" data-cursor="hover">Our Services</Link></li>
            <li><Link href="/modules" className="hover:text-white transition-colors" data-cursor="hover">ERP Modules</Link></li>
            <li><Link href="/industries" className="hover:text-white transition-colors" data-cursor="hover">Industries</Link></li>
            <li><Link href="/faqs" className="hover:text-white transition-colors" data-cursor="hover">FAQs</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors" data-cursor="hover">Blog</Link></li>
            <li><Link href="/resources" className="hover:text-white transition-colors" data-cursor="hover">Resources</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="col-span-1">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-blue-400" />
              <span>info@falconerp.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-blue-400" />
              <span>+971 50 123 4567</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-blue-400 mt-1" />
              <span>Office 123, Business Bay, Dubai, UAE</span>
            </li>
          </ul>
        </div>

        {/* Newsletter (Placeholder) */}
        <div className="col-span-1">
          <h3 className="footer-title">Newsletter</h3>
          <p className="text-sm mb-4">Stay updated with our latest news and offers.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow p-2 rounded-l-md bg-gray-700 border border-gray-600 text-white text-sm focus:ring-blue-500 focus:border-blue-500"
              data-cursor="input" // Mark for custom cursor input effect
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors text-sm"
              data-cursor="hover" // Mark for custom cursor hover effect
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
        <p>&copy; {currentYear} FALCON ERP. All rights reserved.</p>
        <p className="mt-2">
          Powered by{' '}
          <a href="https://www.fedrixgroup.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            Fedrix MediaLab
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
