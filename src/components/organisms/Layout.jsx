import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '@/components/organisms/Sidebar'
import ApperIcon from '@/components/ApperIcon'
import { categoryService } from '@/services/api/categoryService'
import { taskService } from '@/services/api/taskService'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [categories, setCategories] = useState([])
  const [taskCounts, setTaskCounts] = useState({})
  const [totalTasks, setTotalTasks] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('All Tasks')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [categoriesData, tasksData] = await Promise.all([
        categoryService.getAll(),
        taskService.getAll()
      ])
      
      setCategories(categoriesData)
      setTotalTasks(tasksData.length)
      setCompletedTasks(tasksData.filter(task => task.completed).length)
      
      // Calculate task counts for each category
      const counts = {}
      const today = new Date().toISOString().split('T')[0]
      
      tasksData.forEach(task => {
        // Category counts
        counts[task.category] = (counts[task.category] || 0) + 1
        
        // Today tasks
        if (task.dueDate === today) {
          counts.today = (counts.today || 0) + 1
        }
        
        // Upcoming tasks (future dates)
        if (task.dueDate && task.dueDate > today) {
          counts.upcoming = (counts.upcoming || 0) + 1
        }
        
        // Overdue tasks (past dates, not completed)
        if (task.dueDate && task.dueDate < today && !task.completed) {
          counts.overdue = (counts.overdue || 0) + 1
        }
      })
      
      setTaskCounts(counts)
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          x: sidebarOpen ? 0 : -320,
          opacity: sidebarOpen ? 1 : 0.95
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full z-30 lg:relative lg:translate-x-0"
      >
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          taskCounts={taskCounts}
          totalTasks={totalTasks}
          completedTasks={completedTasks}
        />
      </motion.div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white shadow-soft border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ApperIcon name="Menu" size={20} className="text-gray-600" />
              </button>
              
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900">
                  {selectedCategory}
                </h1>
                <p className="text-sm text-gray-500">
                  Manage your tasks efficiently
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <ApperIcon name="Calendar" size={16} />
                <span>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto custom-scrollbar">
          <div className="p-6">
            <Outlet context={{ 
              selectedCategory, 
              onDataChange: loadData,
              taskCounts,
              totalTasks,
              completedTasks
            }} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout