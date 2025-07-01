import React, { useState, useEffect, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isToday, isTomorrow, isPast, parseISO } from 'date-fns'
import QuickAddBar from '@/components/molecules/QuickAddBar'
import FilterBar from '@/components/molecules/FilterBar'
import TaskList from '@/components/organisms/TaskList'
import ProgressIndicator from '@/components/molecules/ProgressIndicator'
import { taskService } from '@/services/api/taskService'
import { categoryService } from '@/services/api/categoryService'

const TaskManager = () => {
  const { selectedCategory, onDataChange, taskCounts, totalTasks, completedTasks } = useOutletContext()
  
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [filters, setFilters] = useState({
    category: 'all',
    priority: 'all',
    status: 'all',
    date: 'all',
    search: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    // Update category filter when sidebar selection changes
    if (selectedCategory && selectedCategory !== 'All Tasks') {
      setFilters(prev => ({
        ...prev,
        category: selectedCategory
      }))
    } else if (selectedCategory === 'All Tasks') {
      setFilters(prev => ({
        ...prev,
        category: 'all'
      }))
    }
  }, [selectedCategory])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ])
      
      setTasks(tasksData)
      setCategories(categoriesData)
      onDataChange() // Update sidebar counts
    } catch (err) {
      setError('Failed to load tasks')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (taskData) => {
    try {
      await taskService.create(taskData)
      await loadData()
      toast.success('Task created successfully!')
    } catch (err) {
      toast.error('Failed to create task')
      throw err
    }
  }

  const handleUpdateTask = async (id, taskData) => {
    try {
      await taskService.update(id, taskData)
      await loadData()
    } catch (err) {
      toast.error('Failed to update task')
      throw err
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await taskService.delete(id)
      await loadData()
    } catch (err) {
      toast.error('Failed to delete task')
      throw err
    }
  }

  const handleCompleteTask = async (id) => {
    try {
      const task = tasks.find(t => t.Id === id)
      if (task) {
        await taskService.update(id, {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date().toISOString() : null
        })
        await loadData()
      }
    } catch (err) {
      toast.error('Failed to update task')
      throw err
    }
  }

  // Filter tasks based on current filters and selected category
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks]

    // Apply category filter from sidebar or filter bar
    if (selectedCategory && selectedCategory !== 'All Tasks') {
      switch (selectedCategory) {
        case 'Today':
          filtered = filtered.filter(task => 
            task.dueDate && isToday(parseISO(task.dueDate))
          )
          break
        case 'Upcoming':
          filtered = filtered.filter(task => 
            task.dueDate && parseISO(task.dueDate) > new Date()
          )
          break
        case 'Overdue':
          filtered = filtered.filter(task => 
            task.dueDate && 
            isPast(parseISO(task.dueDate)) && 
            !isToday(parseISO(task.dueDate)) && 
            !task.completed
          )
          break
        default:
          filtered = filtered.filter(task => task.category === selectedCategory)
      }
    } else if (filters.category !== 'all') {
      filtered = filtered.filter(task => task.category === filters.category)
    }

    // Apply other filters
    if (filters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === filters.priority)
    }

    if (filters.status !== 'all') {
      switch (filters.status) {
        case 'pending':
          filtered = filtered.filter(task => !task.completed)
          break
        case 'completed':
          filtered = filtered.filter(task => task.completed)
          break
        case 'overdue':
          filtered = filtered.filter(task => 
            task.dueDate && 
            isPast(parseISO(task.dueDate)) && 
            !isToday(parseISO(task.dueDate)) && 
            !task.completed
          )
          break
      }
    }

    if (filters.date !== 'all') {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      switch (filters.date) {
        case 'today':
          filtered = filtered.filter(task => 
            task.dueDate && isToday(parseISO(task.dueDate))
          )
          break
        case 'tomorrow':
          filtered = filtered.filter(task => 
            task.dueDate && isTomorrow(parseISO(task.dueDate))
          )
          break
case 'this-week': {
          const weekFromNow = new Date(today)
          weekFromNow.setDate(weekFromNow.getDate() + 7)
          filtered = filtered.filter(task => 
            task.dueDate && 
            parseISO(task.dueDate) >= today && 
            parseISO(task.dueDate) <= weekFromNow
          )
          break
        }
        case 'overdue':
          filtered = filtered.filter(task => 
            task.dueDate && 
            isPast(parseISO(task.dueDate)) && 
            !isToday(parseISO(task.dueDate)) && 
            !task.completed
          )
          break
      }
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.category.toLowerCase().includes(searchTerm)
      )
    }

    // Sort by priority and due date
    filtered.sort((a, b) => {
      // Completed tasks go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }
      
      // Priority order: high, medium, low
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      
      // Due date (earliest first)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      if (a.dueDate) return -1
      if (b.dueDate) return 1
      
      // Creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return filtered
  }, [tasks, filters, selectedCategory])

  // Calculate today's progress
  const todayTasks = tasks.filter(task => 
    task.dueDate && isToday(parseISO(task.dueDate))
  )
  const todayCompleted = todayTasks.filter(task => task.completed).length

  const getEmptyStateProps = () => {
    if (selectedCategory === 'Today') {
      return {
        title: "No tasks for today",
        description: "You're all caught up for today! Add some tasks or check tomorrow's schedule.",
        showAddTaskAction: true
      }
    }
    
    if (selectedCategory === 'Upcoming') {
      return {
        title: "No upcoming tasks",
        description: "You don't have any tasks scheduled for the future. Add some to stay ahead!",
        showAddTaskAction: true
      }
    }
    
    if (selectedCategory === 'Overdue') {
      return {
        title: "No overdue tasks",
        description: "Great job! You're staying on top of your deadlines.",
        showAddTaskAction: false
      }
    }
    
    if (filters.search) {
      return {
        title: "No matching tasks",
        description: `No tasks found for "${filters.search}". Try a different search term.`,
        showAddTaskAction: false
      }
    }
    
    if (tasks.length === 0) {
      return {
        title: "Welcome to TaskFlow!",
        description: "Get started by creating your first task. Stay organized and boost your productivity!",
        showAddTaskAction: true
      }
    }
    
    return {
      title: "No tasks found",
      description: "Try adjusting your filters or create a new task to get started.",
      showAddTaskAction: true
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Progress Indicator */}
      <ProgressIndicator
        completed={completedTasks}
        total={totalTasks}
        todayCompleted={todayCompleted}
        todayTotal={todayTasks.length}
      />

      {/* Quick Add Bar */}
      <QuickAddBar onAddTask={handleAddTask} />

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        categories={categories}
        taskCounts={taskCounts}
      />

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        loading={loading}
        error={error}
        onTaskUpdate={handleUpdateTask}
        onTaskDelete={handleDeleteTask}
        onTaskComplete={handleCompleteTask}
        onRetry={loadData}
        onAddTask={handleAddTask}
        {...getEmptyStateProps()}
      />
    </div>
  )
}

export default TaskManager