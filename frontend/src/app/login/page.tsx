'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      if (response.data.token) {
        login(response.data.user, response.data.token);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42663-large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-10" />

      {/* Login Card */}
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/20 z-20 relative transform hover:scale-[1.01] transition-all duration-500">
        <div>
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20 rotate-3 group-hover:rotate-0 transition-transform">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 20a10.003 10.003 0 006.203-2.122l.054.09m-3.44 2.04C13.009 17.799 12 14.517 12 11V7a4 4 0 00-8 0v4M18 8a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-center text-4xl font-black text-white tracking-tighter">
            AI JobPortal
          </h2>
          <p className="mt-3 text-center text-sm text-indigo-100/70 font-medium">
            Sign in to your intelligent career workspace
          </p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-200 px-4 py-3 rounded-2xl text-xs font-bold animate-pulse text-center">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-black text-indigo-100 uppercase tracking-widest mb-2 px-1" htmlFor="email-address">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-4 bg-white/5 border border-white/10 placeholder-slate-400 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm backdrop-blur-md"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-indigo-100 uppercase tracking-widest mb-2 px-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-4 py-4 bg-white/5 border border-white/10 placeholder-slate-400 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-sm backdrop-blur-md"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white/10 rounded bg-white/5"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs text-indigo-100/70 font-medium">
                Keep me logged in
              </label>
            </div>

            <div className="text-xs">
              <a href="#" className="font-bold text-indigo-400 hover:text-indigo-300 transition">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition shadow-xl shadow-indigo-600/20 disabled:opacity-50"
            >
              {isSubmitting ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-indigo-100/50 pt-4">
          New to the platform? <Link href="/register" className="font-bold text-white hover:text-indigo-400 transition">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
