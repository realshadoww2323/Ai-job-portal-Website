'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { LogOut, Layout, Briefcase, BookOpen, Mic, Palette, Settings, HelpCircle, Phone, FileText, ChevronDown, Target, TrendingUp, Users, Zap } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-theme-card/85 backdrop-blur-md border-b border-theme-border py-4 px-8 flex justify-between items-center z-50 transition-all duration-300">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="bg-gradient-to-tr from-theme-accent to-theme-accent-sec text-white p-2.5 rounded-2xl shadow-lg shadow-theme-accent/20 group-hover:shadow-theme-accent/40 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:rotate-3">
          <Briefcase size={22} className="stroke-[2.5]" />
        </div>
        <span className="text-xl font-black tracking-tight text-theme-text flex items-center">
        Future<span className="text-theme-accent">Steps</span>
        </span>
      </Link>

      <div className="flex gap-6 items-center">
        {/* Public Links */}
        <Link href="/jobs" className="text-sm font-bold text-theme-text-muted hover:text-theme-accent transition flex items-center gap-1">
          <Briefcase size={16} /> Explore Jobs
        </Link>

        {/* Private Links - Seekers */}
        {user && user.role === 'seeker' && (
          <>
            <Link href="/dashboard" className="text-sm font-bold text-theme-text-muted hover:text-theme-accent transition flex items-center gap-1">
              <Layout size={16} /> Dashboard
            </Link>
            
            <Link href="/dashboard/career-trajectory" className="text-sm font-bold text-theme-text-muted hover:text-theme-accent transition flex items-center gap-1">
              <TrendingUp size={16} /> Trajectory
            </Link>

            <Link href="/dashboard/career-pivot" className="text-sm font-bold text-theme-text-muted hover:text-theme-accent transition flex items-center gap-1">
              <Target size={16} /> Career Pivot
            </Link>
            
            <Link href="/interview" className="text-sm font-bold text-theme-text-muted hover:text-theme-accent transition flex items-center gap-1">
              <Mic size={16} /> Mock Interview
            </Link>
            <Link href="/courses" className="text-sm font-bold text-theme-text-muted hover:text-theme-accent transition flex items-center gap-1">
              <BookOpen size={16} /> Courses
            </Link>
            <Link href="/mentorship" className="text-sm font-bold text-theme-text-muted hover:text-theme-accent transition flex items-center gap-1">
              <Users size={16} /> Mentors
            </Link>
            <Link href="/freelance" className="text-sm font-bold text-theme-text-muted hover:text-theme-accent transition flex items-center gap-1">
              <Zap size={16} /> Gigs
            </Link>
          </>
        )}

        {/* Private Links - Recruiter */}
        {user && user.role === 'recruiter' && (
          <Link href="/recruiter/dashboard" className="text-sm font-bold text-theme-text-muted hover:text-theme-accent transition flex items-center gap-1">
            <Layout size={16} /> Recruiter Dashboard
          </Link>
        )}

        {/* Private Links - Admin */}
        {user && user.role === 'admin' && (
          <Link href="/admin/dashboard" className="text-sm font-bold text-theme-text-muted hover:text-theme-accent transition flex items-center gap-1">
            <Layout size={16} /> Admin Dashboard
          </Link>
        )}

        {/* Theme Selector */}
        {user && (
          <div className="flex items-center gap-1.5 bg-theme-bg/60 text-theme-text border border-theme-border p-1.5 rounded-xl shadow-inner ml-2">
            <Palette size={14} className="text-theme-accent" />
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value as any)}
              className="bg-transparent text-xs font-bold outline-none cursor-pointer pr-1 text-theme-text"
            >
              <option value="light" className="bg-white text-slate-900">✨ Light</option>
              <option value="cyber" className="bg-slate-900 text-slate-100">🌌 Cyber</option>
              <option value="luxury" className="bg-slate-950 text-amber-400 font-bold">👑 Luxury</option>
              <option value="earth" className="bg-stone-100 text-stone-900">🌱 Earth</option>
            </select>
          </div>
        )}

        {!user ? (
          <div className="flex gap-4 items-center">
            <Link href="/login" className="text-theme-text-muted hover:text-theme-accent px-3 py-2 text-sm font-bold transition">
              Login
            </Link>
            <Link href="/register" className="bg-theme-accent text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition shadow-md shadow-theme-accent/20">
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4 border-l border-theme-border pl-6 relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-3 cursor-pointer hover:bg-theme-bg/50 p-2 rounded-xl transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex flex-col items-end">
                <p className="text-xs font-black text-theme-text uppercase">{user.name}</p>
                <p className="text-[10px] font-bold text-theme-text-muted uppercase tracking-widest">{user.role}</p>
              </div>
              <ChevronDown size={16} className={`text-theme-text-muted transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-theme-card border border-theme-border rounded-2xl shadow-xl overflow-hidden flex flex-col z-50">
                <Link href="/settings" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-theme-text hover:bg-theme-bg transition">
                  <Settings size={16} className="text-theme-accent" /> Settings
                </Link>
                <Link href="/settings?tab=help" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-theme-text hover:bg-theme-bg transition">
                  <HelpCircle size={16} className="text-theme-accent-sec" /> Help Option
                </Link>
                <Link href="/settings?tab=contact" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-theme-text hover:bg-theme-bg transition">
                  <Phone size={16} className="text-theme-success" /> Contact Info
                </Link>
                <Link href="/settings?tab=terms" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-theme-text hover:bg-theme-bg transition border-b border-theme-border">
                  <FileText size={16} className="text-theme-text-muted" /> Terms
                </Link>
                <button 
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition text-left"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
