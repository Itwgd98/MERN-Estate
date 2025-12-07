import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    sell: false,
    rent: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // ⭐ Upload images to Cloudinary via backend
  const handleImageUpload = async () => {
    if (files.length < 1) {
      setImageUploadError("Please select at least one image.");
      return;
    }

    if (files.length + formData.imageUrls.length > 6) {
      setImageUploadError("You can upload maximum 6 images.");
      return;
    }

    setUploading(true);
    setImageUploadError(false);

    const newUrls = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const data = new FormData();
        data.append("images", files[i]); // MUST MATCH multer field

        const res = await fetch("/api/upload-images", {
          method: "POST",
          body: data,
        });

        const json = await res.json();

        if (json.success) newUrls.push(json.url);
      }

      setFormData({
        ...formData,
        imageUrls: [...formData.imageUrls, ...newUrls],
      });
    } catch (err) {
      setImageUploadError("Image upload failed.");
    }

    setUploading(false);
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    // Handle sell and rent as independent boolean checkboxes
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (["parking", "furnished", "offer"].includes(e.target.id)) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (["text", "number", "textarea"].includes(e.target.type)) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.sell && !formData.rent) {
      return setError("Please select at least Sell or Rent.");
    }

    if (formData.imageUrls.length < 1) {
      return setError("Please upload at least one image.");
    }

    if (+formData.regularPrice < +formData.discountPrice) {
      return setError("Discount price must be lower than regular price.");
    }

    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate(`/listing/${data._id}`);
    } catch (err) {
      setLoading(false);
      setError("Failed to create listing.");
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="border p-3 rounded-lg"
            required
            onChange={handleChange}
          />

          <textarea
            id="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            required
            onChange={handleChange}
          />

          <input
            type="text"
            id="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            required
            onChange={handleChange}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                checked={formData.sell}
                onChange={handleChange}
              />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                checked={formData.rent}
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" onChange={handleChange} />
              <span>Parking Spot</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" onChange={handleChange} />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" onChange={handleChange} />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                className="p-3 border rounded-lg"
                onChange={handleChange}
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                className="p-3 border rounded-lg"
                onChange={handleChange}
              />
              <p>Baths</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                className="p-3 border rounded-lg"
                onChange={handleChange}
              />
              <p>Regular Price</p>
            </div>

            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  className="p-3 border rounded-lg"
                  onChange={handleChange}
                />
                <p>Discount Price</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              First image is the cover (max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              name="images"
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="p-3 border rounded w-full"
              type="file"
              accept="image/*"
              multiple
            />

            <button
              type="button"
              onClick={handleImageUpload}
              disabled={uploading}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:opacity-95"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {imageUploadError && (
            <p className="text-red-700 text-sm">{imageUploadError}</p>
          )}

          {formData.imageUrls.map((url, index) => (
            <div
              key={url}
              className="flex justify-between p-3 border items-center"
            >
              <img src={url} className="w-20 h-20 object-contain" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="p-3 text-red-700"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded uppercase hover:opacity-95"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>

          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
