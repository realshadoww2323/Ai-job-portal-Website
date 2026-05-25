'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, ShieldAlert, Activity, Search, MoreHorizontal, Settings, Ban, CheckCircle, Moon, Sun, Lock, Bell, Server, X } from 'lucide-react';
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
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [maintenanceMode, setMaintenanceMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [newPassword, setNewPassword] = React.useState('');
  const [users, setUsers] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>({
    totalUsers: 0,
    totalJobs: 0,
    totalCourses: 0,
    interviewsAttended: 0
  });
  const [loading, setLoading] = React.useState(true);

  // Initialize theme from localStorage
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('adminTheme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const [usersRes, statsRes] = await Promise.all([
          fetch('/api/admin/users', { headers: { 'x-auth-token': token } }),
          fetch('/api/admin/stats', { headers: { 'x-auth-token': token } })
        ]);

        if (usersRes.ok && statsRes.ok) {
          const usersData = await usersRes.json();
          const statsData = await statsRes.json();
          setUsers(usersData);
          setStats(statsData);
        }
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('adminTheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('adminTheme', 'light');
    }
  };


  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password updated successfully in Mock System!');
    setNewPassword('');
  };

  const handleGenerateReport = () => {
    // Generate CSV for Platform Growth
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "PLATFORM GROWTH REPORT\n";
    csvContent += "Month,Total Users,Total Jobs\n";
    data.forEach(row => {
      csvContent += `${row.name},${row.users},${row.jobs}\n`;
    });

    csvContent += "\nRECENT USERS\n";
    csvContent += "Name,Email,Role,Status,Joined Date\n";
    const users = [
      { name: 'Arjun Mehra', email: 'arjun@example.com', role: 'Seeker', status: 'Verified', date: 'Oct 20, 2023' },
      { name: 'Tech Innovations Ltd', email: 'hr@techinn.com', role: 'Recruiter', status: 'Pending', date: 'Oct 19, 2023' },
      { name: 'Sarah Wilson', email: 'sarah.w@example.com', role: 'Seeker', status: 'Verified', date: 'Oct 18, 2023' },
      { name: 'Global Solutions', email: 'admin@globalsol.in', role: 'Recruiter', status: 'Verified', date: 'Oct 17, 2023' },
    ];
    users.forEach(u => {
      csvContent += `${u.name},${u.email},${u.role},${u.status},${u.date}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AI_JobPortal_Report_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 px-6 pb-12 transition-colors duration-500">

      <motion.div 
        className="max-w-7xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Admin Console</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Platform overview, user management, and system settings.</p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-2 shadow-sm"
            >
              <Settings size={20} /> System Settings
            </button>

            <button 
              onClick={handleGenerateReport}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg"
            >
              Generate Report
            </button>
          </div>
        </motion.div>

        {/* Settings Modal */}
        <AnimatePresence>
          {isSettingsOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border dark:border-slate-800"
              >

                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                    <Settings className="text-indigo-600" size={24} />
                    <h2 className="text-2xl font-black tracking-tight">System Settings</h2>
                  </div>

                  <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-white rounded-xl transition">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                  {/* Theme Section */}
                  <section>
                    <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Appearance</h3>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">

                      <div className="flex items-center gap-4">
                        {isDarkMode ? <Moon className="text-indigo-600" /> : <Sun className="text-amber-500" />}
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">Dark Mode</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Switch between light and dark themes</p>
                        </div>

                      </div>
                      <button 
                        onClick={toggleDarkMode}
                        className={`w-14 h-8 rounded-full transition-colors relative ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                      >

                        <motion.div 
                          animate={{ x: isDarkMode ? 26 : 4 }}
                          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm" 
                        />
                      </button>
                    </div>
                  </section>

                  {/* Security Section */}
                  <section>
                    <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Security</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <Lock size={16} /> Change Admin Password
                        </label>

                        <div className="flex gap-2">
                          <input 
                            type="password" 
                            placeholder="New Admin Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl text-sm outline-none focus:border-indigo-600 transition"
                          />

                          <button type="submit" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition">
                            Update
                          </button>
                        </div>
                      </div>
                    </form>
                  </section>

                  {/* System Controls */}
                  <section>
                    <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">System Control</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent dark:border-slate-800">

                        <div className="flex items-center gap-4">
                          <Server className="text-slate-500" />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">Maintenance Mode</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Temporarily disable platform access</p>
                          </div>

                        </div>
                        <button 
                          onClick={() => setMaintenanceMode(!maintenanceMode)}
                          className={`w-14 h-8 rounded-full transition-colors relative ${maintenanceMode ? 'bg-rose-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                        >
                          <motion.div 
                            animate={{ x: maintenanceMode ? 26 : 4 }}
                            className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm" 
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent dark:border-slate-800">

                        <div className="flex items-center gap-4">
                          <Bell className="text-slate-500" />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">Email Notifications</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Notify users on job matches</p>
                          </div>

                        </div>
                        <button 
                          onClick={() => setNotifications(!notifications)}
                          className={`w-14 h-8 rounded-full transition-colors relative ${notifications ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                        >

                          <motion.div 
                            animate={{ x: notifications ? 26 : 4 }}
                            className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm" 
                          />
                        </button>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="p-8 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">

                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-indigo-500' },
            { label: 'Active Jobs', value: stats.totalJobs, icon: Briefcase, color: 'text-blue-500' },
            { label: 'Total Courses', value: stats.totalCourses, icon: Activity, color: 'text-emerald-500' },
            { label: 'Interviews Attended', value: stats.interviewsAttended, icon: ShieldAlert, color: 'text-rose-500' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
            >

              <div className="flex items-center gap-4">
                <div className={`${stat.color} bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl`}>
                  <stat.icon size={28} />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Growth Chart */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Platform Growth (Last 6 Months)</h2>

            <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2 text-indigo-500">
                <div className="h-3 w-3 rounded-full bg-indigo-500" /> Users
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <div className="h-3 w-3 rounded-full bg-blue-400" /> Jobs
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#1e293b" : "#f1f5f9"} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#64748b' : '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#64748b' : '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                    color: isDarkMode ? '#ffffff' : '#000000'
                  }}
                />

                <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="jobs" stroke="#60a5fa" strokeWidth={3} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* User Management */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">User Activity Log</h2>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl text-sm outline-none w-64 focus:border-indigo-500 transition"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">

                <tr>
                  <th className="px-8 py-5">User</th>
                  <th className="px-8 py-5">Role</th>
                  <th className="px-8 py-5">Last Online</th>
                  <th className="px-8 py-5">Interview</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                {users.map((user, i) => {
                  const isOnline = user.lastLogin && (new Date().getTime() - new Date(user.lastLogin).getTime() < 300000); // Online if active in last 5 mins
                  return (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition group">

                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-full ${isOnline ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'} flex items-center justify-center font-bold text-sm relative`}>
                            {user.name[0]}
                            {isOnline && <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />}
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{user.name}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">{user.email}</p>
                          </div>

                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-600 dark:text-slate-400 font-medium capitalize">{user.role}</td>

                      <td className="px-8 py-5">
                        <span className="text-xs text-slate-500 font-medium">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${user.interviewStatus?.attended ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                          {user.interviewStatus?.attended ? `Attended (${user.interviewStatus.score})` : 'Pending'}
                        </span>
                      </td>

                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                          <button className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {users.length === 0 && !loading && (
              <div className="p-12 text-center text-slate-400">
                No user data available.
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
