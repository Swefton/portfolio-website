'use client';

import dynamic from 'next/dynamic';
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function Home() {
  return (
    <main>
      <Globe
        globeImageUrl="/earth-night.jpg"
      />
    </main>
  );
}
