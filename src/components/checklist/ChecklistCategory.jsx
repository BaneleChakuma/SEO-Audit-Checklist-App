// Renders a checklist category section with its items and progress.

import ChecklistItem from './ChecklistItem.jsx';
import ProgressBar from './ProgressBar.jsx';

// Groups one category: heading, description, progress bar, and its checklist rows.
// Does not own checked state — parent passes checkedItems and onToggleItem.
const ChecklistCategory = ({ category, checkedItems, onToggleItem }) => {
  // Count how many items in THIS category are in the parent's checkedItems array
  const completedCount = category.items.filter((item) =>
    checkedItems.includes(item.id),
  ).length;

  return (
    <section className="space-y-4">
      {/* Category heading and description */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          {category.name}
        </h2>
        <p className="mt-1 text-sm text-slate-600 sm:text-base">
          {category.description}
        </p>
      </div>

      {/* Progress for this category only */}
      <ProgressBar completed={completedCount} total={category.items.length} />

      {/* List of checklist rows */}
      <div className="space-y-3">
        {category.items.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            isChecked={checkedItems.includes(item.id)}
            onToggle={() => onToggleItem(item.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ChecklistCategory;
