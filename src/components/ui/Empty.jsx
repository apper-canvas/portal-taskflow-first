import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started with your productivity journey!",
  actionText = "Add Your First Task",
  onAction,
  icon = "CheckSquare"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6 shadow-glow">
        <ApperIcon name={icon} size={48} className="text-white" />
      </div>
      
      <h3 className="text-3xl font-display font-bold text-gradient mb-4">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        {description}
      </p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="btn-primary flex items-center gap-2 text-lg px-6 py-3"
        >
          <ApperIcon name="Plus" size={20} />
          {actionText}
        </motion.button>
      )}
      
      <div className="mt-12 grid grid-cols-3 gap-8 opacity-60">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-success to-emerald-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
            <ApperIcon name="Target" size={24} className="text-white" />
          </div>
          <p className="text-sm text-gray-500">Set Goals</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-warning to-yellow-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
            <ApperIcon name="Clock" size={24} className="text-white" />
          </div>
          <p className="text-sm text-gray-500">Track Time</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-info to-blue-500 rounded-lg flex items-center justify-center mb-3 mx-auto">
            <ApperIcon name="TrendingUp" size={24} className="text-white" />
          </div>
          <p className="text-sm text-gray-500">Stay Productive</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Empty