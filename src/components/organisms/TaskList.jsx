import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskItem from '@/components/molecules/TaskItem'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const TaskList = ({ 
  tasks = [], 
  loading = false, 
  error = null, 
  onTaskUpdate, 
  onTaskDelete, 
  onTaskComplete, 
  onRetry,
  emptyTitle = "No tasks found",
  emptyDescription = "Try adjusting your filters or create a new task to get started.",
  showAddTaskAction = false,
  onAddTask
}) => {
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />
  }

  if (tasks.length === 0) {
    return (
      <Empty
        title={emptyTitle}
        description={emptyDescription}
        actionText={showAddTaskAction ? "Add Your First Task" : undefined}
        onAction={showAddTaskAction ? onAddTask : undefined}
        icon="CheckSquare"
      />
    )
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05 }}
            layout
          >
            <TaskItem
              task={task}
              onUpdate={onTaskUpdate}
              onDelete={onTaskDelete}
              onComplete={onTaskComplete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList