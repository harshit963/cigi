import Location from '../models/locationModel.js';
import axios from 'axios';

// Fetch location data by pincode from external API
const fetchLocationByPincode = async (pincode) => {
  try {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
    if (response.data[0].Status === "Success") {
      const data = response.data[0].PostOffice[0];
      return {
        city: data.Name,
        state: data.State,
        district: data.District,
      };
    }
    throw new Error('Invalid Pincode');
  } catch (error) {
    throw new Error('Failed to fetch location');
  }
};

// CRUD operations
const createLocation = async (req, res) => {
  const { name, pincode } = req.body;
  try {
    const locationData = await fetchLocationByPincode(pincode);
    const location = new Location({ name, pincode, ...locationData });
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name, pincode } = req.body;
  try {
    const locationData = await fetchLocationByPincode(pincode);
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { name, pincode, ...locationData },
      { new: true }
    );
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    await Location.findByIdAndDelete(id);
    res.status(200).json({ message: 'Location deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createLocation, getLocations, updateLocation, deleteLocation };

