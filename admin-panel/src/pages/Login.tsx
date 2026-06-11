import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldAlert, Lock, Mail, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data?.user?.role === 'admin') {
        localStorage.setItem('token', response.data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Access denied. Admin privileges required.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white font-sans relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-[2rem] shadow-2xl p-8 relative z-10"
      >
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-slate-800/80 p-4 rounded-2xl mb-6 shadow-inner border border-slate-700/50"
          >
            <ShieldAlert size={36} className="text-indigo-400" />
          </motion.div>
          <h1 className="text-3xl font-black mb-2 tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Admin Portal</h1>
          <p className="text-slate-400 text-sm font-medium mb-8">Secure gateway to the platform console.</p>

          <form onSubmit={handleLogin} className="w-full space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Mail size={14} className="text-indigo-400" /> Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700/50 px-4 py-3.5 rounded-xl text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                  placeholder="admin@company.com"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Lock size={14} className="text-indigo-400" /> Password
                </label>
                <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700/50 pl-4 pr-12 py-3.5 rounded-xl text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.div 
              initial={false}
              animate={{ height: error ? 'auto' : 0, opacity: error ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="bg-rose-500/10 text-rose-400 text-sm font-bold p-4 rounded-xl border border-rose-500/20 flex items-center gap-2">
                <ShieldAlert size={16} />
                {error}
              </div>
            </motion.div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2 disabled:opacity-70 mt-4 group"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Authenticating...
                </>
              ) : (
                <>
                  Secure Login <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
