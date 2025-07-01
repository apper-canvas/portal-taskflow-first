import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 animate-pulse"></div>
        <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 animate-pulse"></div>
      </div>
      
      {/* Quick add bar skeleton */}
      <div className="card p-6 mb-8">
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
      </div>
      
      {/* Filter bar skeleton */}
      <div className="flex gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-24 animate-pulse"></div>
        ))}
      </div>
      
      {/* Task cards skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="flex-1">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="flex items-center gap-3">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 animate-pulse"></div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Loading