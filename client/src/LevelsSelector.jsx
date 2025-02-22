// LevelsSelector.jsx
export default function LevelsSelector({ selected, onChange }) {
  const levels = ["Beginner", "Intermediate", "Advanced", "IELTS"];

  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {levels.map((level) => (
        <label
          key={level}
          className="flex items-center gap-2 p-4 border rounded-lg cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selected.includes(level)}
            onChange={(ev) => {
              if (ev.target.checked) {
                onChange([...selected, level]);
              } else {
                onChange(selected.filter((s) => s !== level));
              }
            }}
          />
          <span className="font-medium">{level}</span>
        </label>
      ))}
    </div>
  );
}
