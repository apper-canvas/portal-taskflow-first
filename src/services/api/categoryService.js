import categoryData from '@/services/mockData/categories.json'

class CategoryService {
  constructor() {
    this.categories = [...categoryData]
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250))
    return [...this.categories]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    const category = this.categories.find(cat => cat.Id === parseInt(id))
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  }

  async create(categoryData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newCategory = {
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1,
      name: categoryData.name,
      color: categoryData.color || '#5B4FE9',
      taskCount: 0
    }
    
    this.categories.push(newCategory)
    return { ...newCategory }
  }

  async update(id, categoryData) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    this.categories[index] = { ...this.categories[index], ...categoryData }
    return { ...this.categories[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    const deleted = this.categories.splice(index, 1)[0]
    return { ...deleted }
  }
}

export const categoryService = new CategoryService()