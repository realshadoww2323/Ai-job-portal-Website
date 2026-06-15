'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, DollarSign, Clock, Search, Filter, Briefcase, ExternalLink, ShieldCheck, X, CheckCircle } from 'lucide-react';

import { MOCK_GIGS } from '../../utils/mockData';

export default function FreelancePage() {
  const [selectedGig, setSelectedGig] = useState<any>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    
    // Extract form data
    const formData = new FormData(e.target as HTMLFormElement);
    const rate = formData.get('rate') as string;
    const timeline = formData.get('timeline') as string;
    const proposal = formData.get('proposal') as string;

    try {
      await fetch('http://localhost:5000/api/admin/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gigId: selectedGig.id,
          gigTitle: selectedGig.title,
          gigCompany: selectedGig.company,
          rate,
          timeline,
          proposal
        })
      });
      
      setIsApplying(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedGig(null);
      }, 2000);
    } catch (err) {
      console.error(err);
      setIsApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg pt-28 pb-12 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-theme-accent-sec/20 rounded-2xl flex items-center justify-center text-theme-accent-sec">
                <Zap size={24} />
              </div>
              <div>
                <h1 className="text-4xl font-black text-theme-text tracking-tight">Freelance & Gigs</h1>
                <p className="text-theme-text-muted font-medium mt-1">Short-term contracts, bounties, and freelance opportunities.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-3 text-theme-text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Search gigs..." 
                className="w-full pl-10 pr-4 py-2.5 bg-theme-card border border-theme-border rounded-xl outline-none font-medium text-sm text-theme-text focus:border-theme-accent-sec transition shadow-sm"
              />
            </div>
            <button className="bg-theme-card border border-theme-border p-2.5 rounded-xl hover:bg-theme-bg transition text-theme-text-muted hover:text-theme-text shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Gigs List */}
        <div className="space-y-4">
          {MOCK_GIGS.map((gig, index) => (
            <motion.div 
              key={gig.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-theme-card border border-theme-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-theme-accent-sec/40 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                
                {/* Left Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-black text-theme-text group-hover:text-theme-accent-sec transition">{gig.title}</h2>
                    {gig.type === 'Bounty' && (
                      <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-widest rounded">Bounty</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm font-bold text-theme-text-muted mb-4">
                    <div className="flex items-center gap-1.5">
                      <Briefcase size={14} />
                      {gig.company}
                      {gig.verified && <ShieldCheck size={14} className="text-theme-success ml-0.5" />}
                    </div>
                    <span className="w-1 h-1 rounded-full bg-theme-border" />
                    <span>Posted {gig.posted}</span>
                  </div>

                  <p className="text-theme-text-muted text-sm font-medium leading-relaxed mb-6 max-w-3xl">
                    {gig.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {gig.skills.map(skill => (
                      <span key={skill} className="px-2.5 py-1 bg-theme-bg border border-theme-border rounded-md text-xs font-bold text-theme-text">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Content / Meta */}
                <div className="flex flex-col md:items-end justify-between min-w-[200px] border-t md:border-t-0 md:border-l border-theme-border pt-4 md:pt-0 md:pl-6">
                  <div className="space-y-3 mb-6 md:mb-0 w-full">
                    <div className="flex items-center justify-between md:justify-end gap-3 text-sm">
                      <span className="text-theme-text-muted font-bold">Budget</span>
                      <div className="flex items-center gap-1 font-black text-theme-text bg-theme-success/10 text-theme-success px-2 py-1 rounded-md">
                        {gig.budget}
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-3 text-sm">
                      <span className="text-theme-text-muted font-bold">Duration</span>
                      <div className="flex items-center gap-1 font-bold text-theme-text">
                        <Clock size={14} className="text-theme-accent-sec" /> {gig.duration}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedGig(gig)}
                    className="w-full md:w-auto bg-theme-accent-sec text-white px-6 py-2.5 rounded-xl font-bold hover:brightness-110 transition shadow-md shadow-theme-accent-sec/20 flex items-center justify-center gap-2"
                  >
                    Apply Now <ExternalLink size={16} />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Application Modal */}
        <AnimatePresence>
          {selectedGig && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-theme-card border border-theme-border rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
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
                    <h2 className="text-2xl font-black text-theme-text mb-2">Application Sent!</h2>
                    <p className="text-theme-text-muted font-medium">Your proposal for {selectedGig.title} has been submitted successfully.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between p-6 border-b border-theme-border bg-theme-bg/50">
                      <div>
                        <h2 className="text-xl font-black text-theme-text">Apply for Gig</h2>
                        <p className="text-xs font-bold text-theme-accent-sec mt-1">{selectedGig.title}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedGig(null)}
                        className="p-2 hover:bg-theme-bg rounded-xl text-theme-text-muted hover:text-theme-text transition"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <form onSubmit={handleApply} className="p-6 overflow-y-auto">
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-bold text-theme-text mb-2">Your Proposed Rate (₹)</label>
                          <input 
                            type="text" 
                            name="rate"
                            placeholder={selectedGig.budget}
                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-xl outline-none font-medium text-theme-text focus:border-theme-accent-sec transition"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-theme-text mb-2">Estimated Timeline</label>
                          <input 
                            type="text" 
                            name="timeline"
                            placeholder={selectedGig.duration}
                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-xl outline-none font-medium text-theme-text focus:border-theme-accent-sec transition"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-theme-text mb-2">Cover Letter / Proposal</label>
                          <textarea 
                            rows={4}
                            name="proposal"
                            placeholder="Why are you a great fit for this gig?"
                            className="w-full px-4 py-3 bg-theme-bg border border-theme-border rounded-xl outline-none font-medium text-theme-text focus:border-theme-accent-sec transition resize-none"
                            required
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="mt-8 flex gap-3">
                        <button 
                          type="button"
                          onClick={() => setSelectedGig(null)}
                          className="flex-1 px-4 py-3 rounded-xl font-bold text-theme-text bg-theme-bg border border-theme-border hover:brightness-95 transition"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          disabled={isApplying}
                          className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-theme-accent-sec hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                          {isApplying ? 'Sending...' : 'Submit Application'}
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
