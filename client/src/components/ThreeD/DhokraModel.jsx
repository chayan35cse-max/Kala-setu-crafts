import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DhokraModel({ wireframe = false }) {
  const groupRef = useRef();

  // Create an oxidized rustic bronze/brass wire texture
  const metalTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#78350f';
    ctx.fillRect(0, 0, 256, 256);

    // Twisted wax-thread filigree pattern
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    for (let i = 0; i < 256; i += 12) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(256, i);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(i, i, 6, 0, Math.PI * 2);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Bastar Tribal Elephant / Steed Body */}
      {/* Main Torso */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.75, 1.6, 24]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial
          map={metalTexture}
          color="#b45309"
          roughness={0.65}
          metalness={0.7}
          wireframe={wireframe}
        />
      </mesh>

      {/* Decorative saddle drape with lost-wax wire filigree */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[1.2, 0.7, 1.45]} />
        <meshStandardMaterial
          color="#92400e"
          roughness={0.7}
          metalness={0.8}
          wireframe={wireframe}
        />
      </mesh>

      {/* 4 Tubular Lost-Wax Legs */}
      <mesh position={[-0.6, -0.9, -0.5]} castShadow>
        <cylinderGeometry args={[0.12, 0.16, 1.2, 16]} />
        <meshStandardMaterial color="#92400e" roughness={0.6} metalness={0.75} wireframe={wireframe} />
      </mesh>
      <mesh position={[0.6, -0.9, -0.5]} castShadow>
        <cylinderGeometry args={[0.12, 0.16, 1.2, 16]} />
        <meshStandardMaterial color="#92400e" roughness={0.6} metalness={0.75} wireframe={wireframe} />
      </mesh>
      <mesh position={[-0.6, -0.9, 0.5]} castShadow>
        <cylinderGeometry args={[0.12, 0.16, 1.2, 16]} />
        <meshStandardMaterial color="#92400e" roughness={0.6} metalness={0.75} wireframe={wireframe} />
      </mesh>
      <mesh position={[0.6, -0.9, 0.5]} castShadow>
        <cylinderGeometry args={[0.12, 0.16, 1.2, 16]} />
        <meshStandardMaterial color="#92400e" roughness={0.6} metalness={0.75} wireframe={wireframe} />
      </mesh>

      {/* Head / Long Trunk */}
      <mesh position={[0.95, 0.65, 0]} castShadow>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial color="#92400e" roughness={0.6} metalness={0.75} wireframe={wireframe} />
      </mesh>
      <mesh position={[1.3, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.12, 0.2, 0.9, 16]} />
        <meshStandardMaterial color="#92400e" roughness={0.6} metalness={0.75} wireframe={wireframe} />
      </mesh>

      {/* Broad Tribal Ears */}
      <mesh position={[0.85, 0.9, -0.45]} rotation={[0.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.05, 16]} />
        <meshStandardMaterial color="#b45309" roughness={0.6} metalness={0.7} wireframe={wireframe} />
      </mesh>
      <mesh position={[0.85, 0.9, 0.45]} rotation={[-0.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.05, 16]} />
        <meshStandardMaterial color="#b45309" roughness={0.6} metalness={0.7} wireframe={wireframe} />
      </mesh>

      {/* Tribal Rider on Top */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.8, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.5} metalness={0.8} wireframe={wireframe} />
      </mesh>
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.5} metalness={0.8} wireframe={wireframe} />
      </mesh>
    </group>
  );
}
