import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4 mt-8 mx-7">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id} key={place._id}>
            <div className="bg-gray-500 rounded-2xl flex mb-2">
              {place.addedPhotos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={`http://localhost:4000${place.addedPhotos[0]}`}
                  alt={place.title}
                />
              )}
            </div>
            <h2 className="font-bold truncate">{place.address}</h2>
            <h3 className="text-sm truncate text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">UZS {place.price}</span> per lesson
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
