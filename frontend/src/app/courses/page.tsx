'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Star, Clock, Award, Filter, Search, ChevronRight, X, Play, CheckCircle2, Map } from 'lucide-react';

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

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 }
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
        setDisplayedCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        // Fallback to minimal mock if API fails
        const fallback = [
          {
            _id: '1',
            name: 'AWS Certified Cloud Practitioner',
            provider: 'Amazon Web Services',
            duration: '20 hours',
            level: 'Beginner',
            rating: 4.8,
            skills: ['Cloud Computing', 'AWS'],
            category: 'Cloud',
            roadmap: ['Introduction', 'Core Services', 'Security', 'Billing']
          }
        ];
        setCourses(fallback);
        setDisplayedCourses(fallback);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setDisplayedCourses(courses);
      return;
    }
    const lowerQ = searchQuery.toLowerCase();
    const filtered = courses.filter(c => 
      c.name?.toLowerCase().includes(lowerQ) || 
      c.category?.toLowerCase().includes(lowerQ) ||
      c.provider?.toLowerCase().includes(lowerQ) ||
      c.skills?.some((s: string) => s.toLowerCase().includes(lowerQ))
    );
    setDisplayedCourses(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-6 pb-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Courses & Certifications</h1>
          <p className="text-slate-500 font-medium mt-2">Upskill yourself with AI-recommended professional learning paths.</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for courses, skills, or providers..." 
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-900"
              />
            </div>
            <button onClick={handleSearch} className="px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition shadow-sm">
              Search
            </button>
          </div>
          <button className="px-6 py-3.5 bg-white border border-slate-200 rounded-2xl flex items-center gap-2 font-bold text-slate-700 hover:bg-slate-50 transition">
            <Filter size={20} /> Category
          </button>
          <button className="px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
            AI Recommended
          </button>
        </div>

        {/* Course Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayedCourses.map((course, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col"
            >
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl">
                    <BookOpen size={24} />
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-black">
                    <Star size={14} fill="currentColor" /> {course.rating}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition mb-2">
                  {course.name}
                </h3>
                <p className="text-slate-500 text-sm font-medium mb-6">{course.provider}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {course.skills.map((skill: string, idx: number) => (
                    <span key={idx} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-100">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-slate-500 text-sm font-medium border-t border-slate-50 pt-6">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" /> {course.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-slate-400" /> {course.level}
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                <button 
                  onClick={() => setSelectedCourse(course)}
                  className="w-full bg-white border border-slate-200 text-slate-800 py-3 rounded-xl font-bold group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  View Roadmap <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Roadmap Modal */}
        <AnimatePresence>
          {selectedCourse && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCourse(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl flex flex-col"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md z-20 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-200">
                      <Map size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 leading-tight">{selectedCourse.name}</h2>
                      <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">{selectedCourse.provider} Roadmap</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                  >
                    <X size={28} />
                  </button>
                </div>

                <div className="p-8 space-y-12">
                  {/* Demo Video Section */}
                  <section>
                    <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                      <Play className="text-red-500" fill="currentColor" /> Demo & Introduction
                    </h3>
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border-4 border-slate-900">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={selectedCourse.videoUrl} 
                        title="Course Demo" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  </section>

                  {/* Roadmap Steps */}
                  <section>
                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                      <ChevronRight className="text-indigo-600" /> Learning Path Breakdown
                    </h3>
                    <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                      {selectedCourse.roadmap.map((step: string, idx: number) => (
                        <div key={idx} className="relative pl-12">
                          <div className="absolute left-0 top-0 w-8 h-8 bg-white border-2 border-indigo-600 rounded-full flex items-center justify-center z-10 shadow-sm">
                            <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                          </div>
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
                            <p className="text-slate-800 font-bold text-lg">{step}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <CheckCircle2 size={14} className="text-emerald-500" />
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Core Module {idx + 1}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Modal Footer */}
                <div className="p-8 bg-slate-50/50 border-t border-slate-100">
                  <a 
                    href={`/courses/${selectedCourse._id}/learn`}
                    className="w-full block text-center bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Start Learning Now
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Learning Roadmap CTA */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-black mb-4">Don't know where to start?</h2>
            <p className="text-indigo-100 text-lg font-medium mb-8">Let our AI Career Assistant build a personalized learning roadmap based on your current skills and target job.</p>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition shadow-lg">
              Generate AI Roadmap
            </button>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/3 bg-white/10 skew-x-12 translate-x-20" />
          <Award className="absolute -bottom-10 -right-10 h-64 w-64 text-white/5 rotate-12" />
        </motion.div>
      </div>
    </div>
  );
}
