import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-light-bg flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-[1080px] bg-white rounded-[15px] shadow-lg p-8 md:p-16 relative overflow-hidden">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/d837776fb8fbf164d51f0b732ffc1a5d24867063?width=440"
            alt="GLC Logo"
            className="w-[220px] h-[171px] object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-center text-[36px] font-bold text-navy-dark tracking-[-0.72px] mb-4">
          WELCOME BACK
        </h1>

        {/* Subtitle */}
        <p className="text-center text-[24px] font-light text-black tracking-[-0.48px] mb-8">
          Please insert your details to login
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full h-[75px] px-8 rounded-xl bg-gray-input text-[26px] font-light text-gray-text tracking-[-0.52px] placeholder:text-gray-text focus:outline-none focus:ring-2 focus:ring-navy-dark transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full h-[75px] px-8 rounded-xl bg-gray-input text-[26px] font-light text-gray-text tracking-[-0.52px] placeholder:text-gray-text focus:outline-none focus:ring-2 focus:ring-navy-dark transition-all"
            />
          </div>

          {/* Login Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-[221px] h-[73px] rounded-xl bg-navy-dark text-white text-[34px] font-bold tracking-[-0.68px] hover:bg-navy-darker transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center pt-4">
            <a
              href="#"
              className="text-[24px] font-light text-navy-dark tracking-[-0.48px] hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
