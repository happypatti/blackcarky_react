import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService } from '@react-google-maps/api';


const RideRequestForm = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [passengers, setPassengers] = useState('');
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(0);
  const [estimate, setEstimate] = useState(0);

  const mapContainerStyle = {
    height: '400px',
    width: '100%',
  };

  const center = {
    lat: 37.7749,
    lng: -122.4194,
  };

  const handleDirectionsResponse = (response) => {
    if (response !== null) {
      setDuration(response.routes[0].legs[0].duration.value / 60);
      setEstimate(response.routes[0].legs[0].distance.value / 1000 * 0.5);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
  };

  return (
    <div className="max-w-md mx-auto">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Get an Estimate{' '}
        <span className="text-slate-600">for your ride</span>
        </h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="pickupLocation">
            Pickup Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pickupLocation"
            type="text"
            placeholder="Enter pickup location"
            value={pickupLocation}
            onChange={(event) => setPickupLocation(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="dropoffLocation">
            Dropoff Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dropoffLocation"
            type="text"
            placeholder="Enter dropoff location"
            value={dropoffLocation}
            onChange={(event) => setDropoffLocation(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="pickupTime">
            Pickup Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pickupTime"
            type="datetime-local"
            placeholder="Enter pickup time"
            value={pickupTime}
            onChange={(event) => setPickupTime(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="passengers">
            Number of Passengers
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="passengers"
            type="number"
            placeholder="Enter number of passengers"
            value={passengers}
            onChange={(event) => setPassengers(event.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Request Ride
          </button>
        </div>
      </form>
      {origin && destination && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="block text-gray-700 font-bold mb-2">Duration: {duration.toFixed(0)} minutes</p>
          <p className="block text-gray-700 font-bold mb-2">Estimate: ${estimate.toFixed(2)}</p>
        </div>
      )}
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
          {origin && destination && (
            <DirectionsService
              options={{
                origin,
                destination,
                travelMode: 'DRIVING',
              }}
              callback={handleDirectionsResponse}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default RideRequestForm;