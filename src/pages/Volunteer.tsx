import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, User, Phone, Mail, Sparkles, Calendar, Target, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Volunteer() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    skills: "",
    availability: [] as string[],
    motivation: "",
    role: "Event Coordination",
  });

  const roles = [
    "Event Coordination",
    "Social Media Management",
    "Content Creation",
    "Outreach / Community Engagement"
  ];

  const availabilityOptions = ["Weekdays", "Weekends", "Remote", "In-person Events"];

  const handleCheckbox = (option: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter(item => item !== option)
        : [...prev.availability, option]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, "volunteers"), {
        ...formData,
        createdAt: Date.now()
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after success
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/conference'); // redirect to conference page
      }, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setIsSubmitting(false);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Volunteer</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join our network of passionate individuals making a real impact. 
            Fill out the form below and we'll connect you with the right opportunities.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass p-12 rounded-3xl text-center flex flex-col items-center justify-center min-h-[400px]"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Application Received!</h2>
              <p className="text-gray-400 max-w-sm mb-6">
                Thank you, {formData.fullName}. Your volunteer application has been saved successfully.
              </p>
              <p className="text-sm text-purple-400">Redirecting to conference page...</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="glass-card"
            >
              <div className="p-8 md:p-10 border-b border-[rgba(255,255,255,0.05)]">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-[#6366f1]" /> Apply to Volunteer
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Personal Info */}
                  <div className="space-y-6">
                    <div>
                      <label className="input-label">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="input-field"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="input-label">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        className="input-field"
                        placeholder="0598..."
                      />
                    </div>

                    <div>
                      <label className="input-label">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="input-field"
                        placeholder="joyouth.org.gh@gmail.com"
                      />
                    </div>
                  </div>

                  {/* Role & Skills */}
                  <div className="space-y-6">
                    <div>
                      <label className="input-label">Role Choice</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="input-field"
                      >
                        {roles.map(role => (
                          <option key={role} value={role} className="bg-[#0f172a] text-white py-2">{role}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="input-label">Availability</label>
                      <div className="grid grid-cols-2 gap-3">
                        {availabilityOptions.map(option => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] transition-all">
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={formData.availability.includes(option)}
                              onChange={() => {
                                const newOptions = formData.availability.includes(option)
                                  ? formData.availability.filter(o => o !== option)
                                  : [...formData.availability, option];
                                setFormData({...formData, availability: newOptions});
                              }}
                            />
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              formData.availability.includes(option) ? "bg-[#6366f1] border-[#6366f1]" : "border-gray-500"
                            }`}>
                              {formData.availability.includes(option) && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-sm text-text-muted">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="input-label">Key Skills</label>
                      <textarea 
                        required
                        value={formData.skills}
                        onChange={(e) => setFormData({...formData, skills: e.target.value})}
                        className="input-field min-h-[80px]"
                        placeholder="Photography, Graphic Design, Public Speaking..."
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <label className="input-label">Why do you want to join us?</label>
                  <textarea 
                    required
                    value={formData.motivation}
                    onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                    className="input-field min-h-[120px]"
                    placeholder="Share your motivation..."
                  />
                </div>
              </div>
              <div className="p-8 md:p-10 bg-[rgba(0,0,0,0.2)]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full md:w-auto md:min-w-[240px] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
