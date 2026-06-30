// Visual progress bar showing completion percentage for a category or audit.

// Shows how many checklist items are done as a bar + text (e.g. "4 of 6 done").
const ProgressBar = ({ completed, total }) => {
  // Avoid dividing by zero; round to a whole number for the bar width
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="w-full">
      {/* Text label above the bar */}
      <p className="mb-2 text-sm text-slate-600">
        {completed} of {total} done
      </p>

      {/* Gray track — the full width background */}
      <div
        role="progressbar"
        aria-valuenow={completed}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${completed} of ${total} items completed`}
        className="h-3 w-full overflow-hidden rounded-full bg-slate-200"
      >
        {/* Blue fill — width grows with percentage */}
        <div
          className="h-3 rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
