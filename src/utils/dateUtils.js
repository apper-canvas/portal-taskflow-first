import { format, isToday, isTomorrow, isPast, parseISO, startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns'

export const formatDate = (dateString, formatStr = 'MMM d, yyyy') => {
  if (!dateString) return null
  
  try {
    return format(parseISO(dateString), formatStr)
  } catch (error) {
    console.error('Invalid date:', dateString)
    return null
  }
}

export const formatRelativeDate = (dateString) => {
  if (!dateString) return null
  
  try {
    const date = parseISO(dateString)
    
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === -1) return 'Yesterday'
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`
    if (diffDays > 1) return `In ${diffDays} days`
    
    return format(date, 'MMM d')
  } catch (error) {
    console.error('Invalid date:', dateString)
    return null
  }
}

export const isDateOverdue = (dateString) => {
  if (!dateString) return false
  
  try {
    const date = parseISO(dateString)
    return isPast(date) && !isToday(date)
  } catch (error) {
    return false
  }
}

export const getDateStatus = (dateString) => {
  if (!dateString) return 'none'
  
  try {
    const date = parseISO(dateString)
    
    if (isToday(date)) return 'today'
    if (isTomorrow(date)) return 'tomorrow'
    if (isPast(date)) return 'overdue'
    return 'upcoming'
  } catch (error) {
    return 'none'
  }
}

export const getDateRange = (type) => {
  const now = new Date()
  
  switch (type) {
    case 'today':
      return {
        start: startOfDay(now),
        end: endOfDay(now)
      }
case 'tomorrow': {
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return {
        start: startOfDay(tomorrow),
        end: endOfDay(tomorrow)
      }
    }
    case 'this-week':
      return {
        start: startOfWeek(now),
        end: endOfWeek(now)
      }
    default:
      return null
  }
}

export const createDateString = (date = new Date()) => {
  return date.toISOString().split('T')[0]
}