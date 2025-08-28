import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import DataImage from "./data";

function App() {
  const [activeSection, setActiveSection] = useState("beranda");

  // 🎵 state untuk player
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // update progress bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  // ============ DETEKSI SECTION AKTIF SAAT SCROLL ============
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["beranda", "tentang", "proyek", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black overflow-x-hidden">
      <Navbar />

      {/* ============ HERO SECTION ============ */}
      <section
        id="beranda"
        className="w-full min-h-screen bg-black flex items-center relative overflow-hidden"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* KONTEN KIRI */}
            <div className="text-white order-2 lg:order-1">
              {/* Badge status */}
              <div className="flex items-center gap-3 mb-6 bg-gray-900/70 backdrop-blur-sm w-fit p-4 rounded-2xl border border-gray-800 shadow-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-300">
                  Available for new projects
                </span>
              </div>

              {/* Heading */}
              <p className="text-gray-400 mb-2">Halo, I'm</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Ilham Bagaskara
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-6 flex items-center gap-3">
                <span className="inline-block w-1 h-8 bg-purple-500 rounded-full"></span>
                AI Developer
                <span className="inline-block w-1 h-8 bg-purple-500 rounded-full"></span>
                Web Developer
              </h2>

              {/* Deskripsi */}
              <p className="text-gray-400 mb-8 max-w-lg text-lg">
                A dedicated student of Information Systems at Telkom
                University, focusing on the dynamic field of Artificial
                Intelligence development. My academic journey is centered on
                leveraging data and algorithms to build intelligent systems that
                solve real-world problems.
              </p>

              {/* Tombol CTA */}
              <div className="flex flex-wrap gap-4 mb-12">
                <a
                  href="#tentang"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 font-semibold py-3 px-8 rounded-xl transition duration-300 shadow-lg shadow-purple-500/20"
                >
                  About Me?
                </a>
              </div>

              {/* Media Sosial */}
              <div className="flex gap-6">
                <a
                  href="https://www.linkedin.com/in/ilham-bagaskara-26583b2b2/"
                  className="text-gray-400 hover:text-white transition duration-300 p-2 rounded-full hover:bg-gray-900/50"
                >
                  <img
                    src="/tools/linkedins.png"
                    alt="linkedin"
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300 p-2 rounded-full hover:bg-gray-900/50"
                >
                  <img
                    src="/tools/github.png"
                    alt="github"
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://www.instagram.com/ilbagas_/"
                  className="text-gray-400 hover:text-white transition duration-300 p-2 rounded-full hover:bg-gray-900/50"
                >
                  <img
                    src="/tools/Instagram_logo.png"
                    alt="instagram"
                    className="w-6 h-6"
                  />
                </a>
              </div>
            </div>

            {/* KONTEN KANAN */}
            <div className="order-1 lg:order-2 flex flex-col items-center justify-center">
              {/* Foto profil */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl blur-md opacity-70 animate-pulse"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-gray-800 shadow-2xl">
                  <img
                    src="/tools/powerpuffs.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Elemen dekoratif */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30 flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
              </div>

              {/* 🎵 Card Lagu Interaktif */}
              <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-lg w-72 mt-2">
                <div className="flex items-center gap-4 p-4">
                  <img
                    src="/tools/supernatural.jpg"
                    alt="Album Cover"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm">
                      Supernatural
                    </h4>
                    <p className="text-gray-400 text-xs">NewJeans</p>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  {/* Progress bar */}
                  <div className="w-full bg-gray-700 h-1.5 rounded-full mb-2">
                    <div
                      className="bg-purple-500 h-1.5 rounded-full transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  {/* Control button */}
                  <div className="flex items-center justify-center gap-6 text-gray-400">
                    <button className="hover:text-white">⏮️</button>
                    <button
                      onClick={togglePlay}
                      className="text-2xl hover:text-white"
                    >
                      {isPlaying ? "⏸️" : "▶️"}
                    </button>
                    <button className="hover:text-white">⏭️</button>
                  </div>

                  {/* Audio element */}
                  <audio ref={audioRef} src="/tools/NJ.mp3" autoPlay ></audio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============ TENTANG SECTION ============ */}
      <section id="tentang" className="w-full bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">My Journey</h3>
              <p className="text-gray-400 mb-6">
                I'm an Information Systems student at Telkom University with a growing passion for Artificial Intelligence. While my studies have provided a solid foundation, my current focus is on a specialized field: private AI development. This journey is all about building intelligent systems that prioritize user privacy and data security by operating locally on personal devices. My goal is to create innovative and secure AI solutions that empower users without compromising their data.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-purple-400 font-semibold">2+</h4>
                  <p className="text-gray-400">Years Experience</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <span>🚀</span> Skill
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">AI Development</span>
                    <span className="text-gray-400">90%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">React.js</span>
                    <span className="text-gray-400">80%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Public Speaking</span>
                    <span className="text-gray-400">85%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Time Management</span>
                    <span className="text-gray-400">90%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-cyan-300 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Collaboration</span>
                    <span className="text-gray-400">87%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROYEK SECTION ============ */}
      <section id="proyek" className="w-full bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Project</h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
          </div>
          
          {/* Tambahkan justify-center dan items-center di sini */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {/* Kartu proyek 1 */}
              <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-300">
                <div className="h-48 bg-gradient-to-r from-purple-600 to-indigo-600">
                  <img src="/tools/privateAI.jpg" alt="privateAI" className="h-61" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Private AI</h3>
                  <p className="text-gray-400 mb-4">A private AI for the Academic Services Unit, built to instantly answer student questions about their faculty.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">Ollama</span>
                    <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">Node.js</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="text-purple-400 hover:text-purple-300">
                      <span className="text-xs px-2 py-1 bg-green-600 text-white rounded-full">On Progress</span>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Kartu proyek 2 */}
              <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-300">
                <div className="h-48 bg-gradient-to-r from-blue-600 to-cyan-600">
                  <img src="/tools/mockup.png" alt="mockup-web" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Portofolio Website</h3>
                  <p className="text-gray-400 mb-4">A digital portfolio showcasing my skills, projects, and professional experience.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">Vue.js</span>
                    <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">Firebase</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="text-purple-400 hover:text-purple-300">
                      <span className="text-lg">🔗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-gray-600 to-white text-black hover:from-purple-700 hover:to-indigo-700 font-semibold py-3 px-8 rounded-xl transition duration-300 shadow-lg shadow-purple-500/20">
              Lihat Semua Proyek
            </button>
          </div>
        </div>
      </section>

      {/* ============ KONTAK SECTION ============ */}
      <section id="contact" className="w-full bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Me</h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              I am always open to discussing new projects, creative ideas, or opportunities to be a part of your vision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-900/30 p-3 rounded-lg">
                    <span className="text-purple-400 text-xl">✉️</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Email</h4>
                    <p className="text-gray-400">IBagas63@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-900/30 p-3 rounded-lg">
                    <span className="text-purple-400 text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Phone</h4>
                    <p className="text-gray-400">+62 813 9285 8315</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-900/30 p-3 rounded-lg">
                    <span className="text-purple-400 text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Location</h4>
                    <p className="text-gray-400">Bandung, Indonesia</p>
                    <p className="text-gray-400">Surakarta, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Send Message</h3>
              
              <form className="space-y-4" action="https://formsubmit.co/IBagas63@gmail.com" method="POST">
                <div>
                  <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
                  <input type="text" id="name" name="name" 
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white 
                              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your Name" required />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                  <input type="email" id="email" name="email" 
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white 
                              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="email@example.com" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-400 mb-2">Message</label>
                  <textarea id="message" name="message" rows="4" 
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white 
                              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your message here..." required></textarea>
                </div>
                
                <button type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white 
                            hover:from-purple-700 hover:to-indigo-700 font-semibold py-3 px-8 
                            rounded-xl transition duration-300 shadow-lg shadow-purple-500/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="w-full bg-black border-t border-gray-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white">Portofolio</h2>
              <p className="text-gray-400 mt-2">© {new Date().getFullYear()} Ilham Bagaskara. All rights reserved.</p>
            </div>
            
              <div className="flex gap-6">
                <a href="https://www.linkedin.com/in/ilham-bagaskara-26583b2b2/" className="text-gray-400 hover:text-white transition duration-300 p-2 rounded-full hover:bg-gray-900/50">
                  <span className="text-xl"><img src="/tools/linkedins.png" alt="linkedin" className="w-6 h-6" /></span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300 p-2 rounded-full hover:bg-gray-900/50">
                  <span className="text-xl"><img src="/tools/github.png" alt="github" className="w-6 h-6" /></span>
                </a>
                <a href="https://www.instagram.com/ilbagas_/" className="text-gray-400 hover:text-white transition duration-300 p-2 rounded-full hover:bg-gray-900/50">
                  <span className="text-xl"><img src="/tools/Instagram_logo.png" alt="instagram" className="w-6 h-6" /></span>
                </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;