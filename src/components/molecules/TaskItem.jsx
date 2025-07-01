import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Checkbox from '@/components/atoms/Checkbox'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

const TaskItem = ({ task, onUpdate, onDelete, onComplete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [isCompleting, setIsCompleting] = useState(false)

  const formatDueDate = (dateString) => {
    if (!dateString) return null
    
    try {
      const date = parseISO(dateString)
      if (isToday(date)) return 'Today'
      if (isTomorrow(date)) return 'Tomorrow'
      return format(date, 'MMM d')
    } catch {
      return null
    }
  }

  const getDueDateColor = (dateString) => {
    if (!dateString) return 'text-gray-500'
    
    try {
      const date = parseISO(dateString)
      if (isPast(date) && !isToday(date)) return 'text-error'
      if (isToday(date)) return 'text-warning'
      return 'text-gray-500'
    } catch {
      return 'text-gray-500'
    }
  }

  const handleComplete = async () => {
    setIsCompleting(true)
    
    try {
      await onComplete(task.Id)
      
      // Show completion animation
      setTimeout(() => {
        toast.success('Task completed! 🎉', {
          position: 'top-right',
          autoClose: 2000,
        })
      }, 300)
    } catch (error) {
      toast.error('Failed to complete task')
    } finally {
      setIsCompleting(false)
    }
  }

  const handleEdit = async () => {
    if (!editTitle.trim()) {
      toast.warning('Task title cannot be empty')
      return
    }

    try {
      await onUpdate(task.Id, { ...task, title: editTitle.trim() })
      setIsEditing(false)
      toast.success('Task updated!')
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onDelete(task.Id)
        toast.success('Task deleted')
      } catch (error) {
        toast.error('Failed to delete task')
      }
    }
  }

  const dueDateDisplay = formatDueDate(task.dueDate)
  const dueDateColorClass = getDueDateColor(task.dueDate)
  const isOverdue = task.dueDate && isPast(parseISO(task.dueDate)) && !isToday(parseISO(task.dueDate)) && !task.completed

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isCompleting ? 0.5 : 1, 
          y: 0,
          x: isCompleting ? 100 : 0 
        }}
        exit={{ 
          opacity: 0, 
          x: task.completed ? 100 : -100,
          transition: { duration: 0.3 }
        }}
        whileHover={{ scale: 1.01 }}
        className={`card p-6 ${task.completed ? 'opacity-60 bg-gray-50' : ''} ${isOverdue ? 'border-l-4 border-error' : ''}`}
      >
        <div className="flex items-center gap-4">
          <Checkbox
            checked={task.completed}
            onChange={handleComplete}
            disabled={isCompleting}
            size="lg"
          />
          
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEdit()
                    if (e.key === 'Escape') {
                      setIsEditing(false)
                      setEditTitle(task.title)
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  autoFocus
                />
                <Button size="sm" onClick={handleEdit} icon="Check" variant="primary" />
                <Button 
                  size="sm" 
                  onClick={() => {
                    setIsEditing(false)
                    setEditTitle(task.title)
                  }} 
                  icon="X" 
                  variant="secondary" 
                />
              </div>
            ) : (
              <>
                <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant={task.priority} size="xs">
                    {task.priority}
                  </Badge>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <ApperIcon name="Tag" size={14} />
                    <span>{task.category}</span>
                  </div>
                  
                  {dueDateDisplay && (
                    <div className={`flex items-center gap-1 text-sm ${dueDateColorClass}`}>
                      <ApperIcon name="Calendar" size={14} />
                      <span>{dueDateDisplay}</span>
                      {isOverdue && (
                        <ApperIcon name="AlertTriangle" size={14} className="text-error ml-1" />
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <ApperIcon name="Clock" size={12} />
                    <span>
                      {task.completed 
                        ? `Completed ${format(parseISO(task.completedAt || task.createdAt), 'MMM d')}`
                        : `Created ${format(parseISO(task.createdAt), 'MMM d')}`
                      }
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {!isEditing && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                icon="Edit"
                onClick={() => setIsEditing(true)}
                disabled={task.completed}
              />
              <Button
                size="sm"
                variant="ghost"
                icon="Trash2"
                onClick={handleDelete}
                className="text-error hover:text-error hover:bg-red-50"
              />
            </div>
          )}
        </div>
        
        {isOverdue && !task.completed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center gap-2 text-sm text-red-700">
              <ApperIcon name="AlertTriangle" size={16} />
              <span>This task is overdue. Consider updating the due date or completing it soon.</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default TaskItem