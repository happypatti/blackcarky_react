import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService } from '@react-google-maps/api';
import Script from 'next/script';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

const CarServiceForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [estimate, setEstimate] = useState(0);

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleDirectionsResponse = (response) => {
    if (response.status === 'OK') {
      const route = response.routes[0];
      const distance = route.legs.reduce((acc, leg) => acc + leg.distance.value, 0) / 1609.34; // convert meters to miles
      const duration = route.legs.reduce((acc, leg) => acc + leg.duration.value, 0) / 60; // convert seconds to minutes
      const estimate = distance * 10; // $2.50 per mile

      setDistance(distance);
      setDuration(duration);
      setEstimate(estimate);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: 'DRIVING',
      },
      handleDirectionsResponse
    );
  };

  return (
    <div className="max-w-md mx-auto">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Get an Estimate{' '}
        <span className="text-blue-600">Car Service</span>
        </h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="origin" className="block text-gray-700 font-bold mb-2">
            Origin:
          </label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={handleOriginChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="destination" className="block text-gray-700 font-bold mb-2">
            Destination:
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={handleDestinationChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Get Estimate
          </button>
        </div>
      </form>
      {distance > 0 && duration > 0 && estimate > 0 && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="block text-gray-700 font-bold mb-2">Distance: {distance.toFixed(2)} miles</p>
          <p className="block text-gray-700 font-bold mb-2">Duration: {duration.toFixed(0)} minutes</p>
          <p className="block text-gray-700 font-bold mb-2">Estimate: ${estimate.toFixed(2)}</p>
        </div>
      )}
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}>
      {console.log(process.env.NEXT_PUBLIC_GOOGLE_API_KEY)}
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



  export default CarServiceForm;