'use client';

import React, { useState } from 'react';
import { Briefcase, TrendingUp, Compass, Award, Star, Search, DollarSign } from 'lucide-react';
import axios from 'axios';

export default function CareerTwinPage() {
  const [resumeText, setResumeText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [twin, setTwin] = useState<any>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/generate-twin`, {
        resume_text: resumeText
      });
      setTwin(res.data);
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
          <h1 className="text-4xl font-black text-theme-text tracking-tight">AI Career Twin</h1>
          <p className="text-theme-text-muted font-medium">Generate your digital career twin to map out your trajectory, predicted salary, and top roles.</p>
        </div>

        <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Search className="text-theme-accent" /> Resume Data</h2>
          <textarea 
            rows={4} 
            value={resumeText} 
            onChange={(e) => setResumeText(e.target.value)} 
            placeholder="Paste your raw resume text here..." 
            className="w-full border border-theme-border rounded-xl p-4 outline-none bg-theme-bg/60 focus:border-theme-accent transition-colors mb-4" 
          />
          <button 
            onClick={handleGenerate} 
            disabled={isGenerating || !resumeText} 
            className="bg-theme-accent text-white px-8 py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 hover:brightness-110"
          >
            {isGenerating ? 'Analyzing Profile...' : 'Generate Career Twin'}
          </button>
        </div>

        {twin && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-1 bg-theme-card p-8 rounded-3xl shadow-md border-t-4 border-t-theme-success border border-theme-border text-center">
              <h3 className="text-lg font-bold text-theme-text-muted mb-2">Readiness Score</h3>
              <div className="text-6xl font-black text-theme-success mb-2">{twin.readiness_score}</div>
              <p className="text-sm font-medium">out of 100</p>
            </div>
            
            <div className="col-span-1 md:col-span-2 bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><Star className="text-amber-500" /> Top Roles For You</h3>
              <div className="flex flex-wrap gap-3">
                {twin.top_roles.map((role: string, i: number) => (
                  <span key={i} className="px-4 py-2 bg-theme-bg border border-theme-border rounded-lg font-bold text-theme-text shadow-sm">{role}</span>
                ))}
              </div>
              <div className="mt-6 flex gap-6">
                <div className="flex-1">
                  <p className="text-sm text-theme-text-muted mb-1 flex items-center gap-1"><TrendingUp size={16}/> Hiring Probability</p>
                  <p className="text-xl font-black">{twin.hiring_probability}%</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-theme-text-muted mb-1 flex items-center gap-1"><DollarSign size={16}/> Expected Salary</p>
                  <p className="text-xl font-black">{twin.expected_salary}</p>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-3 bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><Compass className="text-theme-accent-sec" /> Strategic Roadmap</h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-theme-border before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-theme-bg bg-theme-accent shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md"></div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-theme-border bg-theme-bg/60 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-theme-accent">1 Year Goal</span>
                    </div>
                    <p className="text-theme-text text-sm font-medium">{twin.roadmap['1_year']}</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-theme-bg bg-theme-accent-sec shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md"></div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-theme-border bg-theme-bg/60 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-theme-accent-sec">3 Year Goal</span>
                    </div>
                    <p className="text-theme-text text-sm font-medium">{twin.roadmap['3_years']}</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-theme-bg bg-theme-success shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md"></div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-theme-border bg-theme-bg/60 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-theme-success">5 Year Goal</span>
                    </div>
                    <p className="text-theme-text text-sm font-medium">{twin.roadmap['5_years']}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
