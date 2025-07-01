import React from 'react'

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'sm',
  className = ''
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-gradient-to-r from-primary to-secondary text-white',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white',
    success: 'bg-gradient-to-r from-success to-emerald-500 text-white',
    warning: 'bg-gradient-to-r from-warning to-yellow-500 text-white',
    error: 'bg-gradient-to-r from-error to-red-500 text-white',
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low'
  }
  
  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  
  return (
    <span className={`inline-flex items-center font-medium rounded-full shadow-soft ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge