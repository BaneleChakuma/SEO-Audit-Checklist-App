// Renders a single checklist item with a tick checkbox and description.

// One row in the checklist: checkbox + title. Parent controls whether it's checked.
const ChecklistItem = ({ item, isChecked, onToggle }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(event) => {
        // Let keyboard users toggle with Enter or Space
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onToggle();
        }
      }}
      className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
        isChecked
          ? 'border-green-200 bg-green-50'
          : 'border-slate-200 bg-white hover:bg-slate-50'
      }`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggle}
        onClick={(event) => event.stopPropagation()}
        className="h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        aria-label={`Mark "${item.title}" as complete`}
      />
      <span
        className={`text-sm font-medium sm:text-base ${
          isChecked ? 'text-green-900' : 'text-slate-900'
        }`}
      >
        {item.title}
      </span>
    </div>
  );
};

export default ChecklistItem;
