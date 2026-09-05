"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sphere, Torus, Icosahedron, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Reusing Happy Food colors
const colors = {
  orange: "#ea580c",
  green: "#16a34a",
  red: "#dc2626",
  cream: "#fffaf0",
};

function FloatingIngredients() {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Subtle mouse interaction
  useFrame((state) => {
    // Lerp rotation based on mouse position for a subtle parallax effect
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetY = (state.pointer.y * Math.PI) / 10;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Orange Sphere (mimicking an orange/mango) */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={[-2, 1, 0]}>
        <Sphere args={[1.2, 64, 64]}>
          <meshStandardMaterial color={colors.orange} roughness={0.3} metalness={0.1} />
        </Sphere>
      </Float>

      {/* Red Icosahedron (mimicking strawberry/geometric fruit) */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5} position={[1.5, 1.5, -1]}>
        <Icosahedron args={[0.8, 1]}>
          <meshStandardMaterial color={colors.red} roughness={0.4} metalness={0.1} flatShading />
        </Icosahedron>
      </Float>

      {/* Green Torus (mimicking a slice or leaf shape) */}
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1.8} position={[2, -1, 1]}>
        <Torus args={[0.6, 0.25, 16, 32]}>
          <meshStandardMaterial color={colors.green} roughness={0.2} metalness={0.1} />
        </Torus>
      </Float>

      {/* Small floating dots/seeds */}
      <Float speed={3} rotationIntensity={2} floatIntensity={3} position={[-1.5, -1.5, 1]}>
        <Sphere args={[0.2, 16, 16]}>
          <meshStandardMaterial color={colors.orange} />
        </Sphere>
      </Float>
      
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2} position={[0.5, -2, -0.5]}>
        <Sphere args={[0.25, 16, 16]}>
          <meshStandardMaterial color={colors.green} />
        </Sphere>
      </Float>

      {/* Soft Contact Shadow below the floating objects */}
      <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={15} blur={2.5} far={4} />
    </group>
  );
}

export default function Contact3DScene() {
  return (
    <div className="w-full h-full relative pointer-events-none">
      {/* 
        pointer-events-none on the container allows users to scroll over the canvas without getting stuck,
        but we need to enable pointer events inside the Canvas for useFrame state.pointer to work if we wanted hover interactions on objects.
        For simple parallax, state.pointer works out of the box globally if the canvas is full screen, 
        or we can just let it be a background decoration.
      */}
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        dpr={[1, 2]}
        className="pointer-events-auto"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
          <pointLight position={[-5, -2, -5]} intensity={0.5} color="#ffffff" />
          
          <Environment preset="studio" />
          
          <FloatingIngredients />
        </Suspense>
      </Canvas>
    </div>
  );
}
