import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ChannapatnaModel({ wireframe = false }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Central Base Peg (Natural seasoned ivory wood) */}
      <mesh position={[0, -1.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.3, 1.4, 0.35, 32]} />
        <meshStandardMaterial
          color="#d97706"
          roughness={0.18}
          metalness={0.05}
          wireframe={wireframe}
        />
      </mesh>

      {/* Ring 1 - Ruby Red Lacquer */}
      <mesh position={[0, -1.35, 0]} castShadow>
        <torusGeometry args={[1.05, 0.28, 24, 36]} />
        <meshStandardMaterial
          color="#dc2626"
          roughness={0.12}
          metalness={0.15}
          wireframe={wireframe}
        />
      </mesh>

      {/* Ring 2 - Bright Turmeric Yellow */}
      <mesh position={[0, -0.85, 0]} castShadow>
        <torusGeometry args={[0.9, 0.24, 24, 36]} />
        <meshStandardMaterial
          color="#eab308"
          roughness={0.12}
          metalness={0.15}
          wireframe={wireframe}
        />
      </mesh>

      {/* Ring 3 - Forest Indigo Green */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <torusGeometry args={[0.75, 0.22, 24, 36]} />
        <meshStandardMaterial
          color="#059669"
          roughness={0.12}
          metalness={0.15}
          wireframe={wireframe}
        />
      </mesh>

      {/* Ring 4 - Royal Saffron Orange */}
      <mesh position={[0, 0.0, 0]} castShadow>
        <torusGeometry args={[0.6, 0.2, 24, 36]} />
        <meshStandardMaterial
          color="#ea580c"
          roughness={0.12}
          metalness={0.15}
          wireframe={wireframe}
        />
      </mesh>

      {/* Ring 5 - Deep Turquoise Cyan */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <torusGeometry args={[0.45, 0.18, 24, 36]} />
        <meshStandardMaterial
          color="#0284c7"
          roughness={0.12}
          metalness={0.15}
          wireframe={wireframe}
        />
      </mesh>

      {/* Toy Crown Head (Traditional Channapatna Golu Top) */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.15}
          metalness={0.1}
          wireframe={wireframe}
        />
      </mesh>

      {/* Top Finial / Cap */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <coneGeometry args={[0.25, 0.5, 32]} />
        <meshStandardMaterial
          color="#b91c1c"
          roughness={0.12}
          metalness={0.2}
          wireframe={wireframe}
        />
      </mesh>
    </group>
  );
}
