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
          checked={selected.includes("Assistant teacher")}
          name="Assistant teacher" // Match exactly with the database
          onChange={handleCbClick}
        />
        <span>Assistant teacher</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 mb-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("Learning materials")}
          name="Learning materials" // Match exactly with the database
          onChange={handleCbClick}
        />
        <span>Learning materials</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 mb-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("Individual approach")}
          name="Individual approach" // Match exactly with the database
          onChange={handleCbClick}
        />
        <span>Individual approach</span>
      </label>
    </>
  );
};

export default Perks;
