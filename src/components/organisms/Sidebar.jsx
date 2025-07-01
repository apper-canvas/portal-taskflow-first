import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Sidebar = ({ 
  categories = [], 
  selectedCategory, 
  onCategorySelect,
  taskCounts = {},
  totalTasks = 0,
  completedTasks = 0
}) => {
  const allCategories = [
    { Id: 'all', name: 'All Tasks', color: '#5B4FE9', icon: 'List' },
    { Id: 'today', name: 'Today', color: '#FFD93D', icon: 'Calendar' },
    { Id: 'upcoming', name: 'Upcoming', color: '#4D96FF', icon: 'Clock' },
    { Id: 'overdue', name: 'Overdue', color: '#FF6B6B', icon: 'AlertTriangle' },
    ...categories
  ]

  const getTaskCount = (categoryName) => {
    switch (categoryName) {
      case 'All Tasks':
        return totalTasks
      case 'Today':
        return taskCounts.today || 0
      case 'Upcoming':
        return taskCounts.upcoming || 0
      case 'Overdue':
        return taskCounts.overdue || 0
      default:
        return taskCounts[categoryName] || 0
    }
  }

  return (
    <div className="w-80 bg-white h-full shadow-medium flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="CheckSquare" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-gradient">TaskFlow</h1>
            <p className="text-sm text-gray-500">Stay organized, stay productive</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
            <p className="text-2xl font-bold text-gradient">{completedTasks}</p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-success/10 to-emerald-500/10 rounded-lg">
            <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-success to-emerald-500 bg-clip-text">
              {totalTasks - completedTasks}
            </p>
            <p className="text-xs text-gray-600">Remaining</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 custom-scrollbar overflow-y-auto">
        <div className="space-y-2">
          {allCategories.map((category) => {
            const isSelected = selectedCategory === category.name
            const taskCount = getTaskCount(category.name)
            
            return (
              <motion.button
                key={category.Id}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCategorySelect(category.name)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-medium'
                    : 'text-gray-700 hover:bg-gray-50 hover:shadow-soft'
                }`}
              >
                <div 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected 
                      ? 'bg-white/20' 
                      : `bg-gradient-to-br`
                  }`}
                  style={!isSelected ? {
                    background: `linear-gradient(135deg, ${category.color}20, ${category.color}40)`
                  } : {}}
                >
                  <ApperIcon 
                    name={category.icon || 'Folder'} 
                    size={16} 
                    className={isSelected ? 'text-white' : 'text-gray-600'}
                    style={!isSelected ? { color: category.color } : {}}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{category.name}</p>
                </div>
                
                {taskCount > 0 && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {taskCount}
                  </span>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ApperIcon name="Zap" size={16} />
          <span>Powered by smart organization</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar