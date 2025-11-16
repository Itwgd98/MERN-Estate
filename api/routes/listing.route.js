<<<<<<< HEAD
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

/*
  IMPORTANT:
  Image upload is NO LONGER handled in this route.
  Images are uploaded separately through:
  POST /api/upload-images
  And frontend sends only image URLs here.
*/

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
=======
import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

export default router;
>>>>>>> bed2e5e9d950598e9f45175f83ed407444ed0bbe
