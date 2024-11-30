import React, { useEffect, useRef } from 'react';
import { Map as MapIcon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const GISMap = () => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([-15.3875, 28.3228], 13); // Lusaka coordinates

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      // Example property markers
      const properties = [
        { lat: -15.3875, lng: 28.3228, title: 'Property 1' },
        { lat: -15.3925, lng: 28.3278, title: 'Property 2' }
      ];

      properties.forEach(prop => {
        L.marker([prop.lat, prop.lng])
          .bindPopup(prop.title)
          .addTo(mapRef.current!);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MapIcon className="text-blue-600" />
          <h2 className="text-xl font-semibold">Geographic Information System</h2>
        </div>
        <div id="map" className="h-[600px] rounded-lg" />
      </div>
    </div>
  );
};

export default GISMap;