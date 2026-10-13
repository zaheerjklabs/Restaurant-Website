import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  createGoldRimTexture,
  createPorcelainPlateTexture,
  createSearedFishTexture,
  createWineLabelTexture,
  createParticleTexture,
} from '../../utils/threeTextures';
import {
  RotateCcw,
  Sparkles,
  Layers,
  Flame,
  Sun,
  Moon,
  Compass,
  Maximize2,
  Minimize2,
  Eye,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ambientAudio } from '../../utils/ambientAudio';

export type LightingMood = 'hearth' | 'midnight' | 'sunset';

interface Cinematic3DScrollCanvasProps {
  isPinnedMode?: boolean;
  onTogglePinned?: () => void;
  className?: string;
  onScrollToSection?: (sectionId: string) => void;
}

export const Cinematic3DScrollCanvas: React.FC<Cinematic3DScrollCanvasProps> = ({
  isPinnedMode = false,
  onTogglePinned,
  className = '',
  onScrollToSection,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // User Interactive States
  const [isOrbitMode, setIsOrbitMode] = useState<boolean>(false);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [lightingMood, setLightingMood] = useState<LightingMood>('hearth');
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [activeChapter, setActiveChapter] = useState<string>('Act I: The Unveiling');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // References for Three.js objects
  const threeRefs = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    clocheGroup: THREE.Group | null;
    platterGroup: THREE.Group | null;
    filletMesh: THREE.Mesh | null;
    caviarGroup: THREE.Group | null;
    herbsGroup: THREE.Group | null;
    wineBottleGroup: THREE.Group | null;
    glassGroup: THREE.Group | null;
    cutleryGroup: THREE.Group | null;
    particlePoints: THREE.Points | null;
    ambientLight: THREE.AmbientLight | null;
    keyLight: THREE.SpotLight | null;
    rimLight: THREE.DirectionalLight | null;
    hearthFlickerLight: THREE.PointLight | null;
    animFrameId: number | null;
    targetCamPos: THREE.Vector3;
    targetCamLookAt: THREE.Vector3;
    currentCamLookAt: THREE.Vector3;
    manualRotation: { x: number; y: number };
    mousePos: { x: number; y: number };
    isDragging: boolean;
    dragStart: { x: number; y: number };
  }>({
    renderer: null,
    scene: null,
    camera: null,
    clocheGroup: null,
    platterGroup: null,
    filletMesh: null,
    caviarGroup: null,
    herbsGroup: null,
    wineBottleGroup: null,
    glassGroup: null,
    cutleryGroup: null,
    particlePoints: null,
    ambientLight: null,
    keyLight: null,
    rimLight: null,
    hearthFlickerLight: null,
    animFrameId: null,
    targetCamPos: new THREE.Vector3(0, 2.8, 5.2),
    targetCamLookAt: new THREE.Vector3(0, 0.4, 0),
    currentCamLookAt: new THREE.Vector3(0, 0.4, 0),
    manualRotation: { x: 0.15, y: -0.2 },
    mousePos: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
  });

  // Calculate normalized scroll progress (0.0 to 1.0)
  const updateScroll = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const current = window.scrollY;
    const progress = docHeight > 0 ? Math.min(Math.max(current / docHeight, 0), 1) : 0;
    setScrollProgress(progress);

    // Determine current chapter title based on scroll
    if (progress < 0.18) {
      setActiveChapter('Act I: The Haute Gastronomie');
    } else if (progress < 0.38) {
      setActiveChapter('Act II: Hearth Sear & Deconstruction');
    } else if (progress < 0.62) {
      setActiveChapter('Act III: The Chef\'s Degustation');
    } else if (progress < 0.82) {
      setActiveChapter('Act IV: Grand Cru Sommelier Vault');
    } else {
      setActiveChapter('Act V: VIP Table Sanctuary');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, [updateScroll]);

  // Audio Toggle
  const handleToggleAudio = () => {
    const newState = ambientAudio.toggle();
    setIsAudioActive(newState);
  };

  // Lighting Mood Switcher
  useEffect(() => {
    const { ambientLight, keyLight, rimLight, hearthFlickerLight } = threeRefs.current;
    if (!ambientLight || !keyLight || !rimLight || !hearthFlickerLight) return;

    if (lightingMood === 'hearth') {
      ambientLight.color.setHex(0x3a2512);
      ambientLight.intensity = 1.4;
      keyLight.color.setHex(0xffcb80);
      keyLight.intensity = 4.2;
      rimLight.color.setHex(0xe96a24);
      rimLight.intensity = 2.5;
      hearthFlickerLight.color.setHex(0xff5500);
      hearthFlickerLight.intensity = 2.8;
    } else if (lightingMood === 'midnight') {
      ambientLight.color.setHex(0x101525);
      ambientLight.intensity = 0.9;
      keyLight.color.setHex(0xffeedd);
      keyLight.intensity = 3.6;
      rimLight.color.setHex(0x6aa6ff);
      rimLight.intensity = 3.8;
      hearthFlickerLight.color.setHex(0xd4af37);
      hearthFlickerLight.intensity = 1.2;
    } else if (lightingMood === 'sunset') {
      ambientLight.color.setHex(0x402b1f);
      ambientLight.intensity = 1.6;
      keyLight.color.setHex(0xffbb77);
      keyLight.intensity = 4.5;
      rimLight.color.setHex(0xff8833);
      rimLight.intensity = 3.0;
      hearthFlickerLight.color.setHex(0xffaa44);
      hearthFlickerLight.intensity = 2.0;
    }
  }, [lightingMood]);

  // Three.js Scene Setup & Loop
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 2.8, 5.2);
    camera.lookAt(0, 0.4, 0);

    // 3. Textures
    const goldRimTex = createGoldRimTexture();
    const porcelainTex = createPorcelainPlateTexture();
    const searedFishTex = createSearedFishTexture();
    const wineLabelTex = createWineLabelTexture();
    const particleTex = createParticleTexture();

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x3a2512, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.SpotLight(0xffcb80, 4.2, 18, Math.PI / 4, 0.4, 1.2);
    keyLight.position.set(3, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe96a24, 2.5);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const hearthFlickerLight = new THREE.PointLight(0xff5500, 2.8, 8);
    hearthFlickerLight.position.set(0, 0.8, 1.2);
    scene.add(hearthFlickerLight);

    // ==========================================
    // 5. Model 1: Haute Gastronomie Platter & Dish
    // ==========================================
    const platterGroup = new THREE.Group();
    scene.add(platterGroup);

    // Fine Porcelain Plate Base
    const plateGeo = new THREE.CylinderGeometry(1.65, 1.35, 0.12, 64);
    const plateMat = new THREE.MeshStandardMaterial({
      map: porcelainTex,
      roughness: 0.18,
      metalness: 0.05,
      color: 0xffffff,
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.receiveShadow = true;
    plateMesh.castShadow = true;
    platterGroup.add(plateMesh);

    // Gold Outer Rim Ring
    const goldRimGeo = new THREE.TorusGeometry(1.66, 0.035, 16, 64);
    const goldRimMat = new THREE.MeshStandardMaterial({
      map: goldRimTex,
      roughness: 0.25,
      metalness: 0.85,
    });
    const goldRimMesh = new THREE.Mesh(goldRimGeo, goldRimMat);
    goldRimMesh.rotation.x = Math.PI / 2;
    goldRimMesh.position.y = 0.06;
    platterGroup.add(goldRimMesh);

    // Dish Base Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(1.0, 1.15, 0.08, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x1a1815,
      roughness: 0.4,
      metalness: 0.2,
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalMesh.position.y = -0.08;
    platterGroup.add(pedestalMesh);

    // Seared Chilean Sea Bass Medallion
    const filletGeo = new THREE.CylinderGeometry(0.72, 0.68, 0.35, 48);
    const filletMat = new THREE.MeshStandardMaterial({
      map: searedFishTex,
      roughness: 0.45,
      metalness: 0.08,
      bumpScale: 0.08,
    });
    const filletMesh = new THREE.Mesh(filletGeo, filletMat);
    filletMesh.position.set(0, 0.24, 0);
    filletMesh.castShadow = true;
    filletMesh.receiveShadow = true;
    platterGroup.add(filletMesh);

    // Caviar Cluster Pearls
    const caviarGroup = new THREE.Group();
    caviarGroup.position.set(0.18, 0.43, 0.12);
    const caviarPearlGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const caviarPearlMat = new THREE.MeshStandardMaterial({
      color: 0x111612,
      roughness: 0.1,
      metalness: 0.3,
    });
    for (let i = 0; i < 28; i++) {
      const pearl = new THREE.Mesh(caviarPearlGeo, caviarPearlMat);
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.18;
      pearl.position.set(
        Math.cos(angle) * r,
        Math.random() * 0.08,
        Math.sin(angle) * r
      );
      pearl.castShadow = true;
      caviarGroup.add(pearl);
    }
    platterGroup.add(caviarGroup);

    // Microgreens & Gold Leaf Flakes
    const herbsGroup = new THREE.Group();
    herbsGroup.position.set(-0.22, 0.43, -0.1);
    const herbGeo = new THREE.BoxGeometry(0.02, 0.14, 0.05);
    const herbMat = new THREE.MeshStandardMaterial({
      color: 0x2d6824,
      roughness: 0.4,
    });
    for (let i = 0; i < 14; i++) {
      const leaf = new THREE.Mesh(herbGeo, herbMat);
      leaf.position.set(
        (Math.random() - 0.5) * 0.25,
        Math.random() * 0.06,
        (Math.random() - 0.5) * 0.25
      );
      leaf.rotation.set(
        Math.random() * 0.8,
        Math.random() * Math.PI,
        Math.random() * 0.8
      );
      herbsGroup.add(leaf);
    }

    // Gold Leaf Garnishes
    const goldLeafGeo = new THREE.PlaneGeometry(0.08, 0.08);
    const goldLeafMat = new THREE.MeshStandardMaterial({
      color: 0xffdf78,
      roughness: 0.15,
      metalness: 0.95,
      side: THREE.DoubleSide,
    });
    for (let i = 0; i < 6; i++) {
      const gLeaf = new THREE.Mesh(goldLeafGeo, goldLeafMat);
      gLeaf.position.set(
        (Math.random() - 0.5) * 0.3,
        0.06 + Math.random() * 0.08,
        (Math.random() - 0.5) * 0.3
      );
      gLeaf.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
      herbsGroup.add(gLeaf);
    }
    platterGroup.add(herbsGroup);

    // Smoked Emulsion Reduction Sauce Pool
    const sauceGeo = new THREE.CylinderGeometry(0.98, 0.98, 0.02, 32);
    const sauceMat = new THREE.MeshStandardMaterial({
      color: 0xd9822b,
      roughness: 0.1,
      metalness: 0.1,
    });
    const sauceMesh = new THREE.Mesh(sauceGeo, sauceMat);
    sauceMesh.position.set(0, 0.07, 0);
    platterGroup.add(sauceMesh);

    // ==========================================
    // 6. Model 2: The Royal Cloche (Dome Cover)
    // ==========================================
    const clocheGroup = new THREE.Group();
    scene.add(clocheGroup);

    // Bell Dome
    const domeGeo = new THREE.SphereGeometry(1.5, 48, 28, 0, Math.PI * 2, 0, Math.PI / 2);
    const clocheMat = new THREE.MeshStandardMaterial({
      color: 0xf5eedd,
      roughness: 0.2,
      metalness: 0.85,
    });
    const domeMesh = new THREE.Mesh(domeGeo, clocheMat);
    domeMesh.castShadow = true;
    clocheGroup.add(domeMesh);

    // Cloche Bottom Rim Lip
    const rimGeo = new THREE.TorusGeometry(1.5, 0.04, 16, 48);
    const rimMesh = new THREE.Mesh(rimGeo, goldRimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0;
    clocheGroup.add(rimMesh);

    // Knurled Gold Handle Finial
    const finialShaftGeo = new THREE.CylinderGeometry(0.08, 0.14, 0.25, 24);
    const finialShaft = new THREE.Mesh(finialShaftGeo, goldRimMat);
    finialShaft.position.y = 1.6;
    finialShaft.castShadow = true;
    clocheGroup.add(finialShaft);

    const finialKnobGeo = new THREE.SphereGeometry(0.18, 24, 24);
    const finialKnob = new THREE.Mesh(finialKnobGeo, goldRimMat);
    finialKnob.position.y = 1.76;
    finialKnob.castShadow = true;
    clocheGroup.add(finialKnob);

    // Initial cloche position resting on the dish
    clocheGroup.position.set(0, 0.06, 0);

    // ==========================================
    // 7. Model 3: Vintage Bordeaux Grand Cru Wine Bottle
    // ==========================================
    const wineBottleGroup = new THREE.Group();
    scene.add(wineBottleGroup);

    // Deep Olive / Ruby Tinted Glass Material
    const bottleGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1f2e1c,
      roughness: 0.08,
      metalness: 0.05,
      transmission: 0.45,
      ior: 1.52,
      thickness: 0.4,
      transparent: true,
      opacity: 0.95,
    });

    // Bottle Cylindrical Body
    const bottleBodyGeo = new THREE.CylinderGeometry(0.42, 0.42, 1.4, 36);
    const bottleBodyMesh = new THREE.Mesh(bottleBodyGeo, bottleGlassMat);
    bottleBodyMesh.position.y = 0.7;
    bottleBodyMesh.castShadow = true;
    wineBottleGroup.add(bottleBodyMesh);

    // Bottle Sloped Shoulder
    const bottleShoulderGeo = new THREE.CylinderGeometry(0.18, 0.42, 0.55, 36);
    const bottleShoulderMesh = new THREE.Mesh(bottleShoulderGeo, bottleGlassMat);
    bottleShoulderMesh.position.y = 1.65;
    bottleShoulderMesh.castShadow = true;
    wineBottleGroup.add(bottleShoulderMesh);

    // Bottle Neck
    const bottleNeckGeo = new THREE.CylinderGeometry(0.16, 0.18, 0.65, 36);
    const bottleNeckMesh = new THREE.Mesh(bottleNeckGeo, bottleGlassMat);
    bottleNeckMesh.position.y = 2.22;
    wineBottleGroup.add(bottleNeckMesh);

    // Bottle Lip Collar
    const bottleLipGeo = new THREE.TorusGeometry(0.17, 0.025, 16, 32);
    const bottleLipMesh = new THREE.Mesh(bottleLipGeo, bottleGlassMat);
    bottleLipMesh.rotation.x = Math.PI / 2;
    bottleLipMesh.position.y = 2.53;
    wineBottleGroup.add(bottleLipMesh);

    // Wine Capsule Foil (Burgundy / Gold foil)
    const capsuleGeo = new THREE.CylinderGeometry(0.165, 0.175, 0.5, 36);
    const capsuleMat = new THREE.MeshStandardMaterial({
      color: 0x821c25,
      roughness: 0.25,
      metalness: 0.7,
    });
    const capsuleMesh = new THREE.Mesh(capsuleGeo, capsuleMat);
    capsuleMesh.position.y = 2.3;
    wineBottleGroup.add(capsuleMesh);

    // Wax Seal Medallion on Neck
    const sealGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 20);
    const sealMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.3,
      metalness: 0.8,
    });
    const sealMesh = new THREE.Mesh(sealGeo, sealMat);
    sealMesh.rotation.x = Math.PI / 2;
    sealMesh.position.set(0, 2.1, 0.18);
    wineBottleGroup.add(sealMesh);

    // Label Mesh wrapped around body
    const labelGeo = new THREE.CylinderGeometry(0.425, 0.425, 0.85, 36, 1, true, -Math.PI / 2.5, Math.PI / 1.25);
    const labelMat = new THREE.MeshStandardMaterial({
      map: wineLabelTex,
      roughness: 0.6,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.y = 0.75;
    wineBottleGroup.add(labelMesh);

    // Initial Wine Bottle Position (hidden/standby offstage)
    wineBottleGroup.position.set(4.5, -2, -2);
    wineBottleGroup.scale.set(0.9, 0.9, 0.9);

    // ==========================================
    // 8. Model 4: Crystal Wine Goblet
    // ==========================================
    const glassGroup = new THREE.Group();
    scene.add(glassGroup);

    const crystalGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.0,
      transmission: 0.85,
      ior: 1.5,
      transparent: true,
      opacity: 0.8,
    });

    // Glass Bowl
    const bowlGeo = new THREE.SphereGeometry(0.4, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const bowlMesh = new THREE.Mesh(bowlGeo, crystalGlassMat);
    bowlMesh.position.y = 1.0;
    glassGroup.add(bowlMesh);

    // Glass Stem
    const stemGeo = new THREE.CylinderGeometry(0.025, 0.03, 0.75, 16);
    const stemMesh = new THREE.Mesh(stemGeo, crystalGlassMat);
    stemMesh.position.y = 0.45;
    glassGroup.add(stemMesh);

    // Glass Foot
    const footGeo = new THREE.CylinderGeometry(0.32, 0.35, 0.03, 24);
    const footMesh = new THREE.Mesh(footGeo, crystalGlassMat);
    footMesh.position.y = 0.08;
    glassGroup.add(footMesh);

    // Liquid in Goblet
    const liquidGeo = new THREE.CylinderGeometry(0.32, 0.15, 0.28, 20);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x800c22,
      roughness: 0.1,
      metalness: 0.1,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = 0.85;
    glassGroup.add(liquidMesh);

    glassGroup.position.set(5.5, -2, -1.5);

    // ==========================================
    // 9. Model 5: Floating Artisanal Golden Cutlery
    // ==========================================
    const cutleryGroup = new THREE.Group();
    scene.add(cutleryGroup);

    // Fork
    const forkHandleGeo = new THREE.CylinderGeometry(0.02, 0.04, 1.4, 12);
    const forkHandle = new THREE.Mesh(forkHandleGeo, goldRimMat);
    forkHandle.rotation.z = Math.PI / 3;
    forkHandle.position.set(-2.2, 1.2, 0);
    cutleryGroup.add(forkHandle);

    // Knife
    const knifeHandleGeo = new THREE.CylinderGeometry(0.02, 0.035, 1.45, 12);
    const knifeHandle = new THREE.Mesh(knifeHandleGeo, goldRimMat);
    knifeHandle.rotation.z = -Math.PI / 3.5;
    knifeHandle.position.set(2.2, 1.1, 0);
    cutleryGroup.add(knifeHandle);

    // ==========================================
    // 10. Dynamic Particle System (Embers & Golden Flakes)
    // ==========================================
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 1] = Math.random() * 4;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.006,
        y: 0.004 + Math.random() * 0.012,
        z: (Math.random() - 0.5) * 0.006,
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      map: particleTex,
      size: 0.16,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlePoints = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particlePoints);

    // Save references
    threeRefs.current = {
      renderer,
      scene,
      camera,
      clocheGroup,
      platterGroup,
      filletMesh,
      caviarGroup,
      herbsGroup,
      wineBottleGroup,
      glassGroup,
      cutleryGroup,
      particlePoints,
      ambientLight,
      keyLight,
      rimLight,
      hearthFlickerLight,
      animFrameId: null,
      targetCamPos: new THREE.Vector3(0, 2.8, 5.2),
      targetCamLookAt: new THREE.Vector3(0, 0.4, 0),
      currentCamLookAt: new THREE.Vector3(0, 0.4, 0),
      manualRotation: { x: 0.12, y: -0.2 },
      mousePos: { x: 0, y: 0 },
      isDragging: false,
      dragStart: { x: 0, y: 0 },
    };

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // ==========================================
    // 11. Animation Loop with Scroll Interpolation
    // ==========================================
    let clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const refs = threeRefs.current;
      if (!refs.renderer || !refs.scene || !refs.camera) return;

      const sp = scrollProgress; // current scroll ratio 0.0 to 1.0

      // Hearth Fire Flicker effect
      if (refs.hearthFlickerLight) {
        refs.hearthFlickerLight.intensity = 2.4 + Math.sin(elapsed * 9) * 0.6 + Math.cos(elapsed * 17) * 0.3;
      }

      // Particle Motion Loop
      if (refs.particlePoints) {
        const positions = (refs.particlePoints.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleVelocities[i].y;
          positions[i * 3] += particleVelocities[i].x + Math.sin(elapsed + i) * 0.001;
          positions[i * 3 + 2] += particleVelocities[i].z;

          // Recycle particle when it drifts too high
          if (positions[i * 3 + 1] > 4.5) {
            positions[i * 3 + 1] = 0.05;
            positions[i * 3] = (Math.random() - 0.5) * 4;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
          }
        }
        refs.particlePoints.geometry.attributes.position.needsUpdate = true;
      }

      // Cloche Elevation & Reveal based on scroll
      // Scroll 0.0 -> 0.12: Cloche resting
      // Scroll 0.12 -> 0.40: Cloche smoothly lifts up, rotates backwards, revealing the culinary composition!
      if (refs.clocheGroup) {
        const clocheElevationProgress = Math.min(Math.max((sp - 0.06) / 0.28, 0), 1);
        const targetClocheY = 0.06 + clocheElevationProgress * 2.8;
        const targetClocheRotX = clocheElevationProgress * 0.4;
        const targetClocheRotZ = clocheElevationProgress * -0.2;

        refs.clocheGroup.position.y += (targetClocheY - refs.clocheGroup.position.y) * 0.08;
        refs.clocheGroup.rotation.x += (targetClocheRotX - refs.clocheGroup.rotation.x) * 0.08;
        refs.clocheGroup.rotation.z += (targetClocheRotZ - refs.clocheGroup.rotation.z) * 0.08;

        // Subtle ambient hover bobbing
        refs.clocheGroup.position.y += Math.sin(elapsed * 1.5) * 0.0015;
      }

      // Exploded View separation (when triggered or during deep scroll)
      const explodeFactor = isExploded ? 1.0 : Math.min(Math.max((sp - 0.22) / 0.16, 0), 0.75);
      if (refs.filletMesh) {
        const targetFilletY = 0.24 + explodeFactor * 0.6;
        refs.filletMesh.position.y += (targetFilletY - refs.filletMesh.position.y) * 0.1;
      }
      if (refs.caviarGroup) {
        const targetCaviarY = 0.43 + explodeFactor * 1.0;
        refs.caviarGroup.position.y += (targetCaviarY - refs.caviarGroup.position.y) * 0.1;
      }
      if (refs.herbsGroup) {
        const targetHerbsY = 0.43 + explodeFactor * 1.25;
        refs.herbsGroup.position.y += (targetHerbsY - refs.herbsGroup.position.y) * 0.1;
      }

      // Wine Bottle & Goblet Entrance Choreography
      // Appears dramatically during Cellar & Tasting chapters (sp 0.42 to 0.85)
      if (refs.wineBottleGroup && refs.glassGroup) {
        const bottleVisibility = Math.min(Math.max((sp - 0.42) / 0.18, 0), 1) * (1 - Math.min(Math.max((sp - 0.82) / 0.12, 0), 1));
        
        const targetBottleX = 1.6 - (1 - bottleVisibility) * 3.5;
        const targetBottleY = -0.1 + bottleVisibility * 0.3;
        const targetBottleZ = 0.5 + bottleVisibility * 0.8;
        const targetBottleRotY = elapsed * 0.4 + sp * 4;

        refs.wineBottleGroup.position.x += (targetBottleX - refs.wineBottleGroup.position.x) * 0.06;
        refs.wineBottleGroup.position.y += (targetBottleY - refs.wineBottleGroup.position.y) * 0.06;
        refs.wineBottleGroup.position.z += (targetBottleZ - refs.wineBottleGroup.position.z) * 0.06;
        refs.wineBottleGroup.rotation.y = targetBottleRotY;

        // Goblet sync
        const targetGlassX = 2.4 - (1 - bottleVisibility) * 4.0;
        refs.glassGroup.position.x += (targetGlassX - refs.glassGroup.position.x) * 0.06;
        refs.glassGroup.position.y += (targetBottleY - refs.glassGroup.position.y) * 0.06;
        refs.glassGroup.position.z += (targetBottleZ - 0.3 - refs.glassGroup.position.z) * 0.06;
      }

      // Platter rotation & cursor parallax
      if (refs.platterGroup) {
        if (isOrbitMode) {
          refs.platterGroup.rotation.x = refs.manualRotation.x;
          refs.platterGroup.rotation.y = refs.manualRotation.y;
        } else {
          // Dynamic scroll driven rotation + smooth subtle mouse tilt
          const targetRotY = sp * Math.PI * 2.5 + refs.mousePos.x * 0.25;
          const targetRotX = 0.18 + refs.mousePos.y * 0.15 + (sp > 0.4 ? 0.1 : 0);
          refs.platterGroup.rotation.y += (targetRotY - refs.platterGroup.rotation.y) * 0.05;
          refs.platterGroup.rotation.x += (targetRotX - refs.platterGroup.rotation.x) * 0.05;
        }
      }

      // Cutlery Levitation & Drift
      if (refs.cutleryGroup) {
        refs.cutleryGroup.position.y = Math.sin(elapsed * 1.8) * 0.08;
        refs.cutleryGroup.rotation.z = Math.cos(elapsed * 1.2) * 0.04;
      }

      // Camera Position Choreography along Scroll Progression
      if (!isOrbitMode) {
        if (sp < 0.2) {
          // Hero Overview
          refs.targetCamPos.set(0, 2.7, 5.2);
          refs.targetCamLookAt.set(0, 0.4, 0);
        } else if (sp < 0.45) {
          // Story / Hearth: Zoom into seared culinary craftsmanship
          refs.targetCamPos.set(-1.2, 2.2, 4.4);
          refs.targetCamLookAt.set(-0.2, 0.5, 0);
        } else if (sp < 0.72) {
          // Tasting Degustation: Dramatic profile angle
          refs.targetCamPos.set(1.4, 2.0, 4.1);
          refs.targetCamLookAt.set(0.3, 0.4, 0);
        } else if (sp < 0.88) {
          // Sommelier Cellar Vault: Centered on Grand Cru Bottle
          refs.targetCamPos.set(1.5, 1.8, 3.8);
          refs.targetCamLookAt.set(1.2, 0.9, 0.2);
        } else {
          // Floor Plan / VIP Table
          refs.targetCamPos.set(0, 3.4, 4.8);
          refs.targetCamLookAt.set(0, 0.2, 0);
        }

        // Mouse Parallax Offset
        const mouseParallaxX = refs.mousePos.x * 0.4;
        const mouseParallaxY = refs.mousePos.y * 0.25;

        refs.camera.position.x += (refs.targetCamPos.x + mouseParallaxX - refs.camera.position.x) * 0.05;
        refs.camera.position.y += (refs.targetCamPos.y + mouseParallaxY - refs.camera.position.y) * 0.05;
        refs.camera.position.z += (refs.targetCamPos.z - refs.camera.position.z) * 0.05;

        refs.currentCamLookAt.x += (refs.targetCamLookAt.x - refs.currentCamLookAt.x) * 0.05;
        refs.currentCamLookAt.y += (refs.targetCamLookAt.y - refs.currentCamLookAt.y) * 0.05;
        refs.currentCamLookAt.z += (refs.targetCamLookAt.z - refs.currentCamLookAt.z) * 0.05;
        refs.camera.lookAt(refs.currentCamLookAt);
      }

      refs.renderer.render(refs.scene, refs.camera);
      refs.animFrameId = requestAnimationFrame(animate);
    };

    clock.start();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeRefs.current.animFrameId) {
        cancelAnimationFrame(threeRefs.current.animFrameId);
      }
      renderer.dispose();
    };
  }, [isOrbitMode, isExploded, scrollProgress]);

  // Pointer Interaction Handlers for 360 Orbit & Parallax
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isOrbitMode) return;
    threeRefs.current.isDragging = true;
    threeRefs.current.dragStart = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Normalized mouse coordinate for subtle parallax in normal mode
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    threeRefs.current.mousePos = { x: nx, y: ny };

    if (!isOrbitMode || !threeRefs.current.isDragging) return;
    const dx = e.clientX - threeRefs.current.dragStart.x;
    const dy = e.clientY - threeRefs.current.dragStart.y;
    threeRefs.current.dragStart = { x: e.clientX, y: e.clientY };

    threeRefs.current.manualRotation.y += dx * 0.01;
    threeRefs.current.manualRotation.x = Math.max(
      Math.min(threeRefs.current.manualRotation.x + dy * 0.01, Math.PI / 2.5),
      -0.2
    );
  };

  const handlePointerUp = () => {
    threeRefs.current.isDragging = false;
  };

  const handleResetCamera = () => {
    setIsOrbitMode(false);
    setIsExploded(false);
    threeRefs.current.manualRotation = { x: 0.15, y: -0.2 };
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`relative select-none overflow-hidden touch-none ${className}`}
    >
      {/* Three.js Canvas Element */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Cinematic HUD Overlays */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white shadow-xl">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-semibold tracking-wider text-amber-300">3D SCROLL MOTION</span>
          <span className="text-stone-400">·</span>
          <span className="text-stone-300">{(scrollProgress * 100).toFixed(0)}% DEPTH</span>
        </div>

        {/* Current Scrollytelling Chapter Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-serif text-white">
          <Compass className="w-3.5 h-3.5 text-[#E96A24]" />
          <span>{activeChapter}</span>
        </div>
      </div>

      {/* Top Right: Fullscreen / Pin Mode & Audio Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {/* Hearth Ambient Audio Button */}
        <button
          onClick={handleToggleAudio}
          className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
            isAudioActive
              ? 'bg-[#E96A24] border-[#E96A24] text-white shadow-lg'
              : 'bg-black/50 border-white/15 text-stone-300 hover:text-white hover:bg-black/70'
          }`}
          title={isAudioActive ? 'Mute Hearth Ambiance' : 'Play Hearth Ambiance Audio'}
          aria-label="Toggle Hearth Sound"
        >
          {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Pin / Expand Cinema Canvas Toggle */}
        {onTogglePinned && (
          <button
            onClick={onTogglePinned}
            className="p-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-stone-300 hover:text-white hover:bg-black/70 transition-all shadow-lg"
            title={isPinnedMode ? 'Dock to Hero Box' : 'Expand to Fullscreen 3D Backdrop'}
            aria-label="Toggle Canvas Viewport"
          >
            {isPinnedMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Bottom Floating 3D Control Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        
        {/* Left Action Cluster: Orbit Mode & Deconstruct Layers */}
        <div className="flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl">
          {/* Orbit Mode Switcher */}
          <button
            onClick={() => setIsOrbitMode(!isOrbitMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isOrbitMode
                ? 'bg-[#E96A24] text-white shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
            title="Freely rotate and inspect the 3D model with mouse or touch"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isOrbitMode ? 'Orbit Active (Drag)' : '360° Orbit Mode'}</span>
          </button>

          {/* Deconstruct / Exploded Anatomy View */}
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isExploded
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
            title="Separate dish layers to view culinary anatomy"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isExploded ? 'Deconstructed' : 'Explode Layers'}</span>
          </button>

          {/* Reset Camera to Scroll Sync */}
          {isOrbitMode && (
            <button
              onClick={handleResetCamera}
              className="p-1.5 text-stone-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Return to Scroll Timeline"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Action Cluster: Lighting Mood Presets */}
        <div className="flex items-center gap-1 p-1 bg-black/60 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl">
          <button
            onClick={() => setLightingMood('hearth')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
              lightingMood === 'hearth'
                ? 'bg-[#E96A24]/30 text-amber-300 border border-[#E96A24]/50'
                : 'text-stone-400 hover:text-white'
            }`}
            title="Hearth Flame & Embers Lighting"
          >
            <Flame className="w-3 h-3 text-[#E96A24]" />
            <span className="hidden sm:inline">Hearth</span>
          </button>

          <button
            onClick={() => setLightingMood('midnight')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
              lightingMood === 'midnight'
                ? 'bg-blue-950/40 text-blue-200 border border-blue-500/50'
                : 'text-stone-400 hover:text-white'
            }`}
            title="Velvet Midnight Dining Lighting"
          >
            <Moon className="w-3 h-3 text-blue-300" />
            <span className="hidden sm:inline">Midnight</span>
          </button>

          <button
            onClick={() => setLightingMood('sunset')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
              lightingMood === 'sunset'
                ? 'bg-amber-950/40 text-amber-200 border border-amber-500/50'
                : 'text-stone-400 hover:text-white'
            }`}
            title="Golden Hour Sunset Lighting"
          >
            <Sun className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Sunset</span>
          </button>
        </div>

      </div>

      {/* Exploded Callout Annotations Overlay (visible when exploded or deep scroll) */}
      {(isExploded || (scrollProgress > 0.24 && scrollProgress < 0.42)) && (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center items-center">
          <div className="absolute top-[22%] left-[12%] animate-in fade-in duration-500">
            <div className="bg-black/75 backdrop-blur-md border border-amber-500/40 px-3 py-1.5 rounded-lg text-white shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <div>
                <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">Layer 01: Crown</div>
                <div className="text-xs font-serif">Wild Caviar & Edible 24k Gold</div>
              </div>
            </div>
          </div>

          <div className="absolute top-[48%] right-[10%] animate-in fade-in duration-500">
            <div className="bg-black/75 backdrop-blur-md border border-[#E96A24]/40 px-3 py-1.5 rounded-lg text-white shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E96A24]" />
              <div>
                <div className="text-[10px] font-mono uppercase text-[#E96A24] font-bold">Layer 02: Core</div>
                <div className="text-xs font-serif">Chilean Sea Bass (800° Wood Sear)</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[28%] left-[16%] animate-in fade-in duration-500">
            <div className="bg-black/75 backdrop-blur-md border border-emerald-500/40 px-3 py-1.5 rounded-lg text-white shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <div>
                <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Layer 03: Base</div>
                <div className="text-xs font-serif">Smoked Emulsion & Truffle Glaze</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtle Cinematic Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
};
