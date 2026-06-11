'use client';

import React, { useState } from 'react';
import { TrendingUp, Search, Briefcase, ArrowRight, Target, DollarSign, BookOpen, ExternalLink, Clock, Building, LineChart } from 'lucide-react';
import axios from 'axios';

export default function CareerTrajectoryPage() {
  const [resumeText, setResumeText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [trajectory, setTrajectory] = useState<any>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/career-trajectory`, {
        resume_text: resumeText
      });
      setTrajectory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text pt-28 px-6 pb-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-black text-theme-text tracking-tight flex items-center gap-3">
            <TrendingUp className="text-theme-accent w-10 h-10" /> Predictive Career Trajectory
          </h1>
          <p className="text-theme-text-muted font-medium mt-2">
            Use market data to analyze your current skills and forecast your optimal career path.
          </p>
        </div>

        <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Search className="text-theme-accent" /> Analyze Resume</h2>
          <textarea 
            rows={4} 
            value={resumeText} 
            onChange={(e) => setResumeText(e.target.value)} 
            placeholder="Paste your raw resume text here to see your trajectory..." 
            className="w-full border border-theme-border rounded-xl p-4 outline-none bg-theme-bg/60 focus:border-theme-accent transition-colors mb-4" 
          />
          <button 
            onClick={handleGenerate} 
            disabled={isGenerating || !resumeText} 
            className="bg-theme-accent text-white px-8 py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 hover:brightness-110 flex items-center gap-2"
          >
            {isGenerating ? 'Predicting Trajectory...' : 'Predict My Future'} <ArrowRight size={18} />
          </button>
        </div>

        {trajectory && (
          <div className="space-y-8 animate-fade-in">
            {/* Trajectory Timeline Component */}
            <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Target size={200} />
              </div>
              <h3 className="text-2xl font-black mb-8">Your Trajectory</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
                
                {/* Current State */}
                <div className="flex-1 w-full bg-theme-bg/50 border border-theme-border p-6 rounded-2xl relative z-10 hover:border-theme-accent/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-theme-bg p-3 rounded-xl shadow-sm"><Briefcase className="text-theme-text-muted" /></div>
                    <div>
                      <p className="text-xs font-bold text-theme-text-muted uppercase tracking-wider">Current Role</p>
                      <h4 className="text-xl font-black">{trajectory.current_role}</h4>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-theme-border">
                     <p className="text-sm font-bold text-theme-text-muted flex items-center gap-1 mb-1"><DollarSign size={16}/> Market Salary</p>
                     <p className="text-3xl font-black text-theme-text">{trajectory.current_salary}</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex flex-col items-center justify-center shrink-0 z-10">
                   <div className="h-1 w-24 bg-gradient-to-r from-theme-border to-theme-accent rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-theme-accent rotate-45 transform translate-x-1 border-t-2 border-r-2 border-white rounded-sm"></div>
                   </div>
                   <span className="text-xs font-bold text-theme-accent mt-2 bg-theme-accent/10 px-3 py-1 rounded-full uppercase tracking-widest">+ {trajectory.missing_skills.length} Skills</span>
                </div>

                {/* Future State */}
                <div className="flex-1 w-full bg-gradient-to-br from-theme-accent/10 to-transparent border border-theme-accent/30 p-6 rounded-2xl relative z-10 shadow-lg shadow-theme-accent/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-theme-accent text-white p-3 rounded-xl shadow-md"><Target /></div>
                    <div>
                      <p className="text-xs font-bold text-theme-accent uppercase tracking-wider">Predicted Next Role</p>
                      <h4 className="text-xl font-black text-theme-accent">{trajectory.next_role}</h4>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-theme-accent/20">
                     <p className="text-sm font-bold text-theme-accent/80 flex items-center gap-1 mb-1"><DollarSign size={16}/> Potential Salary</p>
                     <p className="text-3xl font-black text-theme-success">{trajectory.future_salary}</p>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-theme-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Clock size={14} /> {trajectory.time_to_transition || "12-18 Months"}
                  </div>
                </div>
              </div>
            </div>

            {/* Deep Market Insights Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Market Outlook */}
              <div className="bg-gradient-to-br from-theme-bg to-theme-accent/5 p-8 rounded-3xl shadow-md border border-theme-accent/20">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><LineChart className="text-theme-accent" /> Market Outlook</h3>
                <p className="text-theme-text-muted text-sm mb-4">Projected industry demand growth for this role over the next 5 years.</p>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-theme-accent/10 rounded-2xl text-theme-accent">
                    <TrendingUp size={32} />
                  </div>
                  <div>
                    <p className="text-4xl font-black text-theme-success">{trajectory.demand_growth || "+21%"}</p>
                    <p className="text-sm font-bold text-theme-text-muted mt-1 uppercase tracking-wider">Growth</p>
                  </div>
                </div>
              </div>

              {/* Top Target Companies */}
              <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Building className="text-theme-accent" /> Top Target Companies</h3>
                <p className="text-theme-text-muted text-sm mb-6">These companies are actively hiring for your predicted next role.</p>
                <div className="flex flex-wrap gap-3">
                  {(trajectory.top_target_companies || ["Google", "Amazon", "Microsoft"]).map((company: string, index: number) => (
                    <span key={index} className="bg-theme-bg/80 text-theme-text font-bold px-4 py-2 rounded-xl border border-theme-border flex items-center gap-2 shadow-sm hover:border-theme-accent transition-colors">
                      <Building size={16} className="text-theme-text-muted" /> {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Missing Skills */}
              <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Target className="text-rose-500" /> The Gap (Missing Skills)</h3>
                <p className="text-theme-text-muted text-sm mb-6">To bridge the gap between your current role and your predicted next role, you need to master these skills:</p>
                <div className="flex flex-wrap gap-3">
                  {trajectory.missing_skills.map((skill: string, index: number) => (
                    <span key={index} className="bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold px-4 py-2 rounded-xl border border-rose-500/20 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rose-500"></div> {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Courses */}
              <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><BookOpen className="text-theme-accent" /> Recommended Courses</h3>
                <p className="text-theme-text-muted text-sm mb-6">Fast-track your career transition with these highly-rated affiliated courses:</p>
                <div className="space-y-4">
                  {trajectory.course_links.map((course: any, index: number) => (
                    <a 
                      key={index}
                      href={course.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="group flex items-center justify-between bg-theme-bg/60 border border-theme-border p-4 rounded-xl hover:border-theme-accent hover:bg-theme-accent/5 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-theme-bg p-2 rounded-lg group-hover:bg-theme-accent/20 transition-colors">
                           <BookOpen size={16} className="text-theme-text group-hover:text-theme-accent" />
                        </div>
                        <span className="font-bold text-theme-text group-hover:text-theme-accent transition-colors">{course.title}</span>
                      </div>
                      <ExternalLink size={16} className="text-theme-text-muted group-hover:text-theme-accent transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
