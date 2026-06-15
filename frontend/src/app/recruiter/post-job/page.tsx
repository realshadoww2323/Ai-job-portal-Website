'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, FileText, MapPin, IndianRupee, List, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    salaryRange: '',
    requirements: '',
    experience: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

      const payload = {
        ...formData,
        requirements: formData.requirements.split(',').map(req => req.trim()).filter(Boolean)
      };

      await axios.post(`${API_BASE}/jobs`, payload, { headers });
      
      // Navigate back to dashboard on success
      router.push('/recruiter/dashboard');
    } catch (err: any) {
      console.error('Failed to post job:', err);
      setError(err.response?.data?.error || 'Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-6 pb-12">
      <motion.div 
        className="max-w-3xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div>
          <Link href="/recruiter/dashboard" className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-6 hover:underline">
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Post a New Job</h1>
          <p className="text-slate-500 font-medium mt-1">Fill out the details below to create a new job posting.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Briefcase size={16} className="text-indigo-500" /> Job Title *
                </label>
                <input 
                  type="text" 
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Developer" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 outline-none transition-all"
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Building size={16} className="text-indigo-500" /> Company Name *
                </label>
                <input 
                  type="text" 
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Acme Corp" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 outline-none transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <FileText size={16} className="text-indigo-500" /> Job Description *
              </label>
              <textarea 
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, and team..." 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 outline-none transition-all resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <MapPin size={16} className="text-indigo-500" /> Location
                </label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Remote, New York, etc." 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 outline-none transition-all"
                />
              </div>

              {/* Salary Range */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <IndianRupee size={16} className="text-indigo-500" /> Salary Range
                </label>
                <input 
                  type="text" 
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  placeholder="e.g. ₹10 LPA - ₹15 LPA" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 outline-none transition-all"
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <List size={16} className="text-indigo-500" /> Requirements (Comma separated)
              </label>
              <input 
                type="text" 
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, TypeScript" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 outline-none transition-all"
              />
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Briefcase size={16} className="text-indigo-500" /> Experience Level
              </label>
              <input 
                type="text" 
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 3-5 Years" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 outline-none transition-all"
              />
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button 
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Publishing...
                  </>
                ) : (
                  'Publish Job Posting'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
