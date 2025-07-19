"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GlobeWidget() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Main scene for arcs and labels
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("black");

    // Globe scene for ASCII rendering
    const globeScene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = true;
    renderer.sortObjects = true;
    container.appendChild(renderer.domElement);

    // Load earth texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/temp.png");
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.flipY = false;

    // Create globe for ASCII rendering
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    const globeMaterial = new THREE.MeshBasicMaterial({ 
      map: texture,
      side: THREE.FrontSide
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeScene.add(globe);

    // Create visible globe with dark material for main scene
    const visibleGlobeGeometry = new THREE.SphereGeometry(1, 64, 64);
    const visibleGlobeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x222222,
      side: THREE.FrontSide
    });
    const visibleGlobe = new THREE.Mesh(visibleGlobeGeometry, visibleGlobeMaterial);
    scene.add(visibleGlobe);

    // Helper function to convert lat/lng to 3D coordinates
    function latLngToVector3(lat, lng, radius = 1) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    // Create arc between Delhi and Michigan
    const arcGroup = new THREE.Group();
    
    // Coordinates
    const delhi = { lat: 28.6139, lng: 77.2090 };
    const michigan = { lat: 42.3314, lng: -84.5467 }; // Detroit, Michigan
    
    // Convert to 3D positions on sphere
    const delhiPos = latLngToVector3(delhi.lat, delhi.lng);
    const michiganPos = latLngToVector3(michigan.lat, michigan.lng);
    
    // Create westward arc (going the long way around)
    function createWestwardArc(start, end, arcHeight = 0.3) {
      const points = [];
      const numPoints = 100;
      
      // Calculate intermediate points going westward
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        
        // Interpolate longitude going westward (longer route)
        let startLng = delhi.lng;
        let endLng = michigan.lng;
        
        // Force westward path by going the long way
        if (endLng > startLng) {
          endLng -= 360; // Go west across dateline
        }
        
        const lng = startLng + t * (endLng - startLng);
        
        // Interpolate latitude with arc curve
        const lat = delhi.lat + t * (michigan.lat - delhi.lat);
        
        // Add height curve (parabolic arc)
        const heightMultiplier = 1 + arcHeight * Math.sin(t * Math.PI);
        const pos = latLngToVector3(lat, lng, heightMultiplier);
        
        points.push(pos);
      }
      
      return points;
    }
    
    const arcPoints = createWestwardArc(delhiPos, michiganPos);
    const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
    const arcMaterial = new THREE.LineBasicMaterial({ 
      color: "limegreen", 
      linewidth: 3
    });
    const arc = new THREE.Line(arcGeometry, arcMaterial);
    arcGroup.add(arc);
    
    // Add markers for cities
    const markerGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: "red" });
    
    const delhiMarker = new THREE.Mesh(markerGeometry, markerMaterial);
    delhiMarker.position.copy(delhiPos.multiplyScalar(1.02));
    arcGroup.add(delhiMarker);
    
    const michiganMarker = new THREE.Mesh(markerGeometry, markerMaterial);
    michiganMarker.position.copy(michiganPos.multiplyScalar(1.02));
    arcGroup.add(michiganMarker);
    
    scene.add(arcGroup);

    // ASCII Canvas overlay
    const asciiCanvas = document.createElement("canvas");
    asciiCanvas.width = width;
    asciiCanvas.height = height;
    asciiCanvas.style.position = "absolute";
    asciiCanvas.style.top = "0";
    asciiCanvas.style.left = "0";
    asciiCanvas.style.pointerEvents = "none";
    asciiCanvas.style.zIndex = "1";
    container.appendChild(asciiCanvas);

    const asciiContext = asciiCanvas.getContext("2d");
    asciiContext.font = "8px monospace";
    asciiContext.fillStyle = "white";

    // Render target for ASCII
    const renderTarget = new THREE.WebGLRenderTarget(width, height);
    const chars = " .:-=+*#%@";

    function renderAscii() {
      // Render globe to texture
      renderer.setRenderTarget(renderTarget);
      renderer.render(globeScene, camera);
      renderer.setRenderTarget(null);

      // Read pixels
      const pixelBuffer = new Uint8Array(width * height * 4);
      renderer.readRenderTargetPixels(renderTarget, 0, 0, width, height, pixelBuffer);

      // Convert to ASCII
      asciiContext.clearRect(0, 0, width, height);
      for (let y = 0; y < height; y += 8) {
        for (let x = 0; x < width; x += 4) {
          const i = (y * width + x) * 4;
          const brightness = (pixelBuffer[i] + pixelBuffer[i + 1] + pixelBuffer[i + 2]) / 3;
          const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
          asciiContext.fillText(chars[charIndex], x, y);
        }
      }
    }

    // Animation loop
    let frameCount = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate globes and arc together
      const rotation = globe.rotation.y + 0.003;
      globe.rotation.y = rotation;
      visibleGlobe.rotation.y = rotation;
      arcGroup.rotation.y = rotation;
      
      // Render main scene (arcs and labels)
      renderer.render(scene, camera);
      
      // Render ASCII every 3 frames for performance
      if (frameCount % 3 === 0) {
        renderAscii();
      }
      frameCount++;
    };

    animate();

    // Cleanup
    return () => {
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (container.contains(asciiCanvas)) {
        container.removeChild(asciiCanvas);
      }
      renderer.dispose();
      renderTarget.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      visibleGlobeGeometry.dispose();
      visibleGlobeMaterial.dispose();
      lineGeometry.dispose();
      arcMaterial.dispose();
      texture.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '400px', 
        height: '400px', 
        position: 'relative',
        border: '1px solid #333'
      }} 
    />
  );
}