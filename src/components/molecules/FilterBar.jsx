import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  categories = [],
  taskCounts = {}
}) => {
  const priorityOptions = [
    { value: 'all', label: 'All Priorities', color: 'gray' },
    { value: 'high', label: 'High Priority', color: 'red' },
    { value: 'medium', label: 'Medium Priority', color: 'yellow' },
    { value: 'low', label: 'Low Priority', color: 'green' }
  ]
  
  const statusOptions = [
    { value: 'all', label: 'All Tasks', icon: 'List' },
    { value: 'pending', label: 'Pending', icon: 'Clock' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle' },
    { value: 'overdue', label: 'Overdue', icon: 'AlertTriangle' }
  ]
  
  const dateOptions = [
    { value: 'all', label: 'All Dates' },
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this-week', label: 'This Week' },
    { value: 'overdue', label: 'Overdue' }
  ]

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-soft mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.Id} value={category.name}>
                {category.name} ({taskCounts[category.name] || 0})
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>
          <select
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          >
            {dateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-4 relative">
        <ApperIcon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
        />
      </div>

      {/* Active Filters Display */}
      {(filters.category !== 'all' || filters.priority !== 'all' || filters.status !== 'all' || filters.date !== 'all' || filters.search) && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              Category: {filters.category}
              <button onClick={() => handleFilterChange('category', 'all')}>
                <ApperIcon name="X" size={12} />
              </button>
            </span>
          )}
          {filters.priority !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              Priority: {filters.priority}
              <button onClick={() => handleFilterChange('priority', 'all')}>
                <ApperIcon name="X" size={12} />
              </button>
            </span>
          )}
          {filters.status !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Status: {filters.status}
              <button onClick={() => handleFilterChange('status', 'all')}>
                <ApperIcon name="X" size={12} />
              </button>
            </span>
          )}
          {filters.date !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
              Date: {filters.date}
              <button onClick={() => handleFilterChange('date', 'all')}>
                <ApperIcon name="X" size={12} />
              </button>
            </span>
          )}
          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
              Search: "{filters.search}"
              <button onClick={() => handleFilterChange('search', '')}>
                <ApperIcon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default FilterBar