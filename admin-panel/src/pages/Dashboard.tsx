'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Users, Briefcase, ShieldAlert, Activity, Search, MoreHorizontal, 
  Settings, Ban, CheckCircle, Moon, Sun, Lock, Bell, Server, X, 
  LogOut, LayoutDashboard, Database, BarChart3, Menu, MapPin
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', users: 400, jobs: 240 },
  { name: 'Feb', users: 800, jobs: 400 },
  { name: 'Mar', users: 1200, jobs: 600 },
  { name: 'Apr', users: 2100, jobs: 1100 },
  { name: 'May', users: 3400, jobs: 1800 },
  { name: 'Jun', users: 5000, jobs: 2400 },
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

export default function AdminDashboard() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [users, setUsers] = React.useState<any[]>([]);
  const [jobs, setJobs] = React.useState<any[]>([]);
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [applications, setApplications] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>({
    totalUsers: 0,
    totalJobs: 0,
    totalCourses: 0,
    interviewsAttended: 0
  });
  const [loading, setLoading] = React.useState(true);
  
  const navigate = useNavigate();

  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/admin/login');
          return;
        }

        const config = {
          headers: { 'x-auth-token': token }
        };

        const [usersRes, statsRes, jobsRes, bookingsRes, applicationsRes] = await Promise.all([
          axios.get('/api/admin/users', config),
          axios.get('/api/admin/stats', config),
          axios.get('/api/jobs'),
          axios.get('/api/admin/bookings', config).catch(() => ({ data: [] })),
          axios.get('/api/admin/applications', config).catch(() => ({ data: [] }))
        ]);

        if (usersRes.data) {
          setUsers(usersRes.data);
        }
        if (statsRes.data) {
          setStats(statsRes.data);
        }
        if (jobsRes.data) {
          setJobs(jobsRes.data);
        }
        if (bookingsRes.data) {
          setBookings(bookingsRes.data);
        }
        if (applicationsRes.data) {
          setApplications(applicationsRes.data);
        }
      } catch (error) {
        console.error('Failed to fetch real-time admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'projects', label: 'Projects / Records', icon: Database },
    { id: 'bookings', label: 'Session Bookings', icon: Activity },
    { id: 'applications', label: 'Job Applications', icon: Briefcase },
    { id: 'interviews', label: 'Interview Attendees', icon: CheckCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-500 font-sans text-slate-900 dark:text-white">
      
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-2xl z-20 sticky top-0 h-screen"
          >
            <div className="p-8 flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <ShieldAlert className="text-white" size={24} />
              </div>
              <h2 className="text-xl font-black tracking-tight">Admin Portal</h2>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                    activeTab === item.id 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-inner">
                  A
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate">Super Admin</p>
                  <p className="text-xs text-slate-500 truncate">admin@platform.com</p>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl font-bold transition-all"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-2xl font-black capitalize tracking-tight">{activeTab.replace('-', ' ')}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search everything..." 
                className="pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-48 focus:w-64"
              />
            </div>
            
            <button className="relative p-2.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          
          {/* Dashboard Overview Tab */}
          {activeTab === 'dashboard' && (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Users', value: stats.totalUsers || users.length, icon: Users, color: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-500/10' },
                  { label: 'Total Projects', value: stats.totalJobs || jobs.length, icon: Briefcase, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-500/10' },
                  { label: 'System Records', value: stats.totalCourses, icon: Database, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-500/10' },
                  { label: 'Active Sessions', value: '1,204', icon: Activity, color: 'from-rose-500 to-orange-500', bg: 'bg-rose-500/10' },
                ].map((stat, i) => (
                  <motion.div key={i} variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-3xl font-black mt-2">{stat.value.toLocaleString()}</p>
                      </div>
                      <div className={`p-4 rounded-2xl ${stat.bg} text-slate-700 dark:text-white group-hover:scale-110 transition-transform`}>
                        <stat.icon size={28} />
                      </div>
                    </div>
                    <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <motion.div variants={itemVariants} className="lg:col-span-3 bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800">
                  <h2 className="text-xl font-bold mb-6">Recent Activity Engine</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { user: 'Arjun Mehra', action: 'created a new project', time: '2 mins ago', icon: Database, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                      { user: 'Sarah Wilson', action: 'updated system settings', time: '1 hour ago', icon: Settings, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                      { user: 'Tech Innovations', action: 'uploaded 50 new records', time: '3 hours ago', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                      { user: 'System', action: 'automated backup completed', time: '5 hours ago', icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    ].map((act, i) => (
                      <div key={i} className="flex flex-col gap-4 items-start p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <div className={`p-3 rounded-xl ${act.bg} ${act.color}`}>
                          <act.icon size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            <span className="font-bold text-slate-900 dark:text-white">{act.user}</span> {act.action}
                          </p>
                          <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest">{act.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* User Management Tab */}
          {activeTab === 'users' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black">Real-time User Records</h2>
                  <p className="text-slate-500 text-sm mt-1">Manage all registered users and their roles across the project.</p>
                </div>
                <div className="bg-indigo-500/10 text-indigo-500 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                  <Activity size={18} className="animate-pulse" /> Live Sync Active
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">User Details</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">System Role</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Associated Projects</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
                      <tr key={idx} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-inner">
                              {(user.name || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{user.name || 'Anonymous User'}</p>
                              <p className="text-xs text-slate-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full ${user.role === 'admin' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                            {user.role || 'Member'}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium">
                            <Database size={16} className="text-indigo-500" />
                            {user.role === 'recruiter' ? 'Active Posters' : 'Project Applicants'}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-500">
                            <MoreHorizontal size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && !loading && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-500">No real-time users found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Projects / Records Tab */}
          {activeTab === 'projects' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-8">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-black">Real-time Project Records</h2>
                    <p className="text-slate-500 text-sm mt-1">Live feed of all jobs, courses, and project data in the system.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map((job, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 hover:border-indigo-500/50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-500">
                          <Briefcase size={20} />
                        </div>
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                          Active
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                      <p className="text-sm text-slate-500 mb-4">{job.company}</p>
                      <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location || 'Remote'}</span>
                        <span className="flex items-center gap-1"><Users size={14} /> applicants</span>
                      </div>
                    </div>
                  ))}
                  {jobs.length === 0 && !loading && (
                    <div className="col-span-3 text-center py-12 text-slate-500">No project records available in the database.</div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-black">Mentorship Session Bookings</h2>
                <p className="text-slate-500 text-sm mt-1">Live feed of all mentorship sessions booked across the platform.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Mentor Details</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">User Contact</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Schedule</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Discussion Topic</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, idx) => (
                      <tr key={idx} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-8 py-5">
                           <p className="font-bold text-slate-900 dark:text-white">{booking.mentorName}</p>
                           <p className="text-xs text-slate-500">{booking.price}</p>
                        </td>
                        <td className="px-8 py-5 text-slate-600 dark:text-slate-300">{booking.email}</td>
                        <td className="px-8 py-5 text-slate-500">{new Date(booking.datetime).toLocaleString()}</td>
                        <td className="px-8 py-5 text-sm text-slate-500 max-w-xs truncate">{booking.topic}</td>
                      </tr>
                    ))}
                    {bookings.length === 0 && !loading && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-500">No mentorship bookings found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-black">Job Applications</h2>
                <p className="text-slate-500 text-sm mt-1">Live feed of all applications submitted for jobs and projects.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Job Details</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Applicant</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Match Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, idx) => (
                      <tr key={idx} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-8 py-5">
                          <p className="font-bold text-slate-900 dark:text-white">{app.jobId?.title || app.gigTitle}</p>
                          <p className="text-xs text-slate-500">{app.jobId?.company || app.gigCompany || 'Company'}</p>
                        </td>
                        <td className="px-8 py-5 text-slate-600 dark:text-slate-300">
                          <p className="font-bold text-slate-900 dark:text-white">{app.applicantId?.name || 'Applicant'}</p>
                          <p className="text-xs text-slate-500">{app.applicantId?.email || 'N/A'}</p>
                        </td>
                        <td className="px-8 py-5 font-medium text-emerald-500 capitalize">{app.status || 'Applied'}</td>
                        <td className="px-8 py-5 text-sm text-slate-500 max-w-xs truncate">{app.aiMatchScore ? `${app.aiMatchScore}%` : 'N/A'}</td>
                      </tr>
                    ))}
                    {applications.length === 0 && !loading && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-500">No job applications found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Interviews Tab */}
          {activeTab === 'interviews' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-black">Interview Attendees</h2>
                <p className="text-slate-500 text-sm mt-1">Live feed of all users who have attended interviews.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">User Details</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Interview Date</th>
                      <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter((user) => user.interviewStatus?.attended).map((user, idx) => (
                      <tr key={idx} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-8 py-5">
                          <p className="font-bold text-slate-900 dark:text-white">{user.name || 'Anonymous User'}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </td>
                        <td className="px-8 py-5 text-slate-600 dark:text-slate-300">{user.interviewStatus?.lastAttendedAt ? new Date(user.interviewStatus.lastAttendedAt).toLocaleString() : 'N/A'}</td>
                        <td className="px-8 py-5 font-medium text-emerald-500">{user.interviewStatus?.score || 'N/A'}</td>
                      </tr>
                    ))}
                    {users.filter((user) => user.interviewStatus?.attended).length === 0 && !loading && (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-slate-500">No users have attended interviews yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Analytics Graph Tab */}
          {activeTab === 'analytics' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h2 className="text-3xl font-black">Real-time Analytics Engine</h2>
                    <p className="text-slate-500 font-medium mt-2">Visualizing user growth and project records dynamically.</p>
                  </div>
                  <div className="flex gap-4 text-xs font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-2xl">
                    <div className="flex items-center gap-2 text-indigo-500">
                      <div className="h-3 w-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" /> Active Users
                    </div>
                    <div className="flex items-center gap-2 text-rose-400">
                      <div className="h-3 w-3 rounded-full bg-rose-400 shadow-lg shadow-rose-400/50" /> Project Records
                    </div>
                  </div>
                </div>
                <div className="h-[500px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorUsersAna" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorJobsAna" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fb7185" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 'bold' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 'bold' }} dx={-10} />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '1.5rem', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          backgroundColor: 'rgba(15, 23, 42, 0.95)',
                          backdropFilter: 'blur(12px)',
                          color: '#fff',
                          padding: '1.5rem',
                          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                      />
                      <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorUsersAna)" />
                      <Area type="monotone" dataKey="jobs" stroke="#fb7185" strokeWidth={4} fillOpacity={1} fill="url(#colorJobsAna)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab Content */}
          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-8">Platform Settings</h2>
              
              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Appearance</h3>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <div className="flex items-center gap-4">
                      {isDarkMode ? <Moon className="text-indigo-500" /> : <Sun className="text-amber-500" />}
                      <div>
                        <p className="font-bold">Dark Mode</p>
                        <p className="text-xs text-slate-500">Currently locked to dark mode for premium feel</p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-indigo-600 rounded-full relative opacity-50 cursor-not-allowed">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Security</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                      <Lock className="text-slate-500" />
                      <div className="flex-1">
                        <p className="font-bold mb-2">Change Admin Password</p>
                        <div className="flex gap-2">
                          <input 
                            type="password" 
                            placeholder="New Admin Password"
                            className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors"
                          />
                          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          )}

        </main>
      </div>
    </div>
  );
}
