'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Mic, Play, RefreshCw, MessageSquare, 
  ShieldCheck, Video, StopCircle, Volume2, 
  Settings, Maximize2, User, ChevronRight,
  Headphones, Sparkles
} from 'lucide-react';

// --- AI Interviewer Component with "Perfect Motion" and Mouth Sync ---
const AIInterviewer = ({ isSpeaking }: { isSpeaking: boolean }) => {
  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-900 border-4 border-slate-800 shadow-2xl">
      {/* The AI Avatar Image */}
      <motion.img 
        src="/ai-girl-avatar.png" 
        alt="AI Recruiter Sarah"
        className="w-full h-full object-cover"
        animate={{
          scale: isSpeaking ? [1, 1.01, 1] : [1, 1.005, 1],
          y: isSpeaking ? [0, -2, 0] : [0, -1, 0],
        }}
        transition={{
          duration: isSpeaking ? 3 : 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Mouth Sync Animation Overlay */}
      {isSpeaking && (
        <div className="absolute top-[62%] left-1/2 -translate-x-1/2 w-12 h-6 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="w-6 h-3 bg-[#3d1a1a] rounded-full border-t border-red-900/30 blur-[1px]"
            animate={{ 
              scaleY: [1, 2.5, 1.2, 2, 1],
              scaleX: [1, 1.1, 0.9, 1.05, 1],
              borderRadius: ["50%", "40%", "50%", "45%", "50%"]
            }}
            transition={{ 
              duration: 0.15, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>
      )}
      
      {/* Realistic Motion Overlays */}
      <AnimatePresence>
        {!isSpeaking && (
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-black/5 pointer-events-none"
            animate={{ opacity: [0, 0, 0.1, 0, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
          />
        )}
      </AnimatePresence>

      {/* Voice Waveform when speaking */}
      {isSpeaking && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-1 h-12">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-indigo-400 rounded-full"
              animate={{ height: [10, Math.random() * 40 + 10, 10] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      )}

      {/* Interface Overlays */}
      <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-white text-[10px] font-black uppercase tracking-wider">AI Recruiter • Online</span>
      </div>
    </div>
  );
};

export default function MockInterviewPage() {
  const [step, setStep] = useState<'intro' | 'setup' | 'interview' | 'results'>('intro');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [language, setLanguage] = useState('en-US');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const languages = [
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
    { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
    { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  ];

  const translations: any = {
    'en-US': [
      "Welcome! I'm Sarah, your AI recruiter today. To start, could you tell me about yourself and your professional journey?",
      "That sounds impressive. Can you explain your approach to solving complex technical problems under pressure?",
      "How do you keep yourself updated with the latest trends and technologies in your field?",
      "Tell me about a time you had a conflict with a teammate. How did you resolve it?",
      "What are your long-term career goals, and how do you think this role aligns with them?"
    ],
    'hi-IN': [
      "नमस्ते! मैं सारा हूँ, आपकी एआई रिक्रूटर। शुरू करने के लिए, क्या आप मुझे अपने और अपने पेशेवर सफर के बारे में बता सकते हैं?",
      "यह प्रभावशाली लग रहा है। क्या आप दबाव में जटिल तकनीकी समस्याओं को हल करने के अपने दृष्टिकोण को समझा सकते हैं?",
      "आप अपने क्षेत्र के नवीनतम रुझानों और तकनीकों के साथ खुद को कैसे अपडेट रखते हैं?",
      "मुझे उस समय के बारे में बताएं जब आपका अपने टीम के साथी के साथ संघर्ष हुआ था। आपने इसे कैसे हल किया?",
      "आपके दीर्घकालिक करियर लक्ष्य क्या हैं, और आपको क्या लगता है कि यह भूमिका उनके साथ कैसे मेल खाती है?"
    ],
    'es-ES': [
      "¡Bienvenido! Soy Sarah, tu reclutadora de IA hoy. Para empezar, ¿podrías contarme sobre ti y tu trayectoria profesional?",
      "Eso suena impresionante. ¿Puedes explicar tu enfoque para resolver problemas técnicos complejos bajo presión?",
      "¿Cómo te mantienes actualizado con las últimas tendencias y tecnologías en tu campo?",
      "Cuéntame sobre alguna vez que hayas tenido un conflicto con un compañero de equipo. ¿Cómo lo resolviste?",
      "¿Cuáles son tus metas profesionales a largo plazo y cómo crees que este puesto se alinea con ellas?"
    ],
    'fr-FR': [
      "Bienvenue ! Je suis Sarah, votre recruteuse IA aujourd'hui. Pour commencer, pourriez-vous me parler de vous et de votre parcours professionnel ?",
      "Cela semble impressionnant. Pouvez-vous expliquer votre approche pour résoudre des problèmes techniques complexes sous pression ?",
      "Comment vous tenez-vous au courant des dernières tendances et technologies dans votre domaine ?",
      "Parlez-moi d'une fois où vous avez eu un conflit avec un coéquipier. Comment l'avez-vous résolu ?",
      "Quels sont vos objectifs de carrière à long terme et comment pensez-vous que ce rôle s'y aligne ?"
    ],
    'de-DE': [
      "Willkommen! Ich bin Sarah, Ihre KI-Recruiterin heute. Könnten Sie mir zu Beginn etwas über sich und Ihren beruflichen Werdegang erzählen?",
      "Das klingt beeindruckend. Können Sie Ihren Ansatz zur Lösung komplexer technischer Probleme unter Druck erläutern?",
      "Wie halten Sie sich über die neuesten Trends und Technologien in Ihrem Fachbereich auf dem Laufenden?",
      "Erzählen Sie mir von einer Situation, in der Sie einen Konflikt mit einem Teamkollegen hatten. Wie haben Sie ihn gelöst?",
      "Was sind Ihre langfristigen Karriereziele und wie passt diese Rolle Ihrer Meinung nach dazu?"
    ]
  };

  // Sync video stream whenever videoRef or step changes
  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [step]);

  // Stop Webcam
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Start User Webcam
  const startCamera = async () => {
    setStep('setup');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: true 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check permissions.");
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      window.speechSynthesis.cancel();
    };
  }, []);

  const startInterview = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const selectedQs = translations[language].map((q: string, i: number) => ({
        q,
        category: ['Introduction', 'Technical', 'Technical', 'Behavioral', 'HR'][i]
      }));
      setQuestions(selectedQs);
      setStep('interview');
      setIsGenerating(false);
      // Short delay before first question speaks
      setTimeout(() => speakQuestion(0), 1000);
    }, 2000);
  };

  const speakQuestion = (index: number) => {
    window.speechSynthesis.cancel();
    
    const text = translations[language][index];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    
    // Improved voice selection for a Girl/Female voice in specific language
    const voices = window.speechSynthesis.getVoices();
    const girlVoice = voices.find(v => 
      v.lang.startsWith(language.split('-')[0]) && 
      (v.name.toLowerCase().includes('female') || v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Samantha') || v.name.includes('Zira'))
    );
    
    if (girlVoice) {
      utterance.voice = girlVoice;
    }
    
    utterance.rate = 0.95;
    utterance.pitch = 1.1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const nextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      speakQuestion(nextIdx);
    } else {
      setStep('results');
      stopCamera();
      
      // Save interview attendance to backend
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await fetch('/api/auth/interview', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token
            },
            body: JSON.stringify({ score: 82 }) // Mocking score for now
          });
        }
      } catch (err) {
        console.error("Error saving interview results:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] pt-24 px-6 pb-12 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* --- INTRO STATE --- */}
        {step === 'intro' && (
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-indigo-500/20"
            >
              <Sparkles size={16} /> Advanced AI Human Technology
            </motion.div>
            <h1 className="text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
              Experience the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Mock Interviews</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto mb-12">
              Practice with our life-like AI human avatar. Get real-time feedback, behavioral analysis, and technical scoring.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
              {[
                { icon: Video, title: 'AI Human Avatar', desc: 'Perfect motion & realistic features' },
                { icon: Brain, title: 'Adaptive Questions', desc: 'Based on your specific resume' },
                { icon: Headphones, title: 'Voice Interaction', desc: 'Real-time conversation practice' },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2rem] bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm"
                >
                  <div className="h-12 w-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Language Selection */}
            <div className="mb-12">
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-6">Select Interview Language</p>
              <div className="flex flex-wrap justify-center gap-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all border-2 ${
                      language === lang.code 
                      ? 'bg-indigo-600 border-indigo-400 text-white scale-105 shadow-lg shadow-indigo-500/20' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={startCamera}
              className="bg-indigo-600 text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/20 hover:scale-105 active:scale-95"
            >
              Start My Video Interview
            </button>
          </div>
        )}

        {/* --- SETUP STATE --- */}
        {step === 'setup' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-[3rem] text-center">
              <h2 className="text-3xl font-black mb-8">Setup Your Workspace</h2>
              <div className="aspect-video bg-slate-900 rounded-[2rem] mb-8 overflow-hidden relative border-4 border-slate-700">
                <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover mirror" />
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-indigo-600 px-3 py-1.5 rounded-full border border-indigo-400/30">
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Language: {languages.find(l => l.code === language)?.name}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="bg-black/50 backdrop-blur-md p-3 rounded-xl border border-white/10">
                    <Settings size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <p className="text-slate-400 mb-8 font-medium">Make sure you're in a well-lit area and your microphone is working.</p>
              <button 
                onClick={startInterview}
                disabled={isGenerating}
                className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                {isGenerating ? 'AI Interviewer is joining...' : 'I\'m Ready, Let\'s Go'}
              </button>
            </div>
          </div>
        )}

        {/* --- INTERVIEW STATE --- */}
        {step === 'interview' && questions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-200px)]">
            
            {/* Left Column: AI Interviewer */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex-grow">
                <AIInterviewer isSpeaking={isSpeaking} />
              </div>
              
              {/* Question Card */}
              <motion.div 
                key={currentQuestionIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-slate-800/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                    {questions[currentQuestionIndex].category}
                  </span>
                  <span className="text-slate-500 text-xs font-bold">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 leading-tight">
                  {questions[currentQuestionIndex].q}
                </h3>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsRecording(!isRecording)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all ${
                      isRecording 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-white text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
                    {isRecording ? 'Recording Answer...' : 'Answer Now'}
                  </button>
                  <button 
                    onClick={nextQuestion}
                    className="flex items-center gap-2 bg-slate-700 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-600 transition-all"
                  >
                    Skip Question <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Column: User Feed & Controls */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="aspect-square bg-slate-900 rounded-[2.5rem] overflow-hidden relative border-4 border-slate-800 shadow-xl">
                <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover mirror" />
                <div className="absolute top-6 right-6 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-red-500/20">
                  User • Rec
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-[2.5rem] flex-grow">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">AI Behavioral Analysis</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Confidence', val: 85, color: 'bg-green-500' },
                    { label: 'Clarity', val: 72, color: 'bg-indigo-500' },
                    { label: 'Engagement', val: 90, color: 'bg-purple-500' },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span>{stat.label}</span>
                        <span>{stat.val}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.val}%` }}
                          className={`h-full ${stat.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-700/50">
                  <div className="flex items-center gap-4 text-slate-400">
                    <Volume2 size={20} />
                    <div className="flex-grow h-1 bg-slate-700 rounded-full">
                      <div className="w-2/3 h-full bg-indigo-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* --- RESULTS STATE --- */}
        {step === 'results' && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-3xl mx-auto bg-white text-slate-900 p-12 rounded-[3rem] shadow-2xl text-center"
          >
            <div className="h-20 w-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-4xl font-black mb-4">Interview Complete!</h2>
            <p className="text-slate-500 text-lg mb-12">Great job! Our AI is analyzing your performance and generating a detailed report.</p>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-slate-50 rounded-2xl">
                <p className="text-xs font-black text-slate-400 uppercase mb-2">Overall Score</p>
                <p className="text-4xl font-black text-indigo-600">82/100</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl">
                <p className="text-xs font-black text-slate-400 uppercase mb-2">Technical Proficiency</p>
                <p className="text-4xl font-black text-purple-600">High</p>
              </div>
            </div>

            <button 
              onClick={() => setStep('intro')}
              className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-200"
            >
              Back to Dashboard
            </button>
          </motion.div>
        )}

      </div>

      <style jsx global>{`
        .mirror {
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
}
