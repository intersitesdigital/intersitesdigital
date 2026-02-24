import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-brand-accent text-white hover:bg-brand-accentHover focus:ring-brand-accent',
    secondary: 'bg-white dark:bg-dark-card text-brand-primary dark:text-dark-text border border-brand-primary dark:border-dark-muted hover:bg-brand-primary hover:text-white dark:hover:bg-dark-muted',
    outline: 'border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white',
    ghost: 'text-brand-accent hover:bg-gray-100 dark:hover:bg-dark-bg',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
