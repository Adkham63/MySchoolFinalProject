import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Perks from "./Perks.jsx";
import PhotosUploader from "./PhotosUploader";
import AccountNav from "./AccountNav.jsx";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/places/${id}`)
      .then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos((prev) => {
          const uniquePhotos = [
            ...new Set([...prev, ...(data.addedPhotos || [])]),
          ];
          return uniquePhotos;
        });
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      })
      .catch((error) => {
        console.error("Error fetching place details:", error);
      });
  }, [id]);

  const savePlace = async (ev) => {
    ev.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos: [...new Set(addedPhotos)],
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    try {
      if (id) {
        await axios.put(`/api/places/${id}`, placeData);
      } else {
        await axios.post("/api/places", placeData);
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error saving place:", error);
    }
  };

  const deletePlace = async () => {
    if (
      window.confirm("Are you sure you want to delete this teacher's profile?")
    ) {
      try {
        // Delete place and related bookings
        await axios.delete(`/api/places/${id}`);
        setRedirect(true);
      } catch (error) {
        console.error("Error deleting place:", error);
        alert("Failed to delete the teacher's profile. Please try again.");
      }
    }
  };

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        <h2 className="text-2xl mt-4">Full name of the teacher:</h2>
        <input
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          type="text"
          placeholder="e.g. Rasulova Laylo"
        />
        <h2 className="text-2xl mt-4">A short description or quote:</h2>
        <input
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          type="text"
          placeholder="Unlock the World of English: Book a Lesson with a Professional!"
          className="border p-2 w-full"
        />

        <div className="text-justify mt-4">
          {address.split("\n").map(
            (paragraph, index) =>
              paragraph.trim() && (
                <p key={index} className="mb-2">
                  {paragraph}
                </p>
              )
          )}
        </div>

        <h2 className="text-2xl mt-4">Teacher's profile photo:</h2>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        <div>
          <h2 className="text-2xl mt-4">Description:</h2>
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </div>

        <div>
          <h2 className="text-2xl mt-4 mb-4">
            Services provided to the group:
          </h2>
          <Perks selected={perks} onChange={setPerks} />
        </div>

        <div>
          <h2 className="text-2xl mt-4">Extra Info</h2>
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
        </div>

        <div>
          <h2 className="text-2xl mt-4 mb-4">Lesson Information:</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <h3>Lesson start time</h3>
              <input
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                type="text"
                placeholder="e.g. 14:00"
              />
            </div>
            <div>
              <h3>Lesson end time</h3>
              <input
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                type="text"
                placeholder="e.g. 11:00"
              />
            </div>
            <div>
              <h3>Max students:</h3>
              <input
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
                type="number"
              />
            </div>
            <div>
              <h3>Price per lesson:</h3>
              <input
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
                type="number"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>

          {id && (
            <button
              type="button"
              onClick={deletePlace}
              className="bg-red-600 text-white py-2 px-6 rounded-lg font-semibold text-lg hover:bg-red-700 transition duration-300"
            >
              Delete Teacher Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
