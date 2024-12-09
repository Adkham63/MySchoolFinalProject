import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Perks from "./Perks.jsx";
import PhotosUploader from "./PhotosUploader";
import AccountNav from "./AccountNav.jsx";

const PlacesFormPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addNewPlace(ev) {
    ev.preventDefault();
    if (!title || !address || !description || !checkIn || !checkOut) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post("/api/places", {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      navigate("/account/places");
    } catch (error) {
      console.error("Failed to add new place:", error);
      alert("Error saving place. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput("Title", "Title for your place should be short and catchy")}
        <input
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          type="text"
          placeholder="e.g. My lovely apartment"
        />
        {preInput("Address", "Where is your place located?")}
        <input
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          type="text"
          placeholder="e.g. 123 Main St"
        />
        {preInput("Photos", "Upload images of your place")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Describe your place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "Select all the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />
        {preInput("Extra Info", "Include any additional details")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput(
          "Check-in & Check-out",
          "Provide check-in and check-out times"
        )}
        <div className="grid sm:grid-cols-3 gap-2">
          <div>
            <h3>Check-in time</h3>
            <input
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              type="text"
              placeholder="e.g. 14:00"
            />
          </div>
          <div>
            <h3>Check-out time</h3>
            <input
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              type="text"
              placeholder="e.g. 11:00"
            />
          </div>
          <div>
            <h3>Max guests</h3>
            <input
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              type="number"
            />
          </div>
        </div>
        <div>
          <button className="primary my-4" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
