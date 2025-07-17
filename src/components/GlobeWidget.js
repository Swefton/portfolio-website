"use client";

import dynamic from 'next/dynamic';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const PixelateShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new THREE.Vector2() },
    pixelSize: { value: 4.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float pixelSize;
    varying vec2 vUv;

    void main() {
      vec2 dxy = pixelSize / resolution;
      vec2 coord = dxy * floor( vUv / dxy );
      vec4 color = texture2D(tDiffuse, coord);
      gl_FragColor = color;
    }
  `
};


export default function GlobeWidget() {
  const globeRef = useRef();

  useEffect(() => {
    let animationFrameId;

    const tryAddAsciiPass = () => {
      if (globeRef.current) {
        const composer = globeRef.current.postProcessingComposer?.();
        if (composer) {
          const pixelPass = new ShaderPass(PixelateShader);
          pixelPass.uniforms['resolution'].value = new THREE.Vector2(window.innerWidth, window.innerHeight);
          pixelPass.uniforms['pixelSize'].value = 3.0;

          composer.addPass(pixelPass);

          console.log("Pixelation pass added for ASCII aesthetic");
          return;
        }
      }
      animationFrameId = requestAnimationFrame(tryAddAsciiPass);
    };

    animationFrameId = requestAnimationFrame(tryAddAsciiPass);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

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
      ref={globeRef}
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
