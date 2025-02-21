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
          checked={selected.includes("Yordamchi o'qituvchi")}
          name="Yordamchi o'qituvchi" // Match exactly with the database
          onChange={handleCbClick}
        />
        <span>Yordamchi o'qituvchi</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 mb-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("O'quv materiallari")}
          name="O'quv materiallari" // Match exactly with the database
          onChange={handleCbClick}
        />
        <span>O'quv materiallari</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 mb-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes("Individual yondashuv")}
          name="Individual yondashuv" // Match exactly with the database
          onChange={handleCbClick}
        />
        <span>Individual yondashuv</span>
      </label>
    </>
  );
};

export default Perks;
