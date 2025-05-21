"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';
import { useTheme } from '@/providers/ThemeProvider';
import Image from 'next/image';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isMobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    // { name: 'Services', href: '/services' },
    { name: 'Work', href: '/#work' },
    { name: 'Team', href: '/#team' },
    // { name: 'Blog', href: '/blog' },
    { name: 'Reviews', href: '/#reviews' },
    // { name: 'Contact', href: '/#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/intrinsic-labs', icon: <FiGithub size={20} /> },
    { name: 'Twitter', href: 'https://twitter.com/intrinsic_labs', icon: <FiTwitter size={20} /> },
    { name: 'Instagram', href: 'https://instagram.com/intrinsiclabs', icon: <FiInstagram size={20} /> },
  ];

  // Apply different background styles based on isDarkTheme
  const headerClass = isDarkTheme
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background py-4`
    : `fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background py-4`;

  // Apply different mobile menu styles based on isDarkTheme
  const mobileMenuClass = isDarkTheme
    ? "md:hidden bg-background fixed left-0 right-0 z-50 overflow-y-auto"
    : "md:hidden bg-background fixed left-0 right-0 z-50 overflow-y-auto";

  // Text colors for links based on theme
  const linkClass = isDarkTheme
    ? "text-md hover:text-accent hover:font-medium transition-colors duration-300 tracking-wide text-white"
    : "text-md hover:text-accent hover:font-medium transition-colors duration-300 tracking-wide";

  return (
    <header className={headerClass}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="logo-text text-xl font-bold tracking-tighter overflow-hidden relative"
          >
            {isScrolled ? (
              <span
                className="flex items-center"
              >
                <Image
                  src={isDarkTheme ? "/images/logo/nav_collapsed_white.svg" : "/images/logo/nav_collapsed_black.svg"}
                  alt="Intrinsic Labs Logo"
                  width={56}
                  height={30}
                  className="mr-2"
                />
              </span>
            ) : (
              <span
                className="flex items-center"
              >
                <Image
                  src={isDarkTheme ? "/images/logo/nav_white.svg" : "/images/logo/nav_black.svg"}
                  alt="Intrinsic Labs Logo"
                  width={200}
                  height={30}
                  className="mr-2"
                />
              </span>
            )}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <div
              key={link.name}
              className=""
            >
              <Link
                href={link.href}
                className={linkClass}
              >
                {link.name}
              </Link>
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-secondary-800 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={mobileMenuClass}
        >
          <div className="container-custom flex-col justify-between min-h-screen">
            <div className="flex flex-col pt-8">
              {navLinks.map((link, index) => (
                <div key={link.name} className="group">
                  <Link
                    href={link.href}
                    className={isDarkTheme
                      ? "text-3xl hover:text-accent hover:font-bold transition-colors duration-300 py-4 pl-4 block text-white"
                      : "text-3xl hover:text-accent hover:font-bold transition-colors duration-300 py-4 pl-4 block"
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {index !== navLinks.length - 1 && (
                    <div className="border-b border-primary/20 hover:border-primary/30 transition-colors duration-300 mx-4"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <div className="flex justify-center space-x-6 py-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={isDarkTheme
                      ? "w-10 h-10 rounded-full bg-primary/10 hover:bg-accent hover:text-secondary transition-colors duration-300 flex items-center justify-center text-white"
                      : "w-10 h-10 rounded-full bg-primary/10 hover:bg-accent hover:text-secondary transition-colors duration-300 flex items-center justify-center text-neutral-800"
                    }
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation; 