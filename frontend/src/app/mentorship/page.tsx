'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Star, Clock, Calendar, CheckCircle, Search, Video, X } from 'lucide-react';

const MOCK_MENTORS = [
  {
    id: 'm1',
    name: 'Sarah Jenkins',
    role: 'Senior Staff Engineer',
    company: 'Google',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.9,
    reviews: 124,
    skills: ['System Design', 'React', 'Career Advice'],
    availability: 'Next available: Tomorrow',
    price: 'Free'
  },
  {
    id: 'm2',
    name: 'David Chen',
    role: 'AI Research Scientist',
    company: 'OpenAI',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    rating: 5.0,
    reviews: 89,
    skills: ['Machine Learning', 'Python', 'Interview Prep'],
    availability: 'Next available: Thursday',
    price: '₹4,000/hr'
  },
  {
    id: 'm3',
    name: 'Elena Rodriguez',
    role: 'Engineering Manager',
    company: 'Stripe',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4.8,
    reviews: 210,
    skills: ['Leadership', 'Resume Review', 'Negotiation'],
    availability: 'Next available: Today',
    price: 'Free'
  },
  {
    id: 'm4',
    name: 'James Wilson',
    role: 'Principal Frontend Dev',
    company: 'Vercel',
    avatar: 'https://randomuser.me/api/portraits/men/47.jpg',
    rating: 4.9,
    reviews: 156,
    skills: ['Next.js', 'TypeScript', 'Portfolio Review'],
    availability: 'Next available: Next Week',
    price: '₹3,000/hr'
  }
];

export default function MentorshipPage() {
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedMentor(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-theme-bg pt-28 pb-12 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 bg-theme-accent/20 rounded-2xl flex items-center justify-center text-theme-accent">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-theme-text tracking-tight">1-on-1 Mentorship</h1>
              <p className="text-theme-text-muted font-medium mt-1">Connect with industry leaders and accelerate your career.</p>
            </div>
          </div>
          
          <div className="relative max-w-2xl mt-8">
            <Search className="absolute left-4 top-3.5 text-theme-text-muted" size={20} />
            <input 
              type="text" 
              placeholder="Search by skill, company, or role..." 
              className="w-full pl-12 pr-4 py-3 bg-theme-card border border-theme-border rounded-xl outline-none font-medium text-theme-text focus:border-theme-accent transition shadow-sm"
            />
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_MENTORS.map((mentor, index) => (
            <motion.div 
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-theme-card border border-theme-border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-theme-accent/30 transition-all duration-300 flex flex-col"
            >
              <div className="relative mb-6 flex justify-center">
                <div className="absolute top-0 right-0 bg-theme-bg px-2 py-1 rounded-lg border border-theme-border flex items-center gap-1 shadow-sm">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-theme-text">{mentor.rating}</span>
                </div>
                <img src={mentor.avatar} alt={mentor.name} className="w-24 h-24 rounded-full object-cover border-4 border-theme-bg shadow-lg" />
              </div>

              <div className="text-center mb-6">
                <h3 className="text-lg font-black text-theme-text">{mentor.name}</h3>
                <p className="text-sm font-bold text-theme-accent mb-1">{mentor.role}</p>
                <p className="text-xs font-medium text-theme-text-muted">@ {mentor.company}</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {mentor.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-theme-bg border border-theme-border rounded-md text-[10px] font-bold text-theme-text">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between text-xs font-medium text-theme-text-muted bg-theme-bg py-2 px-3 rounded-lg border border-theme-border">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-theme-accent-sec" />
                    <span>{mentor.availability}</span>
                  </div>
                  <span className="font-bold text-theme-text">{mentor.price}</span>
                </div>

                <button 
                  onClick={() => setSelectedMentor(mentor)}
                  className="w-full bg-theme-text text-theme-bg hover:bg-theme-accent hover:text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md"
                >
                  <Video size={18} /> Book Session
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking Modal */}
        <AnimatePresence>
          {selectedMentor && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-theme-card border border-theme-border rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
              >
                {isSuccess ? (
                  <div className="p-12 text-center flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="h-20 w-20 bg-theme-success/20 rounded-full flex items-center justify-center text-theme-success mb-6"
                    >
                      <CheckCircle size={40} />
                    </motion.div>
                    <h2 className="text-2xl font-black text-theme-text mb-2">Session Booked!</h2>
                    <p className="text-theme-text-muted font-medium">A calendar invite has been sent to you and {selectedMentor.name}.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between p-6 border-b border-theme-border bg-theme-bg/50">
                      <div>
                        <h2 className="text-xl font-black text-theme-text">Book Mentorship</h2>
                        <p className="text-xs font-bold text-theme-accent mt-1">with {selectedMentor.name}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedMentor(null)}
                        className="p-2 hover:bg-theme-bg rounded-xl text-theme-text-muted hover:text-theme-text transition"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <form onSubmit={handleBook} className="p-6">
                      <div className="flex items-center gap-4 mb-6 p-4 bg-theme-bg border border-theme-border rounded-2xl">
                        <img src={selectedMentor.avatar} alt={selectedMentor.name} className="w-12 h-12 rounded-full" />
                        <div>
                          <p className="font-bold text-theme-text">{selectedMentor.name}</p>
                          <p className="text-xs text-theme-text-muted">{selectedMentor.role} @ {selectedMentor.company}</p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-bold text-theme-text mb-2">Select Date & Time</label>
                          <input 
                            type="datetime-local" 
                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-xl outline-none font-medium text-theme-text focus:border-theme-accent transition"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-theme-text mb-2">What do you want to discuss?</label>
                          <textarea 
                            rows={3}
                            placeholder="e.g. Resume review, system design prep..."
                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-xl outline-none font-medium text-theme-text focus:border-theme-accent transition resize-none"
                            required
                          ></textarea>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-theme-border flex justify-between items-center">
                        <div>
                          <p className="text-xs text-theme-text-muted font-bold uppercase">Total Cost</p>
                          <p className="text-xl font-black text-theme-text">{selectedMentor.price}</p>
                        </div>
                        <button 
                          type="submit"
                          disabled={isBooking}
                          className="px-8 py-3 rounded-xl font-bold text-white bg-theme-accent hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                          {isBooking ? 'Processing...' : 'Confirm Booking'}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
