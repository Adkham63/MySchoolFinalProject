import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Perks from "../Perks";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

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

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/api/upload-by-link", {
        link: photoLink,
      });
      console.log("Uploaded photo URL:", data); // Debug uploaded URL
      setAddedPhotos((prev) => [...prev, data]); // Add new photo to state
      setPhotoLink(""); // Clear input
    } catch (err) {
      console.error("Error uploading photo:", err);
      alert("Failed to upload photo");
    }
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    console.log({ files });
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/api/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        console.log(response.data);
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        }); // Add new photo to state
      });
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
            {preInput(
              "Title",
              "Title for your place should be short and catchy as in advertisement"
            )}
            <input
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              type="text"
              placeholder="title, for example: My lovely apartment"
            />
            {preInput("Address", "Address for your place")}
            <input
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              type="text"
              placeholder="address, for example: 123 Main St, Anytown, USA"
            />
            {preInput("Photos", "More=better")}
            <div className="flex gap-2">
              <input
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                type="text"
                placeholder="Add something using a link ... jpg"
              />
              <button
                type="button" // Ensure the button doesn't submit the form
                onClick={addPhotoByLink}
                className="bg-gray-200 px-4 rounded-2xl"
              >
                Add &nbsp; photo
              </button>
            </div>
            <div className="grid grid-cols-3 mt-3 lg:grid-cols-6 md:grid-cols-4">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link, index) => (
                  <div key={index}>
                    <img
                      src={`http://localhost:4000${link}`} // Ensure link is correct
                      alt={`Uploaded ${index}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                ))}

              <label className="flex items-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 cursor-pointer">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload
              </label>
            </div>
            {preInput("Description", "Description of the place")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            {preInput("Perks", "Select all the perks of your place")}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra Info", "House rules and etc")}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            ></textarea>
            {preInput(
              "Check in & out times",
              "Add check in and out times, remember to have some time window for cleaning rooms between guests."
            )}
            <div className="grid sm:grid-cols-3 gap-2">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>{" "}
                <input
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  type="text"
                  placeholder="14"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  type="text"
                  placeholder="11"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                  type="number"
                />
              </div>
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
