
import { useState } from 'react';
import axios from 'axios';

interface LocationFormProps {
  onSave: () => void;
  locationId?: string;
  initialLocation?: {
    name: string;
    pincode: string;
  };
}

const LocationForm: React.FC<LocationFormProps> = ({ onSave, locationId, initialLocation }) => {
  const [name, setName] = useState<string>(initialLocation?.name || '');
  const [pincode, setPincode] = useState<string>(initialLocation?.pincode || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (locationId) {
        // Update Location
        await axios.put(`http://localhost:8000/api/locations/${locationId}`, { name, pincode });
      } else {
        // Create Location
        await axios.post('http://localhost:8000/api/locations', { name, pincode });
      }
      onSave();
      setName('');
      setPincode('');
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
      <div className="mb-2">
        <label className="block text-sm font-medium">User  Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Pincode</label>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {locationId ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default LocationForm;


