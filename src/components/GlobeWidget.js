"use client";

import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function GlobeWidget() {

  const home = { lat: 28.46244225314406, lng: 77.0322148005431, label: "Home" };
  const university = { lat: 42.72588843752106, lng: -84.47749766093524, label: "University" };

  const arcsData = [
    {
      startLat: home.lat,
      startLng: home.lng,
      endLat: university.lat,
      endLng: university.lng,
      color: ["green", "limegreen"],
    },
  ];

  const labelsData = [
    { lat: home.lat, lng: home.lng, text: home.label },
    { lat: university.lat, lng: university.lng, text: university.label },
  ];

  return (
    <Globe
      globeImageUrl="/earth-night.jpg"
      backgroundColor="black"
      arcsData={arcsData}
      arcDashLength={0.3}
      arcDashGap={0.05}
      arcDashAnimateTime={4000}
      arcStroke={0.5}
      arcAltitude={0.2}
      arcColor={arc => arc.color}
      labelsData={labelsData}
      labelLat={d => d.lat}
      labelLng={d => d.lng}
      labelText={d => d.text}
      labelSize={1}
      labelDotRadius={0.4}
      labelColor={() => "white"}
      labelResolution={2}
      labelAltitude={0.01}
    />
  );
}
