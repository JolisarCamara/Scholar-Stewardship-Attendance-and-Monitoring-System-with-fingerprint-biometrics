import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface Stats {
  totalScholars: number;
  totalAdmins: number;
  totalSuperAdmins: number;
}

interface SuperAdmin {
  id: number;
  name: string;
  email: string;
}

export default function Dashboard() {
  const { token, user } = useAuth();
  const [stats, setStats] = useState<Stats>({ totalScholars: 0, totalAdmins: 0, totalSuperAdmins: 0 });
  const [superAdmins, setSuperAdmins] = useState<SuperAdmin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, superAdminsRes] = await Promise.all([
        fetch('/api/scholars/stats', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        user?.role === 'super_admin' 
          ? fetch('/api/super-admins', {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve(null),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (superAdminsRes && superAdminsRes.ok) {
        const superAdminsData = await superAdminsRes.json();
        setSuperAdmins(superAdminsData.superAdmins || []);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this super admin?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admins/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to delete super admin:', error);
    }
  };

  return (
    <DashboardLayout title={user?.role === 'super_admin' ? 'SUPER ADMIN DASHBOARD' : 'DASHBOARD'}>
      {/* Stats Cards */}
      <div className="flex gap-6 mb-12">
        {/* Total Scholars */}
        <div className="w-[302px] h-[133px] bg-white rounded-xl p-6 shadow-sm">
          <div className="text-[20px] font-light text-gray-medium tracking-[-0.4px] mb-3">
            TOTAL SCHOLARS
          </div>
          <div className="text-[32px] font-bold text-black tracking-[-0.64px]">
            {stats.totalScholars}
          </div>
        </div>

        {/* Total Admins */}
        <div className="w-[302px] h-[133px] bg-white rounded-xl p-6 shadow-sm">
          <div className="text-[20px] font-light text-gray-medium tracking-[-0.4px] mb-3">
            TOTAL ADMINS
          </div>
          <div className="text-[32px] font-bold text-black tracking-[-0.64px]">
            {stats.totalAdmins}
          </div>
        </div>

        {/* Total Super Admins */}
        {user?.role === 'super_admin' && (
          <div className="w-[302px] h-[133px] bg-white rounded-xl p-6 shadow-sm">
            <div className="text-[20px] font-light text-gray-medium tracking-[-0.4px] mb-3">
              TOTAL SUPER ADMINS
            </div>
            <div className="text-[32px] font-bold text-black tracking-[-0.64px]">
              {stats.totalSuperAdmins}
            </div>
          </div>
        )}
      </div>

      {/* Super Admin Accounts Section - Only for Super Admins */}
      {user?.role === 'super_admin' && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[24px] font-bold text-gray-muted tracking-[-0.48px]">
              MANAGE SUPER ADMIN ACCOUNTS  ⚙
            </h2>
            <Link
              to="/create-admin"
              className="px-6 py-3 bg-gold text-white text-[23px] font-bold tracking-[-0.46px] rounded-lg hover:bg-gold/90 transition-colors"
            >
              + Create New Scholar
            </Link>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-[800px] h-[60px] bg-white rounded-lg px-5 flex items-center mb-8 shadow-sm">
            <input
              type="text"
              placeholder="Search by  Name or Email"
              className="flex-1 text-[20px] font-bold text-gray-muted tracking-[-0.4px] bg-transparent placeholder:text-gray-muted focus:outline-none"
            />
          </div>

          {/* Super Admin Accounts List */}
          <div className="mb-8">
            <h3 className="text-[30px] font-bold text-navy-text tracking-[-0.6px] mb-6">
              SUPER ADMIN ACCOUNTS
            </h3>

            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8 text-gray-muted">Loading...</div>
              ) : superAdmins.length === 0 ? (
                <div className="text-center py-8 text-gray-muted">No super admins found</div>
              ) : (
                superAdmins.map((admin) => (
                  <div key={admin.id} className="w-full h-[100px] bg-white rounded-lg p-6 flex items-center justify-between shadow-sm">
                    <div>
                      <div className="text-[24px] font-bold text-navy-text tracking-[-0.48px] mb-1">
                        {admin.name}
                      </div>
                      <div className="text-[24px] font-bold text-gray-muted tracking-[-0.48px]">
                        {admin.email}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="w-[85px] h-[50px] bg-gold text-white text-[24px] font-semibold tracking-[-0.48px] rounded-lg hover:bg-gold/90 transition-colors">
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(admin.id)}
                        className="w-[85px] h-[50px] bg-gray-delete text-black text-[24px] font-light tracking-[-0.48px] rounded-lg hover:bg-gray-delete/80 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-6 mt-12">
        <Link
          to="/scholars"
          className="h-[120px] bg-white rounded-xl p-6 hover:shadow-md transition-shadow flex items-center justify-between group"
        >
          <div>
            <div className="text-[24px] font-bold text-navy-text mb-2">Manage Scholars</div>
            <div className="text-gray-muted">View and manage scholar accounts</div>
          </div>
          <div className="text-gold text-3xl group-hover:translate-x-2 transition-transform">→</div>
        </Link>

        <Link
          to="/activity-logs"
          className="h-[120px] bg-white rounded-xl p-6 hover:shadow-md transition-shadow flex items-center justify-between group"
        >
          <div>
            <div className="text-[24px] font-bold text-navy-text mb-2">Activity Logs</div>
            <div className="text-gray-muted">View student activity reports</div>
          </div>
          <div className="text-gold text-3xl group-hover:translate-x-2 transition-transform">→</div>
        </Link>
      </div>
    </DashboardLayout>
  );
}
