import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function TerracottaModel({ wireframe = false }) {
  const groupRef = useRef();

  // Earthy terracotta clay texture
  const clayTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#c2410c'; // Warm terracotta
    ctx.fillRect(0, 0, 256, 256);

    // Subtle grain noise & clay markings
    ctx.fillStyle = '#9a3412';
    for (let i = 0; i < 400; i++) {
      const rx = Math.random() * 256;
      const ry = Math.random() * 256;
      ctx.fillRect(rx, ry, 2, 2);
    }

    // Incised concentric lines
    ctx.strokeStyle = '#7c2d12';
    ctx.lineWidth = 2;
    for (let y = 16; y < 256; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Traditional Bankura Urli / Sacred Kalash Bowl */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.3, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial
          map={clayTexture}
          roughness={0.9}
          metalness={0.02}
          wireframe={wireframe}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Flared Terracotta Rim */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <torusGeometry args={[1.2, 0.12, 16, 32]} />
        <meshStandardMaterial
          color="#ea580c"
          roughness={0.88}
          metalness={0.01}
          wireframe={wireframe}
        />
      </mesh>

      {/* Decorative Clay Bead Rosettes along Rim */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.25;
        const z = Math.sin(angle) * 1.25;
        return (
          <mesh key={i} position={[x, 0.45, z]} castShadow>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color="#7c2d12" roughness={0.9} wireframe={wireframe} />
          </mesh>
        );
      })}

      {/* Central Sacred Flame Diya / Votive Mount */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.1, 0.4, 16]} />
        <meshStandardMaterial color="#ea580c" roughness={0.85} wireframe={wireframe} />
      </mesh>

      {/* Golden Diya Flame */}
      <mesh position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* Pedestal Base */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <cylinderGeometry args={[0.7, 0.85, 0.25, 32]} />
        <meshStandardMaterial color="#9a3412" roughness={0.92} wireframe={wireframe} />
      </mesh>
    </group>
  );
}
