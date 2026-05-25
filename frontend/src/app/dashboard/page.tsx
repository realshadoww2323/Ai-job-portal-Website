'use client';

import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, TrendingUp, Briefcase, Wand2, Download } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

import { jsPDF } from 'jspdf';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseResult, setParseResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [isImproving, setIsImproving] = useState(false);
  const [improvedResume, setImprovedResume] = useState<string | null>(null);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);

  const getDownloadDetails = () => {
    if (!file) {
      return {
        resumeFilename: 'optimized_resume.pdf',
        resumeTitle: 'Optimized Professional CV',
        coverLetterFilename: 'cover_letter.pdf',
        coverLetterTitle: 'Professional Cover Letter'
      };
    }
    
    const originalName = file.name;
    const baseName = originalName.replace(/\.pdf$/i, '');
    
    // Format a nice title from the filename (e.g. "john_doe_resume" -> "John Doe Resume")
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError('');
      setParseResult(null);
      setMatchResult(null);
      setImprovedResume(null);
      setCoverLetter(null);
    }
  };

  const handleParseResume = async () => {
    if (!file) {
      setError('Please select a PDF resume first.');
      return;
    }
    setIsParsing(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/parse-resume`, formData);
      setParseResult(res.data);
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.detail || 'Failed to parse resume. Make sure the AI service is running.';
      setError(msg);
    } finally {
      setIsParsing(false);
    }
  };

  const handleMatchJob = async () => {
    if (!parseResult || !jobDescription) return;
    setIsMatching(true);
    setError('');
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/match-job`, {
        resume_text: parseResult.full_text || parseResult.raw_text_preview,
        job_description: jobDescription,
      });
      setMatchResult(res.data);
    } catch (err: any) {
      setError('Failed to match job.');
    } finally {
      setIsMatching(false);
    }
  };

  const handleAcceptChanges = async () => {
    if (!parseResult || !matchResult) return;
    setIsImproving(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/improve-resume`, {
        full_text: parseResult.full_text || parseResult.raw_text_preview,
        missing_skills: matchResult.missing_skills
      });
      setImprovedResume(res.data.improved_resume);
      
      // Update match result to show increased score
      setMatchResult((prev: any) => ({
        ...prev,
        match_score: res.data.new_score,
        ats_status: 'Highly Relevant (Optimized)',
        missing_skills: []
      }));
    } catch (err: any) {
      setError('Failed to improve resume.');
    } finally {
      setIsImproving(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!parseResult || !jobDescription) return;
    setIsGeneratingCoverLetter(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/generate-cover-letter`, {
        resume_text: parseResult.full_text || parseResult.raw_text_preview,
        job_description: jobDescription,
      });
      setCoverLetter(res.data.cover_letter);
    } catch (err: any) {
      setError('Failed to generate cover letter.');
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  const downloadPDF = (content: string, filename: string, title: string) => {
    try {
      const doc = new jsPDF();
      let yPos = 25;
      
      // Add Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(30, 41, 59); // Slate-800
      doc.text(title, 20, yPos);
      yPos += 8;
      
      // Add a line
      doc.setDrawColor(203, 213, 225); // Slate-300
      doc.setLineWidth(0.5);
      doc.line(20, yPos, 190, yPos);
      yPos += 12;
      
      // Parse Content and Add Line by Line
      const lines = content.split('\n');
      
      lines.forEach((line) => {
        // Handle page breaks
        if (yPos > 280) {
          doc.addPage();
          yPos = 20;
        }

        let isHeading = false;
        let isSubHeading = false;
        let isBullet = false;
        let textToPrint = line;

        const trimmed = textToPrint.trim();

        // Detect Formatting
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

        // Apply Styling
        if (isHeading) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(14);
          doc.setTextColor(15, 23, 42); // Slate-900
          yPos += 4;
        } else if (isSubHeading) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.setTextColor(71, 85, 105); // Slate-600
        } else if (isBullet) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(51, 65, 85); // Slate-700
          // ensure proper spacing for bullet
          textToPrint = "    " + trimmed;
        } else {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(51, 65, 85); // Slate-700
        }

        if (trimmed) {
          const splitText = doc.splitTextToSize(textToPrint, isBullet ? 160 : 170);
          doc.text(splitText, isBullet ? 20 : 20, yPos);
          yPos += splitText.length * 6; // advance y position based on lines
        } else {
          yPos += 4; // empty line spacing
        }
      });
      
      doc.save(filename);
    } catch (err) {
      console.error('PDF generation failed:', err);
      setError('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text pt-28 px-6 pb-12 overflow-hidden transition-all duration-300">
      <motion.div 
        className="max-w-6xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-theme-text tracking-tight">AI Resume Dashboard</h1>
          <p className="text-theme-text-muted font-medium">Analyze your skills and boost your ATS score.</p>
        </motion.div>

        {error && (
          <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-xl text-red-400 flex items-center gap-3">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border transition-all duration-300">
              <h2 className="text-xl font-bold mb-6 text-theme-text flex items-center gap-2">
                <UploadCloud className="text-theme-accent" /> Upload Resume
              </h2>
              <div className="border-2 border-dashed border-theme-border rounded-2xl p-8 text-center bg-theme-bg/40 relative group transition-all">
                <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className="flex flex-col items-center">
                  <FileText className="mx-auto h-12 w-12 text-theme-text-muted mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-theme-text font-medium">{file ? file.name : 'Click to upload PDF'}</p>
                </div>
              </div>
              <button onClick={handleParseResume} disabled={isParsing || !file} className="w-full mt-6 bg-theme-accent text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50 transition-all hover:brightness-110 shadow-lg shadow-theme-accent/20">
                {isParsing ? 'Analyzing...' : 'Analyze Resume'}
              </button>
            </div>

            {parseResult && !improvedResume && (
              <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
                <h2 className="text-xl font-bold mb-4 text-theme-text flex items-center gap-2">
                  <CheckCircle className="text-theme-success" /> Extracted Profile
                </h2>
                <div className="space-y-4 text-theme-text">
                  <p><strong>Education:</strong> {parseResult.education}</p>
                  <div className="flex flex-wrap gap-2">
                    {parseResult.extracted_skills.map((skill: string, i: number) => (
                      <span key={i} className="bg-theme-accent/10 text-theme-accent px-3 py-1 rounded-full text-xs font-bold border border-theme-accent/20">{skill}</span>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-theme-bg/60 rounded-xl text-xs italic text-theme-text-muted max-h-32 overflow-y-auto border border-theme-border">
                    {parseResult.raw_text_preview}
                  </div>
                </div>
              </div>
            )}

            {improvedResume && (
              <div className="bg-theme-card p-8 rounded-3xl shadow-md border-2 border-theme-success">
                <h2 className="text-xl font-bold mb-4 text-theme-text flex items-center gap-2">
                  <Wand2 className="text-theme-success" /> ATS Optimized Resume
                </h2>
                <pre className="whitespace-pre-wrap text-xs bg-theme-bg/85 text-theme-text p-4 rounded-xl max-h-96 overflow-y-auto font-mono border border-theme-border">
                  {improvedResume}
                </pre>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => downloadPDF(improvedResume, resumeFilename, resumeTitle)}
                    className="flex-1 mt-4 bg-theme-success text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-theme-success/20"
                  >
                    <Download size={20} /> Download CV (PDF)
                  </button>
                  <button 
                    onClick={handleGenerateCoverLetter}
                    disabled={isGeneratingCoverLetter}
                    className="flex-1 mt-4 bg-theme-accent text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-theme-accent/20"
                  >
                    <FileText size={20} /> {isGeneratingCoverLetter ? 'Generating...' : 'Get Cover Letter'}
                  </button>
                </div>
              </div>
            )}

            {coverLetter && (
              <div className="bg-theme-card p-8 rounded-3xl shadow-md border-2 border-theme-accent mt-8">
                <h2 className="text-xl font-bold mb-4 text-theme-text flex items-center gap-2">
                  <FileText className="text-theme-accent" /> AI Generated Cover Letter
                </h2>
                <pre className="whitespace-pre-wrap text-xs bg-theme-bg/80 text-theme-text p-4 rounded-xl max-h-96 overflow-y-auto font-sans leading-relaxed border border-theme-border">
                  {coverLetter}
                </pre>
                <button 
                  onClick={() => downloadPDF(coverLetter, coverLetterFilename, coverLetterTitle)}
                  className="w-full mt-4 bg-theme-text text-theme-bg px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg"
                >
                  <Download size={20} /> Download Cover Letter (PDF)
                </button>
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
              <h2 className="text-xl font-bold mb-6 text-theme-text flex items-center gap-2">
                <Briefcase className="text-theme-accent-sec" /> Job Description
              </h2>
              <textarea rows={6} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste job description details here..." className="w-full border border-theme-border rounded-2xl p-4 outline-none bg-theme-bg/60 focus:border-theme-accent/50 text-theme-text transition-colors" />
              <button onClick={handleMatchJob} disabled={isMatching || !parseResult || !jobDescription} className="w-full mt-6 bg-theme-accent text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50 shadow-lg shadow-theme-accent/20 hover:brightness-110 transition-all">
                {isMatching ? 'Matching...' : 'Calculate ATS Score'}
              </button>
            </div>

            {matchResult && (
              <div className="bg-theme-card p-8 rounded-3xl shadow-xl text-theme-text border border-theme-border relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                  <TrendingUp size={120} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">ATS Match Score</h2>
                    <motion.div 
                      key={matchResult.match_score}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-5xl font-black text-theme-success drop-shadow-[0_0_15px_rgba(var(--success-color),0.3)]"
                    >
                      {matchResult.match_score}%
                    </motion.div>
                  </div>
                  <div className="space-y-4">
                    <p className={`p-3 rounded-xl font-bold inline-block text-xs uppercase tracking-wider ${matchResult.match_score > 70 ? 'bg-theme-success/15 text-theme-success' : matchResult.match_score > 40 ? 'bg-amber-500/15 text-amber-500' : 'bg-rose-500/15 text-rose-500'}`}>
                      Status: {matchResult.ats_status}
                    </p>
                    
                    {matchResult.missing_skills.length > 0 && (
                      <div className="bg-theme-bg/60 p-4 rounded-2xl border border-theme-border">
                        <p className="text-xs font-bold text-theme-text-muted mb-3 uppercase tracking-wider">Missing Critical Keywords:</p>
                        <div className="flex flex-wrap gap-2">
                          {matchResult.missing_skills.map((skill: string, i: number) => (
                            <span key={i} className="bg-rose-500/10 text-rose-500 px-3 py-1 rounded-full text-xs font-bold border border-rose-500/20">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {!improvedResume && (
                      <div className="pt-4 flex flex-col gap-3">
                        <p className="text-sm text-theme-text-muted">Boost your score by incorporating missing skills and refining content.</p>
                        <button 
                          onClick={handleAcceptChanges}
                          disabled={isImproving || matchResult.match_score >= 95}
                          className="bg-theme-accent hover:brightness-110 text-white px-6 py-4 rounded-xl font-black flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-theme-accent/25 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Wand2 size={22} />
                          {isImproving ? 'Optimizing Profile...' : 'Accept All Changes & Optimize'}
                        </button>
                      </div>
                    )}
                    
                    {improvedResume && (
                      <div className="pt-4 bg-theme-success/10 p-4 rounded-xl border border-theme-success/20 text-center">
                        <p className="text-theme-success font-bold flex items-center justify-center gap-2">
                          <CheckCircle size={20} /> Profile Fully Optimized!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

