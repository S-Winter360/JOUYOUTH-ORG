import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Calendar, MapPin, Clock, ArrowRight, User, Mail, Phone, Heart } from "lucide-react";
import { differenceInSeconds } from "date-fns";

export default function Conference() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const targetDate = new Date("2026-10-15T09:00:00Z");

  useEffect(() => {
    const calcTime = () => {
      const now = new Date();
      const diffInSeconds = differenceInSeconds(targetDate, now);
      
      if (diffInSeconds <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      setTimeLeft({
        days: Math.floor(diffInSeconds / (3600 * 24)),
        hours: Math.floor((diffInSeconds % (3600 * 24)) / 3600),
        minutes: Math.floor((diffInSeconds % 3600) / 60),
        seconds: diffInSeconds % 60,
      });
    };
    
    calcTime();
    const interval = setInterval(calcTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const GALLERY = [
    "https://i.pinimg.com/736x/5a/d5/b0/5ad5b0c4c856fb6ec23b32669c073f55.jpg",
    "https://i.pinimg.com/736x/8a/c5/a9/8ac5a9babd0f1bc7b120fe5496b18fbb.jpg",
    "https://i.pinimg.com/736x/22/6c/7b/226c7b901b8d92b3f3890e8c3878dc01.jpg"
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Event Header */}
      <section className="container mx-auto px-4 md:px-8 mb-20 text-center max-w-4xl pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[rgba(99,102,241,0.2)] text-[#818cf8] text-[11px] font-bold uppercase tracking-widest mb-6">
          <Calendar className="w-4 h-4" /> Annual Event
        </div>
        <h1 className="text-4xl md:text-[56px] font-extrabold mb-6 tracking-tight leading-[1.1]">
          Annual Technocrats <br className="hidden md:block" /><span className="text-[#a855f7]">Conference</span>
        </h1>
        <p className="text-lg text-text-muted mb-10 max-w-[500px] mx-auto leading-relaxed">
          Join thought leaders, innovators, and youth advocates as we discuss 
          the future of community empowerment through technology and bold ideas.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 text-gray-300 mb-12">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5 text-[#6366f1]" /> Oct 15, 2026
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-[#6366f1]" /> 09:00 AM - 05:00 PM
          </div>
          <div className="flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 text-[#6366f1]" /> Convention Center, Accra
          </div>
        </div>

        {/* Countdown */}
        <div className="flex justify-center gap-4 md:gap-8 mb-12">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map(unit => (
            <div key={unit.label} className="glass-card w-20 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center rounded-2xl border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-3xl md:text-5xl font-mono font-bold mb-1">{unit.value.toString().padStart(2, '0')}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400">{unit.label}</span>
            </div>
          ))}
        </div>

        <Link
          to="/volunteer"
          className="btn-primary inline-flex items-center justify-center gap-2 mt-4"
        >
          Register Now <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Dynamic Registered Participants */}
      <section className="bg-[rgba(255,255,255,0.02)] py-20 border-y border-[rgba(255,255,255,0.05)] relative z-10" id="call-to-action">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <Heart className="w-12 h-12 text-[#a855f7] mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold mb-4">We're Looking for Leaders</h2>
          <p className="text-text-muted max-w-2xl mx-auto mb-8">
            Volunteering at the Joyouth conference gives you front-row access to thought leaders, organizers, and networking opportunities. Ready to make a real impact?
          </p>
          <Link
            to="/volunteer"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            Join Our Volunteer Team <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-left mb-16">
            <h2 className="text-3xl font-extrabold mb-4">Previous <span className="text-[#6366f1]">Highlights</span></h2>
            <p className="text-text-muted">Moments from our previous technocrat gatherings.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {GALLERY.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden glass border border-glass-border aspect-video group cursor-pointer"
              >
                <img 
                  src={img} 
                  alt="Gallery Item" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
