'use client';

import React, { useState } from 'react';
import { Building2, FileText, CheckCircle, Target, Users, MapPin } from 'lucide-react';
import axios from 'axios';

export default function CultureFitPage() {
  const [resumeText, setResumeText] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [culture, setCulture] = useState<any>(null);

  const handleMatch = async () => {
    setIsMatching(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/match-culture`, {
        resume_text: resumeText,
        company_description: companyDescription
      });
      setCulture(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text pt-28 px-6 pb-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-black text-theme-text tracking-tight">Company Culture Match</h1>
          <p className="text-theme-text-muted font-medium">Analyze a company's description to see if their work environment fits your personality and preferences.</p>
        </div>

        <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FileText className="text-theme-accent" /> Your Profile (Resume)</h2>
              <textarea 
                rows={5} 
                value={resumeText} 
                onChange={(e) => setResumeText(e.target.value)} 
                placeholder="Paste your resume or bio here..." 
                className="w-full border border-theme-border rounded-xl p-4 outline-none bg-theme-bg/60 focus:border-theme-accent transition-colors" 
              />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Building2 className="text-theme-accent-sec" /> Company Description</h2>
              <textarea 
                rows={5} 
                value={companyDescription} 
                onChange={(e) => setCompanyDescription(e.target.value)} 
                placeholder="Paste the 'About Us' or Job Requirements here..." 
                className="w-full border border-theme-border rounded-xl p-4 outline-none bg-theme-bg/60 focus:border-theme-accent-sec transition-colors" 
              />
            </div>
          </div>
          <div className="mt-6">
            <button 
              onClick={handleMatch} 
              disabled={isMatching || !resumeText || !companyDescription} 
              className="w-full bg-theme-accent text-white px-8 py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 hover:brightness-110"
            >
              {isMatching ? 'Analyzing Culture Fit...' : 'Analyze Culture Match'}
            </button>
          </div>
        </div>

        {culture && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 md:col-span-4 bg-gradient-to-r from-theme-card to-theme-bg p-8 rounded-3xl shadow-md border border-theme-border flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 text-center">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-theme-border" />
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-theme-success" strokeDasharray="377" strokeDashoffset={377 - (377 * culture.culture_match_score) / 100} />
                  </svg>
                  <span className="absolute text-3xl font-black text-theme-success">{culture.culture_match_score}%</span>
                </div>
                <h3 className="text-lg font-bold mt-2">Overall Culture Match</h3>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Target className="text-theme-accent" /> AI Analysis</h3>
                <p className="text-theme-text-muted font-medium text-lg leading-relaxed italic">"{culture.explanation}"</p>
              </div>
            </div>

            <div className="bg-theme-card p-6 rounded-3xl shadow-md border border-theme-border text-center">
              <div className="bg-amber-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-sm font-bold text-theme-text-muted uppercase tracking-wider mb-2">Startup Fit</h3>
              <div className="text-4xl font-black text-theme-text mb-2">{culture.startup_fit_score}%</div>
            </div>

            <div className="bg-theme-card p-6 rounded-3xl shadow-md border border-theme-border text-center">
              <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-500">
                <Building2 size={32} />
              </div>
              <h3 className="text-sm font-bold text-theme-text-muted uppercase tracking-wider mb-2">Corporate Fit</h3>
              <div className="text-4xl font-black text-theme-text mb-2">{culture.corporate_fit_score}%</div>
            </div>

            <div className="bg-theme-card p-6 rounded-3xl shadow-md border border-theme-border text-center">
              <div className="bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-500">
                <MapPin size={32} />
              </div>
              <h3 className="text-sm font-bold text-theme-text-muted uppercase tracking-wider mb-2">Remote Ready</h3>
              <div className="text-4xl font-black text-theme-text mb-2">{culture.remote_compatibility}%</div>
            </div>
            
            <div className="bg-theme-card p-6 rounded-3xl shadow-md border border-theme-border flex items-center justify-center">
              <div className="text-center">
                <CheckCircle size={48} className="mx-auto text-theme-success mb-2" />
                <p className="font-bold">Values Aligned</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
