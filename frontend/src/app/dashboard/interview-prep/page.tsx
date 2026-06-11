'use client';

import React, { useState } from 'react';
import { Play, FileText, CheckCircle, AlertCircle, BarChart3, Mic } from 'lucide-react';
import axios from 'axios';

export default function InterviewPrepPage() {
  const [resumeText, setResumeText] = useState('');
  const [atsScore, setAtsScore] = useState(75);
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const [pitchMode, setPitchMode] = useState('Professional');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [pitch, setPitch] = useState<any>(null);

  const handlePredict = async () => {
    setIsPredicting(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/predict-interview-success`, {
        resume_text: resumeText,
        ats_score: atsScore
      });
      setPrediction(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleGeneratePitch = async () => {
    setIsGeneratingPitch(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}/generate-pitch`, {
        resume_text: resumeText,
        mode: pitchMode
      });
      setPitch(res.data.elevator_pitch);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingPitch(false);
    }
  };

  const handlePlayAudio = () => {
    if (!pitch) return;
    const utterance = new SpeechSynthesisUtterance(pitch);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text pt-28 px-6 pb-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-black text-theme-text tracking-tight">Interview Success Predictor</h1>
          <p className="text-theme-text-muted font-medium">Predict your chances in technical and HR rounds, and generate an AI Elevator Pitch.</p>
        </div>

        <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FileText className="text-theme-accent" /> Resume Data</h2>
              <textarea 
                rows={5} 
                value={resumeText} 
                onChange={(e) => setResumeText(e.target.value)} 
                placeholder="Paste your raw resume text here..." 
                className="w-full border border-theme-border rounded-xl p-4 outline-none bg-theme-bg/60 focus:border-theme-accent transition-colors" 
              />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><BarChart3 className="text-theme-success" /> Current ATS Score</h2>
              <input 
                type="number" 
                value={atsScore} 
                onChange={(e) => setAtsScore(Number(e.target.value))} 
                className="w-full border border-theme-border rounded-xl p-4 outline-none bg-theme-bg/60 focus:border-theme-success transition-colors mb-4 text-2xl font-black text-theme-text" 
              />
              <button 
                onClick={handlePredict} 
                disabled={isPredicting || !resumeText} 
                className="w-full bg-theme-accent text-white px-8 py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 hover:brightness-110"
              >
                {isPredicting ? 'Analyzing Odds...' : 'Predict Interview Success'}
              </button>
            </div>
          </div>
        </div>

        {prediction && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-theme-card p-6 rounded-3xl shadow-md border border-theme-border text-center">
                <h3 className="text-sm font-bold text-theme-text-muted uppercase tracking-wider mb-2">Technical Round</h3>
                <div className="text-5xl font-black text-theme-accent mb-2">{prediction.technical_round_success}%</div>
              </div>
              <div className="bg-theme-card p-6 rounded-3xl shadow-md border border-theme-border text-center">
                <h3 className="text-sm font-bold text-theme-text-muted uppercase tracking-wider mb-2">HR Round</h3>
                <div className="text-5xl font-black text-theme-accent-sec mb-2">{prediction.hr_round_success}%</div>
              </div>
              <div className="bg-theme-card p-6 rounded-3xl shadow-md border-2 border-theme-success text-center">
                <h3 className="text-sm font-bold text-theme-success uppercase tracking-wider mb-2">Overall Selection</h3>
                <div className="text-6xl font-black text-theme-success">{prediction.overall_probability}%</div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-theme-card p-8 rounded-3xl shadow-md border border-theme-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><CheckCircle className="text-theme-success" /> Strengths & Recommendations</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-theme-text-muted mb-2">Strengths Detected:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm font-medium">
                      {prediction.strengths.map((s: string, i: number) => <li key={i} className="text-theme-success">{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-theme-text-muted mb-2">Areas to Improve:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm font-medium">
                      {prediction.weaknesses.map((w: string, i: number) => <li key={i} className="text-rose-500">{w}</li>)}
                    </ul>
                  </div>
                  <div className="bg-theme-bg p-4 rounded-xl border border-theme-border">
                    <h4 className="font-bold text-sm text-theme-text-muted mb-2">Actionable Advice:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm font-medium">
                      {prediction.recommendations.map((r: string, i: number) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-theme-card to-theme-bg p-8 rounded-3xl shadow-lg border border-theme-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Mic className="text-theme-accent" /> AI Elevator Pitch Generator</h3>
                <div className="flex gap-4 mb-4">
                  {['Formal', 'Professional', 'Fresher'].map(mode => (
                    <button 
                      key={mode} 
                      onClick={() => setPitchMode(mode)}
                      className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${pitchMode === mode ? 'bg-theme-accent text-white' : 'bg-theme-bg border border-theme-border hover:border-theme-accent'}`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handleGeneratePitch} 
                  disabled={isGeneratingPitch || !resumeText} 
                  className="bg-theme-text text-theme-bg px-6 py-3 rounded-xl font-bold w-full mb-4 disabled:opacity-50"
                >
                  {isGeneratingPitch ? 'Generating Pitch...' : 'Generate 30-Sec Pitch'}
                </button>

                {pitch && (
                  <div className="relative bg-theme-bg/80 p-6 rounded-2xl border border-theme-border">
                    <button onClick={handlePlayAudio} className="absolute top-4 right-4 bg-theme-accent text-white p-2 rounded-full hover:scale-110 transition-transform">
                      <Play size={20} className="ml-1" />
                    </button>
                    <p className="text-theme-text font-medium leading-relaxed pr-12 italic">"{pitch}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
