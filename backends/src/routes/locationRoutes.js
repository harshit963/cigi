// backend/routes/locationRoutes.js
import { Router } from "express";

import { createLocation, getLocations, updateLocation, deleteLocation } from'../controllers/locationController.js';
const router = Router();


// Create new location
router.post('/', createLocation);

// Get all locations
router.get('/', getLocations);

// Update a location by ID
router.put('/:id', updateLocation);

// Delete a location by ID
router.delete('/:id', deleteLocation);


export default router;
