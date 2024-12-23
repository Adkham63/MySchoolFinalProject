import React from "react";

const PlaceImg = ({
  place,
  index = 0,
  className = "rounded-xl object-cover w-full h-full",
}) => {
  if (!place.addedPhotos?.length) {
    return null; // If no photos, return null
  }

  // Return the image based on the provided index
  const photoUrl = `http://localhost:4000${place.addedPhotos[index]}`;

  return <img src={photoUrl} alt={place.title} className={className} />;
};

export default PlaceImg;
