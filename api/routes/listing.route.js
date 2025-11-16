import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from "../controllers/listing.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Create listing
router.post("/create", verifyToken, createListing);

// Update listing
router.post("/update/:id", verifyToken, updateListing);

// Delete listing
router.delete("/delete/:id", verifyToken, deleteListing);

// Get single listing
router.get("/get/:id", getListing);

// Get multiple listings
router.get("/get", getListings);

export default router;
