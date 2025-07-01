import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-soft hover:shadow-medium focus:ring-primary/50',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300',
    accent: 'bg-gradient-to-r from-accent to-red-500 text-white shadow-soft hover:shadow-medium focus:ring-accent/50',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-300',
    danger: 'bg-gradient-to-r from-error to-red-600 text-white shadow-soft hover:shadow-medium focus:ring-error/50'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'} ${className}`
  
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : size === 'xl' ? 24 : 16
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" size={iconSize} className="animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <ApperIcon name={icon} size={iconSize} className={children ? 'mr-2' : ''} />
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <ApperIcon name={icon} size={iconSize} className={children ? 'ml-2' : ''} />
          )}
        </>
      )}
    </motion.button>
  )
}

export default Button