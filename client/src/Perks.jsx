import React from "react";

const Perks = ({ selected, onChange }) => {
  function handleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected, name]); // Add perk
    } else {
      onChange(selected.filter((perk) => perk !== name)); // Remove perk
    }
  }

  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 mb-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("Wi-Fi")}
          name="Wi-Fi" // Match exactly with the database
          onChange={handleCbClick}
        />
        <span>Wi-Fi</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 mb-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("Support Teacher")}
          name="Support Teacher" // Match exactly with the database
          onChange={handleCbClick}
        />
        <span>Support Teacher</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 mb-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("Educational Materials")}
          name="Educational Materials" // Match exactly with the database
          onChange={handleCbClick}
        />
        <span>Educational Materials</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 mb-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("Individual Approach")}
          name="Individual Approach" // Match exactly with the database
          onChange={handleCbClick}
        />
        <span>Individual Approach</span>
      </label>
    </>
  );
};

export default Perks;
