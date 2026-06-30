// Reusable button component with consistent styling and variants.

// A shared Button so every clickable action in the app looks the same.
// Parents pass in text (children), what happens on click (onClick), and a style (variant).
const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}) => {
  // Base classes shared by every button: size, shape, focus ring, disabled look
  const baseClasses =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  // Map each variant name to its own Tailwind colour classes
  const variantClasses = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outline:
      'border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
