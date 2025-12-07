import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

// ===============================
// CREATE LISTING
// ===============================
export const createListing = async (req, res, next) => {
  try {
    const {
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      sell,
      rent,
      offer,
      imageUrls,
      userRef,
    } = req.body;

    // Validate images
    if (!imageUrls || imageUrls.length === 0) {
      return next(errorHandler(400, "At least one image is required."));
    }

    // Validate at least one of sell or rent is selected
    if (!sell && !rent) {
      return next(errorHandler(400, "Please select at least Sell or Rent."));
    }

    // Create listing
    const listing = await Listing.create({
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      sell,
      rent,
      offer,
      imageUrls, // Cloudinary URLs only
      userRef,
    });

    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// ===============================
// DELETE LISTING
// ===============================
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return next(errorHandler(404, "Listing not found!"));

    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only delete your own listings!"));
    }

    await Listing.findByIdAndDelete(req.params.id);

    return res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

// ===============================
// UPDATE LISTING
// ===============================
export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return next(errorHandler(404, "Listing not found!"));

    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only update your own listings!"));
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// ===============================
// GET SINGLE LISTING
// ===============================
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// ===============================
// GET MULTIPLE LISTINGS
// ===============================
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    // Build filter based on type parameter
    // 'all' = show all listings (sell or rent or both)
    // 'sale' = show only listings with sell=true
    // 'rent' = show only listings with rent=true
    let typeFilter = {};
    const type = req.query.type;
    if (type === "sale") {
      typeFilter = { sell: true };
    } else if (type === "rent") {
      typeFilter = { rent: true };
    }
    // For 'all' or undefined, no type filter is applied

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      ...typeFilter,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
