import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-bg font-inter">
      <Sidebar />
      
      <div className="ml-[260px] p-8">
        {title && (
          <h1 className="text-[32px] font-bold text-navy-darker tracking-[-0.64px] mb-8">
            {title}
          </h1>
        )}
        
        <div className="max-w-[1180px]">
          {children}
        </div>
      </div>
    </div>
  );
}
