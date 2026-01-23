import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

interface NavItem {
  label: string;
  path: string;
  roles?: string[];
}

const navItems: NavItem[] = [
  { label: 'DASHBOARD', path: '/dashboard' },
  { label: 'ADMINS', path: '/admins', roles: ['super_admin'] },
  { label: 'SCHOLARS', path: '/scholars' },
  { label: 'RULES', path: '/rules' },
  { label: 'ACTIVITY LOGS', path: '/activity-logs' },
  { label: 'REPORTS', path: '/reports', roles: ['admin'] },
  { label: 'MAINTENANCE', path: '/maintenance', roles: ['admin'] },
];

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredNavItems = navItems.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role || '');
  });

  return (
    <div className="w-[260px] h-screen bg-navy-dark flex flex-col fixed left-0 top-0 font-inter">
      {/* Logo */}
      <div className="p-4">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/5bd11ce555a2253f69d4a1dd49c1b971b3c5d71d?width=458"
          alt="GLC Logo"
          className="w-[229px] h-[178px] object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-8">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                block w-full px-10 py-3 text-white text-[16px] font-bold tracking-[-0.32px] 
                transition-colors relative
                ${isActive ? 'bg-blue-active' : 'hover:bg-blue-active/50'}
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-0 h-full w-[260px] bg-blue-active" />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile - Bottom */}
      <div className="p-4 border-t border-white/10 relative">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="w-full text-left text-white hover:bg-white/10 p-2 rounded transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold truncate">{user?.name}</div>
              <div className="text-xs text-white/70 truncate">{user?.email}</div>
            </div>
          </div>
        </button>

        {/* Profile Menu */}
        {showProfileMenu && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-navy-text rounded-lg shadow-lg overflow-hidden">
            <Link
              to="/profile"
              className="block px-4 py-3 text-white hover:bg-white/10 transition-colors text-sm"
              onClick={() => setShowProfileMenu(false)}
            >
              Profile Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors text-sm border-t border-white/10"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
