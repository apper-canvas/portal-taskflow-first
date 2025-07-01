import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const ProgressIndicator = ({ 
  completed = 0, 
  total = 0, 
  todayCompleted = 0, 
  todayTotal = 0 
}) => {
  const overallProgress = total > 0 ? Math.round((completed / total) * 100) : 0
  const todayProgress = todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 0
  
  const circumference = 2 * Math.PI * 40
  const overallOffset = circumference - (overallProgress / 100) * circumference
  const todayOffset = circumference - (todayProgress / 100) * circumference

  return (
    <div className="bg-white rounded-xl p-6 shadow-soft">
      <h3 className="text-lg font-display font-semibold text-gray-900 mb-6">
        Progress Overview
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Progress */}
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#overallGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                animate={{ strokeDashoffset: overallOffset }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="overallGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5B4FE9" />
                  <stop offset="100%" stopColor="#8B85F0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gradient">
                {overallProgress}%
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">Overall Progress</p>
            <p className="text-xs text-gray-500">
              {completed} of {total} tasks completed
            </p>
          </div>
        </div>

        {/* Today's Progress */}
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#todayGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                animate={{ strokeDashoffset: todayOffset }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              />
              <defs>
                <linearGradient id="todayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ECDC4" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-success to-emerald-500 bg-clip-text">
                {todayProgress}%
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">Today's Progress</p>
            <p className="text-xs text-gray-500">
              {todayCompleted} of {todayTotal} tasks today
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
            <ApperIcon name="CheckCircle" size={20} className="text-white" />
          </div>
          <p className="text-lg font-bold text-gray-900">{completed}</p>
          <p className="text-xs text-gray-500">Completed</p>
        </div>
        
        <div className="text-center">
          <div className="w-10 h-10 bg-gradient-to-br from-warning to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <ApperIcon name="Clock" size={20} className="text-white" />
          </div>
          <p className="text-lg font-bold text-gray-900">{total - completed}</p>
          <p className="text-xs text-gray-500">Remaining</p>
        </div>
        
        <div className="text-center">
          <div className="w-10 h-10 bg-gradient-to-br from-info to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
            <ApperIcon name="Target" size={20} className="text-white" />
          </div>
          <p className="text-lg font-bold text-gray-900">{total}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>
    </div>
  )
}

export default ProgressIndicator