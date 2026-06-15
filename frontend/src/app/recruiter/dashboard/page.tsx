'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, FileCheck, TrendingUp, Plus, Search, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Link from 'next/link';

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

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        // Usually Next.js rewrites to backend, but we'll use API_URL env if available
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        
        const [jobsRes, appsRes] = await Promise.all([
          axios.get(`${API_BASE}/jobs/me`, { headers }),
          axios.get(`${API_BASE}/applications/recruiter`, { headers })
        ]);
        
        setJobs(jobsRes.data);
        setApplications(appsRes.data);
      } catch (err) {
        console.error('Failed to fetch recruiter dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const activeJobsCount = jobs.filter(j => j.status === 'active').length;
  const totalApplications = applications.length;
  const shortlistedCount = applications.filter(a => a.status === 'shortlisted').length;
  const interviewedCount = applications.filter(a => a.status === 'interviewed').length;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const trendsMap: Record<string, number> = { Mon:0, Tue:0, Wed:0, Thu:0, Fri:0, Sat:0, Sun:0 };
  applications.forEach(app => {
    const date = new Date(app.createdAt || Date.now());
    const dayName = days[date.getDay()];
    trendsMap[dayName]++;
  });
  
  const chartData = [
    { name: 'Mon', apps: trendsMap['Mon'] },
    { name: 'Tue', apps: trendsMap['Tue'] },
    { name: 'Wed', apps: trendsMap['Wed'] },
    { name: 'Thu', apps: trendsMap['Thu'] },
    { name: 'Fri', apps: trendsMap['Fri'] },
    { name: 'Sat', apps: trendsMap['Sat'] },
    { name: 'Sun', apps: trendsMap['Sun'] },
  ];

  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 4);

  const getRelativeTime = (dateStr: string) => {
    if (!dateStr) return 'Just now';
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diff = new Date().getTime() - new Date(dateStr).getTime();
    const hours = Math.round(diff / (1000 * 60 * 60));
    if (hours < 24) return rtf.format(-hours, 'hour');
    return rtf.format(-Math.round(hours / 24), 'day');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="font-bold text-slate-500 animate-pulse">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-6 pb-12">
      <motion.div 
        className="max-w-7xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Recruiter Dashboard</h1>
            <p className="text-slate-500 font-medium mt-1">Manage your job postings and track candidate applications.</p>
          </div>
          <Link href="/recruiter/post-job" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg">
            <Plus size={20} /> Post a New Job
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Active Jobs', value: activeJobsCount, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Total Applications', value: totalApplications, icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { label: 'Shortlisted', value: shortlistedCount, icon: FileCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Interviewed', value: interviewedCount, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts & Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-indigo-500" /> Application Trends
            </h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Bar dataKey="apps" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quick Actions / Recent activity */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Applications</h2>
            {recentApplications.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">No applications yet.</p>
            ) : (
              <div className="space-y-6">
                {recentApplications.map((app, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition">
                      {app.applicantId?.name?.[0] || 'U'}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold text-slate-800 truncate">{app.applicantId?.name || 'Unknown User'}</p>
                      <p className="text-xs text-slate-500 truncate">{app.jobId?.title || 'Unknown Job'}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-black text-emerald-500">{app.aiMatchScore ? `${app.aiMatchScore}%` : 'N/A'}</p>
                      <p className="text-[10px] text-slate-400">{getRelativeTime(app.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button className="w-full mt-8 py-3 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition">
              View All Applications
            </button>
          </motion.div>
        </div>

        {/* Manage Jobs Table */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800">Your Active Job Postings</h2>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search jobs..." 
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <button className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50">
                <Filter size={18} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-8 py-4">Job Title</th>
                  <th className="px-8 py-4">Candidates</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Posted Date</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job, i) => {
                  const jobAppsCount = applications.filter(a => a.jobId === job._id || a.jobId?._id === job._id || a.jobId?.id === job.id || a.jobId === job.id).length;
                  return (
                    <tr key={job._id || job.id || i} className="hover:bg-slate-50/50 transition">
                      <td className="px-8 py-6">
                        <p className="font-bold text-slate-800">{job.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{job.location || 'Remote'}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">{jobAppsCount}</span>
                          <span className="text-xs text-slate-400">Applications</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          job.status === 'active' 
                            ? 'bg-emerald-50 text-emerald-600' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {job.status || 'Active'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-500">
                        {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="text-indigo-600 font-bold text-sm hover:underline">View Details</button>
                      </td>
                    </tr>
                  );
                })}
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-8 text-center text-slate-500 text-sm">
                      No active job postings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
