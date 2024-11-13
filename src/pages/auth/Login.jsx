import React from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const FuturisticLogin = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="min-h-screen w-screen bg-white text-stone-500 flex items-center justify-center relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -right-1/4 -bottom-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Decorative SVG Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left circuit lines */}
        <svg className="absolute top-0 left-0 w-64 h-64 opacity-30" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q40,90 80,100 T160,100"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="0.5"
            className="animate-dash"
          />
          <path
            d="M20,40 Q60,30 100,40 T180,40"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="0.5"
            className="animate-dash"
          />
        </svg>

        {/* Bottom-right geometric shapes */}
        <svg className="absolute bottom-0 right-0 w-96 h-96 opacity-30" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
          </defs>
          <circle cx="150" cy="150" r="20" fill="none" stroke="url(#gradient2)" strokeWidth="0.5" className="animate-pulse" />
          <circle cx="150" cy="150" r="30" fill="none" stroke="url(#gradient2)" strokeWidth="0.5" className="animate-pulse" />
          <circle cx="150" cy="150" r="40" fill="none" stroke="url(#gradient2)" strokeWidth="0.5" className="animate-pulse" />
        </svg>

        {/* Center decorative elements */}
        

        {/* Floating particles */}
       
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-md mx-4">
        {/* Sacred geometry inspired top decoration */}
        <svg className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        
        </svg>

        {/* Login form */}
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400 mt-2">Enter your credentials to continue</p>
          </div>

          <div className="space-y-6">
            {/* Email input */}
            <div className="space-y-2">
              <label className="text-sm text-gray-700 block">Email</label>
              <div className="relative">
                <input 
                  type="email"
                  className="w-full  px-4 py-3 bg-white/5 border border-black/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-2">
              <label className="text-sm text-gray-700 block">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  className="w-full  px-4 py-3 bg-white/5 border border-black/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors pr-10"
                  placeholder="Enter your password"
                />
                <div 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500 focus:ring-0 hover:border-none bg-white hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-blue-500" />
                <span className="text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Login button with hover effect */}
            <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 group relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
              <span className="relative text-white z-10">Sign In</span>
            </button>

            {/* Sign up link */}
            <p className="text-center text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticLogin;