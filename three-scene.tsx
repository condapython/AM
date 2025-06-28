import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { motion } from "framer-motion-3d";

interface FloatingCubeProps {
  position: [number, number, number];
  color: string;
  scale?: number;
}

function FloatingCube({ position, color, scale = 1 }: FloatingCubeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

interface ThreeSceneProps {
  className?: string;
}

export default function ThreeScene({ className }: ThreeSceneProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <FloatingCube position={[-2, 0, 0]} color="#3b82f6" scale={0.8} />
        <FloatingCube position={[2, 0, 0]} color="#8b5cf6" scale={1.2} />
        <FloatingCube position={[0, 2, -1]} color="#10b981" scale={0.6} />
        <FloatingCube position={[0, -2, 1]} color="#f59e0b" scale={0.9} />
      </Canvas>
    </div>
  );
}
