"use client"
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';

interface LoginCredentials {
  email: string;
  password: string;
}

const AdminLoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!credentials.email.trim()) {
      setError('Email is required');
      return;
    }

    if (!credentials.password.trim()) {
      setError('Password is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (credentials.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Demo credentials
    if (credentials.email === 'admin@bloghub.com' && credentials.password === 'admin123') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsLoggedIn(true);
        if (rememberMe) {
          localStorage.setItem('rememberEmail', credentials.email);
        }
      }, 1500);
    } else {
      setError('Invalid email or password. Try admin@bloghub.com / admin123');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Login Successful!</h2>
            <p className="text-gray-400 mb-6">Welcome back, Admin</p>
            <p className="text-gray-500 text-sm">Redirecting to dashboard...</p>
          </div>
          <div className="pt-4">
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.7s' }}></div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/50">
                A
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              BlogHub Admin
            </h1>
            <p className="text-gray-400 text-sm">Sign in to your admin account</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  placeholder="admin@example.com"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition disabled:opacity-50"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-gray-800 border border-gray-700 cursor-pointer accent-purple-500"
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-3 font-medium transition flex items-center justify-center gap-2 group mt-6"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-800"></div>
            <span className="text-xs text-gray-600">Demo Credentials</span>
            <div className="flex-1 h-px bg-gray-800"></div>
          </div>

          {/* Demo Credentials Info */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 space-y-2">
            <p className="text-xs font-medium text-purple-300 mb-2">Use these credentials to test:</p>
            <div className="space-y-1 text-xs text-gray-300 font-mono">
              <p>Email: <span className="text-purple-300">admin@bloghub.com</span></p>
              <p>Password: <span className="text-purple-300">admin123</span></p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-400">
            <p>Don't have an account? <a href="#" className="text-purple-400 hover:text-purple-300 transition font-medium">Contact Admin</a></p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center text-xs text-gray-600 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <span>Secure connection • SSL/TLS encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;