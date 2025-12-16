import { useState } from 'react';
import { Bot, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './ui/sonner';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const newErrors = { email: '', password: '' };
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    
    if (newErrors.email || newErrors.password) {
      return;
    }
    
    // Simulate login
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login Successful', {
        description: 'Welcome back to demo-1 Enterprise!',
      });
      setTimeout(() => {
        onLogin();
      }, 500);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Google Login Successful', {
        description: 'Welcome to demo-1 Enterprise!',
      });
      setTimeout(() => {
        onLogin();
      }, 500);
    }, 1000);
  };

  const handleForgotPassword = () => {
    toast.info('Password Reset', {
      description: 'Password reset link will be sent to your email.',
    });
  };

  const handleSignUp = () => {
    toast.info('Sign Up', {
      description: 'Redirecting to registration page...',
    });
  };

  const isLoginDisabled = !email || !password || isLoading;

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <Toaster theme="dark" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-[#020617] border border-[#1e293b] rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-[#2563EB] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#2563EB]/20">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-xl text-[#E5E7EB]">demo-1 Enterprise</h1>
            <p className="text-sm text-[#64748b] mt-1">AI SDR & Sales Automation</p>
          </div>
          
          {/* Title */}
          <div className="mb-6">
            <h2 className="text-2xl text-[#E5E7EB] mb-1">Login</h2>
            <p className="text-sm text-[#64748b]">Welcome back! Please enter your details.</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm text-[#E5E7EB] mb-2">
                Email or Username
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: '' });
                }}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your email"
                className={`w-full px-4 py-2.5 bg-[#0f172a] border rounded-lg text-sm text-[#E5E7EB] placeholder:text-[#475569] transition-all ${
                  errors.email
                    ? 'border-[#ef4444] focus:border-[#ef4444] focus:ring-2 focus:ring-[#ef4444]/20'
                    : focusedField === 'email'
                    ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20'
                    : 'border-[#334155] hover:border-[#475569]'
                } focus:outline-none`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-[#ef4444] flex items-center gap-1">
                  {errors.email}
                </p>
              )}
            </div>
            
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm text-[#E5E7EB] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: '' });
                  }}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-2.5 pr-10 bg-[#0f172a] border rounded-lg text-sm text-[#E5E7EB] placeholder:text-[#475569] transition-all ${
                    errors.password
                      ? 'border-[#ef4444] focus:border-[#ef4444] focus:ring-2 focus:ring-[#ef4444]/20'
                      : focusedField === 'password'
                      ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20'
                      : 'border-[#334155] hover:border-[#475569]'
                  } focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#E5E7EB] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-[#ef4444] flex items-center gap-1">
                  {errors.password}
                </p>
              )}
            </div>
            
            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-all ${
                    rememberMe
                      ? 'bg-[#2563EB] border-[#2563EB]'
                      : 'bg-[#0f172a] border-[#1e293b] group-hover:border-[#334155]'
                  }`}>
                    {rememberMe && (
                      <svg className="w-full h-full text-white p-0.5" viewBox="0 0 16 16" fill="none">
                        <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-[#E5E7EB] group-hover:text-[#2563EB] transition-colors">
                  Remember me
                </span>
              </label>
              
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[#2563EB] hover:text-[#3b82f6] hover:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>
            
            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoginDisabled}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
                isLoginDisabled
                  ? 'bg-[#1e293b] text-[#64748b] cursor-not-allowed'
                  : 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-lg shadow-[#2563EB]/20 hover:shadow-xl hover:shadow-[#2563EB]/30 active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1e293b]"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-[#020617] text-[#64748b]">Or continue with</span>
              </div>
            </div>
            
            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border transition-all ${
                isLoading
                  ? 'bg-[#0f172a] border-[#1e293b] text-[#64748b] cursor-not-allowed'
                  : 'bg-[#0f172a] border-[#1e293b] text-[#E5E7EB] hover:bg-[#1e293b] hover:border-[#334155] active:scale-[0.98]'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>
        </div>
        
        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-[#64748b]">
            Don't have an account?{' '}
            <button
              onClick={handleSignUp}
              className="text-[#2563EB] hover:text-[#3b82f6] hover:underline transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}