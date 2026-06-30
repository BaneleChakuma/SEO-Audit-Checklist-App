// Reusable badge component for labels and status indicators.

// A small pill-shaped label for category tags or status (e.g. score colours).
// Parents pass the text (children) and a colour name (color).
const Badge = ({ children, color = 'green' }) => {
  // Map each colour name to matching background + text Tailwind classes
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    orange: 'bg-orange-100 text-orange-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
