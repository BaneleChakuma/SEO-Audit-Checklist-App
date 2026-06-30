// Checklist page for working through SEO audit categories and ticking items.

import { useState } from 'react';
import ChecklistCategory from '../components/checklist/ChecklistCategory.jsx';
import ProgressBar from '../components/checklist/ProgressBar.jsx';
import checklistData from '../data/checklistData.js';

const ChecklistPage = () => {
  // Which item ids are checked — lives here so all categories share one list
  const [checkedItems, setCheckedItems] = useState([]);

  // Which category tab is visible — starts on the first category
  const [activeCategoryId, setActiveCategoryId] = useState(checklistData[0].id);

  // Flatten every item from every category for overall progress
  const allItems = checklistData.flatMap((category) => category.items);

  // Count checked items that exist in our checklist (ignores stray ids)
  const overallCompleted = allItems.filter((item) =>
    checkedItems.includes(item.id),
  ).length;

  // The category object for the currently selected tab
  const activeCategory = checklistData.find(
    (category) => category.id === activeCategoryId,
  );

  const handleToggleItem = (itemId) => {
    setCheckedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      {/* Page header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          SEO Audit Checklist
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Work through each category and tick items as you complete your audit.
        </p>
      </header>

      {/* Overall progress across ALL categories */}
      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Overall progress
        </h2>
        <ProgressBar completed={overallCompleted} total={allItems.length} />
      </section>

      {/* Category tabs — click to switch which section is shown */}
      <nav
        className="mb-6 flex gap-1 overflow-x-auto border-b border-slate-200"
        aria-label="Checklist categories"
      >
        {checklistData.map((category) => {
          const isActive = category.id === activeCategoryId;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategoryId(category.id)}
              className={`shrink-0 border-b-2 px-3 py-2 text-sm font-medium transition-colors sm:px-4 sm:text-base ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {category.name}
            </button>
          );
        })}
      </nav>

      {/* Active category content — only one category visible at a time */}
      {activeCategory && (
        <ChecklistCategory
          category={activeCategory}
          checkedItems={checkedItems}
          onToggleItem={handleToggleItem}
        />
      )}
    </main>
  );
};

export default ChecklistPage;
