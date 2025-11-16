<<<<<<< HEAD
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
=======
import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
>>>>>>> bed2e5e9d950598e9f45175f83ed407444ed0bbe
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
<<<<<<< HEAD

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
=======
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
>>>>>>> bed2e5e9d950598e9f45175f83ed407444ed0bbe
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
<<<<<<< HEAD
    if (["sale", "rent"].includes(e.target.id)) {
      setFormData({ ...formData, type: e.target.id });
    }

    if (["parking", "furnished", "offer"].includes(e.target.id)) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (["text", "number", "textarea"].includes(e.target.type)) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
=======
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
>>>>>>> bed2e5e9d950598e9f45175f83ed407444ed0bbe
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

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
=======
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Update a Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>
                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
>>>>>>> bed2e5e9d950598e9f45175f83ed407444ed0bbe
              </div>
            )}
          </div>
        </div>
<<<<<<< HEAD

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
=======
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Updating...' : 'Update listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
>>>>>>> bed2e5e9d950598e9f45175f83ed407444ed0bbe
        </div>
      </form>
    </main>
  );
}
