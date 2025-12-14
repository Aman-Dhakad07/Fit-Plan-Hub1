'use client';

import Link from 'next/link';
import { Award, Users } from 'lucide-react';

export default function TrainerCard({ trainer }) {
  return (
    <Link href={`/trainers/${trainer._id}`}>
      <div className="card group hover:border-purple-200 border border-transparent transition">
        <div className="p-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
            {trainer.name[0].toUpperCase()}
          </div>
          
          <h3 className="text-xl font-bold text-center mb-2 group-hover:text-purple-600 transition">
            {trainer.name}
          </h3>
          
          <p className="text-purple-600 text-center text-sm mb-4 font-medium">
            {trainer.specialization || 'Fitness Trainer'}
          </p>
          
          {trainer.bio && (
            <p className="text-gray-600 text-sm text-center mb-4 line-clamp-2">
              {trainer.bio}
            </p>
          )}
          
          <div className="flex justify-center gap-6 pt-4 border-t">
            <div className="text-center">
              <div className="font-bold text-lg flex items-center justify-center gap-1">
                <Award size={18} className="text-purple-600" />
                {trainer.planCount || 0}
              </div>
              <div className="text-xs text-gray-600">Plans</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg flex items-center justify-center gap-1">
                <Users size={18} className="text-purple-600" />
                {trainer.followerCount || 0}
              </div>
              <div className="text-xs text-gray-600">Followers</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}