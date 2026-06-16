'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Shield, BrainCircuit, Cloud, PenTool, Users, GraduationCap, Briefcase, TrendingUp } from 'lucide-react';

const courseStats = [
  {
    name: "Full Stack Development",
    rate: 92,
    salary: "₹8 LPA",
    students: "450+",
    icon: Code,
    color: "from-blue-500 to-cyan-400",
    companies: [
      { name: "Google", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.google.com&size=128" },
      { name: "Microsoft", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.microsoft.com&size=128" },
      { name: "Amazon", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.amazon.in&size=128" }
    ]
  },
  {
    name: "Data Science",
    rate: 88,
    salary: "₹10 LPA",
    students: "320+",
    icon: Database,
    color: "from-purple-500 to-pink-500",
    companies: [
      { name: "Amazon", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.amazon.in&size=128" },
      { name: "IBM", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.ibm.com&size=128" },
      { name: "TCS", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.tcs.com&size=128" }
    ]
  },
  {
    name: "Cyber Security",
    rate: 85,
    salary: "₹9 LPA",
    students: "280+",
    icon: Shield,
    color: "from-emerald-500 to-teal-400",
    companies: [
      { name: "Microsoft", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.microsoft.com&size=128" },
      { name: "Wipro", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.wipro.com&size=128" },
      { name: "Infosys", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.infosys.com&size=128" }
    ]
  },
  {
    name: "AI & Machine Learning",
    rate: 90,
    salary: "₹12 LPA",
    students: "250+",
    icon: BrainCircuit,
    color: "from-orange-500 to-red-500",
    companies: [
      { name: "Google", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.google.com&size=128" },
      { name: "Amazon", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.amazon.in&size=128" },
      { name: "Accenture", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.accenture.com&size=128" }
    ]
  },
  {
    name: "Cloud Computing",
    rate: 87,
    salary: "₹9.5 LPA",
    students: "220+",
    icon: Cloud,
    color: "from-blue-600 to-indigo-600",
    companies: [
      { name: "Amazon", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.amazon.in&size=128" },
      { name: "Microsoft", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.microsoft.com&size=128" },
      { name: "IBM", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.ibm.com&size=128" }
    ]
  },
  {
    name: "UI/UX Design",
    rate: 82,
    salary: "₹7 LPA",
    students: "180+",
    icon: PenTool,
    color: "from-pink-500 to-rose-400",
    companies: [
      { name: "Google", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.google.com&size=128" },
      { name: "Microsoft", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.microsoft.com&size=128" },
      { name: "Accenture", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.accenture.com&size=128" }
    ]
  }
];

const overallStats = [
  { label: 'Students Trained', value: '5000+', icon: GraduationCap, color: 'text-blue-500' },
  { label: 'Students Placed', value: '1500+', icon: Users, color: 'text-purple-500' },
  { label: 'Hiring Companies', value: '300+', icon: Briefcase, color: 'text-yellow-500' },
  { label: 'Overall Placement Rate', value: '89%', icon: TrendingUp, color: 'text-green-500' },
];

export default function PlacementSuccess() {
  return (
    <section className="py-24 bg-theme-bg relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-theme-accent/10 text-theme-accent px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-theme-accent/20"
          >
            <TrendingUp size={16} fill="currentColor" /> Career Outcomes
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-theme-text tracking-tight mb-6"
          >
            Placement Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">by Course</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-theme-text-muted text-xl font-medium max-w-2xl mx-auto"
          >
            See how our students are transforming their careers and getting hired by top companies.
          </motion.p>
        </div>

        {/* Animated Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20">
          {overallStats.map((stat, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-theme-card/50 backdrop-blur-md border border-theme-border p-6 rounded-3xl shadow-lg hover:shadow-theme-accent/10 transition-shadow duration-300 flex flex-col items-center justify-center text-center group"
            >
              <div className={`p-4 rounded-full bg-white/5 border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                <stat.icon size={32} />
              </div>
              <p className="text-3xl md:text-4xl font-black text-theme-text mb-2">{stat.value}</p>
              <p className="text-xs font-bold text-theme-text-muted uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseStats.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-theme-card/80 backdrop-blur-xl border border-theme-border rounded-[2rem] p-8 shadow-xl shadow-theme-accent/5 relative overflow-hidden group flex flex-col h-full"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${course.color}`} />
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${course.color} text-white shadow-lg shadow-${course.color.split(" ")[0].replace("from-", "")}/30`}>
                  <course.icon size={26} />
                </div>
                <h3 className="text-xl font-black text-theme-text leading-tight">{course.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-theme-bg/50 p-4 rounded-2xl border border-theme-border/50">
                  <p className="text-xs text-theme-text-muted font-bold uppercase tracking-wider mb-1">Avg Salary</p>
                  <p className="text-xl font-black text-theme-text">{course.salary}</p>
                </div>
                <div className="bg-theme-bg/50 p-4 rounded-2xl border border-theme-border/50">
                  <p className="text-xs text-theme-text-muted font-bold uppercase tracking-wider mb-1">Placed</p>
                  <p className="text-xl font-black text-theme-text">{course.students}</p>
                </div>
              </div>

              <div className="mb-6 flex-grow">
                <div className="flex justify-between items-end mb-2">
                  <p className="text-sm font-bold text-theme-text">Placement Rate</p>
                  <p className="text-lg font-black text-theme-accent">{course.rate}%</p>
                </div>
                <div className="h-2.5 w-full bg-theme-bg rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${course.rate}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 + index * 0.1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-theme-border/60">
                <p className="text-xs text-theme-text-muted font-bold uppercase tracking-wider mb-3">Top Hiring Companies</p>
                <div className="flex items-center gap-3">
                  {course.companies.map((company, i) => (
                    <div key={i} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm border border-gray-100 group-hover:-translate-y-1 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} title={company.name}>
                      <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                    </div>
                  ))}
                  <div className="w-10 h-10 bg-theme-bg rounded-xl flex items-center justify-center text-xs font-bold text-theme-text-muted border border-theme-border/50 group-hover:-translate-y-1 transition-transform duration-300" style={{ transitionDelay: `150ms` }}>
                    +more
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
