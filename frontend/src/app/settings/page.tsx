'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Settings, HelpCircle, Phone, FileText, User, Lock, Globe, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    password: '',
    confirmPassword: '',
    country: 'United States',
    language: 'English'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('Profile settings updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'Settings', icon: <Settings size={18} /> },
    { id: 'help', label: 'Help Option', icon: <HelpCircle size={18} /> },
    { id: 'contact', label: 'Contact Info', icon: <Phone size={18} /> },
    { id: 'terms', label: 'Terms & Conditions', icon: <FileText size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text pt-28 px-6 pb-12 overflow-hidden transition-all duration-300">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-theme-card border border-theme-border rounded-2xl shadow-md p-4 sticky top-28">
            <h3 className="text-xs font-black text-theme-text-muted uppercase tracking-widest mb-4 px-4">User Panel</h3>
            <nav className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-theme-accent text-white shadow-md shadow-theme-accent/20'
                      : 'text-theme-text hover:bg-theme-bg'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-theme-card border border-theme-border rounded-3xl shadow-md p-8"
            >
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-black text-theme-text mb-6 flex items-center gap-2">
                    <User className="text-theme-accent" /> Profile Settings
                  </h2>
                  
                  {successMsg && (
                    <div className="mb-6 p-4 bg-theme-success/10 text-theme-success rounded-xl border border-theme-success/20 flex items-center gap-2 font-bold text-sm">
                      <CheckCircle size={18} /> {successMsg}
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-theme-text-muted">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-theme-bg border border-theme-border rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-theme-accent transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-theme-text-muted">Country</label>
                        <select 
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full bg-theme-bg border border-theme-border rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-theme-accent transition-colors appearance-none"
                        >
                          <option>United States</option>
                          <option>United Kingdom</option>
                          <option>Canada</option>
                          <option>Australia</option>
                          <option>India</option>
                          <option>Germany</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-theme-text-muted">Primary Language</label>
                        <select 
                          name="language"
                          value={formData.language}
                          onChange={handleChange}
                          className="w-full bg-theme-bg border border-theme-border rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-theme-accent transition-colors appearance-none"
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Hindi</option>
                          <option>Mandarin</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-theme-border">
                      <h3 className="text-lg font-bold text-theme-text mb-4 flex items-center gap-2">
                        <Lock size={18} className="text-theme-text-muted" /> Change Password
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-theme-text-muted">New Password</label>
                          <input 
                            type="password" 
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-theme-bg border border-theme-border rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-theme-accent transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-theme-text-muted">Confirm Password</label>
                          <input 
                            type="password" 
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-theme-bg border border-theme-border rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-theme-accent transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button 
                        type="submit"
                        className="bg-theme-accent text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-theme-accent/20"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'help' && (
                <div>
                  <h2 className="text-2xl font-black text-theme-text mb-6 flex items-center gap-2">
                    <HelpCircle className="text-theme-accent-sec" /> Help Option
                  </h2>
                  <div className="space-y-4 text-theme-text-muted text-sm leading-relaxed">
                    <p>
                      Welcome to the AI Job Portal help center. Here you can find answers to frequently asked questions
                      and learn how to make the most out of our advanced career platform.
                    </p>
                    <div className="bg-theme-bg p-6 rounded-2xl border border-theme-border mt-4">
                      <h4 className="font-bold text-theme-text mb-2 text-base">How to optimize your ATS Score?</h4>
                      <p>Go to your dashboard, upload your resume as a PDF, and paste the job description you are aiming for. The AI will analyze missing keywords and suggest an optimized version of your CV.</p>
                    </div>
                    <div className="bg-theme-bg p-6 rounded-2xl border border-theme-border">
                      <h4 className="font-bold text-theme-text mb-2 text-base">How to use the Mock Interview?</h4>
                      <p>Navigate to the Mock Interview page. You can either type your answers or use voice input to respond to AI-generated interview questions based on your profile.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div>
                  <h2 className="text-2xl font-black text-theme-text mb-6 flex items-center gap-2">
                    <Phone className="text-theme-success" /> Contact Information
                  </h2>
                  <div className="space-y-6">
                    <p className="text-sm text-theme-text-muted">
                      Have a question or need further assistance? Feel free to reach out to our support team. We are available 24/7.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-theme-bg border border-theme-border p-5 rounded-2xl">
                        <p className="text-xs font-bold text-theme-text-muted uppercase tracking-wider mb-1">Email Support</p>
                        <p className="text-theme-text font-bold">support@aijobportal.com</p>
                      </div>
                      <div className="bg-theme-bg border border-theme-border p-5 rounded-2xl">
                        <p className="text-xs font-bold text-theme-text-muted uppercase tracking-wider mb-1">Phone Support</p>
                        <p className="text-theme-text font-bold">+1 (800) 123-4567</p>
                      </div>
                    </div>
                    <div className="bg-theme-bg border border-theme-border p-6 rounded-2xl">
                      <h4 className="font-bold text-theme-text mb-4 text-sm">Send us a message</h4>
                      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <textarea rows={4} placeholder="How can we help you?" className="w-full bg-theme-card border border-theme-border rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-theme-accent transition-colors"></textarea>
                        <button className="bg-theme-success text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-theme-success/20">Send Message</button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'terms' && (
                <div>
                  <h2 className="text-2xl font-black text-theme-text mb-6 flex items-center gap-2">
                    <FileText className="text-theme-text-muted" /> Terms & Conditions
                  </h2>
                  <div className="space-y-6 text-sm text-theme-text-muted leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    <p>
                      <strong>1. Acceptance of Terms:</strong> By accessing and using the AI Job Portal, you agree to be bound by these Terms and Conditions.
                    </p>
                    <p>
                      <strong>2. User Accounts:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                    </p>
                    <p>
                      <strong>3. Privacy Policy:</strong> Your privacy is important to us. We will not share your personal information or uploaded resumes with third parties without your explicit consent.
                    </p>
                    <p>
                      <strong>4. AI-Generated Content:</strong> The AI features (resume parsing, matching, and cover letter generation) are provided "as is". We do not guarantee 100% accuracy in ATS score predictions or job matches.
                    </p>
                    <p>
                      <strong>5. Prohibited Activities:</strong> Users must not upload malicious files, spam job applications, or attempt to reverse engineer the AI service algorithms.
                    </p>
                    <p>
                      <strong>6. Modifications:</strong> We reserve the right to modify these terms at any time. Continued use of the platform implies acceptance of any changes.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
