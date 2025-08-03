import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { apiClient } from "../utils/api";

export default function Home() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await apiClient.login(email, password, role);
      
      if (response.success) {
        // Store user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        localStorage.setItem('isAuthenticated', 'true');
        
        console.log('Login successful:', response.user);
        
        // Redirect based on role
        router.push(`/dashboard/${role}`);
      } else {
        setError(response.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const FloatingBook = ({ delay = 0, position = "top-20 left-20" }) => (
    <div className={`absolute ${position} animate-float hidden lg:block opacity-70`} style={{ animationDelay: `${delay}s` }}>
      <svg width="54" height="42" viewBox="0 0 54 42" className="drop-shadow-lg">
        <defs>
          <linearGradient id={`bookGradient${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id={`spineGradient${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
        </defs>
        {/* Book shadow */}
        <ellipse cx="27" cy="39" rx="24" ry="3" fill="#000000" opacity="0.1" />
        {/* Book cover back */}
        <rect x="6" y="6" width="42" height="30" rx="2" fill="url(#bookGradient${delay})" stroke="#1E40AF" strokeWidth="0.5" />
        {/* Book spine with depth */}
        <rect x="0" y="8" width="8" height="26" rx="1" fill="url(#spineGradient${delay})" />
        <rect x="2" y="10" width="4" height="22" rx="0.5" fill="#1E40AF" opacity="0.7" />
        {/* Pages with realistic depth */}
        <rect x="10" y="9" width="36" height="24" rx="1" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.3" />
        <rect x="11" y="10" width="34" height="22" rx="0.5" fill="#FEFEFE" />
        {/* Page content - ruled lines */}
        <line x1="14" y1="14" x2="42" y2="14" stroke="#E5E7EB" strokeWidth="0.3" />
        <line x1="14" y1="17" x2="42" y2="17" stroke="#E5E7EB" strokeWidth="0.3" />
        <line x1="14" y1="20" x2="42" y2="20" stroke="#E5E7EB" strokeWidth="0.3" />
        <line x1="14" y1="23" x2="42" y2="23" stroke="#E5E7EB" strokeWidth="0.3" />
        <line x1="14" y1="26" x2="42" y2="26" stroke="#E5E7EB" strokeWidth="0.3" />
        <line x1="14" y1="29" x2="42" y2="29" stroke="#E5E7EB" strokeWidth="0.3" />
        {/* Margin line */}
        <line x1="16" y1="12" x2="16" y2="31" stroke="#FCA5A5" strokeWidth="0.4" />
        {/* Binding holes */}
        <circle cx="8" cy="15" r="0.8" fill="#374151" />
        <circle cx="8" cy="21" r="0.8" fill="#374151" />
        <circle cx="8" cy="27" r="0.8" fill="#374151" />
        {/* Cover highlight */}
        <rect x="8" y="8" width="16" height="2" rx="1" fill="#FFFFFF" opacity="0.3" />
      </svg>
    </div>
  );

  const FloatingPen = ({ delay = 0, position = "top-32 right-20" }) => (
    <div className={`absolute ${position} animate-bounce-slow hidden lg:block opacity-70`} style={{ animationDelay: `${delay}s` }}>
      <svg width="14" height="64" viewBox="0 0 14 64" className="drop-shadow-lg">
        <defs>
          <linearGradient id={`flatPenBody${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E879F9" />
            <stop offset="50%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#C026D3" />
          </linearGradient>
          <linearGradient id={`flatPenCap${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id={`flatPenGrip${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* Pen shadow */}
        <ellipse cx="7" cy="62" rx="5" ry="1" fill="#000000" opacity="0.1" />

        {/* Pen cap */}
        <rect x="3" y="2" width="8" height="18" rx="4" fill="url(#flatPenCap${delay})" stroke="#7C3AED" strokeWidth="0.5" />

        {/* Simple clip */}
        <rect x="11" y="6" width="2" height="10" rx="1" fill="url(#flatPenCap${delay})" />
        <circle cx="12" cy="8" r="1" fill="#FCD34D" />

        {/* Cap ring */}
        <rect x="2" y="19" width="10" height="2" rx="1" fill="#7C3AED" />

        {/* Pen body */}
        <rect x="3.5" y="21" width="7" height="28" rx="3.5" fill="url(#flatPenBody${delay})" stroke="#C026D3" strokeWidth="0.5" />

        {/* Body highlight */}
        <rect x="4" y="22" width="1.5" height="26" rx="0.75" fill="#FFFFFF" opacity="0.3" />

        {/* Grip section */}
        <rect x="4" y="49" width="6" height="8" rx="3" fill="url(#flatPenGrip${delay})" stroke="#F59E0B" strokeWidth="0.5" />

        {/* Grip texture lines */}
        <rect x="4.5" y="50" width="5" height="0.5" rx="0.25" fill="#D97706" opacity="0.6" />
        <rect x="4.5" y="52" width="5" height="0.5" rx="0.25" fill="#D97706" opacity="0.6" />
        <rect x="4.5" y="54" width="5" height="0.5" rx="0.25" fill="#D97706" opacity="0.6" />

        {/* Pen tip */}
        <polygon points="5,57 7,61 9,57" fill="#7C3AED" stroke="#6D28D9" strokeWidth="0.3" />

        {/* Ink dot */}
        <circle cx="7" cy="59" r="0.5" fill="#4C1D95" />
      </svg>
    </div>
  );

  const AnimatedTitle = () => (
    <div className="text-center mb-6 lg:mb-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent animate-pulse-slow mb-3 lg:mb-4 px-4">
        AI LMS
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-600 animate-fade-in-up px-4">
        Smart Learning, Bright Future 🎆
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <FloatingBook delay={0} position="top-10 left-4 lg:top-20 lg:left-20" />
      <FloatingBook delay={1} position="top-20 right-4 lg:top-40 lg:right-32" />
      <FloatingBook delay={2} position="bottom-20 left-4 lg:bottom-32 lg:left-32" />
      <FloatingPen delay={0.5} position="top-16 right-4 lg:top-32 lg:right-20" />
      <FloatingPen delay={1.5} position="bottom-10 right-4 lg:bottom-20 lg:right-20" />
      <FloatingPen delay={2.5} position="top-32 left-4 lg:top-60 lg:left-40" />

      {/* Educational Background Elements */}
      <div className="absolute inset-0 opacity-4 overflow-hidden">
        {/* Mathematics symbols */}
        <div className="absolute top-16 left-1/4 text-5xl lg:text-7xl text-purple-600 font-bold transform rotate-12 animate-pulse">π</div>
        <div className="absolute bottom-32 right-1/4 text-4xl lg:text-6xl text-blue-600 font-bold transform -rotate-12 animate-pulse">∑</div>
        <div className="absolute top-1/2 left-8 text-4xl lg:text-6xl text-green-600 font-bold transform rotate-45 animate-pulse">√</div>
        <div className="absolute top-1/3 right-1/3 text-3xl lg:text-5xl text-indigo-600 font-bold transform -rotate-45 animate-pulse">∫</div>
        <div className="absolute bottom-1/4 left-1/3 text-4xl lg:text-6xl text-cyan-600 font-bold transform rotate-30 animate-pulse">Δ</div>
        <div className="absolute top-3/4 right-20 text-3xl lg:text-5xl text-teal-600 font-bold transform -rotate-15 animate-pulse">α</div>
        <div className="absolute bottom-40 left-20 text-3xl lg:text-5xl text-emerald-600 font-bold transform rotate-60 animate-pulse">β</div>

        {/* Science symbols */}
        <div className="absolute top-40 right-16 text-4xl lg:text-6xl text-rose-600 font-bold transform rotate-20 animate-pulse">Ω</div>
        <div className="absolute bottom-60 right-1/3 text-3xl lg:text-5xl text-amber-600 font-bold transform -rotate-30 animate-pulse">λ</div>
        <div className="absolute top-60 left-16 text-3xl lg:text-5xl text-violet-600 font-bold transform rotate-50 animate-pulse">σ</div>
        <div className="absolute top-80 right-40 text-4xl lg:text-6xl text-pink-600 font-bold transform -rotate-25 animate-pulse">ω</div>
        <div className="absolute bottom-80 left-40 text-3xl lg:text-5xl text-lime-600 font-bold transform rotate-75 animate-pulse">θ</div>

        {/* Additional mathematical operators */}
        <div className="absolute top-24 right-1/4 text-3xl lg:text-5xl text-purple-500 font-bold transform rotate-35 animate-pulse">���</div>
        <div className="absolute bottom-24 left-1/4 text-3xl lg:text-5xl text-blue-500 font-bold transform -rotate-40 animate-pulse">≥</div>
        <div className="absolute top-2/3 right-12 text-3xl lg:text-5xl text-green-500 font-bold transform rotate-55 animate-pulse">≤</div>
        <div className="absolute bottom-1/3 right-8 text-3xl lg:text-5xl text-red-500 font-bold transform -rotate-20 animate-pulse">∞</div>

        {/* Geometric shapes */}
        <div className="absolute top-12 right-12 w-14 h-14 lg:w-20 lg:h-20 border-3 border-pink-300 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-16 left-12 w-10 h-10 lg:w-16 lg:h-16 border-2 border-orange-300 transform rotate-45 animate-bounce"></div>
        <div className="absolute top-1/4 left-1/2 w-12 h-12 lg:w-18 lg:h-18 border-3 border-cyan-300 transform rotate-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/2 w-8 h-16 lg:w-12 lg:h-24 border-2 border-emerald-300 transform -rotate-15 animate-bounce"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 lg:p-4">
        {!showLogin ? (
          // Welcome Screen
          <div className="text-center max-w-4xl mx-auto animate-fade-in w-full">
            <AnimatedTitle />

            <div className="mb-6 lg:mb-8">
              <p className="text-base sm:text-lg text-gray-700 mb-4 lg:mb-6 leading-relaxed px-4">
                Your personalized learning experience awaits. Join thousands of students in mastering new skills.
              </p>

              {/* Quick Access Badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 px-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
                  📚 Interactive Lessons
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                  🎯 Skill Assessments
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                  🏆 Certificates
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium border border-orange-200">
                  👥 Study Groups
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                <button
                  onClick={() => setShowLogin(true)}
                  className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse-gentle text-sm lg:text-base"
                >
                  Start Learning! 📚
                </button>
              </div>

              {/* Admin Access */}
              <div className="mt-6 lg:mt-8 border-t border-gray-200/50 px-4">
                <button
                  onClick={() => { setRole("admin"); setShowLogin(true); }}
                  className="group flex items-center gap-2 lg:gap-3 mx-auto px-4 lg:px-6 py-2.5 lg:py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-xs lg:text-sm"
                >
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <span className="text-xs lg:text-sm">🔐</span>
                  </div>
                  <span>Administrator Access</span>
                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-red-400 rounded-full animate-pulse"></div>
                </button>
              </div>
            </div>

            {/* LMS Stats Section */}
            <div className="mt-8 lg:mt-12 px-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-white/30 hover:bg-white/70 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-1">25+</div>
                  <div className="text-xs lg:text-sm text-gray-600 font-medium">Schools</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-white/30 hover:bg-white/70 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">5K+</div>
                  <div className="text-xs lg:text-sm text-gray-600 font-medium">Students</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-white/30 hover:bg-white/70 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-1">150+</div>
                  <div className="text-xs lg:text-sm text-gray-600 font-medium">Teachers</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center border border-white/30 hover:bg-white/70 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-1">98%</div>
                  <div className="text-xs lg:text-sm text-gray-600 font-medium">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Login Form
          <div className="w-full max-w-md mx-auto animate-slide-in px-4">
            <div className={`${role === 'admin' ? 'bg-slate-50/90 border-slate-300/50' : 'bg-white/80 border-white/20'} backdrop-blur-lg p-6 lg:p-8 rounded-3xl shadow-2xl border transition-all duration-300`}>
              {/* Back Button */}
              <button
                onClick={() => setShowLogin(false)}
                className="mb-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back to Home
              </button>

              <div className="text-center mb-4 lg:mb-6">
                <div className={`w-12 h-12 lg:w-16 lg:h-16 ${role === 'admin' ? 'bg-gradient-to-br from-slate-700 to-slate-900' : 'bg-gradient-to-br from-purple-500 to-pink-500'} rounded-full mx-auto mb-3 lg:mb-4 flex items-center justify-center animate-bounce-gentle transition-all duration-300`}>
                  <span className="text-xl lg:text-2xl text-white">
                    {role === 'admin' ? '🔐' : '🎓'}
                  </span>
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1 lg:mb-2">
                  {role === 'admin' ? 'Admin Portal' : 'Welcome Back!'}
                </h2>
                <p className="text-gray-600 text-sm lg:text-base px-2">
                  {role === 'admin' ? 'Access system analytics and database management' : 'Sign in to continue your learning adventure'}
                </p>
              </div>

              {isLoading ? (
                // Loading Animation
                <div className="text-center py-8">
                  <div className="relative">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-3 lg:mb-4">
                      <div className="absolute inset-0 border-3 lg:border-4 border-purple-200 rounded-full"></div>
                      <div className="absolute inset-0 border-3 lg:border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <div className="animate-pulse">
                      <div className="text-base lg:text-lg font-semibold text-gray-700 mb-1 lg:mb-2">Getting things ready...</div>
                      <div className="text-xs lg:text-sm text-gray-500">Loading your dashboard 📚</div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
                    <select
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="student">🎓 Student</option>
                      <option value="teacher">👩‍🏫 Teacher</option>
                      <option value="admin">🔐 Administrator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm animate-shake">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full ${role === 'admin' ? 'bg-gradient-to-r from-slate-700 to-slate-900' : 'bg-gradient-to-r from-purple-500 to-pink-500'} text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? (role === 'admin' ? 'Accessing Admin Portal...' : 'Signing In...') : (role === 'admin' ? 'Access Admin Dashboard' : 'Sign In to AI LMS')}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
