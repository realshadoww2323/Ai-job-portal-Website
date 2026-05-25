'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, FileCheck, TrendingUp, Plus, Search, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Mon', apps: 12, jobs: 2 },
  { name: 'Tue', apps: 19, jobs: 1 },
  { name: 'Wed', apps: 15, jobs: 3 },
  { name: 'Thu', apps: 22, jobs: 2 },
  { name: 'Fri', apps: 30, jobs: 4 },
  { name: 'Sat', apps: 10, jobs: 1 },
  { name: 'Sun', apps: 8, jobs: 0 },
];

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
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg">
            <Plus size={20} /> Post a New Job
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Total Applications', value: '846', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { label: 'Shortlisted', value: '42', icon: FileCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Interviewed', value: '18', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
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
                <BarChart data={data}>
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
            <div className="space-y-6">
              {[
                { name: 'Rahul Sharma', role: 'Full Stack Developer', match: '94%', time: '2h ago' },
                { name: 'Priya Patel', role: 'UX Designer', match: '88%', time: '5h ago' },
                { name: 'Anish Kumar', role: 'DevOps Engineer', match: '76%', time: '1d ago' },
                { name: 'Sneha Reddy', role: 'Frontend Developer', match: '92%', time: '1d ago' },
              ].map((app, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition">
                    {app.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{app.name}</p>
                    <p className="text-xs text-slate-500">{app.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-emerald-500">{app.match}</p>
                    <p className="text-[10px] text-slate-400">{app.time}</p>
                  </div>
                </div>
              ))}
            </div>
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
                {[
                  { title: 'Senior Software Engineer', location: 'Bangalore', apps: 124, status: 'Active', date: 'Oct 12, 2023' },
                  { title: 'Product Manager', location: 'Remote', apps: 56, status: 'Active', date: 'Oct 15, 2023' },
                  { title: 'Lead Designer', location: 'Mumbai', apps: 89, status: 'Active', date: 'Oct 18, 2023' },
                ].map((job, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition">
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-800">{job.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{job.location}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{job.apps}</span>
                        <span className="text-xs text-slate-400">Applications</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                        {job.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-500">{job.date}</td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-indigo-600 font-bold text-sm hover:underline">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
