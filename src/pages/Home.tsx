import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Users, CheckCircle, Calendar, Lightbulb, TrendingUp, HandHeart, Link2 } from "lucide-react";

const IMAGES = [
  "https://i.pinimg.com/1200x/ff/85/41/ff85411d52ee81c3e5ea6570298af522.jpg",
  "https://i.pinimg.com/1200x/f1/6f/05/f16f05ae4d46ec681e62c208057abffc.jpg",
  "https://i.pinimg.com/1200x/d4/d4/ae/d4d4ae05805c59477bddb3351f23dc49.jpg"
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        {/* Animated Background Slider */}
        {IMAGES.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt="Hero Background"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentImage ? 0.2 : 0,
              scale: index === currentImage ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
        ))}

        <div className="container relative z-10 mx-auto px-4 lg:px-16 mt-10">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-center">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-3 py-1.5 rounded-md bg-[rgba(99,102,241,0.2)] text-[#818cf8] text-[11px] font-bold uppercase tracking-widest mb-6">
                Empowering Tomorrow's Leaders
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-[56px] font-extrabold mb-6 tracking-tight leading-[1.1]">
                Empowering Youth,<br />
                Transforming<br />
                <span className="text-[#a855f7]">Communities.</span>
              </h1>
              <p className="text-lg text-text-muted mb-10 max-w-[500px] leading-relaxed">
                Join Norlin and the Joyouth team in creating sustainable impacts through mentorship, technology, and community development across Ghana.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
                <Link
                  to="/volunteer"
                  className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  Volunteer Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="btn-primary w-full sm:w-auto !bg-transparent !bg-none border border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.05)]"
                >
                  Learn More
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-5">
                {[
                  { label: "Youth Empowered", value: "1.2k+" },
                  { label: "Projects Done", value: "48" },
                  { label: "Partners", value: "15" },
                ].map((stat, i) => (
                  <div key={i} className="stat-card">
                    <span className="block text-[28px] font-bold text-[#6366f1] leading-tight mb-1">{stat.value}</span>
                    <span className="text-xs uppercase tracking-widest text-text-muted">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side Empty or Images (matching grid layout) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative h-full min-h-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6366f1]/20 to-[#a855f7]/20 rounded-3xl blur-3xl opacity-50" />
              <img 
                src="https://i.pinimg.com/736x/ab/62/de/ab62ded6fb63594397bf43cf4186795a.jpg" 
                alt="Joyouth Empowering" 
                className="relative z-10 w-full h-full object-cover rounded-3xl border border-[rgba(255,255,255,0.15)] shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative z-10" id="about">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-[40px] font-extrabold mb-6 tracking-tight leading-tight">
                Our <span className="text-[#a855f7]">Mission</span> & Vision
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-6">
                Joyouth represents a new era of youth empowerment. We combine modern technology, 
                innovative thinking, and deep community roots to create sustainable change.
              </p>
              
              <div className="grid grid-cols-2 gap-5 mt-12">
                {[
                  { icon: Users, label: "Youth Empowered", value: "5,000+", bg: "https://i.pinimg.com/736x/ab/62/de/ab62ded6fb63594397bf43cf4186795a.jpg" },
                  { icon: CheckCircle, label: "Projects Completed", value: "120+", bg: "https://i.pinimg.com/736x/5a/d5/b0/5ad5b0c4c856fb6ec23b32669c073f55.jpg" },
                  { icon: Calendar, label: "Events Hosted", value: "85", bg: "https://i.pinimg.com/1200x/d4/d4/ae/d4d4ae05805c59477bddb3351f23dc49.jpg" },
                  { icon: Link2, label: "Active Partners", value: "24", bg: "https://i.pinimg.com/1200x/f1/6f/05/f16f05ae4d46ec681e62c208057abffc.jpg" }
                ].map((stat, i) => (
                  <div key={i} className="stat-card flex flex-col items-start text-left relative overflow-hidden group border-none p-0 min-h-[140px]">
                    <img src={stat.bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent" />
                    <div className="relative z-10 p-6 flex flex-col h-full justify-end w-full">
                      <stat.icon className="w-5 h-5 text-[#818cf8] mb-3 absolute top-6 right-6" />
                      <div className="text-2xl font-bold text-white mb-1 drop-shadow-md">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[3rem] blur-3xl" />
              <div className="relative glass p-2 rounded-[3rem] border border-white/10 max-w-sm mx-auto">
                <img 
                  src="/pic.png" 
                  alt="Founder Norbert (Norlin)" 
                  className="rounded-[2.5rem] w-full aspect-[4/5] object-cover"
                />
                
                {/* Founder Badge */}
                <div className="absolute -bottom-4 -left-2 md:-left-6 glass-card p-3 md:p-4 pr-5 md:pr-8 flex gap-3 md:gap-4 items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 border border-white/20">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="font-extrabold text-lg md:text-xl text-white">N</span>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#c084fc] font-bold mb-1">Founder</div>
                    <div className="text-xl md:text-2xl font-extrabold text-white tracking-tight drop-shadow-md leading-none">
                      Akanzagisi Norbert
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[rgba(255,255,255,0.02)] relative z-10 border-t border-[rgba(255,255,255,0.05)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-[40px] font-extrabold mb-6 tracking-tight">What We <span className="text-[#6366f1]">Do</span></h2>
            <p className="text-text-muted text-lg">Our core initiatives are designed to foster technical skills, personal growth, and community resilience.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Lightbulb, title: "Workshops & Training", desc: "Digital skills, entrepreneurship, and professional development.", bg: "https://i.pinimg.com/1200x/52/bb/42/52bb427da7cf7fec99beb21c82a55388.jpg" },
              { icon: Users, title: "Mentorship Services", desc: "1-on-1 guidance from industry professionals.", bg: "https://i.pinimg.com/736x/8a/c5/a9/8ac5a9babd0f1bc7b120fe5496b18fbb.jpg" },
              { icon: HandHeart, title: "Community Projects", desc: "Hands-on initiatives that improve local neighborhoods.", bg: "https://i.pinimg.com/736x/22/6c/7b/226c7b901b8d92b3f3890e8c3878dc01.jpg" },
              { icon: TrendingUp, title: "Networking Events", desc: "Connecting ambitious youth with leaders and opportunities.", bg: "https://i.pinimg.com/1200x/ff/85/41/ff85411d52ee81c3e5ea6570298af522.jpg" }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card group flex flex-col p-0 border-none relative overflow-hidden min-h-[320px]"
              >
                <img src={service.bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/70 to-[#0f172a]/10" />
                <div className="relative z-10 p-8 flex flex-col h-full justify-end">
                  <div className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:bg-[#a855f7]/60 transition-colors">
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white drop-shadow-md">{service.title}</h3>
                  <p className="text-gray-300 text-sm mb-6 flex-1 drop-shadow-sm">{service.desc}</p>
                  <Link to="/about" className="inline-flex items-center text-[13px] font-bold text-[#c084fc] hover:text-white group-hover:translate-x-2 transition-all uppercase tracking-wider drop-shadow-sm">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
