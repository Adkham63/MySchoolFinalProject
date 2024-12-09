import React, { useState } from "react";
import axios from "axios";

const PhotosUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    if (!photoLink) {
      alert("Please provide a valid photo URL.");
      return;
    }
    setIsUploading(true); // Start loading
    try {
      const { data } = await axios.post("/api/upload-by-link", {
        link: photoLink,
      });
      onChange((prev) => [...prev, data]); // Add new photo URL to state
      setPhotoLink(""); // Clear input after upload
    } catch (err) {
      console.error("Error uploading photo:", err);
      alert("Failed to upload photo. Please try again.");
    } finally {
      setIsUploading(false); // End loading
    }
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    if (files.length === 0) {
      alert("Please select a file to upload.");
      return;
    }
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    setIsUploading(true);
    axios
      .post("/api/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) => [...prev, ...filenames]); // Add new photo filenames to state
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
        alert("Error uploading files. Please try again.");
      })
      .finally(() => setIsUploading(false)); // End loading
  }

  return (
    <>
      {/* Input for adding photo by link */}
      <div className="flex gap-2">
        <input
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          type="text"
          placeholder="Add photo using a link ... jpg"
          className="border p-2 rounded-md"
        />
        <button
          type="button"
          onClick={addPhotoByLink}
          disabled={isUploading || !photoLink}
          className="bg-gray-200 px-4 rounded-2xl"
        >
          {isUploading ? "Uploading..." : "Add Photo"}
        </button>
      </div>

      {/* Display uploaded photos */}
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, index) => (
            <div className="h-32 flex relative" key={index}>
              <img
                src={`http://localhost:4000${link}`} // Assuming the server serves images from this path
                alt={`Uploaded ${index}`}
                className="rounded-2xl w-full object-cover"
              />
            </div>
          ))}

        {/* Input for uploading photos via file input */}
        <label className="flex items-center h-32 gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 cursor-pointer">
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
            className="w-8 h-8"
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
    </>
  );
};

export default PhotosUploader;
