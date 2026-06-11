'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChevronLeft, PlayCircle, CheckCircle2, Circle, HelpCircle, Award, Download, Hexagon } from 'lucide-react';

export default function CourseLearnPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [moduleAnswers, setModuleAnswers] = useState<Record<number, Record<number, string>>>({});
  const [moduleTaskAnswers, setModuleTaskAnswers] = useState<Record<number, string>>({});
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const isCourseComplete = course?.modules && course.modules.length > 0 && 
    course.modules.every((_: any, idx: number) => completedModules.includes(idx));

  const activeModule = course?.modules && course.modules[activeModuleIndex];
  const quizAnswers = moduleAnswers[activeModuleIndex] || {};
  const taskAnswer = moduleTaskAnswers[activeModuleIndex] || '';
  const taskWordsCount = taskAnswer.trim().split(/\s+/).filter(w => w.length > 0).length;
  const quizSubmitted = completedModules.includes(activeModuleIndex);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${params.id}`);
        setCourse(response.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchCourse();
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Course not found.</div>;
  }

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    if (quizSubmitted) return;
    setModuleAnswers(prev => ({
      ...prev,
      [activeModuleIndex]: {
        ...(prev[activeModuleIndex] || {}),
        [questionIndex]: option
      }
    }));
  };

  const handleQuizSubmit = () => {
    if (!completedModules.includes(activeModuleIndex)) {
      setCompletedModules(prev => [...prev, activeModuleIndex]);
    }
  };

  const calculateScore = () => {
    if (!activeModule?.questions) return 0;
    let score = 0;
    activeModule.questions.forEach((q: any, idx: number) => {
      if (quizAnswers[idx] === q.answer) score++;
    });
    return score;
  };

  const downloadCertificate = async () => {
    setIsGeneratingPdf(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');
      
      const certNode = document.getElementById('certificate-node');
      if (!certNode) return;

      const canvas = await html2canvas(certNode, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${course.name.replace(/\s+/g, '_')}_Certificate.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pt-20">
      {/* Sidebar */}
      <div className="w-full md:w-80 bg-white border-r border-slate-200 h-[calc(100vh-5rem)] overflow-y-auto flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <button onClick={() => router.push('/courses')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition font-medium mb-4">
            <ChevronLeft size={16} /> Back to Courses
          </button>
          <h2 className="text-xl font-black text-slate-900">{course.name}</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">{course.provider}</p>
        </div>
        <div className="flex-1 py-4">
          <h3 className="px-6 text-xs font-black uppercase tracking-wider text-slate-400 mb-4">Course Modules</h3>
          {course.modules?.map((mod: any, idx: number) => (
            <button
              key={idx}
              onClick={() => {
                setShowCertificate(false);
                setActiveModuleIndex(idx);
              }}
              className={`w-full text-left px-6 py-4 flex items-start gap-3 transition-colors ${(!showCertificate && activeModuleIndex === idx) ? 'bg-indigo-50 border-r-4 border-indigo-600' : 'hover:bg-slate-50 border-r-4 border-transparent'}`}
            >
              {completedModules.includes(idx) ? (
                <CheckCircle2 size={20} className="text-emerald-500 mt-0.5 flex-shrink-0" />
              ) : (!showCertificate && activeModuleIndex === idx) ? (
                <PlayCircle size={20} className="text-indigo-600 mt-0.5 flex-shrink-0" />
              ) : (
                <Circle size={20} className="text-slate-300 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <span className={`block font-bold ${(!showCertificate && activeModuleIndex === idx) ? 'text-indigo-900' : 'text-slate-700'}`}>
                  Module {idx + 1}: {mod.title}
                </span>
                <span className="text-xs font-medium text-slate-500 mt-1 block">
                  {mod.questions?.length || 0} Questions
                </span>
              </div>
            </button>
          ))}
          {(!course.modules || course.modules.length === 0) && (
            <div className="px-6 text-slate-500 text-sm">No modules available for this course yet.</div>
          )}
          
          {/* Below modules mapping */}
          {course.modules && course.modules.length > 0 && (
            <div className="mt-8 border-t border-slate-100 pt-4">
              <button
                disabled={!isCourseComplete}
                onClick={() => {
                  setShowCertificate(true);
                  setActiveModuleIndex(-1);
                }}
                className={`w-full text-left px-6 py-4 flex items-center gap-3 transition-colors ${showCertificate ? 'bg-amber-50 border-r-4 border-amber-500' : 'hover:bg-slate-50 border-r-4 border-transparent'} ${!isCourseComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={!isCourseComplete ? "Complete all assignments to unlock your certificate" : "Claim your certificate"}
              >
                <div className="bg-amber-100 text-amber-600 p-2 rounded-xl flex-shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <span className={`block font-bold ${showCertificate ? 'text-amber-900' : 'text-slate-700'}`}>
                    Claim Certificate
                  </span>
                  <span className="text-xs font-medium text-slate-500 mt-1 block">
                    {isCourseComplete ? "Final Step" : "Locked (Complete all modules)"}
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-[calc(100vh-5rem)] overflow-y-auto">
        {showCertificate ? (
          <div className="max-w-4xl mx-auto p-6 md:p-10 pb-20">
            {!certificateGenerated ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl max-w-lg mx-auto mt-10">
                <div className="text-center mb-8">
                  <div className="bg-amber-100 text-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award size={32} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Get Your Certificate</h2>
                  <p className="text-slate-500 mt-2 font-medium">Please enter your details exactly as you want them to appear on your certificate.</p>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none transition text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={candidateEmail}
                      onChange={(e) => setCandidateEmail(e.target.value)}
                      placeholder="e.g. jane@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none transition text-slate-900"
                    />
                  </div>
                  <button 
                    disabled={!candidateName.trim() || !candidateEmail.trim()}
                    onClick={() => setCertificateGenerated(true)}
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-indigo-200"
                  >
                    Generate Certificate
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mt-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Congratulations, {candidateName}!</h3>
                    <p className="text-slate-500 font-medium">Your certificate is ready to be downloaded.</p>
                  </div>
                  <button
                    onClick={downloadCertificate}
                    disabled={isGeneratingPdf}
                    className="bg-amber-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-600 transition flex items-center gap-2 shadow-lg shadow-amber-200 disabled:opacity-50"
                  >
                    {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'} <Download size={18} />
                  </button>
                </div>

                {/* The Certificate Template */}
                <div className="overflow-x-auto pb-4">
                  <div 
                    id="certificate-node" 
                    className="min-w-[800px] w-full max-w-4xl mx-auto bg-[#faf8f5] border-[12px] border-double border-slate-800 p-12 relative shadow-2xl aspect-[1.414/1] flex flex-col justify-center items-center text-center"
                  >
                    <div className="absolute top-0 left-0 w-full h-full border-[24px] border-amber-600/10 pointer-events-none" />
                    
                    {/* Company Logo / Symbol */}
                    <div className="absolute top-12 left-12 flex items-center gap-3 opacity-90">
                      <Hexagon size={48} className="text-indigo-700 fill-indigo-100" strokeWidth={1.5} />
                      <div className="text-left">
                        <p className="font-black text-slate-900 leading-none tracking-widest uppercase text-2xl">NexaTech</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Education</p>
                      </div>
                    </div>

                    <Award size={72} className="text-amber-500 mb-6 mt-4" />
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-widest uppercase mb-4 text-center leading-tight">Certificate of Completion</h1>
                    <div className="w-24 h-1 bg-amber-500 mb-8" />
                    
                    <p className="text-xl text-slate-500 italic mb-4 font-serif">This is to proudly certify that</p>
                    <h2 className="text-5xl font-black text-slate-800 mb-6 capitalize">{candidateName}</h2>
                    
                    <p className="text-xl text-slate-500 italic mb-4 font-serif">has successfully completed the course</p>
                    <h3 className="text-3xl font-bold text-indigo-700 mb-12 uppercase tracking-wide px-10 text-center">{course.name}</h3>
                    
                    <div className="flex justify-between w-full max-w-2xl mt-8 px-8">
                      <div className="text-center">
                        <div className="border-b-2 border-slate-800 w-48 mb-2 pb-2">
                          <span className="font-serif italic text-2xl text-slate-800">Future Steps</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Platform</p>
                      </div>
                      <div className="text-center">
                        <div className="border-b-2 border-slate-800 w-48 mb-2 pb-2">
                          <span className="text-lg text-slate-800 font-medium">{new Date().toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Date</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : activeModule ? (
          <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-10">
            
            {/* Video Player Section */}
            <section className="space-y-6">
              <h1 className="text-3xl font-black text-slate-900">Module {activeModuleIndex + 1}: {activeModule.title}</h1>
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border-4 border-slate-900">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={activeModule.videoUrl || course.videoUrl} 
                  title={`${activeModule.title} Video`}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </section>

            {/* Quiz Section */}
            {activeModule.questions && activeModule.questions.length > 0 && (
              <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                  <div className="bg-indigo-100 text-indigo-600 p-3 rounded-2xl">
                    <HelpCircle size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Knowledge Check</h2>
                    <p className="text-slate-500 font-medium">Test your understanding of this module.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {activeModule.questions.map((q: any, qIdx: number) => (
                    <div key={qIdx} className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-800">
                        <span className="text-indigo-600 mr-2">Q{qIdx + 1}.</span>
                        {q.question}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((option: string, oIdx: number) => {
                          const isSelected = quizAnswers[qIdx] === option;
                          const isCorrect = option === q.answer;
                          
                          let optionClass = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700";
                          if (isSelected) optionClass = "border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-600";
                          
                          if (quizSubmitted) {
                            if (isCorrect) {
                              optionClass = "border-emerald-500 bg-emerald-50 text-emerald-900";
                            } else if (isSelected && !isCorrect) {
                              optionClass = "border-red-500 bg-red-50 text-red-900";
                            } else {
                              optionClass = "border-slate-200 opacity-50 bg-slate-50 text-slate-500";
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleAnswerSelect(qIdx, option)}
                              disabled={quizSubmitted}
                              className={`p-4 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between ${optionClass}`}
                            >
                              <span>{option}</span>
                              {quizSubmitted && isCorrect && <CheckCircle2 size={18} className="text-emerald-600" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  {quizSubmitted ? (
                    <div className="text-lg font-bold text-slate-800 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200">
                      Score: <span className="text-indigo-600">{calculateScore()}</span> / {activeModule.questions.length}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </section>
            )}

            {/* Written Task Section */}
            <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                <div className="bg-purple-100 text-purple-600 p-3 rounded-2xl">
                  <Hexagon size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Module Task</h2>
                  <p className="text-slate-500 font-medium">Complete the written assignment below.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800">
                  {activeModule.task?.question || `Write a short reflection on what you have learned about ${activeModule?.title || 'this topic'} and how you plan to apply it.`} <span className="text-indigo-600 ml-1">[Max 200 words]</span>
                </h3>
                <textarea
                  value={taskAnswer}
                  onChange={(e) => {
                    if (quizSubmitted) return;
                    setModuleTaskAnswers(prev => ({ ...prev, [activeModuleIndex]: e.target.value }));
                  }}
                  disabled={quizSubmitted}
                  placeholder="Write your answer here..."
                  className={`w-full h-40 p-4 rounded-xl border-2 transition text-slate-900 outline-none resize-none
                    ${quizSubmitted ? 'bg-slate-50 border-slate-200 text-slate-600' : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600'}
                    ${taskWordsCount > 200 ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                />
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className={taskWordsCount > 200 ? 'text-red-500 font-bold' : 'text-slate-500'}>
                    Words: {taskWordsCount} / 200
                  </span>
                  {taskWordsCount > 200 && <span className="text-red-500">Exceeds word limit</span>}
                </div>
              </div>
            </section>

            {/* Submit Module CTA */}
            <div className="pt-2 flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              {quizSubmitted ? (
                <div className="text-lg font-bold text-slate-800 bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 size={20} /> Module Completed
                </div>
              ) : (
                <div className="text-slate-500 font-medium">Complete all assignments to submit</div>
              )}
              <button
                onClick={handleQuizSubmit}
                disabled={
                  quizSubmitted || 
                  (activeModule.questions?.length > 0 && Object.keys(quizAnswers).length !== activeModule.questions.length) ||
                  (activeModule.task && (taskWordsCount === 0 || taskWordsCount > 200))
                }
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition disabled:opacity-50 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed"
              >
                {quizSubmitted ? 'Completed' : 'Submit Module'}
              </button>
            </div>

            {/* Next Module CTA */}
            {activeModuleIndex < (course.modules?.length || 0) - 1 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm mt-8">
                <div>
                  <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-1">Up Next</h3>
                  <p className="text-xl font-black text-slate-900">{course.modules[activeModuleIndex + 1].title}</p>
                </div>
                <button 
                  onClick={() => {
                    setActiveModuleIndex(prev => prev + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                >
                  Next Module <ChevronLeft size={20} className="rotate-180" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500 font-medium">
            Select a module from the sidebar to start learning.
          </div>
        )}
      </div>
    </div>
  );
}
