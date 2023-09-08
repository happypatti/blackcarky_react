import { useEffect, useRef } from 'react';
import { ButtonLink } from '@/components/Button';
import { Container } from '@/components/Container';

export function Hero() {
  const mapRef = useRef(null);

  useEffect(() => {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
    googleMapsScript.async = true;
    window.document.body.appendChild(googleMapsScript);

    googleMapsScript.addEventListener('load', () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 38.046190, lng: -84.459330 },
        zoom: 17,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: 38.046190, lng: -84.459330 },
        map,
        title: 'Used Tire and Auto Repair',
      });
    });
  }, []);

  function handleGetDirections() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps/dir/?api=1&destination=SHOP_LATITUDE,SHOP_LONGITUDE&travelmode=driving&dir_action=navigate`;
        window.open(url.replace('SHOP_LATITUDE', '38.046190').replace('SHOP_LONGITUDE', '-84.459330'), '_blank');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  return (
    <Container className="pt-30 pb-64 text-center lg:pt-0">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-white sm:text-7xl">
      Used Tire & Auto Repair{' '}
        <span className="relative whitespace-nowrap text-blue-700">
          <span className="relative"> Lexington, KY </span>
        </span>{' '}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-white">
        Welcome to Used Tire & Auto Repair, serving the Lexington, KY area. We offer used tires, new tires, full mechanic
        service, and anything in-between.
      </p>
      <br></br>
      <h1 className="mx-auto max-w-4xl font-display text-2xl font-medium tracking-tight text-white sm:text-5xl">
        CALL US AT 859-327-3053
      </h1>
      <br></br>
      <br></br>
      <h1 className="mx-auto max-w-4xl font-display text-2xl font-medium tracking-tight text-white sm:text-5xl">
        FIND US{' '}
        <br></br>
      </h1>
      <h1>
        {' '}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-white">
        We are located at 1225 Eastland Drive in Lexington, KY. We are open Monday through Saturday, 9am to 6pm.
      </p>

      <div className="mx-auto mt-6 max-w-2xl h-96" ref={mapRef} />
    </Container>
  )
}