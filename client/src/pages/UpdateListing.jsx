import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Load listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/listing/get/${params.listingId}`
        );
        const data = await res.json();

        if (data.success === false) {
          setError("Listing not found");
          return;
        }

        // Fix: properly map fields
        setFormData({
          imageUrls: data.imageUrls || [],
          name: data.name || "",
          description: data.description || "",
          address: data.address || "",
          type: data.type || "rent",
          bedrooms: data.bedrooms || 1,
          bathrooms: data.bathrooms || 1,
          regularPrice: data.regularPrice || 50,
          discountPrice: data.discountPrice || 0,
          offer: data.offer || false,
          parking: data.parking || false,
          furnished: data.furnished || false,
        });
      } catch (err) {
        setError("Something went wrong");
      }
    };

    fetchListing();
  }, [params.listingId]);

  // Upload to backend → Cloudinary
  const handleImageUpload = async () => {
    if (files.length < 1) {
      setImageUploadError("Select at least 1 image");
      return;
    }
    if (files.length + formData.imageUrls.length > 6) {
      setImageUploadError("Maximum 6 images allowed");
      return;
    }

    setUploading(true);

    const newUrls = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const data = new FormData();
        data.append("images", files[i]);

        const res = await fetch("http://localhost:3000/api/upload-images", {
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
      setImageUploadError("Image upload failed");
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
    if (["sale", "rent"].includes(e.target.id)) {
      setFormData({ ...formData, type: e.target.id });
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

    if (formData.imageUrls.length < 1) {
      return setError("Upload at least 1 image");
    }

    if (+formData.discountPrice > +formData.regularPrice) {
      return setError("Discount must be lower");
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/api/listing/update/${params.listingId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        }
      );

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate(`/listing/${data._id}`);
    } catch (err) {
      setLoading(false);
      setError("Update failed");
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Update Listing</h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 flex-1">
          <input
            id="name"
            type="text"
            className="border p-3 rounded-lg"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            id="description"
            className="border p-3 rounded-lg"
            required
            value={formData.description}
            onChange={handleChange}
          />

          <input
            id="address"
            type="text"
            className="border p-3 rounded-lg"
            required
            value={formData.address}
            onChange={handleChange}
          />

          {/* CHECKBOXES */}
          <div className="flex gap-6 flex-wrap">
            <label>
              <input
                type="checkbox"
                id="sale"
                checked={formData.type === "sale"}
                onChange={handleChange}
              />
              Sell
            </label>

            <label>
              <input
                type="checkbox"
                id="rent"
                checked={formData.type === "rent"}
                onChange={handleChange}
              />
              Rent
            </label>

            <label>
              <input
                type="checkbox"
                id="parking"
                checked={formData.parking}
                onChange={handleChange}
              />
              Parking
            </label>

            <label>
              <input
                type="checkbox"
                id="furnished"
                checked={formData.furnished}
                onChange={handleChange}
              />
              Furnished
            </label>

            <label>
              <input
                type="checkbox"
                id="offer"
                checked={formData.offer}
                onChange={handleChange}
              />
              Offer
            </label>
          </div>

          {/* NUMBERS */}
          <div className="flex gap-6 flex-wrap">
            <div>
              <input
                id="bedrooms"
                type="number"
                min="1"
                className="border p-3 rounded-lg"
                value={formData.bedrooms}
                onChange={handleChange}
              />
              <p>Beds</p>
            </div>

            <div>
              <input
                id="bathrooms"
                type="number"
                min="1"
                className="border p-3 rounded-lg"
                value={formData.bathrooms}
                onChange={handleChange}
              />
              <p>Baths</p>
            </div>

            <div>
              <input
                id="regularPrice"
                type="number"
                min="50"
                className="border p-3 rounded-lg"
                value={formData.regularPrice}
                onChange={handleChange}
              />
              <p>Regular Price</p>
            </div>

            {formData.offer && (
              <div>
                <input
                  id="discountPrice"
                  type="number"
                  min="0"
                  className="border p-3 rounded-lg"
                  value={formData.discountPrice}
                  onChange={handleChange}
                />
                <p>Discount Price</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Images (max 6)</p>

          <div className="flex gap-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className="border p-3 rounded w-full"
            />

            <button
              type="button"
              disabled={uploading}
              onClick={handleImageUpload}
              className="border p-3 text-green-700 border-green-700 rounded"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {imageUploadError && (
            <p className="text-red-700 text-sm">{imageUploadError}</p>
          )}

          {formData.imageUrls.map((url, index) => (
            <div key={url} className="flex justify-between border p-3">
              <img
                src={url}
                className="w-20 h-20 object-contain rounded"
                alt=""
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="text-red-700"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            disabled={loading || uploading}
            className="bg-slate-700 text-white p-3 rounded"
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>

          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
