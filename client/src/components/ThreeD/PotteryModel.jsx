import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PotteryModel({ wireframe = false }) {
  const groupRef = useRef();

  // Create a canvas texture for Jaipur Blue Pottery motifs
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Base glazed off-white / light turquoise cream
    ctx.fillStyle = '#f6f9fc';
    ctx.fillRect(0, 0, 512, 512);

    // Deep cobalt blue & turquoise floral arabesques
    ctx.strokeStyle = '#0f4c81';
    ctx.lineWidth = 4;
    ctx.fillStyle = '#1e3a8a';

    // Persian floral grid
    for (let x = 32; x < 512; x += 64) {
      for (let y = 32; y < 512; y += 64) {
        // Petals
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.stroke();

        // Inner Turquoise dot
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Diagonal leafy tendrils
        ctx.strokeStyle = '#0284c7';
        ctx.beginPath();
        ctx.moveTo(x - 16, y - 16);
        ctx.lineTo(x + 16, y + 16);
        ctx.stroke();
      }
    }

    // Top and bottom border fretwork
    ctx.fillStyle = '#0f4c81';
    ctx.fillRect(0, 0, 512, 24);
    ctx.fillRect(0, 488, 512, 24);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 2);
    return tex;
  }, []);

  // Lathe points for a classic Indian Surahi / Kalash vase
  const points = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector2(0, -1.8));
    pts.push(new THREE.Vector2(0.8, -1.8));
    pts.push(new THREE.Vector2(0.85, -1.6));
    pts.push(new THREE.Vector2(1.3, -1.0));
    pts.push(new THREE.Vector2(1.5, -0.4));
    pts.push(new THREE.Vector2(1.45, 0.2));
    pts.push(new THREE.Vector2(1.0, 0.8));
    pts.push(new THREE.Vector2(0.45, 1.2));
    pts.push(new THREE.Vector2(0.4, 1.7));
    pts.push(new THREE.Vector2(0.65, 1.9));
    pts.push(new THREE.Vector2(0.6, 2.0));
    pts.push(new THREE.Vector2(0.35, 1.95));
    pts.push(new THREE.Vector2(0.3, 1.6));
    pts.push(new THREE.Vector2(0.8, 0.7));
    pts.push(new THREE.Vector2(0.0, 0.0));
    return pts;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Main Vase Body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, 48]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.15}
          metalness={0.1}
          wireframe={wireframe}
          color={wireframe ? '#0284c7' : '#ffffff'}
        />
      </mesh>

      {/* Decorative Gold Neck Collar Ring */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <torusGeometry args={[0.46, 0.06, 16, 32]} />
        <meshStandardMaterial
          color="#d97706"
          metalness={0.8}
          roughness={0.2}
          wireframe={wireframe}
        />
      </mesh>

      {/* Rim Gold Accent */}
      <mesh position={[0, 1.95, 0]} castShadow>
        <torusGeometry args={[0.62, 0.04, 16, 32]} />
        <meshStandardMaterial
          color="#d97706"
          metalness={0.85}
          roughness={0.2}
          wireframe={wireframe}
        />
      </mesh>

      {/* Pedestal Base Ring */}
      <mesh position={[0, -1.8, 0]} receiveShadow>
        <cylinderGeometry args={[0.9, 0.95, 0.12, 32]} />
        <meshStandardMaterial
          color="#1e3a8a"
          roughness={0.2}
          wireframe={wireframe}
        />
      </mesh>
    </group>
  );
}
