import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Camera, Box, Sparkles, RefreshCw, Layers, Eye, RotateCw } from 'lucide-react';

interface HeroThreeViewerProps {
  initialStage?: 'photo' | 'model' | 'miniature';
  onStageChange?: (stage: 'photo' | 'model' | 'miniature') => void;
  className?: string;
}

export const HeroThreeViewer: React.FC<HeroThreeViewerProps> = ({
  initialStage = 'miniature',
  onStageChange,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<'photo' | 'model' | 'miniature'>(initialStage);
  const [carColor, setCarColor] = useState<string>('#FF6801'); // Brand signature orange default
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // References for Three.js instance
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const carGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<{
    bodyMat: THREE.MeshPhysicalMaterial;
    glassMat: THREE.MeshPhysicalMaterial;
    tireMat: THREE.MeshStandardMaterial;
    rimMat: THREE.MeshStandardMaterial;
    wireframeMat: THREE.MeshBasicMaterial;
    caliperMat: THREE.MeshStandardMaterial;
  } | null>(null);

  const isMouseDownRef = useRef<boolean>(false);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0.005 });

  const colorOptions = [
    { name: 'MYMINI Orange', hex: '#FF6801' },
    { name: 'Heritage Racing Green', hex: '#1B4D3E' },
    { name: 'Monza Red', hex: '#D62828' },
    { name: 'Studio Chalk Grey', hex: '#D1D5DB' },
    { name: 'Nocturne Black', hex: '#18181B' },
  ];

  const handleStageSelect = (stage: 'photo' | 'model' | 'miniature') => {
    setActiveStage(stage);
    if (onStageChange) onStageChange(stage);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(5.5, 3.2, 5.8);
    camera.lookAt(0, 0.4, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Clear previous canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.8);
    keyLight.position.set(6, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.bias = -0.0008;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf1f5f9, 1.2);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff8c42, 2.0); // subtle orange rim
    rimLight.position.set(-2, 3, -6);
    scene.add(rimLight);

    const bottomBounce = new THREE.DirectionalLight(0xffffff, 0.4);
    bottomBounce.position.set(0, -4, 0);
    scene.add(bottomBounce);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Plinth (Museum Display Stand)
    const plinthGroup = new THREE.Group();
    const plinthGeo = new THREE.CylinderGeometry(2.4, 2.5, 0.22, 64);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.6,
      metalness: 0.2,
    });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = -0.11;
    plinth.receiveShadow = true;
    plinthGroup.add(plinth);

    // Plinth top circular insert (Warm walnut feel)
    const topInsertGeo = new THREE.CylinderGeometry(2.32, 2.32, 0.02, 64);
    const topInsertMat = new THREE.MeshStandardMaterial({
      color: 0x241e1a,
      roughness: 0.8,
      metalness: 0.1,
    });
    const topInsert = new THREE.Mesh(topInsertGeo, topInsertMat);
    topInsert.position.y = 0.01;
    topInsert.receiveShadow = true;
    plinthGroup.add(topInsert);

    // Brass Plaque on Plinth
    const plaqueGeo = new THREE.BoxGeometry(0.7, 0.08, 0.02);
    const plaqueMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.25,
    });
    const plaque = new THREE.Mesh(plaqueGeo, plaqueMat);
    plaque.position.set(0, -0.05, 2.45);
    plinthGroup.add(plaque);

    rootGroup.add(plinthGroup);

    // Ground Contact Shadow plane
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.28 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.015;
    shadowPlane.receiveShadow = true;
    rootGroup.add(shadowPlane);

    // CAR MODEL GEOMETRY
    const carGroup = new THREE.Group();
    carGroup.position.y = 0.42;
    carGroupRef.current = carGroup;
    rootGroup.add(carGroup);

    // Materials
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(carColor),
      roughness: 0.25,
      metalness: 0.65,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 0.4,
      transparent: true,
      opacity: 0.92,
    });

    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x161616,
      roughness: 0.9,
      metalness: 0.05,
    });

    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      roughness: 0.25,
      metalness: 0.9,
    });

    const caliperMat = new THREE.MeshStandardMaterial({
      color: 0xff6801,
      roughness: 0.3,
      metalness: 0.7,
    });

    const darkTrimMat = new THREE.MeshStandardMaterial({
      color: 0x1e1e1e,
      roughness: 0.7,
      metalness: 0.3,
    });

    const lightMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.8,
      emissive: 0xffffff,
      emissiveIntensity: 0.4,
    });

    const tailLightMat = new THREE.MeshStandardMaterial({
      color: 0xff1744,
      emissive: 0xff1744,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xff6801,
      wireframe: true,
      wireframeLinewidth: 1.5,
    });

    materialsRef.current = {
      bodyMat,
      glassMat,
      tireMat,
      rimMat,
      wireframeMat,
      caliperMat,
    };

    // 1. Lower Body Chassis
    const lowerBodyGeo = new THREE.BoxGeometry(2.4, 0.32, 1.15, 6, 3, 4);
    const lowerBody = new THREE.Mesh(lowerBodyGeo, bodyMat);
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    lowerBody.position.y = 0.16;
    carGroup.add(lowerBody);

    // 2. Tapered Front Hood
    const hoodGeo = new THREE.BoxGeometry(0.85, 0.2, 1.08, 4, 2, 4);
    const hood = new THREE.Mesh(hoodGeo, bodyMat);
    hood.position.set(0.8, 0.24, 0);
    hood.rotation.z = -0.08;
    hood.castShadow = true;
    carGroup.add(hood);

    // 3. Cabin & Greenhouse
    const cabinGeo = new THREE.BoxGeometry(1.1, 0.42, 0.95, 4, 3, 4);
    const cabin = new THREE.Mesh(cabinGeo, bodyMat);
    cabin.position.set(-0.15, 0.45, 0);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Windshield (Front Glass)
    const frontWindshieldGeo = new THREE.PlaneGeometry(0.9, 0.42);
    const frontWindshield = new THREE.Mesh(frontWindshieldGeo, glassMat);
    frontWindshield.position.set(0.42, 0.44, 0);
    frontWindshield.rotation.y = Math.PI / 2;
    frontWindshield.rotation.x = -0.55;
    carGroup.add(frontWindshield);

    // Rear Windshield
    const rearWindshieldGeo = new THREE.PlaneGeometry(0.88, 0.38);
    const rearWindshield = new THREE.Mesh(rearWindshieldGeo, glassMat);
    rearWindshield.position.set(-0.72, 0.44, 0);
    rearWindshield.rotation.y = -Math.PI / 2;
    rearWindshield.rotation.x = -0.45;
    carGroup.add(rearWindshield);

    // Side Windows
    const sideWinGeo = new THREE.BoxGeometry(1.02, 0.34, 0.97);
    const sideWin = new THREE.Mesh(sideWinGeo, glassMat);
    sideWin.position.set(-0.15, 0.44, 0);
    carGroup.add(sideWin);

    // Rear Spoiler
    const spoilerWingGeo = new THREE.BoxGeometry(0.3, 0.04, 1.1);
    const spoilerWing = new THREE.Mesh(spoilerWingGeo, darkTrimMat);
    spoilerWing.position.set(-1.18, 0.42, 0);
    spoilerWing.castShadow = true;
    carGroup.add(spoilerWing);

    const spoilerSupport1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 0.04), darkTrimMat);
    spoilerSupport1.position.set(-1.16, 0.34, 0.3);
    carGroup.add(spoilerSupport1);
    const spoilerSupport2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 0.04), darkTrimMat);
    spoilerSupport2.position.set(-1.16, 0.34, -0.3);
    carGroup.add(spoilerSupport2);

    // Front Headlamps
    const headlampGeo = new THREE.BoxGeometry(0.06, 0.08, 0.22);
    const leftHeadlamp = new THREE.Mesh(headlampGeo, lightMat);
    leftHeadlamp.position.set(1.21, 0.22, 0.4);
    carGroup.add(leftHeadlamp);
    const rightHeadlamp = new THREE.Mesh(headlampGeo, lightMat);
    rightHeadlamp.position.set(1.21, 0.22, -0.4);
    carGroup.add(rightHeadlamp);

    // Rear Full-Width Lightbar
    const tailLightGeo = new THREE.BoxGeometry(0.05, 0.06, 1.05);
    const tailLight = new THREE.Mesh(tailLightGeo, tailLightMat);
    tailLight.position.set(-1.21, 0.26, 0);
    carGroup.add(tailLight);

    // Dual Exhaust Pipes
    const exhaustGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.1, 16);
    const exhaustL = new THREE.Mesh(exhaustGeo, rimMat);
    exhaustL.rotation.z = Math.PI / 2;
    exhaustL.position.set(-1.22, 0.08, 0.2);
    carGroup.add(exhaustL);
    const exhaustR = new THREE.Mesh(exhaustGeo, rimMat);
    exhaustR.rotation.z = Math.PI / 2;
    exhaustR.position.set(-1.22, 0.08, -0.2);
    carGroup.add(exhaustR);

    // WHEELS (4 wheels with rims, brake calipers, and tire treads)
    const wheelPositions = [
      { x: 0.76, z: 0.58 },   // Front Right
      { x: 0.76, z: -0.58 },  // Front Left
      { x: -0.74, z: 0.58 },  // Rear Right
      { x: -0.74, z: -0.58 }, // Rear Left
    ];

    wheelPositions.forEach((pos) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(pos.x, 0.06, pos.z);

      // Tire
      const tireGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.16, 32);
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.x = Math.PI / 2;
      tire.castShadow = true;
      wheelGroup.add(tire);

      // Rim
      const rimGeo = new THREE.CylinderGeometry(0.17, 0.17, 0.17, 16);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.x = Math.PI / 2;
      wheelGroup.add(rim);

      // Spokes
      for (let i = 0; i < 5; i++) {
        const spokeGeo = new THREE.BoxGeometry(0.04, 0.26, 0.172);
        const spoke = new THREE.Mesh(spokeGeo, rimMat);
        spoke.rotation.y = (i * Math.PI) / 5;
        wheelGroup.add(spoke);
      }

      // Brake Caliper (Orange accent)
      const caliperGeo = new THREE.BoxGeometry(0.08, 0.12, 0.14);
      const caliper = new THREE.Mesh(caliperGeo, caliperMat);
      caliper.position.set(0.06, 0.06, 0);
      wheelGroup.add(caliper);

      carGroup.add(wheelGroup);
    });

    // Wireframe duplicate group for the digital model stage
    const wireframeGroup = new THREE.Group();
    carGroup.traverse((child) => {
      if (child instanceof THREE.Mesh && child !== shadowPlane) {
        const wireMesh = new THREE.Mesh(child.geometry, wireframeMat);
        wireMesh.position.copy(child.position);
        wireMesh.rotation.copy(child.rotation);
        wireMesh.scale.copy(child.scale);
        wireframeGroup.add(wireMesh);
      }
    });
    wireframeGroup.position.copy(carGroup.position);
    wireframeGroup.visible = false;
    rootGroup.add(wireframeGroup);

    setIsLoaded(true);

    // Mouse / Pointer Interaction handlers
    const handlePointerDown = (e: PointerEvent) => {
      isMouseDownRef.current = true;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isMouseDownRef.current || !rootGroup) return;
      const deltaX = e.clientX - mousePosRef.current.x;
      const deltaY = e.clientY - mousePosRef.current.y;

      rootGroup.rotation.y += deltaX * 0.008;
      rootGroup.rotation.x = Math.max(-0.2, Math.min(0.4, rootGroup.rotation.x + deltaY * 0.004));

      rotationVelocityRef.current = {
        x: deltaY * 0.0005,
        y: deltaX * 0.002,
      };

      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isMouseDownRef.current = false;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Inertia & Auto Rotation
      if (isRotating && !isMouseDownRef.current) {
        rootGroup.rotation.y += 0.006;
      } else if (!isMouseDownRef.current) {
        rootGroup.rotation.y += rotationVelocityRef.current.y;
        rotationVelocityRef.current.y *= 0.94;
      }

      // Floating / settle subtle micro-animation
      if (activeStage === 'miniature') {
        carGroup.position.y = 0.42 + Math.sin(clock.getElapsedTime() * 1.5) * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  // Update stage effects & wireframe
  useEffect(() => {
    if (!carGroupRef.current || !materialsRef.current) return;
    const { bodyMat, wireframeMat } = materialsRef.current;

    if (activeStage === 'model') {
      bodyMat.wireframe = true;
      bodyMat.color.set('#FF6801');
    } else {
      bodyMat.wireframe = false;
      bodyMat.color.set(carColor);
    }
  }, [activeStage, carColor]);

  const handleColorChange = (hex: string) => {
    setCarColor(hex);
    if (materialsRef.current) {
      materialsRef.current.bodyMat.color.set(hex);
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[460px] md:min-h-[580px] select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating State Controls (The Signature Transformation: Photo -> 3D Model -> Finished Miniature) */}
      <div className="absolute top-4 left-4 right-4 md:left-auto md:right-6 z-20 flex flex-col items-end gap-3">
        {/* Stage Selector Pills */}
        <div className="bg-[#111111]/85 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-xl flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleStageSelect('photo')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeStage === 'photo'
                ? 'bg-[#FF6801] text-white shadow-md'
                : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>1. Photo</span>
          </button>

          <button
            type="button"
            onClick={() => handleStageSelect('model')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeStage === 'model'
                ? 'bg-[#FF6801] text-white shadow-md'
                : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>2. 3D Model</span>
          </button>

          <button
            type="button"
            onClick={() => handleStageSelect('miniature')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeStage === 'miniature'
                ? 'bg-[#FF6801] text-white shadow-md'
                : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>3. Miniature</span>
          </button>
        </div>

        {/* Stage Descriptor Badge */}
        <div className="hidden sm:block bg-white/90 backdrop-blur-sm px-3.5 py-1 rounded-lg border border-neutral-200 shadow-sm text-[11px] font-semibold text-neutral-700">
          {activeStage === 'photo' && '📸 Input reference photography taken on smartphone'}
          {activeStage === 'model' && '📐 3.4M polygon digital reconstruction & sub-division'}
          {activeStage === 'miniature' && '✨ 8K SLA photopolymer resin • Hand-painted & clear-coated'}
        </div>
      </div>

      {/* Interactive Overlay when 'photo' stage is selected */}
      {activeStage === 'photo' && (
        <div className="absolute inset-4 md:inset-8 z-10 flex items-center justify-center pointer-events-none">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl border border-neutral-200 max-w-sm w-full pointer-events-auto transform rotate-[-1deg] transition-all">
            <div className="relative overflow-hidden rounded-xl aspect-4/3 bg-neutral-100 mb-3 border border-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=85"
                alt="Original Customer Photograph"
                className="w-full h-full object-cover"
              />
              {/* Photogrammetry viewfinder grid lines */}
              <div className="absolute inset-0 bg-grid-subtle opacity-40" />
              <div className="absolute top-2 left-2 bg-black/75 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                RAW_IMG_8492.HEIC
              </div>
              <div className="absolute bottom-2 right-2 bg-[#FF6801] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Camera className="w-2.5 h-2.5" /> Reference Photo
              </div>
            </div>
            <p className="text-xs text-neutral-600 font-medium">
              Customers upload standard smartphone photos from multiple angles. Our proprietary photogrammetry and human 3D artists recreate the exact proportions.
            </p>
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-neutral-100">
              <span className="text-[11px] font-bold text-neutral-800">Next Step: 3D Modeling</span>
              <button
                type="button"
                onClick={() => handleStageSelect('model')}
                className="text-xs font-bold text-[#FF6801] hover:underline flex items-center gap-1"
              >
                Inspect 3D Wireframe →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar: Scale Cue, Paint Customizer, Turntable Toggle */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Scale & Fidelity Specs */}
        <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-neutral-200/80 shadow-md pointer-events-auto flex items-center gap-4 text-xs">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Physical Scale</span>
            <span className="font-bold text-[#111111] font-brand text-sm">1:24 Scale • ~17.5 cm</span>
          </div>
          <div className="h-6 w-px bg-neutral-200" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Tolerance</span>
            <span className="font-bold text-neutral-700">0.02mm Layer Resolution</span>
          </div>
        </div>

        {/* Color Switcher & Turntable Control */}
        <div className="bg-[#111111]/90 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 shadow-lg pointer-events-auto flex items-center gap-3">
          {/* Color swatches */}
          <div className="flex items-center gap-1.5 pr-2 border-r border-white/20">
            {colorOptions.map((opt) => (
              <button
                key={opt.hex}
                type="button"
                title={opt.name}
                onClick={() => handleColorChange(opt.hex)}
                className={`w-5 h-5 rounded-full transition-transform ${
                  carColor === opt.hex ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-black' : 'hover:scale-110 opacity-80'
                }`}
                style={{ backgroundColor: opt.hex }}
              />
            ))}
          </div>

          {/* Turntable toggle */}
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
              isRotating ? 'bg-[#FF6801] text-white' : 'text-neutral-400 hover:text-white bg-white/10'
            }`}
            title={isRotating ? 'Pause Turntable' : 'Resume Turntable'}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline text-[11px]">{isRotating ? 'Spinning' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* Floating 360 drag hint */}
      <div className="absolute bottom-16 right-4 sm:right-6 pointer-events-none opacity-60 text-[10px] font-bold text-neutral-500 bg-white/70 backdrop-blur-xs px-2.5 py-1 rounded-full border border-neutral-200 flex items-center gap-1">
        <RotateCw className="w-3 h-3" />
        Drag to rotate 360°
      </div>
    </div>
  );
};
