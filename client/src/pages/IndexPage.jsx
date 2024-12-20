import axios from "axios";
import React, { useEffect, useState } from "react";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mt-8">
      {places.length > 0 &&
        places.map((place) => (
          <div key={place._id}>
            {" "}
            {/* Add unique key prop */}
            <div className="bg-gray-500 rounded-2xl flex">
              {place.addedPhotos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={`http://localhost:4000${place.addedPhotos[0]}`}
                  alt={place.title}
                />
              )}
            </div>
            <h2 className="text-sm truncate">{place.title}</h2>
            <h3 className="font-bold">{place.address}</h3>
          </div>
        ))}
    </div>
  );
};

export default IndexPage;
