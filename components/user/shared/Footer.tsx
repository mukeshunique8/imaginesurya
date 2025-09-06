"use client";
import React, { useState, useEffect } from "react";
import { Twitter, Instagram, Facebook, Youtube, Heart, ArrowUp, Mail, Phone, MapPin, Star } from "lucide-react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { fallbackNavbar } from "@/lib/data/fallback";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";

// Dynamic data configuration (can be moved to a separate file)
const FOOTER_CONFIG = {
  brand: {
    name: "Imagine Surya",
    logo: "/core/888.png",
    url: "https://www.imaginesuryaa.com/",
  },
  links: fallbackNavbar.menuItems,
  socialLinks: [
    { id: 1, icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { id: 2, icon: Instagram, href: "https://www.instagram.com/imaginesuryaa", color: "hover:text-pink-500" },
    { id: 3, icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { id: 4, icon: Youtube, href: "https://www.youtube.com/@imaginesuryaa", color: "hover:text-red-600" },
    {
      id: 5,
      icon: Star,
      href: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3bacc976cb2e46f3:0xf83177cdb19839af!12e1?source=g.page.m.kd._&laa=lu-desktop-review-solicitation",
      color: "hover:text-blue-600",
    },
  ],
  contactInfo: [
    { id: 1, icon: Mail, text: "imaginesuryaa@gmail.com" },
    { id: 2, icon: Phone, text: "+91 95665 53323" },
    { id: 3, icon: MapPin, text: "Periyar Street, KilPennathur, Tamil Nadu 604601" },
  ],
  copyright: {
    text: "Imagine Suryaa. All rights reserved.",
    madeBy: {
      text: "Made with",
      author: "mukesh888",
      url: "https://mukesh888.vercel.app/",
    },
  },
};

// You can fetch this data from an API and use this as fallback
const useFooterData = () => {
  const [data, setData] = useState(FOOTER_CONFIG);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate API fetch - replace with your actual API call
    const fetchFooterData = async () => {
      setLoading(true);
      try {
        // const response = await fetch('your-api-endpoint');
        // const apiData = await response.json();
        // setData(apiData);

        // For demo purposes, we'll use a timeout to simulate network request
        setTimeout(() => {
          // If you want to use API data, uncomment the line below
          // setData(apiData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch footer data, using fallback:", error);
        setLoading(false);
        // Keep the fallback data if API fails
      }
    };

    fetchFooterData();
  }, []);

  return { data, loading };
};

export default function UserFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const { data, loading } = useFooterData();

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (loading) {
    return (
      <footer className="w-full py-14 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center py-10">
            <div className="animate-pulse">Loading footer...</div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full py-10 border-t relative overflow-hidden ">
      <BackgroundBeams />
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary rounded-full opacity-10 animate-pulse" data-aos="zoom-in" data-aos-delay="100"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary rounded-full opacity-10 animate-pulse delay-700" data-aos="zoom-in" data-aos-delay="300"></div>
      </div> */}

      <div className="mx-auto  px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Logo/Brand */}
          <div className="flex justify-center transform transition-all duration-500 hover:scale-105" data-aos="fade-down">
            <a href={data.brand.url} className="flex items-center space-x-2 group">
              <Image src={data.brand.logo} alt={data.brand.name} width={40} height={40} className="rounded-lg" data-aos="fade-right" data-aos-delay="200" />
              <span className="text-2xl font-bold text-primary" data-aos="fade-left" data-aos-delay="300">
                {data.brand.name}
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <ul className="text-lg flex flex-wrap items-center justify-center gap-6 md:gap-10 transition-all duration-500 py-12 mb-8 border-b border-gray-200" data-aos="fade-up" data-aos-delay="400">
            {data.links.map((link, index) => (
              <li key={link.name} className="relative group" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                <a href={link.path} className=" transition-colors duration-300 relative block py-1">
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" data-aos="fade-up" data-aos-delay="500">
            {data.contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="flex items-center justify-start md:justify-start space-x-3  transition-colors duration-300" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
                  <IconComponent size={18} className="text-primary flex-shrink-0" />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-10" data-aos="fade-up" data-aos-delay="600">
            {data.socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-12 h-12 rounded-full  shadow-md  transition-all duration-300 ${social.color} hover:shadow-lg transform hover:-translate-y-1`}
                  data-aos="zoom-in"
                  data-aos-delay={100 * (index + 1)}
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center" data-aos="fade-up" data-aos-delay="700">
            <span className="text-gray-500 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-1">
              <span>
                © {currentYear} {data.copyright.text}
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center">
                {data.copyright.madeBy.text} <Heart size={16} className="text-red-500 mx-1" /> by
                <a href={data.copyright.madeBy.url} className="text-primary hover:text-secondary ml-1 transition-colors duration-300">
                  {data.copyright.madeBy.author}
                </a>
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-secondary hover:shadow-xl z-50 animate-bounce"
          aria-label="Scroll to top"
          data-aos="zoom-in"
          data-aos-delay="800"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </footer>
  );
}
