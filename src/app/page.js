'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function Home() {
  const globeRef = useRef();

  useEffect(() => {
    if (!globeRef.current) return;

    const N = 300;
    const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() / 3,
      color: ['red', 'white', 'blue', 'green'][Math.floor(Math.random() * 4)]
    }));

    globeRef.current.pointsData(gData);
    globeRef.current.pointAltitude('size');
    globeRef.current.pointColor('color');

  }, []);

  return (
    <main className="fixed inset-0 bg-black">
      <Globe
        ref={globeRef}
        globeImageUrl="/earth-night.jpg" // using local file
      />
    </main>
  );
}
