"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { fallbackNavbar } from "@/lib/data/fallback";
import { getNavbarConfig } from "@/lib/supabase/userEndpoints";
import { usePathname } from "next/navigation";
import { ColorToggle, ModeToggle } from "@/components/providers/theme-switcher";

export function UserNavbar() {
  const [config, setConfig] = useState(fallbackNavbar);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // useEffect(() => {
  //   getNavbarConfig().then(setConfig);
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.nav
        initial={{
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(255, 255, 255, 0)",
        }}
        animate={{
          backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
        }}
        transition={{ duration: 0.3 }}
        className={`${isScrolled ? "shadow-md" : ""} px-4 sm:px-6 lg:px-8 backdrop-blur-lg`}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <motion.span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" whileHover={{ scale: 1.05 }}>
                <Image alt="888" width={50} height={50} className="rounded-full" src="/core/888.png" />
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {config.menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.name} href={item.path} className={`relative text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-gray-500 hover:text-primary"}`}>
                  <motion.span whileHover={{ scale: 1.05 }}>{item.name}</motion.span>
                  {isActive && <motion.div className="absolute -bottom-1 left-0 h-0.5 bg-primary" layoutId="navbar-underline" transition={{ duration: 0.3 }} />}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            <ColorToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-background/80 backdrop-blur-lg rounded-lg mt-2 shadow-lg"
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {config.menuItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive ? "text-primary bg-primary/10" : "text-gray-600 hover:text-primary hover:bg-primary/5"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* Mobile Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <ModeToggle />
                  <ColorToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
