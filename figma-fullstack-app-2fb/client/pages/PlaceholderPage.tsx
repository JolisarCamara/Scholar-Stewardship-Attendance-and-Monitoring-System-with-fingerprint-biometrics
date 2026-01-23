import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <DashboardLayout title={title}>
      <div className="flex flex-col items-center justify-center py-16">
        <div className="max-w-2xl text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-6xl">🚧</span>
            </div>
            <h2 className="text-3xl font-bold text-navy-text mb-4">
              Page Under Construction
            </h2>
            <p className="text-xl text-gray-muted mb-8">
              {description}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-blue-800 mb-4">
              This page is part of the complete scholarship management system. 
              Continue prompting to have this page fully implemented!
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-block px-8 py-3 bg-navy-dark text-white rounded-lg hover:bg-navy-darker transition-colors font-semibold"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
