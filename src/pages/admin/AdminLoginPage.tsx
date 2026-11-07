import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2, KeyRound, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, isAdminAuthenticated } = useApp();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const success = loginAdmin(email, password);
    if (success) {
      showToast('Welcome back, Administrator!', 'success');
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';
      navigate(from);
    } else {
      setErrorMsg('Invalid credentials. Use admin@appnova.io and password admin123, or click Auto-fill Demo.');
      showToast('Authentication failed', 'error');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@appnova.io');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Card Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-3xl bg-brand-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/25">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-appText-primary dark:text-appText-darkPrimary">
            AppNova Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-appText-secondary dark:text-appText-darkSecondary mt-1">
            Sign in to manage APK packages, releases, and store metadata
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white dark:bg-surface-darkCard rounded-3xl border border-surface-border dark:border-surface-darkBorder p-6 sm:p-8 shadow-card">
          {errorMsg && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-600 dark:text-rose-400 font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@appnova.io"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-2xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder text-appText-primary dark:text-appText-darkPrimary outline-none focus:border-brand-500"
                />
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-appText-secondary dark:text-appText-darkSecondary mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-2xl bg-slate-50 dark:bg-surface-darkSubtle border border-surface-border dark:border-surface-darkBorder text-appText-primary dark:text-appText-darkPrimary outline-none focus:border-brand-500"
                />
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md shadow-brand-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Demo Testing Mode:</span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="inline-flex items-center gap-1 font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <KeyRound className="w-3 h-3" />
                Fill Demo Credentials
              </button>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
              <p>Email: <span className="text-slate-800 dark:text-slate-200">admin@appnova.io</span></p>
              <p>Password: <span className="text-slate-800 dark:text-slate-200">admin123</span></p>
            </div>
          </div>
        </div>

        {/* Backend notice */}
        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-4">
          Integrated with AppNova local persistence engine. Ready for Firebase Authentication.
        </p>
      </div>
    </div>
  );
};
