'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { UploadCloud, CheckCircle2, ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ManualApplyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');

  const [applyFile, setApplyFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    experience: '',
    coverLetter: '',
    address: '',
    phone: '',
  });
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    
    // Mock application submission delay
    setTimeout(() => {
      setIsApplying(false);
      setApplySuccess(true);
      setTimeout(() => {
        router.push('/jobs');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-4 pb-12">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Job Details
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-200"
        >
          {applySuccess ? (
            <div className="text-center py-16">
              <div className="h-24 w-24 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Application Submitted Successfully!</h2>
              <p className="text-slate-500 font-medium">Thank you for applying to this role manually. Redirecting back to jobs...</p>
            </div>
          ) : (
            <>
              <div className="mb-10 text-center">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Manual Application</h1>
                <p className="text-slate-500 font-medium">Please fill in all the details below to complete your application.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com" 
                      className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium bg-slate-50 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Password</label>
                    <input 
                      type="password" 
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••" 
                      className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium bg-slate-50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000" 
                      className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium bg-slate-50 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Years of Experience</label>
                    <select 
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium bg-slate-50 focus:bg-white transition-all text-slate-700"
                    >
                      <option value="">Select Experience</option>
                      <option value="fresher">Fresher</option>
                      <option value="1-3">1-3 Years</option>
                      <option value="3-5">3-5 Years</option>
                      <option value="5+">5+ Years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Full Address</label>
                  <input 
                    type="text" 
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St, City, Country" 
                    className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium bg-slate-50 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Cover Letter</label>
                  <textarea 
                    rows={5}
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us why you are the perfect fit for this role..."
                    className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium bg-slate-50 focus:bg-white transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Resume Drop Box</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-3xl p-10 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition cursor-pointer group relative bg-slate-50">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      required
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setApplyFile(e.target.files[0]);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <UploadCloud size={48} className="text-slate-400 group-hover:text-indigo-500 mx-auto mb-4 transition-colors" />
                    <p className="text-lg font-bold text-slate-700 mb-1">
                      {applyFile ? applyFile.name : 'Drag & drop your resume here'}
                    </p>
                    <p className="text-sm text-slate-500 font-medium">Or click to browse (PDF, DOCX up to 5MB)</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <button 
                    type="submit"
                    disabled={isApplying}
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isApplying ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      <>Submit Manual Application <Send size={24}/></>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
