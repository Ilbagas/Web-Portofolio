import { useState, useEffect } from "react";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setActive(true);
      } else {
        setActive(false);
      }
      
      // Deteksi section aktif berdasarkan scroll position
      const sections = ["beranda", "tentang", "proyek", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          active ? "bg-white/95 backdrop-blur-sm shadow-lg py-2" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("beranda")}
            className={`text-3xl font-bold relative inline-block transition-colors duration-300 ${
              active ? "text-black" : "text-white"
            }`}
          >
            {/* Desktop Style */}
            <span className="hidden md:inline">Portofolio</span>
            {/* Mobile Style dengan shape lebih besar */}
            <span
              className="md:hidden relative z-10 px-3 py-1.5 rounded-xl text-lg transition-all duration-300"
              style={{
                background: active ? "#f3f4f6" : "rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              Portofolio
            </span>
          </button>

          {/* Menu Desktop */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {["beranda", "tentang", "proyek", "contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`relative px-4 py-2 text-lg font-medium rounded-lg transition-colors duration-300 ${
                      active 
                        ? currentSection === item 
                          ? "text-purple-600 bg-purple-50" 
                          : "text-gray-700 hover:text-purple-600 hover:bg-gray-100"
                        : currentSection === item 
                          ? "text-white bg-white/20" 
                          : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                    {currentSection === item && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-purple-500 rounded-full"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Menu HP (Hamburger) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden text-2xl p-2 rounded-lg transition-colors duration-300 ${
              active 
                ? "text-gray-700 hover:bg-black-100" 
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 text-2xl p-2"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-3">
              {["beranda", "tentang", "proyek", "contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`w-full text-left px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-300 ${
                      currentSection === item
                        ? "bg-purple-50 text-purple-600 border-l-4 border-purple-500"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay untuk mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;