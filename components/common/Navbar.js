import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Navbar({ onLogout, onToggleSidebar, sidebarOpen }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      router.push('/login');
    }
  };

  const getCurrentPageTitle = () => {
    const path = router.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length >= 3) {
      const page = segments[2];
      return page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ');
    }
    return 'Dashboard';
  };

  const getUserRole = () => {
    return user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User';
  };

  const getUserInitials = () => {
    if (user?.full_name) {
      return user.full_name.split(' ').map(name => name[0]).join('').toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      {/* Left Side - Hamburger + Page Title */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu Button */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              sidebarOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
            }`}></span>
            <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
              sidebarOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              sidebarOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
            }`}></span>
          </div>
        </button>

        {/* Page Title */}
        <div>
          <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{getCurrentPageTitle()}</h1>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
            <span>•</span>
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>

      {/* Right Side - User Info & Actions */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <span className="text-lg lg:text-xl">🔔</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-2 lg:gap-3 pl-2 lg:pl-4 border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-gray-900">{user?.full_name || user?.email || 'User'}</p>
            <p className="text-xs text-gray-500">{getUserRole()}</p>
          </div>
          
          <div className="relative">
            <button className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium hover:shadow-lg transition-shadow text-sm lg:text-base">
              {getUserInitials()}
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <span className="text-lg">🚪</span>
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
