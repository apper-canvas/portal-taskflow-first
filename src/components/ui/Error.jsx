import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-error to-red-500 rounded-full flex items-center justify-center mb-6 shadow-strong">
        <ApperIcon name="AlertCircle" size={40} className="text-white" />
      </div>
      
      <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {message}. Don't worry, this happens sometimes. Please try again.
      </p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="btn-primary flex items-center gap-2"
        >
          <ApperIcon name="RotateCcw" size={16} />
          Try Again
        </motion.button>
      )}
    </motion.div>
  )
}

export default Error