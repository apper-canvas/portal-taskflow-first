import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const QuickAddBar = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!taskTitle.trim()) {
      toast.warning('Please enter a task title')
      return
    }

    setIsAdding(true)
    
    try {
      // Parse natural language for priority keywords
      let priority = 'medium'
      const lowerTitle = taskTitle.toLowerCase()
      
      if (lowerTitle.includes('urgent') || lowerTitle.includes('important') || lowerTitle.includes('asap')) {
        priority = 'high'
      } else if (lowerTitle.includes('low') || lowerTitle.includes('minor') || lowerTitle.includes('when free')) {
        priority = 'low'
      }
      
      // Parse for due date keywords
      let dueDate = null
      const today = new Date()
      
      if (lowerTitle.includes('today')) {
        dueDate = today.toISOString().split('T')[0]
      } else if (lowerTitle.includes('tomorrow')) {
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        dueDate = tomorrow.toISOString().split('T')[0]
      } else if (lowerTitle.includes('next week')) {
        const nextWeek = new Date(today)
        nextWeek.setDate(nextWeek.getDate() + 7)
        dueDate = nextWeek.toISOString().split('T')[0]
      }
      
      await onAddTask({
        title: taskTitle.trim(),
        priority,
        dueDate,
        category: 'General'
      })
      
      setTaskTitle('')
      toast.success('Task added successfully!')
    } catch (error) {
      toast.error('Failed to add task')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 mb-8"
    >
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-1 relative">
          <ApperIcon 
            name="Plus" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Add a new task... (try 'urgent meeting today' or 'low priority review')"
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg text-lg
                     focus:border-primary focus:ring-2 focus:ring-primary/20 
                     transition-all duration-200 ease-out outline-none
                     placeholder:text-gray-400"
            disabled={isAdding}
          />
          
          {taskTitle && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Press Enter
              </div>
            </div>
          )}
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon="Plus"
          loading={isAdding}
          disabled={!taskTitle.trim() || isAdding}
        >
          Add Task
        </Button>
      </form>
      
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <ApperIcon name="Lightbulb" size={14} />
          <span>Smart parsing enabled</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">urgent</span>
          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">today</span>
          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">low priority</span>
        </div>
      </div>
    </motion.div>
  )
}

export default QuickAddBar