'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPlan, updatePlan } from '@/store/slices/planSlice';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreatePlanModal({ isOpen, onClose, plan = null }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: plan?.title || '',
    description: plan?.description || '',
    price: plan?.price || '',
    duration: plan?.duration || '',
    category: plan?.category || 'General Fitness',
    level: plan?.level || 'Beginner',
    features: plan?.features?.join('\n') || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const planData = {
      ...formData,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      features: formData.features.split('\n').filter(f => f.trim()),
    };

    try {
      if (plan) {
        await dispatch(updatePlan({ planId: plan._id, planData })).unwrap();
        toast.success('Plan updated successfully!');
      } else {
        await dispatch(createPlan(planData)).unwrap();
        toast.success('Plan created successfully!');
      }
      onClose();
    } catch (error) {
      toast.error(error || 'Operation failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {plan ? 'Edit Plan' : 'Create New Plan'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="e.g., Fat Loss Beginner Plan"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field h-24 resize-none"
              placeholder="Describe your fitness plan..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Price ($) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="input-field"
                placeholder="29.99"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Duration (days) *</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="input-field"
                placeholder="30"
                min="1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
              >
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
                <option>Flexibility</option>
                <option>Cardio</option>
                <option>Strength</option>
                <option>General Fitness</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Level</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="input-field"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Features (one per line)</label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="input-field h-32 resize-none"
              placeholder="Daily workout videos&#10;Personalized meal plans&#10;Progress tracking&#10;24/7 chat support"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={handleSubmit} className="flex-1 btn-primary">
              {plan ? 'Update Plan' : 'Create Plan'}
            </button>
            <button onClick={onClose} className="flex-1 btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}