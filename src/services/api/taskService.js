import taskData from '@/services/mockData/tasks.json'

class TaskService {
  constructor() {
    this.tasks = [...taskData]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...this.tasks]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const task = this.tasks.find(task => task.Id === parseInt(id))
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  }

  async create(taskData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      title: taskData.title,
      completed: false,
      priority: taskData.priority || 'medium',
      category: taskData.category || 'General',
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    
    this.tasks.push(newTask)
    return { ...newTask }
  }

  async update(id, taskData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks[index] = { ...this.tasks[index], ...taskData }
    return { ...this.tasks[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const index = this.tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    const deleted = this.tasks.splice(index, 1)[0]
    return { ...deleted }
  }

  // Additional utility methods
  async getByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.tasks.filter(task => task.category === category).map(task => ({ ...task }))
  }

  async getByPriority(priority) {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.tasks.filter(task => task.priority === priority).map(task => ({ ...task }))
  }

  async getCompleted() {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.tasks.filter(task => task.completed).map(task => ({ ...task }))
  }

  async getPending() {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.tasks.filter(task => !task.completed).map(task => ({ ...task }))
  }
}

export const taskService = new TaskService()