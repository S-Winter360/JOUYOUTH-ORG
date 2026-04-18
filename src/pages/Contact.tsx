import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: Date.now()
      });
      alert("Message sent successfully!");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 max-w-5xl min-h-[70vh]">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Get in <span className="text-[#a855f7]">Touch</span></h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          We would love to hear from you. Whether you have a question about our programs, 
          want to partner with us, or just want to say hi.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="glass-card p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#6366f1]/20 border border-[#6366f1]/30 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-[#6366f1]" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Email Us</h4>
              <p className="text-text-muted text-sm mb-2">For general inquiries and partnerships.</p>
              <a href="mailto:Joyouth.org.gh@gmail.com" className="text-[#6366f1] hover:underline">Joyouth.org.gh@gmail.com</a>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#a855f7]/20 border border-[#a855f7]/30 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-[#a855f7]" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Call Us</h4>
              <p className="text-text-muted text-sm mb-2">Mon-Fri from 9am to 6pm.</p>
              <a href="tel:0598286081" className="text-[#6366f1] hover:underline">0598 286 081</a>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#10b981]/20 border border-[#10b981]/30 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-6 h-6 text-[#10b981]" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">WhatsApp Community</h4>
              <p className="text-text-muted text-sm mb-3">Join our active group for live updates.</p>
              <a 
                href="https://chat.whatsapp.com/FZkk23I4cEz8s5SBrYklet?mode=gi_t" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 bg-[#10b981]/20 hover:bg-[#10b981]/30 border border-[#10b981]/50 text-[#10b981] rounded-lg transition-colors text-sm font-semibold"
              >
                Join Group
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-6 border-b border-[rgba(255,255,255,0.1)] pb-4">Send a Message</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="input-label">Your Name</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="input-field" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label className="input-label">Email Address</label>
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="input-field" 
                placeholder="john@example.com" 
              />
            </div>
            <div>
              <label className="input-label">Message</label>
              <textarea 
                required 
                rows={4} 
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="input-field max-h-[150px] min-h-[150px]" 
                placeholder="How can we help you?"
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-50">
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
