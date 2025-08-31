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
      
      // Detect active section based on scroll position
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

  // Mapping section IDs to English labels
  const sectionLabels = {
    beranda: "Home",
    tentang: "About",
    proyek: "Projects",
    contact: "Contact"
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
            <span className="hidden md:inline">Portfolio</span>
            {/* Mobile Style with larger shape */}
            <span
              className="md:hidden relative z-10 px-3 py-1.5 rounded-xl text-lg transition-all duration-300"
              style={{
                background: active ? "#f3f4f6" : "rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              Portfolio
            </span>
          </button>
          
          {/* Desktop Menu */}
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
                    {sectionLabels[item]}
                    {currentSection === item && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-purple-500 rounded-full"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
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
                    {sectionLabels[item]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors duration-300">
                GitHub
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors duration-300">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors duration-300">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
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