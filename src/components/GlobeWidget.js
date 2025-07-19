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

    // Create main container with black background
    container.style.backgroundColor = 'black';

    // CANVAS A: ASCII Globe Scene (background layer)
    const asciiScene = new THREE.Scene();
    
    const asciiCamera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    asciiCamera.position.z = 3;

    const asciiRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    asciiRenderer.setSize(width, height);
    asciiRenderer.setPixelRatio(window.devicePixelRatio);
    asciiRenderer.setClearColor(0x000000, 0); // Transparent clear
    asciiRenderer.domElement.style.position = "absolute";
    asciiRenderer.domElement.style.top = "0";
    asciiRenderer.domElement.style.left = "0";
    asciiRenderer.domElement.style.zIndex = "1";
    container.appendChild(asciiRenderer.domElement);

    // CANVAS B: Arc Scene with proper depth testing
    const arcScene = new THREE.Scene();
    
    const arcCamera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    arcCamera.position.z = 3;

    const arcRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    arcRenderer.setSize(width, height);
    arcRenderer.setPixelRatio(window.devicePixelRatio);
    arcRenderer.setClearColor(0x000000, 0); // Transparent clear
    arcRenderer.domElement.style.position = "absolute";
    arcRenderer.domElement.style.top = "0";
    arcRenderer.domElement.style.left = "0";
    arcRenderer.domElement.style.zIndex = "3";
    arcRenderer.domElement.style.pointerEvents = "none";
    
    // Enable depth testing for proper occlusion
    arcRenderer.sortObjects = true;
    arcRenderer.autoClear = true;
    container.appendChild(arcRenderer.domElement);

    // Load earth texture for ASCII globe
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/temp.png");
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.flipY = false;

    // ASCII Globe (Canvas A) - only for ASCII rendering
    const asciiGlobeGeometry = new THREE.SphereGeometry(1, 64, 64);
    const asciiGlobeMaterial = new THREE.MeshBasicMaterial({ 
      map: texture,
      side: THREE.FrontSide
    });
    const asciiGlobe = new THREE.Mesh(asciiGlobeGeometry, asciiGlobeMaterial);
    asciiScene.add(asciiGlobe);

    // Depth-writing globe for arc scene (Canvas B) - this creates the depth mask
    const depthGlobeGeometry = new THREE.SphereGeometry(1, 64, 64);
    const depthGlobeMaterial = new THREE.MeshBasicMaterial({ 
      colorWrite: false,    // Don't draw color
      depthWrite: true,     // Write to depth buffer
      depthTest: false,     // Globe itself doesn't test depth
      side: THREE.FrontSide
    });
    const depthGlobe = new THREE.Mesh(depthGlobeGeometry, depthGlobeMaterial);
    arcScene.add(depthGlobe);

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

    // Create arc between Delhi and Michigan (Canvas B)
    const arcGroup = new THREE.Group();
    
    // Coordinates
    const delhi = { lat: 28.6139, lng: 77.2090 };
    const michigan = { lat: 42.3314, lng: -84.5467 }; // Detroit, Michigan
    
    // Convert to 3D positions on sphere
    const delhiPos = latLngToVector3(delhi.lat, delhi.lng);
    const michiganPos = latLngToVector3(michigan.lat, michigan.lng);
    
    // Create westward arc with many segments for granular occlusion
    function createWestwardArc(start, end, arcHeight = 0.3) {
      const points = [];
      const numPoints = 200; // More points for finer occlusion granularity
      
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
    
    // Create multiple line segments instead of one continuous line for better depth testing
    const arcPoints = createWestwardArc(delhiPos, michiganPos);
    
    // Break arc into small segments that can be individually depth-tested
    const segmentLength = 5; // Points per segment
    for (let i = 0; i < arcPoints.length - segmentLength; i += segmentLength) {
      const segmentPoints = arcPoints.slice(i, i + segmentLength + 1);
      const segmentGeometry = new THREE.BufferGeometry().setFromPoints(segmentPoints);
      const segmentMaterial = new THREE.LineBasicMaterial({ 
        color: "limegreen", 
        linewidth: 3,
        depthTest: true,      // Test against depth buffer
        depthWrite: false,    // Don't write to depth buffer
        transparent: false
      });
      const segment = new THREE.Line(segmentGeometry, segmentMaterial);
      arcGroup.add(segment);
    }
    
    // Add markers for cities
    const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ 
      color: "red",
      depthTest: true,      // Test against depth buffer
      depthWrite: false     // Don't write to depth buffer
    });
    
    const delhiMarker = new THREE.Mesh(markerGeometry, markerMaterial);
    delhiMarker.position.copy(delhiPos.clone().multiplyScalar(1.02));
    arcGroup.add(delhiMarker);
    
    const michiganMarker = new THREE.Mesh(markerGeometry, markerMaterial);
    michiganMarker.position.copy(michiganPos.clone().multiplyScalar(1.02));
    arcGroup.add(michiganMarker);
    
    arcScene.add(arcGroup);
    
    // Add labels for cities (positioned relative to arc canvas)
    const labelGroup = document.createElement('div');
    labelGroup.style.position = 'absolute';
    labelGroup.style.top = '0';
    labelGroup.style.left = '0';
    labelGroup.style.width = '100%';
    labelGroup.style.height = '100%';
    labelGroup.style.pointerEvents = 'none';
    labelGroup.style.zIndex = '4';
    container.appendChild(labelGroup);
    
    const delhiLabel = document.createElement('div');
    delhiLabel.textContent = 'home';
    delhiLabel.style.position = 'absolute';
    delhiLabel.style.color = 'white';
    delhiLabel.style.fontSize = '12px';
    delhiLabel.style.fontFamily = 'monospace';
    delhiLabel.style.pointerEvents = 'none';
    labelGroup.appendChild(delhiLabel);
    
    const michiganLabel = document.createElement('div');
    michiganLabel.textContent = 'university';
    michiganLabel.style.position = 'absolute';
    michiganLabel.style.color = 'white';
    michiganLabel.style.fontSize = '12px';
    michiganLabel.style.fontFamily = 'monospace';
    michiganLabel.style.pointerEvents = 'none';
    labelGroup.appendChild(michiganLabel);
    
    // Function to update label positions
    function updateLabelPositions(rotation) {
      // Apply current rotation to positions for proper depth testing
      const rotatedDelhiPos = delhiPos.clone();
      rotatedDelhiPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation);
      
      const rotatedMichiganPos = michiganPos.clone();
      rotatedMichiganPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation);
      
      // Delhi label position
      const delhiScreenPos = rotatedDelhiPos.clone();
      delhiScreenPos.project(arcCamera);
      
      const delhiX = (delhiScreenPos.x * 0.5 + 0.5) * width;
      const delhiY = (delhiScreenPos.y * -0.5 + 0.5) * height;
      
      delhiLabel.style.left = delhiX + 'px';
      delhiLabel.style.top = (delhiY - 25) + 'px';
      delhiLabel.style.display = rotatedDelhiPos.z > 0 ? 'block' : 'none';
      
      // Michigan label position
      const michiganScreenPos = rotatedMichiganPos.clone();
      michiganScreenPos.project(arcCamera);
      
      const michiganX = (michiganScreenPos.x * 0.5 + 0.5) * width;
      const michiganY = (michiganScreenPos.y * -0.5 + 0.5) * height;
      
      michiganLabel.style.left = michiganX + 'px';
      michiganLabel.style.top = (michiganY - 25) + 'px';
      michiganLabel.style.display = rotatedMichiganPos.z > 0 ? 'block' : 'none';
    }
    
    // Mouse interaction for horizontal rotation
    let isDragging = false;
    let previousMouseX = 0;
    let rotationVelocity = 0;
    let currentRotation = 0;
    
    const onMouseDown = (event) => {
      isDragging = true;
      previousMouseX = event.clientX;
      rotationVelocity = 0;
    };
    
    const onMouseMove = (event) => {
      if (!isDragging) return;
      
      const deltaX = event.clientX - previousMouseX;
      rotationVelocity = deltaX * 0.01;
      currentRotation += rotationVelocity;
      
      // Apply rotation to both globes and arc group
      asciiGlobe.rotation.y = currentRotation;
      depthGlobe.rotation.y = currentRotation;
      arcGroup.rotation.y = currentRotation;
      
      previousMouseX = event.clientX;
    };
    
    const onMouseUp = () => {
      isDragging = false;
    };
    
    // Touch events for mobile
    const onTouchStart = (event) => {
      if (event.touches.length === 1) {
        isDragging = true;
        previousMouseX = event.touches[0].clientX;
        rotationVelocity = 0;
        event.preventDefault();
      }
    };
    
    const onTouchMove = (event) => {
      if (!isDragging || event.touches.length !== 1) return;
      
      const deltaX = event.touches[0].clientX - previousMouseX;
      rotationVelocity = deltaX * 0.01;
      currentRotation += rotationVelocity;
      
      // Apply rotation to both globes and arc group
      asciiGlobe.rotation.y = currentRotation;
      depthGlobe.rotation.y = currentRotation;
      arcGroup.rotation.y = currentRotation;
      
      previousMouseX = event.touches[0].clientX;
      event.preventDefault();
    };
    
    const onTouchEnd = () => {
      isDragging = false;
    };
    
    // Add event listeners to ASCII canvas (bottom layer)
    asciiRenderer.domElement.addEventListener('mousedown', onMouseDown);
    asciiRenderer.domElement.addEventListener('mousemove', onMouseMove);
    asciiRenderer.domElement.addEventListener('mouseup', onMouseUp);
    asciiRenderer.domElement.addEventListener('mouseleave', onMouseUp);
    
    asciiRenderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false });
    asciiRenderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false });
    asciiRenderer.domElement.addEventListener('touchend', onTouchEnd);
    asciiRenderer.domElement.addEventListener('touchcancel', onTouchEnd);

    // ASCII Canvas overlay 
    const asciiCanvas = document.createElement("canvas");
    asciiCanvas.width = width;
    asciiCanvas.height = height;
    asciiCanvas.style.position = "absolute";
    asciiCanvas.style.top = "0";
    asciiCanvas.style.left = "0";
    asciiCanvas.style.pointerEvents = "none";
    asciiCanvas.style.zIndex = "2"; // Above ASCII renderer, below arc renderer
    container.appendChild(asciiCanvas);

    const asciiContext = asciiCanvas.getContext("2d");
    asciiContext.font = "8px monospace";
    asciiContext.fillStyle = "white";

    // Render target for ASCII
    const renderTarget = new THREE.WebGLRenderTarget(width, height);
    const chars = " .:-=+*#%@";

    function renderAscii() {
      // Render ASCII globe to texture
      asciiRenderer.setRenderTarget(renderTarget);
      asciiRenderer.render(asciiScene, asciiCamera);
      asciiRenderer.setRenderTarget(null);

      // Read pixels
      const pixelBuffer = new Uint8Array(width * height * 4);
      asciiRenderer.readRenderTargetPixels(renderTarget, 0, 0, width, height, pixelBuffer);

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
      
      // Auto-rotation only when not dragging
      if (!isDragging) {
        // Add some momentum/inertia
        rotationVelocity *= 0.95;
        currentRotation += rotationVelocity;
        
        // Apply rotation to both globes and arc group
        asciiGlobe.rotation.y = currentRotation;
        depthGlobe.rotation.y = currentRotation;
        arcGroup.rotation.y = currentRotation;
      }
      
      // Update label positions to track their geographic locations
      updateLabelPositions(currentRotation);
      
      // Render ASCII every 3 frames for performance
      if (frameCount % 3 === 0) {
        renderAscii();
      }
      
      // Render the arc scene with depth testing
      // The depth globe writes to depth buffer first, then arcs are tested against it
      arcRenderer.render(arcScene, arcCamera);
      
      frameCount++;
    };

    animate();

    // Cleanup
    return () => {
      // Remove event listeners
      asciiRenderer.domElement.removeEventListener('mousedown', onMouseDown);
      asciiRenderer.domElement.removeEventListener('mousemove', onMouseMove);
      asciiRenderer.domElement.removeEventListener('mouseup', onMouseUp);
      asciiRenderer.domElement.removeEventListener('mouseleave', onMouseUp);
      asciiRenderer.domElement.removeEventListener('touchstart', onTouchStart);
      asciiRenderer.domElement.removeEventListener('touchmove', onTouchMove);
      asciiRenderer.domElement.removeEventListener('touchend', onTouchEnd);
      asciiRenderer.domElement.removeEventListener('touchcancel', onTouchEnd);
      
      // Remove DOM elements
      if (container.contains(asciiRenderer.domElement)) {
        container.removeChild(asciiRenderer.domElement);
      }
      if (container.contains(arcRenderer.domElement)) {
        container.removeChild(arcRenderer.domElement);
      }
      if (container.contains(asciiCanvas)) {
        container.removeChild(asciiCanvas);
      }
      if (container.contains(labelGroup)) {
        container.removeChild(labelGroup);
      }
      
      // Dispose resources
      asciiRenderer.dispose();
      arcRenderer.dispose();
      renderTarget.dispose();
      asciiGlobeGeometry.dispose();
      asciiGlobeMaterial.dispose();
      depthGlobeGeometry.dispose();
      depthGlobeMaterial.dispose();
      markerGeometry.dispose();
      markerMaterial.dispose();
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