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
  Award,
} from 'lucide-react';
import { ambientAudio } from '../../utils/ambientAudio';

export type LightingMood = 'hearth' | 'midnight' | 'sunset';

interface Global3DWorldCanvasProps {
  className?: string;
  isInteractiveMode?: boolean;
  onToggleInteractive?: () => void;
}

export const Global3DWorldCanvas: React.FC<Global3DWorldCanvasProps> = ({
  className = '',
  isInteractiveMode = false,
  onToggleInteractive,
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
  const [showControls, setShowControls] = useState<boolean>(true);

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
    starCrestGroup: THREE.Group | null;
    tableTokenGroup: THREE.Group | null;
    hearthLogsGroup: THREE.Group | null;
    orbitalCoursesGroup: THREE.Group | null;
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
    starCrestGroup: null,
    tableTokenGroup: null,
    hearthLogsGroup: null,
    orbitalCoursesGroup: null,
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

    // Determine current chapter title based on scroll progression
    if (progress < 0.15) {
      setActiveChapter('Act I: The Haute Unveiling');
    } else if (progress < 0.32) {
      setActiveChapter('Act II: 800° Hearth & Deconstruction');
    } else if (progress < 0.50) {
      setActiveChapter('Act III: The Chef\'s Degustation');
    } else if (progress < 0.65) {
      setActiveChapter('Act IV: Seasonal Harvest Pedestal');
    } else if (progress < 0.80) {
      setActiveChapter('Act V: Grand Cru Sommelier Vault');
    } else if (progress < 0.90) {
      setActiveChapter('Act VI: Standards & Michelin Star Crest');
    } else {
      setActiveChapter('Act VII: VIP Table Sanctuary');
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

  // Three.js Scene Setup & Render Loop
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.8, 5.2);
    camera.lookAt(0, 0.4, 0);

    // 3. Procedural Textures
    const goldRimTex = createGoldRimTexture();
    const porcelainTex = createPorcelainPlateTexture();
    const searedFishTex = createSearedFishTexture();
    const wineLabelTex = createWineLabelTexture();
    const particleTex = createParticleTexture();

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x3a2512, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.SpotLight(0xffcb80, 4.2, 22, Math.PI / 4, 0.4, 1.2);
    keyLight.position.set(3.5, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe96a24, 2.5);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const hearthFlickerLight = new THREE.PointLight(0xff5500, 2.8, 9);
    hearthFlickerLight.position.set(0, 0.8, 1.2);
    scene.add(hearthFlickerLight);

    // Shared Gold Material
    const goldMat = new THREE.MeshStandardMaterial({
      map: goldRimTex,
      roughness: 0.22,
      metalness: 0.88,
    });

    // ==========================================
    // 5. Model 1: Haute Gastronomie Platter & Dish
    // ==========================================
    const platterGroup = new THREE.Group();
    scene.add(platterGroup);

    // Fine Porcelain Plate Base
    const plateGeo = new THREE.CylinderGeometry(1.68, 1.35, 0.12, 64);
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
    const goldRimGeo = new THREE.TorusGeometry(1.68, 0.035, 16, 64);
    const goldRimMesh = new THREE.Mesh(goldRimGeo, goldMat);
    goldRimMesh.rotation.x = Math.PI / 2;
    goldRimMesh.position.y = 0.06;
    platterGroup.add(goldRimMesh);

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
    for (let i = 0; i < 6; i++) {
      const gLeaf = new THREE.Mesh(goldLeafGeo, goldMat);
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

    const domeGeo = new THREE.SphereGeometry(1.5, 48, 28, 0, Math.PI * 2, 0, Math.PI / 2);
    const clocheMat = new THREE.MeshStandardMaterial({
      color: 0xf5eedd,
      roughness: 0.2,
      metalness: 0.85,
    });
    const domeMesh = new THREE.Mesh(domeGeo, clocheMat);
    domeMesh.castShadow = true;
    clocheGroup.add(domeMesh);

    const rimGeo = new THREE.TorusGeometry(1.5, 0.04, 16, 48);
    const rimMesh = new THREE.Mesh(rimGeo, goldMat);
    rimMesh.rotation.x = Math.PI / 2;
    clocheGroup.add(rimMesh);

    const finialShaftGeo = new THREE.CylinderGeometry(0.08, 0.14, 0.25, 24);
    const finialShaft = new THREE.Mesh(finialShaftGeo, goldMat);
    finialShaft.position.y = 1.6;
    finialShaft.castShadow = true;
    clocheGroup.add(finialShaft);

    const finialKnobGeo = new THREE.SphereGeometry(0.18, 24, 24);
    const finialKnob = new THREE.Mesh(finialKnobGeo, goldMat);
    finialKnob.position.y = 1.76;
    finialKnob.castShadow = true;
    clocheGroup.add(finialKnob);

    clocheGroup.position.set(0, 0.06, 0);

    // ==========================================
    // 7. Model 3: Hearth Oak Logs (Story & Craft)
    // ==========================================
    const hearthLogsGroup = new THREE.Group();
    scene.add(hearthLogsGroup);

    const logMat = new THREE.MeshStandardMaterial({
      color: 0x3d2314,
      roughness: 0.8,
    });
    for (let i = 0; i < 4; i++) {
      const logGeo = new THREE.CylinderGeometry(0.12, 0.14, 1.4, 16);
      const logMesh = new THREE.Mesh(logGeo, logMat);
      logMesh.position.set((i - 1.5) * 0.35, -0.2, -0.6);
      logMesh.rotation.set(0.1 * i, 0.3 * i, Math.PI / 2 + (i * 0.1));
      hearthLogsGroup.add(logMesh);
    }
    hearthLogsGroup.position.set(-2, -10, 0); // Standby below stage

    // ==========================================
    // 8. Model 4: Orbital Degustation Spheres (Tasting Menu)
    // ==========================================
    const orbitalCoursesGroup = new THREE.Group();
    scene.add(orbitalCoursesGroup);

    const courseSphereGeo = new THREE.SphereGeometry(0.16, 24, 24);
    const orbitRingGeo = new THREE.TorusGeometry(2.4, 0.015, 12, 64);
    const orbitRingMesh = new THREE.Mesh(orbitRingGeo, goldMat);
    orbitRingMesh.rotation.x = Math.PI / 2;
    orbitalCoursesGroup.add(orbitRingMesh);

    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const orbMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xd4af37 : 0xe96a24,
        roughness: 0.2,
        metalness: 0.8,
      });
      const orb = new THREE.Mesh(courseSphereGeo, orbMat);
      orb.position.set(Math.cos(angle) * 2.4, 0.1, Math.sin(angle) * 2.4);
      orbitalCoursesGroup.add(orb);
    }
    orbitalCoursesGroup.position.set(0, -12, 0);

    // ==========================================
    // 9. Model 5: Vintage Bordeaux Grand Cru Wine Bottle & Goblet
    // ==========================================
    const wineBottleGroup = new THREE.Group();
    scene.add(wineBottleGroup);

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

    const bottleBodyGeo = new THREE.CylinderGeometry(0.42, 0.42, 1.4, 36);
    const bottleBodyMesh = new THREE.Mesh(bottleBodyGeo, bottleGlassMat);
    bottleBodyMesh.position.y = 0.7;
    bottleBodyMesh.castShadow = true;
    wineBottleGroup.add(bottleBodyMesh);

    const bottleShoulderGeo = new THREE.CylinderGeometry(0.18, 0.42, 0.55, 36);
    const bottleShoulderMesh = new THREE.Mesh(bottleShoulderGeo, bottleGlassMat);
    bottleShoulderMesh.position.y = 1.65;
    bottleShoulderMesh.castShadow = true;
    wineBottleGroup.add(bottleShoulderMesh);

    const bottleNeckGeo = new THREE.CylinderGeometry(0.16, 0.18, 0.65, 36);
    const bottleNeckMesh = new THREE.Mesh(bottleNeckGeo, bottleGlassMat);
    bottleNeckMesh.position.y = 2.22;
    wineBottleGroup.add(bottleNeckMesh);

    const bottleLipGeo = new THREE.TorusGeometry(0.17, 0.025, 16, 32);
    const bottleLipMesh = new THREE.Mesh(bottleLipGeo, bottleGlassMat);
    bottleLipMesh.rotation.x = Math.PI / 2;
    bottleLipMesh.position.y = 2.53;
    wineBottleGroup.add(bottleLipMesh);

    const capsuleGeo = new THREE.CylinderGeometry(0.165, 0.175, 0.5, 36);
    const capsuleMat = new THREE.MeshStandardMaterial({
      color: 0x821c25,
      roughness: 0.25,
      metalness: 0.7,
    });
    const capsuleMesh = new THREE.Mesh(capsuleGeo, capsuleMat);
    capsuleMesh.position.y = 2.3;
    wineBottleGroup.add(capsuleMesh);

    const sealGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 20);
    const sealMesh = new THREE.Mesh(sealGeo, goldMat);
    sealMesh.rotation.x = Math.PI / 2;
    sealMesh.position.set(0, 2.1, 0.18);
    wineBottleGroup.add(sealMesh);

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

    wineBottleGroup.position.set(5, -10, -2);
    wineBottleGroup.scale.set(0.9, 0.9, 0.9);

    // Crystal Wine Goblet
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

    const bowlGeo = new THREE.SphereGeometry(0.4, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const bowlMesh = new THREE.Mesh(bowlGeo, crystalGlassMat);
    bowlMesh.position.y = 1.0;
    glassGroup.add(bowlMesh);

    const stemGeo = new THREE.CylinderGeometry(0.025, 0.03, 0.75, 16);
    const stemMesh = new THREE.Mesh(stemGeo, crystalGlassMat);
    stemMesh.position.y = 0.45;
    glassGroup.add(stemMesh);

    const footGeo = new THREE.CylinderGeometry(0.32, 0.35, 0.03, 24);
    const footMesh = new THREE.Mesh(footGeo, crystalGlassMat);
    footMesh.position.y = 0.08;
    glassGroup.add(footMesh);

    const liquidGeo = new THREE.CylinderGeometry(0.32, 0.15, 0.28, 20);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x800c22,
      roughness: 0.1,
      metalness: 0.1,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = 0.85;
    glassGroup.add(liquidMesh);

    glassGroup.position.set(6, -10, -1.5);

    // ==========================================
    // 10. Model 6: Golden Michelin Star Crest Medallion (Standards)
    // ==========================================
    const starCrestGroup = new THREE.Group();
    scene.add(starCrestGroup);

    const crestMedalGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.15, 48);
    const crestMedalMesh = new THREE.Mesh(crestMedalGeo, goldMat);
    crestMedalMesh.rotation.x = Math.PI / 2;
    starCrestGroup.add(crestMedalMesh);

    // 8-Pointed Star Relief
    for (let i = 0; i < 4; i++) {
      const rayGeo = new THREE.BoxGeometry(0.3, 2.2, 0.2);
      const rayMesh = new THREE.Mesh(rayGeo, goldMat);
      rayMesh.rotation.z = (i * Math.PI) / 4;
      starCrestGroup.add(rayMesh);
    }
    starCrestGroup.position.set(0, -15, 0);

    // ==========================================
    // 11. Model 7: VIP Architectural Reservation Token & Compass
    // ==========================================
    const tableTokenGroup = new THREE.Group();
    scene.add(tableTokenGroup);

    const tableBaseGeo = new THREE.CylinderGeometry(1.4, 1.6, 0.18, 36);
    const tableBaseMesh = new THREE.Mesh(tableBaseGeo, goldMat);
    tableTokenGroup.add(tableBaseMesh);

    const clocheMiniGeo = new THREE.SphereGeometry(0.8, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2);
    const clocheMini = new THREE.Mesh(clocheMiniGeo, clocheMat);
    clocheMini.position.y = 0.09;
    tableTokenGroup.add(clocheMini);

    tableTokenGroup.position.set(0, -20, 0);

    // ==========================================
    // 12. Model 8: Floating Artisanal Golden Cutlery
    // ==========================================
    const cutleryGroup = new THREE.Group();
    scene.add(cutleryGroup);

    const forkHandleGeo = new THREE.CylinderGeometry(0.02, 0.04, 1.4, 12);
    const forkHandle = new THREE.Mesh(forkHandleGeo, goldMat);
    forkHandle.rotation.z = Math.PI / 3;
    forkHandle.position.set(-2.5, 1.2, 0);
    cutleryGroup.add(forkHandle);

    const knifeHandleGeo = new THREE.CylinderGeometry(0.02, 0.035, 1.45, 12);
    const knifeHandle = new THREE.Mesh(knifeHandleGeo, goldMat);
    knifeHandle.rotation.z = -Math.PI / 3.5;
    knifeHandle.position.set(2.5, 1.1, 0);
    cutleryGroup.add(knifeHandle);

    // ==========================================
    // 13. Dynamic Particle System (Embers & Golden Flakes)
    // ==========================================
    const particleCount = 340;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = Math.random() * 5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.008,
        y: 0.005 + Math.random() * 0.015,
        z: (Math.random() - 0.5) * 0.008,
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      map: particleTex,
      size: 0.18,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlePoints = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particlePoints);

    // Store references
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
      starCrestGroup,
      tableTokenGroup,
      hearthLogsGroup,
      orbitalCoursesGroup,
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
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // ==========================================
    // 14. Animation Loop with Continuous Scroll Choreography
    // ==========================================
    const clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const refs = threeRefs.current;
      if (!refs.renderer || !refs.scene || !refs.camera) return;

      const sp = scrollProgress; // 0.0 to 1.0

      // Hearth Fire Flicker
      if (refs.hearthFlickerLight) {
        refs.hearthFlickerLight.intensity = 2.4 + Math.sin(elapsed * 9) * 0.6 + Math.cos(elapsed * 17) * 0.3;
      }

      // Dynamic Particles Motion
      if (refs.particlePoints) {
        const positions = (refs.particlePoints.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleVelocities[i].y;
          positions[i * 3] += particleVelocities[i].x + Math.sin(elapsed + i) * 0.0012;
          positions[i * 3 + 2] += particleVelocities[i].z;

          if (positions[i * 3 + 1] > 5.5) {
            positions[i * 3 + 1] = 0.05;
            positions[i * 3] = (Math.random() - 0.5) * 6;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
          }
        }
        refs.particlePoints.geometry.attributes.position.needsUpdate = true;
      }

      // 1. Cloche Elevation & Reveal
      // Scroll 0.00 - 0.14: Cloche rests on platter
      // Scroll 0.14 - 0.40: Cloche lifts high up and tilts into the air!
      if (refs.clocheGroup) {
        const clocheElevationProgress = Math.min(Math.max((sp - 0.08) / 0.22, 0), 1);
        const targetClocheY = 0.06 + clocheElevationProgress * 3.2;
        const targetClocheRotX = clocheElevationProgress * 0.45;
        const targetClocheRotZ = clocheElevationProgress * -0.22;

        refs.clocheGroup.position.y += (targetClocheY - refs.clocheGroup.position.y) * 0.08;
        refs.clocheGroup.rotation.x += (targetClocheRotX - refs.clocheGroup.rotation.x) * 0.08;
        refs.clocheGroup.rotation.z += (targetClocheRotZ - refs.clocheGroup.rotation.z) * 0.08;
        refs.clocheGroup.position.y += Math.sin(elapsed * 1.5) * 0.0015;
      }

      // 2. Exploded View separation (Story / Hearth)
      const explodeFactor = isExploded ? 1.0 : Math.min(Math.max((sp - 0.18) / 0.16, 0), 0.85);
      if (refs.filletMesh) {
        const targetFilletY = 0.24 + explodeFactor * 0.65;
        refs.filletMesh.position.y += (targetFilletY - refs.filletMesh.position.y) * 0.1;
      }
      if (refs.caviarGroup) {
        const targetCaviarY = 0.43 + explodeFactor * 1.1;
        refs.caviarGroup.position.y += (targetCaviarY - refs.caviarGroup.position.y) * 0.1;
      }
      if (refs.herbsGroup) {
        const targetHerbsY = 0.43 + explodeFactor * 1.35;
        refs.herbsGroup.position.y += (targetHerbsY - refs.herbsGroup.position.y) * 0.1;
      }

      // 3. Hearth Wood Logs entrance (Story section sp 0.15 - 0.32)
      if (refs.hearthLogsGroup) {
        const hearthActive = Math.min(Math.max((sp - 0.14) / 0.12, 0), 1) * (1 - Math.min(Math.max((sp - 0.34) / 0.10, 0), 1));
        const targetLogsY = -0.5 - (1 - hearthActive) * 6;
        refs.hearthLogsGroup.position.y += (targetLogsY - refs.hearthLogsGroup.position.y) * 0.08;
      }

      // 4. Orbital Degustation Spheres (Tasting Menu sp 0.32 - 0.50)
      if (refs.orbitalCoursesGroup) {
        const tastingActive = Math.min(Math.max((sp - 0.30) / 0.10, 0), 1) * (1 - Math.min(Math.max((sp - 0.50) / 0.10, 0), 1));
        const targetOrbitY = 0.2 - (1 - tastingActive) * 10;
        refs.orbitalCoursesGroup.position.y += (targetOrbitY - refs.orbitalCoursesGroup.position.y) * 0.08;
        refs.orbitalCoursesGroup.rotation.y = elapsed * 0.5;
      }

      // 5. Wine Bottle & Crystal Goblet (Sommelier Cellar Vault sp 0.60 - 0.82)
      if (refs.wineBottleGroup && refs.glassGroup) {
        const cellarActive = Math.min(Math.max((sp - 0.60) / 0.10, 0), 1) * (1 - Math.min(Math.max((sp - 0.82) / 0.10, 0), 1));
        
        const targetBottleX = 1.4 - (1 - cellarActive) * 4.5;
        const targetBottleY = -0.1 + cellarActive * 0.3;
        const targetBottleZ = 0.5 + cellarActive * 0.8;
        const targetBottleRotY = elapsed * 0.4 + sp * 5;

        refs.wineBottleGroup.position.x += (targetBottleX - refs.wineBottleGroup.position.x) * 0.06;
        refs.wineBottleGroup.position.y += (targetBottleY - refs.wineBottleGroup.position.y) * 0.06;
        refs.wineBottleGroup.position.z += (targetBottleZ - refs.wineBottleGroup.position.z) * 0.06;
        refs.wineBottleGroup.rotation.y = targetBottleRotY;

        const targetGlassX = 2.3 - (1 - cellarActive) * 5.0;
        refs.glassGroup.position.x += (targetGlassX - refs.glassGroup.position.x) * 0.06;
        refs.glassGroup.position.y += (targetBottleY - refs.glassGroup.position.y) * 0.06;
        refs.glassGroup.position.z += (targetBottleZ - 0.3 - refs.glassGroup.position.z) * 0.06;
        refs.glassGroup.rotation.y = -elapsed * 0.3;
      }

      // 6. Golden Michelin Star Crest (Why Choose Us / Standards sp 0.80 - 0.90)
      if (refs.starCrestGroup) {
        const starActive = Math.min(Math.max((sp - 0.80) / 0.06, 0), 1) * (1 - Math.min(Math.max((sp - 0.90) / 0.06, 0), 1));
        const targetStarY = 1.2 - (1 - starActive) * 12;
        refs.starCrestGroup.position.y += (targetStarY - refs.starCrestGroup.position.y) * 0.08;
        refs.starCrestGroup.rotation.y = elapsed * 0.6;
        refs.starCrestGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.15;
      }

      // 7. VIP Table Reservation Token (Reservations sp 0.88 - 0.98)
      if (refs.tableTokenGroup) {
        const tokenActive = Math.min(Math.max((sp - 0.88) / 0.06, 0), 1);
        const targetTokenY = 0.3 - (1 - tokenActive) * 15;
        refs.tableTokenGroup.position.y += (targetTokenY - refs.tableTokenGroup.position.y) * 0.08;
        refs.tableTokenGroup.rotation.y = elapsed * 0.4;
      }

      // Platter rotation & cursor parallax
      if (refs.platterGroup) {
        if (isOrbitMode) {
          refs.platterGroup.rotation.x = refs.manualRotation.x;
          refs.platterGroup.rotation.y = refs.manualRotation.y;
        } else {
          // Platter shifts gracefully during deep sections
          const platterDiverted = sp > 0.6 && sp < 0.85;
          const targetPlatterX = platterDiverted ? -1.8 : 0;
          refs.platterGroup.position.x += (targetPlatterX - refs.platterGroup.position.x) * 0.05;

          const targetRotY = sp * Math.PI * 3.5 + refs.mousePos.x * 0.3;
          const targetRotX = 0.18 + refs.mousePos.y * 0.15 + (sp > 0.4 ? 0.1 : 0);
          refs.platterGroup.rotation.y += (targetRotY - refs.platterGroup.rotation.y) * 0.05;
          refs.platterGroup.rotation.x += (targetRotX - refs.platterGroup.rotation.x) * 0.05;
        }
      }

      // Floating Cutlery drift
      if (refs.cutleryGroup) {
        refs.cutleryGroup.position.y = Math.sin(elapsed * 1.8) * 0.08;
        refs.cutleryGroup.rotation.z = Math.cos(elapsed * 1.2) * 0.04;
      }

      // Continuous 3D Camera Trajectory across the entire website
      if (!isOrbitMode) {
        if (sp < 0.16) {
          // Act I: Hero Overview
          refs.targetCamPos.set(0.6, 2.7, 5.0);
          refs.targetCamLookAt.set(0.2, 0.4, 0);
        } else if (sp < 0.34) {
          // Act II: Story & Hearth (Pans left into seared craft)
          refs.targetCamPos.set(-1.4, 2.2, 4.2);
          refs.targetCamLookAt.set(-0.3, 0.5, 0);
        } else if (sp < 0.52) {
          // Act III: Degustation Journey (Wide orbital vantage)
          refs.targetCamPos.set(1.6, 2.4, 4.4);
          refs.targetCamLookAt.set(0.2, 0.4, 0);
        } else if (sp < 0.65) {
          // Act IV: Seasonal Harvest Pedestal (Overhead angle)
          refs.targetCamPos.set(0, 3.4, 3.8);
          refs.targetCamLookAt.set(0, 0.3, 0);
        } else if (sp < 0.82) {
          // Act V: Sommelier Wine Vault (Centered on Grand Cru bottle)
          refs.targetCamPos.set(1.4, 1.8, 3.6);
          refs.targetCamLookAt.set(1.2, 0.9, 0.2);
        } else if (sp < 0.92) {
          // Act VI: Michelin Star Crest (Focused center)
          refs.targetCamPos.set(0, 2.2, 4.2);
          refs.targetCamLookAt.set(0, 1.2, 0);
        } else {
          // Act VII: VIP Table Sanctuary & Atmosphere
          refs.targetCamPos.set(0, 2.9, 4.8);
          refs.targetCamLookAt.set(0, 0.3, 0);
        }

        // Mouse Parallax Offset
        const mouseParallaxX = refs.mousePos.x * 0.45;
        const mouseParallaxY = refs.mousePos.y * 0.28;

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
      className={`fixed inset-0 select-none overflow-hidden touch-none pointer-events-none z-0 ${className}`}
    >
      {/* Full-Viewport Three.js Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing pointer-events-auto" />

      {/* Top Left Global 3D Chapter HUD Tag */}
      <div className="absolute top-20 left-6 z-30 pointer-events-auto flex items-center gap-2">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-white shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-semibold tracking-wider text-amber-300">ENTIRE SITE 3D ENGINE</span>
          <span className="text-stone-400">·</span>
          <span className="text-stone-200">{(scrollProgress * 100).toFixed(0)}% DEPTH</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-xs font-serif text-white">
          <Compass className="w-3.5 h-3.5 text-[#E96A24]" />
          <span>{activeChapter}</span>
        </div>
      </div>

      {/* Floating 3D Control Pill at Top Right */}
      <div className="absolute top-20 right-6 z-30 pointer-events-auto flex items-center gap-2">
        {/* Toggle Audio */}
        <button
          onClick={handleToggleAudio}
          className={`p-2.5 rounded-xl backdrop-blur-md border transition-all ${
            isAudioActive
              ? 'bg-[#E96A24] border-[#E96A24] text-white shadow-lg'
              : 'bg-black/50 border-white/15 text-stone-300 hover:text-white hover:bg-black/70'
          }`}
          title={isAudioActive ? 'Mute Hearth Ambiance' : 'Play Hearth Ambiance Audio'}
          aria-label="Toggle Hearth Sound"
        >
          {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* 360 Free Orbit Mode Button */}
        <button
          onClick={() => setIsOrbitMode(!isOrbitMode)}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold backdrop-blur-md border flex items-center gap-1.5 transition-all ${
            isOrbitMode
              ? 'bg-[#E96A24] border-[#E96A24] text-white shadow-lg'
              : 'bg-black/50 border-white/15 text-stone-300 hover:text-white hover:bg-black/70'
          }`}
          title="Toggle free 360 orbit camera drag"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isOrbitMode ? 'Orbit Active (Drag)' : 'Free 3D Orbit'}</span>
        </button>

        {/* Explode Layers Button */}
        <button
          onClick={() => setIsExploded(!isExploded)}
          className={`px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-md border flex items-center gap-1.5 transition-all ${
            isExploded
              ? 'bg-amber-400 border-amber-400 text-stone-950 font-bold shadow-lg'
              : 'bg-black/50 border-white/15 text-stone-300 hover:text-white hover:bg-black/70'
          }`}
          title="Deconstruct culinary layers in 3D"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isExploded ? 'Deconstructed' : 'Deconstruct'}</span>
        </button>
      </div>

      {/* Exploded Callout Annotations Overlay (visible when exploded or in Story section) */}
      {(isExploded || (scrollProgress > 0.18 && scrollProgress < 0.35)) && (
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-center items-center">
          <div className="absolute top-[28%] left-[10%] animate-in fade-in duration-500">
            <div className="bg-black/80 backdrop-blur-md border border-amber-500/50 px-3.5 py-2 rounded-xl text-white shadow-2xl flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <div>
                <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">Layer 01: Crown</div>
                <div className="text-xs font-serif font-semibold">Wild Caviar & Edible 24k Gold</div>
              </div>
            </div>
          </div>

          <div className="absolute top-[52%] right-[12%] animate-in fade-in duration-500">
            <div className="bg-black/80 backdrop-blur-md border border-[#E96A24]/50 px-3.5 py-2 rounded-xl text-white shadow-2xl flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E96A24]" />
              <div>
                <div className="text-[10px] font-mono uppercase text-[#E96A24] font-bold">Layer 02: Core</div>
                <div className="text-xs font-serif font-semibold">Chilean Sea Bass (800° Wood Sear)</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[24%] left-[18%] animate-in fade-in duration-500">
            <div className="bg-black/80 backdrop-blur-md border border-emerald-500/50 px-3.5 py-2 rounded-xl text-white shadow-2xl flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <div>
                <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Layer 03: Base</div>
                <div className="text-xs font-serif font-semibold">Smoked Emulsion & Truffle Glaze</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Atmospheric Radial Gradient Lighting Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(23,23,20,0.6)_100%)]" />
    </div>
  );
};
