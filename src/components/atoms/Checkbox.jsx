import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  size = 'md',
  className = ''
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  
  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  }
  
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => !disabled && onChange && onChange(!checked)}
      disabled={disabled}
      className={`
        ${sizes[size]} rounded border-2 flex items-center justify-center
        transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-1
        ${checked 
          ? 'bg-gradient-to-r from-primary to-secondary border-primary text-white shadow-soft focus:ring-primary/50' 
          : 'border-gray-300 hover:border-primary bg-white focus:ring-primary/30'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: 'backOut' }}
        >
          <ApperIcon name="Check" size={iconSizes[size]} className="text-white" />
        </motion.div>
      )}
    </motion.button>
  )
}

export default Checkbox