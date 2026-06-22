import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import { useStore } from "@/store/useStore";
import { Link } from "react-router-dom";

export default function Navigation() {
  const currentUser = useStore(state => state.currentUser);
  const logout = useStore(state => state.logout);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "首页", href: "#home" },
    { name: "关于", href: "#about" },
    { name: "作品", href: "#projects" },
    { name: "联系", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="#home" className="text-xl font-medium tracking-tight hover:opacity-80 transition-opacity">
            {currentUser}
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs font-medium opacity-50 hover:opacity-100 hover:text-red-400 transition-all bg-current/5 px-3 py-1.5 rounded-full"
            title="退出当前账号"
          >
            <LogOut size={14} />
            <span className="hidden md:inline">退出登录</span>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden opacity-80 hover:opacity-100 transition-opacity"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-full left-0 w-full bg-[var(--theme-bg)]/95 backdrop-blur-2xl overflow-hidden border-t border-current/10"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 pb-20">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1, duration: 0.4 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium opacity-80 hover:opacity-100 transition-opacity"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
