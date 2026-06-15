'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, Zap, ShieldCheck, TrendingUp, Globe, ArrowRight, Mail, Award, CheckCircle, Users } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-8 overflow-hidden bg-gradient-to-b from-theme-bg/30 via-theme-bg/80 to-theme-bg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-theme-accent/10 text-theme-accent px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-theme-accent/20"
            >
              <Zap size={16} fill="currentColor" /> AI-Powered Career Platform
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-7xl lg:text-8xl font-black text-theme-text leading-[1.05] tracking-tight mb-8"
            >
              The Next Gen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-accent to-theme-accent-sec">Job Portal.</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-theme-text-muted font-medium max-w-xl mb-10 leading-relaxed"
            >
              Supercharge your career with AI resume optimization, mock interviews, and intelligent job matching.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              variants={itemVariants}
              className="bg-theme-card p-3 rounded-3xl shadow-xl border border-theme-border flex flex-col md:flex-row gap-2 max-w-3xl"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 text-theme-text-muted" size={20} />
                <input 
                  type="text" 
                  placeholder="Job Title, Skills, or Company" 
                  className="w-full pl-12 pr-4 py-3.5 outline-none font-medium bg-transparent text-theme-text"
                />
              </div>
              <div className="w-px h-12 bg-theme-border hidden md:block" />
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-3.5 text-theme-text-muted" size={20} />
                <input 
                  type="text" 
                  placeholder="Location (e.g., Bangalore)" 
                  className="w-full pl-12 pr-4 py-3.5 outline-none font-medium bg-transparent text-theme-text"
                />
              </div>
              <Link href="/jobs" className="bg-theme-accent text-white px-8 py-3.5 rounded-2xl font-bold hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-theme-accent/25">
                Find Jobs
              </Link>
            </motion.div>


          </motion.div>

          {/* Hero Illustration / Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative lg:block hidden"
          >
            <div className="bg-gradient-to-br from-theme-accent to-theme-accent-sec rounded-[3rem] p-1 shadow-2xl shadow-theme-accent/20 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
                alt="Dashboard Preview" 
                className="rounded-[2.8rem] opacity-75 mix-blend-overlay"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-theme-card/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-theme-border max-w-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-theme-accent rounded-2xl flex items-center justify-center text-white font-black text-xl">AI</div>
                    <div>
                      <p className="text-sm font-black text-theme-text">Career Score: 94%</p>
                      <p className="text-xs text-theme-text-muted font-bold uppercase">Highly Relevant</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-theme-bg rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '94%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-theme-accent" 
                      />
                    </div>
                    <p className="text-[10px] text-theme-text-muted font-bold leading-relaxed italic">
                      "You're in the top 5% of candidates for Full Stack roles in Bangalore."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Success Stories Section */}
      <section className="py-24 bg-theme-bg relative overflow-hidden border-t border-theme-border">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 mb-16 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-black text-theme-text tracking-tight mb-6"
          >
            Our Students Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Getting Hired</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-theme-text-muted text-xl font-medium max-w-2xl mx-auto"
          >
            Join thousands of candidates who landed jobs through our AI-powered career platform.
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative w-full flex overflow-x-hidden mb-24 group py-8">
          <motion.div 
            className="flex gap-8 px-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {[
              { name: "Arjun Sharma", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&q=80&w=200&h=200", company: "Google", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.google.com&size=128", salary: "₹25 LPA" },
              { name: "Rahul Verma", photo: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&crop=faces&q=80&w=200&h=200", company: "Microsoft", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.microsoft.com&size=128", salary: "₹18 LPA" },
              { name: "Aditya Patel", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&q=80&w=200&h=200", company: "Amazon", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.amazon.in&size=128", salary: "₹22 LPA" },
              { name: "Karan Singh", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&q=80&w=200&h=200", company: "TCS", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.tcs.com&size=128", salary: "₹8 LPA" },
              { name: "Rohan Gupta", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&crop=faces&q=80&w=200&h=200", company: "Infosys", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.infosys.com&size=128", salary: "₹12 LPA" },
              { name: "Vikram Reddy", photo: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&crop=faces&q=80&w=200&h=200", company: "Flipkart", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.flipkart.com&size=128", salary: "₹15 LPA" },
              // Duplicate for infinite scroll
              { name: "Arjun Sharma", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&q=80&w=200&h=200", company: "Google", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.google.com&size=128", salary: "₹25 LPA" },
              { name: "Rahul Verma", photo: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&crop=faces&q=80&w=200&h=200", company: "Microsoft", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.microsoft.com&size=128", salary: "₹18 LPA" },
              { name: "Aditya Patel", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&q=80&w=200&h=200", company: "Amazon", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.amazon.in&size=128", salary: "₹22 LPA" },
              { name: "Karan Singh", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&q=80&w=200&h=200", company: "TCS", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.tcs.com&size=128", salary: "₹8 LPA" },
              { name: "Rohan Gupta", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&crop=faces&q=80&w=200&h=200", company: "Infosys", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.infosys.com&size=128", salary: "₹12 LPA" },
              { name: "Vikram Reddy", photo: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&crop=faces&q=80&w=200&h=200", company: "Flipkart", logo: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.flipkart.com&size=128", salary: "₹15 LPA" }
            ].map((student, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10, scale: 1.02 }}
                className="w-80 flex-shrink-0 bg-theme-card/80 backdrop-blur-xl border border-theme-border rounded-[2rem] p-6 shadow-xl shadow-theme-accent/5 flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Placed Badge */}
                <div className="absolute top-4 right-4 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-green-500/20">
                  <CheckCircle size={12} /> Placed
                </div>

                <div className="flex items-center gap-4 mt-2">
                  <img src={student.photo} alt={student.name} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                  <div>
                    <h3 className="text-lg font-black text-theme-text">{student.name}</h3>
                    <p className="text-theme-text-muted text-sm font-bold">{student.salary}</p>
                  </div>
                </div>

                <div className="w-full h-px bg-theme-border my-2" />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm border border-gray-100">
                    <img src={student.logo} alt={student.company} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-xs text-theme-text-muted font-medium">Hired by</p>
                    <p className="text-sm font-black text-theme-text">{student.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated Counters */}
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center relative z-10">
          {[
            { label: 'Students Placed', value: '5000+', icon: Users, color: 'text-blue-500' },
            { label: 'Hiring Companies', value: '300+', icon: Briefcase, color: 'text-purple-500' },
            { label: 'Highest Package', value: '₹25 LPA', icon: Award, color: 'text-yellow-500' },
            { label: 'Success Rate', value: '95%', icon: TrendingUp, color: 'text-green-500' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-theme-card/50 backdrop-blur-sm border border-theme-border p-6 rounded-3xl shadow-lg shadow-theme-accent/5"
            >
              <stat.icon className={`mx-auto ${stat.color} mb-4`} size={36} />
              <p className="text-3xl md:text-4xl font-black text-theme-text mb-2">{stat.value}</p>
              <p className="text-xs font-bold text-theme-text-muted uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-8 bg-theme-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-theme-text tracking-tight mb-4">Built for the Modern Workforce.</h2>
            <p className="text-theme-text-muted text-lg font-medium">Advanced AI tools to help you land your dream job faster.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'AI Resume Analyzer', desc: 'Get instant feedback on your resume and optimize it for ATS systems.', color: 'bg-theme-accent' },
              { title: 'Mock Interview AI', desc: 'Practice with realistic interview scenarios based on your skills.', color: 'bg-theme-accent-sec' },
              { title: 'Skill Gap Analysis', desc: 'Identify missing skills and get personalized course recommendations.', color: 'bg-theme-success' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3rem] bg-theme-card border border-theme-border flex flex-col items-start h-full shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className={`h-12 w-12 ${feature.color} rounded-2xl mb-8 flex items-center justify-center text-white shadow-lg`}>
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-2xl font-black text-theme-text mb-4">{feature.title}</h3>
                <p className="text-theme-text-muted font-medium leading-relaxed mb-8">{feature.desc}</p>
                <Link href="/dashboard" className="mt-auto text-theme-accent font-black text-sm flex items-center gap-2 hover:gap-4 transition-all">
                  Learn More <ArrowRight size={20} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto bg-theme-card border border-theme-border rounded-[4rem] p-16 text-center text-theme-text relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-5xl font-black mb-6">Ready to upgrade your career?</h2>
            <p className="text-theme-text-muted text-lg font-medium mb-10 max-w-xl mx-auto">Join thousands of professionals using AI to build their future.</p>
            <Link href="/login" className="bg-theme-accent text-white px-12 py-5 rounded-2xl font-black text-lg hover:brightness-115 transition shadow-xl shadow-theme-accent/30 inline-block">
              Create Free Account
            </Link>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-theme-accent/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        </div>
      </section>

      {/* Footer / Support Section */}
      <footer className="py-12 border-t border-theme-border bg-theme-bg text-center">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-3 bg-theme-card px-6 py-3 rounded-full border border-theme-border shadow-sm">
            <Mail className="text-theme-accent" size={20} />
            <span className="text-theme-text font-medium">Need help or have questions?</span>
            <a href="mailto:support@yourdomain.com" className="text-theme-accent font-bold hover:underline transition-all">
              Contact Support
            </a>
          </div>
          <p className="text-theme-text-muted text-sm font-medium">
            &copy; {new Date().getFullYear()} Next Gen Job Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
