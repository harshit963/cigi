// client/src/app/locations/page.tsx
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationForm from '../../components/LocationForm';

const LocationsPage = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [editingLocation, setEditingLocation] = useState<any | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        console.log("Fetching locations from backend...");
        const res = await axios.get('https://cigi.onrender.com/api/locations');
        console.log("API Response:", res.data);
        setLocations(res.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);
  const handleSave = () => {
    axios.get('https://cigi.onrender.com/api/locations').then((res) => setLocations(res.data));
  };

  const handleEdit = (location: any) => {
    setEditingLocation(location);
  };

  const handleDelete = async (locationId: string) => {
    try {
      await axios.delete(`https://cigi.onrender.com/api/locations/${locationId}`);
      setLocations(locations.filter(location => location._id !== locationId));
    } catch (error) {
      console.error('Error deleting location', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center"> Locations Crud Operation</h1>

      <LocationForm onSave={handleSave} locationId={editingLocation?._id} initialLocation={editingLocation} />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Location List</h2>
        <ul>
          {locations.map((location) => (
            <li key={location._id} className="flex justify-between items-center p-4 border-b">
              <div>
                <h3 className="text-xl">{location.name}</h3>
                <p>{location.city}, {location.state}, {location.district}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(location)}
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(location._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationsPage;
