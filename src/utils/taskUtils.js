export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-200',
        gradient: 'from-red-500 to-red-600'
      }
    case 'medium':
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-200',
        gradient: 'from-yellow-500 to-yellow-600'
      }
    case 'low':
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-200',
        gradient: 'from-green-500 to-green-600'
      }
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        border: 'border-gray-200',
        gradient: 'from-gray-500 to-gray-600'
      }
  }
}

export const getCategoryColor = (category) => {
  // Generate consistent colors based on category name
  const colors = [
    '#5B4FE9', '#4ECDC4', '#FF6B6B', '#FFD93D', 
    '#4D96FF', '#9B59B6', '#E67E22', '#2ECC71',
    '#F39C12', '#E74C3C', '#8E44AD', '#3498DB'
  ]
  
  let hash = 0
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  const index = Math.abs(hash) % colors.length
  return colors[index]
}

export const getTaskStats = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = total - completed
  
  const byPriority = {
    high: tasks.filter(task => task.priority === 'high').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    low: tasks.filter(task => task.priority === 'low').length
  }
  
  const byCategory = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1
    return acc
  }, {})
  
  return {
    total,
    completed,
    pending,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    byPriority,
    byCategory
  }
}

export const sortTasks = (tasks, sortBy = 'priority') => {
  const sorted = [...tasks]
  
  switch (sortBy) {
    case 'priority':
      return sorted.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        if (a.priority !== b.priority) {
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        }
        
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate)
        }
        
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    
    case 'dueDate':
      return sorted.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        
        if (a.dueDate && b.dueDate) {
          return new Date(a.dueDate) - new Date(b.dueDate)
        }
        if (a.dueDate) return -1
        if (b.dueDate) return 1
        
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    
    case 'created':
      return sorted.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    
    case 'alphabetical':
      return sorted.sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        
        return a.title.localeCompare(b.title)
      })
    
    default:
      return sorted
  }
}

export const filterTasks = (tasks, filters) => {
  return tasks.filter(task => {
    // Category filter
    if (filters.category && filters.category !== 'all' && task.category !== filters.category) {
      return false
    }
    
    // Priority filter
    if (filters.priority && filters.priority !== 'all' && task.priority !== filters.priority) {
      return false
    }
    
    // Status filter
    if (filters.status && filters.status !== 'all') {
      if (filters.status === 'completed' && !task.completed) return false
      if (filters.status === 'pending' && task.completed) return false
    }
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      if (!task.title.toLowerCase().includes(searchTerm) && 
          !task.category.toLowerCase().includes(searchTerm)) {
        return false
      }
    }
    
    return true
  })
}