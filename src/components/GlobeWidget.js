"use client";

import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function GlobeWidget() {
  return (
    <Globe
      globeImageUrl="/earth-night.jpg"
      backgroundColor="black"
    />
  );
}
