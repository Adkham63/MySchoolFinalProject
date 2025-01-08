import React from "react";

const AddressLink = ({ children }) => {
  return (
    <p className="flex gap-1 my-3 font-semibold underline">
      {children}
    </p>
  );
};

export default AddressLink;
