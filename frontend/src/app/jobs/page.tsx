'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, MapPin, Briefcase, IndianRupee, Clock, Building2, Filter, X, FileText, Send, 
  CheckCircle2, AlertCircle, UploadCloud, Wand2, TrendingUp, Download, Sparkles, Cpu 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { jsPDF } from 'jspdf';

export default function JobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [salary, setSalary] = useState('');
  const [company, setCompany] = useState('');

  // ATS Resume Analyzer & Optimizer States
  const [activeTab, setActiveTab] = useState<'ats'>('ats');
  const [applyFile, setApplyFile] = useState<File | null>(null);
  const [atsFile, setAtsFile] = useState<File | null>(null);
  const [isAtsParsing, setIsAtsParsing] = useState(false);
  const [atsParseResult, setAtsParseResult] = useState<any>(null);
  const [isAtsMatching, setIsAtsMatching] = useState(false);
  const [atsMatchResult, setMatchResult] = useState<any>(null);
  const [isAtsImproving, setIsAtsImproving] = useState(false);
  const [improvedAtsResume, setImprovedAtsResume] = useState<string | null>(null);
  const [isGeneratingAtsCoverLetter, setIsGeneratingAtsCoverLetter] = useState(false);
  const [atsCoverLetter, setAtsCoverLetter] = useState<string | null>(null);
  const [atsError, setAtsError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('/api/jobs');
      setJobs(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSelectJob = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setActiveTab('ats');
    setApplyFile(null);
    setAtsFile(null);
    setIsAtsParsing(false);
    setAtsParseResult(null);
    setIsAtsMatching(false);
    setMatchResult(null);
    setIsAtsImproving(false);
    setImprovedAtsResume(null);
    setIsGeneratingAtsCoverLetter(false);
    setAtsCoverLetter(null);
    setAtsError('');
    setApplySuccess(false);
    setIsApplying(false);
  };

  const getDownloadDetails = () => {
    if (!atsFile) {
      return {
        resumeFilename: 'optimized_resume.pdf',
        resumeTitle: 'Optimized Professional CV',
        coverLetterFilename: 'cover_letter.pdf',
        coverLetterTitle: 'Professional Cover Letter'
      };
    }
    const originalName = atsFile.name;
    const baseName = originalName.replace(/\.pdf$/i, '');
    const cleanTitle = baseName
      .replace(/[_-]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      resumeFilename: originalName,
      resumeTitle: cleanTitle,
      coverLetterFilename: `${baseName}_CoverLetter.pdf`,
      coverLetterTitle: `${cleanTitle} - Cover Letter`
    };
  };

  const { resumeFilename, resumeTitle, coverLetterFilename, coverLetterTitle } = getDownloadDetails();

  const handleApply = async (e: React.FormEvent, isOptimized = false) => {
    e.preventDefault();
    if (!user) return alert('Please login to apply');
    
    setIsApplying(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      let fileToUpload: File | Blob | null = null;
      let filename = 'resume.pdf';

      if (isOptimized && improvedAtsResume) {
        // Generate PDF blob from improved text
        const doc = new jsPDF();
        let yPos = 25;
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(30, 41, 59);
        doc.text(resumeTitle, 20, yPos);
        yPos += 8;
        
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.5);
        doc.line(20, yPos, 190, yPos);
        yPos += 12;
        
        const lines = improvedAtsResume.split('\n');
        lines.forEach((line) => {
          if (yPos > 280) {
            doc.addPage();
            yPos = 20;
          }
          let isHeading = false;
          let isSubHeading = false;
          let isBullet = false;
          let textToPrint = line;
          const trimmed = textToPrint.trim();

          if (trimmed.startsWith('---') || trimmed.startsWith('[')) {
            isHeading = true;
            textToPrint = trimmed.replace(/---/g, '').replace(/\[|\]/g, '').trim();
          } else if (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && !trimmed.includes('http')) {
            isHeading = true;
          } else if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
            isBullet = true;
          } else if (trimmed.includes('|') && trimmed.length < 60) {
            isSubHeading = true;
          }

          if (isHeading) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(15, 23, 42);
            yPos += 4;
          } else if (isSubHeading) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(71, 85, 105);
          } else if (isBullet) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.setTextColor(51, 65, 85);
            textToPrint = "    " + trimmed;
          } else {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.setTextColor(51, 65, 85);
          }

          if (trimmed) {
            const splitText = doc.splitTextToSize(textToPrint, isBullet ? 160 : 170);
            doc.text(splitText, 20, yPos);
            yPos += splitText.length * 6;
          } else {
            yPos += 4;
          }
        });

        fileToUpload = doc.output('blob');
        filename = resumeFilename;
      } else if (isOptimized && atsFile) {
        fileToUpload = atsFile;
        filename = atsFile.name;
      } else if (applyFile) {
        fileToUpload = applyFile;
        filename = applyFile.name;
      }

      if (fileToUpload) {
        formData.append('resume', fileToUpload, filename);
      }

      await axios.post(`/api/applications/apply/${selectedJob._id || selectedJob.id}`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setApplySuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setApplySuccess(false);
        setIsApplying(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to apply. Please try again.');
      setIsApplying(false);
    }
  };

  const handleAtsParseResume = async () => {
    if (!atsFile) {
      setAtsError('Please select a PDF resume first.');
      return;
    }
    setIsAtsParsing(true);
    setAtsError('');
    const formData = new FormData();
    formData.append('file', atsFile);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/parse-resume`, formData);
      setAtsParseResult(res.data);
      
      const jobDesc = `${selectedJob.title} - ${selectedJob.company}\n\nDescription:\n${selectedJob.description}\n\nRequirements:\n${selectedJob.requirements?.join(', ')}`;
      setIsAtsMatching(true);
      try {
        const matchRes = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/match-job`, {
          resume_text: res.data.full_text || res.data.raw_text_preview,
          job_description: jobDesc,
        });
        setMatchResult(matchRes.data);
      } catch (matchErr: any) {
        console.error(matchErr);
        setAtsError('Failed to match resume with the job description.');
      } finally {
        setIsAtsMatching(false);
      }

    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.detail || 'Failed to parse resume. Make sure the AI service is running.';
      setAtsError(msg);
    } finally {
      setIsAtsParsing(false);
    }
  };

  const handleAtsAcceptChanges = async () => {
    if (!atsParseResult || !atsMatchResult) return;
    setIsAtsImproving(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/improve-resume`, {
        full_text: atsParseResult.full_text || atsParseResult.raw_text_preview,
        missing_skills: atsMatchResult.missing_skills
      });
      setImprovedAtsResume(res.data.improved_resume);
      
      setMatchResult((prev: any) => ({
        ...prev,
        match_score: res.data.new_score,
        ats_status: 'Highly Relevant (Optimized)',
        missing_skills: []
      }));
    } catch (err: any) {
      setAtsError('Failed to improve resume.');
    } finally {
      setIsAtsImproving(false);
    }
  };

  const handleAtsGenerateCoverLetter = async () => {
    if (!atsParseResult) return;
    setIsGeneratingAtsCoverLetter(true);
    try {
      const jobDesc = `${selectedJob.title} - ${selectedJob.company}\n\nDescription:\n${selectedJob.description}\n\nRequirements:\n${selectedJob.requirements?.join(', ')}`;
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/generate-cover-letter`, {
        resume_text: atsParseResult.full_text || atsParseResult.raw_text_preview,
        job_description: jobDesc,
      });
      setAtsCoverLetter(res.data.cover_letter);
    } catch (err: any) {
      setAtsError('Failed to generate cover letter.');
    } finally {
      setIsGeneratingAtsCoverLetter(false);
    }
  };

  const downloadPDF = (content: string, filename: string, title: string) => {
    try {
      const doc = new jsPDF();
      let yPos = 25;
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(30, 41, 59);
      doc.text(title, 20, yPos);
      yPos += 8;
      
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.5);
      doc.line(20, yPos, 190, yPos);
      yPos += 12;
      
      const lines = content.split('\n');
      lines.forEach((line) => {
        if (yPos > 280) {
          doc.addPage();
          yPos = 20;
        }

        let isHeading = false;
        let isSubHeading = false;
        let isBullet = false;
        let textToPrint = line;
        const trimmed = textToPrint.trim();

        if (trimmed.startsWith('---') || trimmed.startsWith('[')) {
          isHeading = true;
          textToPrint = trimmed.replace(/---/g, '').replace(/\[|\]/g, '').trim();
        } else if (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && !trimmed.includes('http')) {
          isHeading = true;
        } else if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
          isBullet = true;
        } else if (trimmed.includes('|') && trimmed.length < 60) {
          isSubHeading = true;
        }

        if (isHeading) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(14);
          doc.setTextColor(15, 23, 42);
          yPos += 4;
        } else if (isSubHeading) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.setTextColor(71, 85, 105);
        } else if (isBullet) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(51, 65, 85);
          textToPrint = "    " + trimmed;
        } else {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(51, 65, 85);
        }

        if (trimmed) {
          const splitText = doc.splitTextToSize(textToPrint, isBullet ? 160 : 170);
          doc.text(splitText, 20, yPos);
          yPos += splitText.length * 6;
        } else {
          yPos += 4;
        }
      });
      
      doc.save(filename);
    } catch (err) {
      console.error('PDF generation failed:', err);
      setAtsError('Failed to generate PDF.');
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.title?.toLowerCase().includes(search.toLowerCase()) || job.company?.toLowerCase().includes(search.toLowerCase());
    const matchLocation = location ? job.location === location : true;
    const matchExperience = experience ? job.experience === experience : true;
    const matchNotice = noticePeriod ? job.noticePeriod === noticePeriod : true;
    const matchSalary = salary ? job.salaryRange === salary : true;
    const matchCompany = company ? job.company === company : true;

    return matchSearch && matchLocation && matchExperience && matchNotice && matchSalary && matchCompany;
  });

  // Extract unique values for filters
  const uniqueLocations = Array.from(new Set(jobs.map(j => j.location).filter(Boolean)));
  const uniqueExperiences = Array.from(new Set(jobs.map(j => j.experience).filter(Boolean)));
  const uniqueNotices = Array.from(new Set(jobs.map(j => j.noticePeriod).filter(Boolean)));
  const uniqueSalaries = Array.from(new Set(jobs.map(j => j.salaryRange).filter(Boolean)));
  const uniqueCompanies = Array.from(new Set(jobs.map(j => j.company).filter(Boolean)));

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Explore 1000+ Jobs</h1>
          <p className="text-slate-500 font-medium mt-2">Find the perfect role that matches your skills and aspirations.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Filter size={20} className="text-indigo-500"/> Filters
              </h2>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-semibold text-slate-600 block mb-2">Search Role or Company</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="e.g. Frontend Developer..." 
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-semibold text-slate-600 block mb-2">Location</label>
                  <select className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" value={location} onChange={e => setLocation(e.target.value)}>
                    <option value="">All Locations</option>
                    {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="text-sm font-semibold text-slate-600 block mb-2">Experience</label>
                  <select className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" value={experience} onChange={e => setExperience(e.target.value)}>
                    <option value="">Any Experience</option>
                    {uniqueExperiences.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                  </select>
                </div>

                {/* Notice Period */}
                <div>
                  <label className="text-sm font-semibold text-slate-600 block mb-2">Notice Period</label>
                  <select className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" value={noticePeriod} onChange={e => setNoticePeriod(e.target.value)}>
                    <option value="">Any Notice Period</option>
                    {uniqueNotices.map(np => <option key={np} value={np}>{np}</option>)}
                  </select>
                </div>

                {/* Salary */}
                <div>
                  <label className="text-sm font-semibold text-slate-600 block mb-2">Salary Range</label>
                  <select className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" value={salary} onChange={e => setSalary(e.target.value)}>
                    <option value="">Any Salary</option>
                    {uniqueSalaries.map(sal => <option key={sal} value={sal}>{sal}</option>)}
                  </select>
                </div>

                {/* Company */}
                <div>
                  <label className="text-sm font-semibold text-slate-600 block mb-2">Company</label>
                  <select className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" value={company} onChange={e => setCompany(e.target.value)}>
                    <option value="">All Companies</option>
                    {uniqueCompanies.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <button 
                  onClick={() => { setSearch(''); setLocation(''); setExperience(''); setNoticePeriod(''); setSalary(''); setCompany(''); }}
                  className="w-full py-2 text-indigo-600 font-semibold text-sm hover:bg-indigo-50 rounded-lg transition"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <div>
                <p className="text-slate-500 mb-4 font-medium">Showing {filteredJobs.length} jobs</p>
                <div className="space-y-4">
                  {filteredJobs.slice(0, 50).map((job, idx) => ( // Show first 50 for performance
                    <motion.div 
                      key={job._id || job.id || idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition cursor-pointer group"
                      onClick={() => handleSelectJob(job)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">{job.title}</h3>
                          <div className="flex items-center gap-2 text-slate-600 mt-1">
                            <Building2 size={16} /> <span className="font-medium">{job.company}</span>
                          </div>
                        </div>
                        <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 hover:text-white transition">
                          Apply Now
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                        <div className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full"><MapPin size={14}/> {job.location}</div>
                        <div className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full"><Briefcase size={14}/> {job.experience}</div>
                        <div className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full"><IndianRupee size={14}/> {job.salaryRange}</div>
                        <div className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full"><Clock size={14}/> {job.noticePeriod}</div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {job.requirements?.map((req: string) => (
                          <span key={req} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-md font-semibold border border-indigo-100">
                            {req}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                  {filteredJobs.length > 50 && (
                    <div className="text-center p-4 text-slate-500 font-medium">
                      + {filteredJobs.length - 50} more jobs match your criteria.
                    </div>
                  )}
                  {filteredJobs.length === 0 && (
                    <div className="text-center p-12 bg-white rounded-2xl border border-slate-200">
                      <p className="text-slate-500 font-medium">No jobs found matching your filters.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* --- Job Details & Apply Modal --- */}
      <AnimatePresence>
        {isModalOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-slate-100 flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 leading-tight mb-2">{selectedJob.title}</h2>
                  <div className="flex items-center gap-4 text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5"><Building2 size={18}/> {selectedJob.company}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={18}/> {selectedJob.location}</span>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-grow overflow-y-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left: Description */}
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <FileText size={20} className="text-indigo-500" /> Job Description
                      </h3>
                      <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                        {selectedJob.description}
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Requirements & Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.requirements?.map((req: string) => (
                          <span key={req} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200">
                            {req}
                          </span>
                        ))}
                      </div>
                    </section>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Salary Range</p>
                        <p className="text-lg font-bold text-indigo-700">{selectedJob.salaryRange}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                        <p className="text-lg font-bold text-slate-700">{selectedJob.experience}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Apply Form & ATS Optimizer */}
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col min-h-[480px]">
                    {/* Tab Navigation */}
                    <div className="flex bg-slate-200/60 p-1.5 rounded-2xl mb-6">
                      <button
                        type="button"
                        onClick={() => setActiveTab('ats')}
                        className={`flex-1 py-2.5 text-sm font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                          activeTab === 'ats'
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Sparkles size={16} className="text-indigo-500 animate-pulse" />
                        ATS Optimizer
                      </button>
                      <Link
                        href={`/manual-apply?jobId=${selectedJob._id || selectedJob.id}`}
                        className="flex-1 py-2.5 text-sm font-black rounded-xl transition-all flex items-center justify-center text-slate-500 hover:text-slate-800"
                      >
                        Manual Apply
                      </Link>
                    </div>

                    {activeTab === 'ats' && (
                      <div className="flex-grow flex flex-col justify-between space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-black text-slate-900">ATS Resume Optimizer</h3>
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                              <Cpu size={12} /> Powered by AI
                            </span>
                          </div>

                          {atsError && (
                            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 rounded-r-xl text-red-700 flex items-center gap-2 text-xs">
                              <AlertCircle size={16} className="shrink-0" />
                              <p>{atsError}</p>
                            </div>
                          )}

                          {applySuccess ? (
                            <motion.div 
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="text-center py-12"
                            >
                              <div className="h-20 w-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={40} />
                              </div>
                              <h4 className="text-xl font-bold text-slate-900 mb-2">Application Sent!</h4>
                              <p className="text-slate-500 text-sm">Thanks for applying to this role</p>
                            </motion.div>
                          ) : (
                            <div className="space-y-4">
                              {/* Resume Upload Step */}
                              {!atsParseResult && (
                                <div className="space-y-4">
                                  <p className="text-xs text-slate-500 font-medium">Upload your resume to check how well it matches this specific job description, find missing keywords, and automatically optimize it.</p>
                                  <div>
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Upload Resume (PDF)</label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-indigo-400 transition cursor-pointer group relative bg-white">
                                      <input 
                                        type="file" 
                                        accept=".pdf" 
                                        onChange={(e) => {
                                          if (e.target.files && e.target.files.length > 0) {
                                            setAtsFile(e.target.files[0]);
                                            setAtsError('');
                                          }
                                        }}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                      />
                                      <UploadCloud size={32} className="text-slate-300 group-hover:text-indigo-400 mx-auto mb-2" />
                                      <p className="text-sm font-bold text-slate-700">
                                        {atsFile ? atsFile.name : 'Choose PDF resume'}
                                      </p>
                                      <p className="text-xs text-slate-400 mt-1">We will scan and match this resume</p>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={handleAtsParseResume}
                                    disabled={isAtsParsing || !atsFile}
                                    className="w-full bg-indigo-600 text-white py-3.5 rounded-2xl font-black text-sm hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                                  >
                                    {isAtsParsing ? (
                                      <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Analyzing & Matching...
                                      </>
                                    ) : (
                                      <>Analyze & Compare Fit <TrendingUp size={16} /></>
                                    )}
                                  </button>
                                </div>
                              )}

                              {/* Results Step */}
                              {atsParseResult && atsMatchResult && (
                                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                                  {/* Score Card */}
                                  <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
                                    <div>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ATS Match Score</p>
                                      <span className={`inline-block mt-1.5 px-2 py-0.5 text-[10px] font-bold rounded-md uppercase ${
                                        atsMatchResult.match_score > 70 
                                          ? 'bg-green-50 text-green-700 border border-green-200' 
                                          : atsMatchResult.match_score > 40 
                                          ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                                          : 'bg-rose-50 text-rose-600 border border-rose-200'
                                      }`}>
                                        {atsMatchResult.ats_status}
                                      </span>
                                    </div>
                                    <div className="text-right">
                                      <div className={`text-3xl font-black ${
                                        atsMatchResult.match_score > 70 ? 'text-green-600' : atsMatchResult.match_score > 40 ? 'text-amber-500' : 'text-rose-500'
                                      }`}>
                                        {atsMatchResult.match_score}%
                                      </div>
                                    </div>
                                  </div>

                                  {/* Missing Keywords */}
                                  {atsMatchResult.missing_skills?.length > 0 && (
                                    <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
                                      <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">Missing Skills & Keywords</p>
                                      <div className="flex flex-wrap gap-1.5">
                                        {atsMatchResult.missing_skills.map((skill: string) => (
                                          <span key={skill} className="bg-rose-100/60 text-rose-700 text-xs px-2.5 py-1 rounded-lg font-bold border border-rose-200/50">
                                            {skill}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Suggestions */}
                                  {atsMatchResult.boost_suggestions?.length > 0 && !improvedAtsResume && (
                                    <div className="bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100/50">
                                      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2">Improvement Tips</p>
                                      <ul className="text-xs text-slate-600 space-y-1 font-medium list-disc pl-4">
                                        {atsMatchResult.boost_suggestions.map((sug: string, i: number) => (
                                          <li key={i}>{sug}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Optimizer Button */}
                                  {!improvedAtsResume && (
                                    <button
                                      type="button"
                                      onClick={handleAtsAcceptChanges}
                                      disabled={isAtsImproving}
                                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-2xl font-black text-sm hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10"
                                    >
                                      {isAtsImproving ? (
                                        <>
                                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                          Optimizing Resume...
                                        </>
                                      ) : (
                                        <>
                                          <Wand2 size={16} />
                                          Optimize CV & Boost Score
                                        </>
                                      )}
                                    </button>
                                  )}

                                  {/* Optimized Result Display */}
                                  {improvedAtsResume && (
                                    <div className="space-y-4">
                                      <div className="bg-green-50 p-4 rounded-2xl border border-green-200 text-center">
                                        <p className="text-xs font-bold text-green-800 flex items-center justify-center gap-1.5">
                                          <CheckCircle2 size={16} className="text-green-600" />
                                          CV Successfully Optimized! Score Boosted to {atsMatchResult.match_score}%
                                        </p>
                                      </div>

                                      <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-[10px] max-h-40 overflow-y-auto border border-slate-800">
                                        <pre className="whitespace-pre-wrap">{improvedAtsResume}</pre>
                                      </div>

                                      <div className="flex gap-2">
                                        <button
                                          type="button"
                                          onClick={() => downloadPDF(improvedAtsResume, resumeFilename, resumeTitle)}
                                          className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-50 transition flex items-center justify-center gap-1.5"
                                        >
                                          <Download size={14} /> Download CV
                                        </button>
                                        <button
                                          type="button"
                                          onClick={handleAtsGenerateCoverLetter}
                                          disabled={isGeneratingAtsCoverLetter}
                                          className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-50 transition flex items-center justify-center gap-1.5"
                                        >
                                          <FileText size={14} /> 
                                          {isGeneratingAtsCoverLetter ? 'Generating...' : 'Cover Letter'}
                                        </button>
                                      </div>

                                      {atsCoverLetter && (
                                        <div className="space-y-2">
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Generated Cover Letter</p>
                                          <div className="bg-slate-100 p-4 rounded-2xl text-xs font-medium text-slate-700 max-h-32 overflow-y-auto border border-slate-200">
                                            <pre className="whitespace-pre-wrap font-sans leading-relaxed">{atsCoverLetter}</pre>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => downloadPDF(atsCoverLetter, coverLetterFilename, coverLetterTitle)}
                                            className="w-full bg-slate-800 text-white py-2 rounded-xl font-bold text-xs hover:bg-slate-900 transition flex items-center justify-center gap-1.5"
                                          >
                                            <Download size={14} /> Download Cover Letter
                                          </button>
                                        </div>
                                      )}

                                      {/* Apply Button */}
                                      {!user ? (
                                        <div className="p-3 bg-amber-50 text-amber-700 rounded-xl flex gap-2 text-xs font-medium border border-amber-100">
                                          <AlertCircle size={16} className="shrink-0" />
                                          <p>Please log in to submit your application.</p>
                                        </div>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={(e) => handleApply(e, true)}
                                          disabled={isApplying}
                                          className="w-full bg-indigo-600 text-white py-3.5 rounded-2xl font-black text-sm hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                                        >
                                          {isApplying ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                          ) : (
                                            <>Apply with Optimized CV <Send size={16} /></>
                                          )}
                                        </button>
                                      )}
                                    </div>
                                  )}

                                  {/* Reset & Try Another */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setAtsFile(null);
                                      setAtsParseResult(null);
                                      setMatchResult(null);
                                      setImprovedAtsResume(null);
                                      setAtsCoverLetter(null);
                                      setAtsError('');
                                    }}
                                    className="w-full text-center py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
                                  >
                                    Reset & Upload Different Resume
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
