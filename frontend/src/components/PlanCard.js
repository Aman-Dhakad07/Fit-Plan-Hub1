'use client';

import Link from 'next/link';
import { DollarSign, Calendar, Users, Lock, Unlock, User } from 'lucide-react';

export default function PlanCard({ plan }) {
  return (
    <Link href={`/plans/${plan._id}`}>
      <div className="card group">
        <div className="h-48 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
          <svg className="w-24 h-24 text-white opacity-80 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition line-clamp-1">
              {plan.title}
            </h3>
            {plan.isSubscribed && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 flex-shrink-0">
                <Unlock size={12} />
                Active
              </span>
            )}
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {plan.description}
          </p>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <User size={16} className="mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{plan.trainerId?.name}</span>
            <span className="mx-2">•</span>
            <Users size={16} className="mr-1 flex-shrink-0" />
            <span>{plan.subscriberCount || 0}</span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-purple-600 font-bold text-lg">
                <DollarSign size={20} />
                <span>{plan.price}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Calendar size={16} className="mr-1" />
                <span>{plan.duration}d</span>
              </div>
            </div>
            
            {!plan.hasAccess && !plan.isSubscribed && (
              <Lock size={20} className="text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
