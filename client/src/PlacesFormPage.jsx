import React, { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Perks from "./Perks.jsx";
import PhotosUploader from "./PhotosUploader";
import AccountNav from "./AccountNav.jsx";
import LevelsSelector from "./LevelsSelector.jsx";

const PlacesFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(10);
  const [price, setPrice] = useState(74000);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLevels, setSelectedLevels] = useState([]);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`/api/places/${id}`)
      .then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.addedPhotos || []);
        setDescription(data.description);
        setSelectedPerks(data.perks || []);
        setExtraInfo(data.extraInfo || "");
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
        setSelectedLevels(data.levels || []);
      })
      .catch((error) => {
        console.error("Error fetching place details:", error);
        setError("Failed to load teacher profile");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const savePlace = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // First get the user data
      const userResponse = await axios.get("/api/profile");
      const userData = userResponse.data;

      if (!userData || !userData.id) {
        throw new Error("User information not available");
      }

      // Prepare the place data with owner
      const placeData = {
        title,
        address,
        addedPhotos,
        description,
        perks: selectedPerks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests: Number(maxGuests),
        price: Number(price),
        levels: selectedLevels,
        owner: userData.id, // Include the owner field
      };

      // Validate required fields
      const requiredFields = {
        title: "Teacher name is required",
        address: "Short description is required",
        description: "Detailed description is required",
        checkIn: "Lesson start time is required",
        checkOut: "Lesson end time is required",
        maxGuests: "Maximum students is required",
        price: "Price per lesson is required",
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([field]) => !placeData[field])
        .map(([_, message]) => message);

      if (missingFields.length > 0) {
        throw new Error(missingFields.join("\n"));
      }

      if (!selectedLevels || selectedLevels.length === 0) {
        throw new Error("Please select at least one teaching level");
      }

      if (id) {
        // Update existing place
        await axios.put(`/api/places/${id}`, placeData);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Teacher profile updated successfully",
          timer: 2000,
        });
      } else {
        // Create new place
        await axios.post("/api/places", placeData);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Teacher profile created successfully",
          timer: 2000,
        });
      }

      navigate("/account/places");
    } catch (err) {
      console.error("Error saving place:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Failed to save teacher profile";

      setError(errorMessage);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePlace = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the teacher profile and related bookings!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await axios.delete(`/api/places/${id}`);
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Teacher profile has been deleted.",
          timer: 2000,
        });
        navigate("/account/places");
      } catch (error) {
        console.error("Error deleting place:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete teacher profile",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && !id) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}

        <h2 className="text-2xl mt-4">Teacher's Full Name:</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., John Smith"
          className="border p-2 w-full rounded"
          required
        />

        <h2 className="text-2xl mt-4">Short Description or Quote:</h2>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Unlock the World of English: Book a Lesson with a Professional!"
          className="border p-2 w-full rounded"
          required
        />

        <h2 className="text-2xl mt-4">Teacher's Profile Photo:</h2>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        <h2 className="text-2xl mt-4">Detailed Description:</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
          rows="6"
          required
        />

        <h2 className="text-2xl mt-4">Teaching Levels:</h2>
        <LevelsSelector
          selected={selectedLevels}
          onChange={setSelectedLevels}
        />

        <h2 className="text-2xl mt-4">Services Offered:</h2>
        <Perks selected={selectedPerks} onChange={setSelectedPerks} />

        <h2 className="text-2xl mt-4">Additional Information:</h2>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          className="border p-2 w-full rounded"
          rows="4"
        />

        <h2 className="text-2xl mt-4">Lesson Information:</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <div>
            <h3>Lesson Start Time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="e.g., 14:00"
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <h3>Lesson End Time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder="e.g., 15:00"
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <h3>Max Students:</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              min="1"
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <h3>Price per Lesson:</h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              className="border p-2 w-full rounded"
              required
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="submit"
            className="bg-blue-950 text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-primary-dark transition disabled:opacity-70"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                {id ? "Updating..." : "Creating..."}
              </>
            ) : id ? (
              "Update Profile"
            ) : (
              "Create Profile"
            )}
          </button>

          {id && (
            <button
              type="button"
              onClick={deletePlace}
              className="bg-red-600 text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-red-700 transition disabled:opacity-70"
              disabled={loading}
            >
              Delete Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
