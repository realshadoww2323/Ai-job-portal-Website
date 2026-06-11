'use client';

import React, { useState } from 'react';
import { Target, FileText, ArrowRight, BookOpen, Edit3, Copy, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function CareerPivotPage() {
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pivotData, setPivotData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/career-pivot`, {
        resume_text: resumeText,
        target_role: targetRole
      });
      setPivotData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (pivotData) {
      navigator.clipboard.writeText(pivotData.rewritten_summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text pt-28 px-6 pb-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-black text-theme-text tracking-tight flex items-center gap-3">
            <Target className="text-theme-accent" size={36} /> Career Pivot Blueprint
          </h1>
          <p className="text-theme-text-muted font-medium mt-2">Transition into a new industry seamlessly. Let AI map your transferable skills and build a fast-track bridge curriculum.</p>
        </div>

        <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FileText className="text-theme-accent-sec" /> Current Resume / Bio</h2>
              <textarea 
                rows={5} 
                value={resumeText} 
                onChange={(e) => setResumeText(e.target.value)} 
                placeholder="Paste your current resume or bio here..." 
                className="w-full border border-theme-border rounded-xl p-4 outline-none bg-theme-bg/60 focus:border-theme-accent transition-colors" 
              />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Target className="text-theme-success" /> Dream Role</h2>
              <input 
                type="text" 
                value={targetRole} 
                onChange={(e) => setTargetRole(e.target.value)} 
                placeholder="e.g., Data Scientist, QA Engineer..." 
                className="w-full border border-theme-border rounded-xl p-4 outline-none bg-theme-bg/60 focus:border-theme-success transition-colors mb-6 text-xl font-bold" 
              />
              <button 
                onClick={handleGenerate} 
                disabled={isGenerating || !resumeText || !targetRole} 
                className="w-full bg-theme-accent text-white px-8 py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 hover:brightness-110"
              >
                {isGenerating ? 'Mapping Transferable Skills...' : 'Generate 8-Week Blueprint'}
              </button>
            </div>
          </div>
        </div>

        {pivotData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-theme-card to-theme-bg p-8 rounded-3xl shadow-md border border-theme-border">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><ArrowRight className="text-theme-accent" /> Transferable Skills Mapping</h3>
                <div className="space-y-4">
                  {pivotData.transferable_skills.map((skill: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 bg-theme-bg p-4 rounded-xl border border-theme-border">
                      <div className="flex-1 text-center">
                        <span className="text-sm font-bold text-theme-text-muted line-through opacity-70">{skill.old_skill}</span>
                      </div>
                      <ArrowRight size={20} className="text-theme-accent-sec" />
                      <div className="flex-1 text-center">
                        <span className="text-sm font-black text-theme-success">{skill.new_skill}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2"><Edit3 className="text-theme-accent-sec" /> Rewritten Summary</h3>
                  <button onClick={copyToClipboard} className="text-theme-text-muted hover:text-theme-accent flex items-center gap-1 text-sm font-bold transition">
                    {copied ? <CheckCircle size={16} className="text-theme-success" /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-theme-bg/80 p-6 rounded-2xl border border-theme-border relative">
                  <p className="text-theme-text font-medium leading-relaxed italic pr-4">"{pivotData.rewritten_summary}"</p>
                </div>
              </div>
            </div>

            <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><BookOpen className="text-theme-success" /> 8-Week Bridge Curriculum</h3>
              <p className="text-sm font-medium text-theme-text-muted mb-6">Fast-track your transition into {targetRole} by mastering these missing gaps.</p>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-theme-success before:to-theme-accent">
                
                {pivotData.bridge_plan.map((step: any, index: number) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-theme-bg bg-theme-text shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md"></div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-5 rounded-xl border border-theme-border bg-theme-bg/60 shadow-sm transition-transform hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-theme-text">{step.week}</span>
                      </div>
                      <p className="text-theme-text-muted text-sm font-medium">{step.task}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
