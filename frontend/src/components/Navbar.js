'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { Dumbbell, LogOut } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
              <Dumbbell size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              FitPlanHub
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link href="/plans" className="text-gray-700 hover:text-purple-600 transition font-medium">
                  Plans
                </Link>
                <Link href="/trainers" className="text-gray-700 hover:text-purple-600 transition font-medium">
                  Trainers
                </Link>
                
                {user?.role === 'trainer' ? (
                  <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 transition font-medium">
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/feed" className="text-gray-700 hover:text-purple-600 transition font-medium">
                      My Feed
                    </Link>
                    <Link href="/subscriptions" className="text-gray-700 hover:text-purple-600 transition font-medium">
                      Subscriptions
                    </Link>
                  </>
                )}

                <div className="flex items-center gap-3 pl-6 border-l">
                  <span className="text-sm text-gray-600 font-medium">{user?.name}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user?.role === 'trainer' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user?.role}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 transition p-2 rounded-lg hover:bg-red-50"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/plans" className="text-gray-700 hover:text-purple-600 transition font-medium">
                  Plans
                </Link>
                <Link href="/trainers" className="text-gray-700 hover:text-purple-600 transition font-medium">
                  Trainers
                </Link>
                <Link href="/login" className="text-gray-700 hover:text-purple-600 transition font-medium">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
