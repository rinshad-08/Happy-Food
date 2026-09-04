"use client";

import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ----------------------------------------------------------------------
// 1. GLB Bottle Model
// ----------------------------------------------------------------------
const PrimitiveBottle = ({ color, radius, modelUrl }: { color: string; radius: number; modelUrl: string }) => {
  const { scene } = useGLTF(modelUrl);

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
      }
    });
  }, [clonedScene, color]);

  let scale: [number, number, number] = [3.8, 4.2, 3.8]; 

  if (modelUrl.includes('Extra-Crunchy-Peanut-Butter')) {
    scale = [5.3, 4.4, 5.3];
  }

  return (
    <group position={[0, -0.5, 0]}> 
      <primitive object={clonedScene} scale={scale} />
    </group>
  );
};

useGLTF.preload('/3d3/Classic-Mixed-Fruit-Jam.glb');

// ----------------------------------------------------------------------
// 2. Rolling Physics Controller
// ----------------------------------------------------------------------
interface RollingPhysicsProps {
  product: any;
  phase: "enter" | "exit";
  direction: number;
  isLoaded?: boolean;
}

const RollingPhysics = ({ product, phase, direction, isLoaded = true }: RollingPhysicsProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const radius = 1.2;
  const height = 3.5;
  const floorY = -1.2; 

  const isMobile = viewport.width < 10;
  const targetCenterX = isMobile ? 0 : -viewport.width * 0.22;
  const mobileYOffset = isMobile ? 2.5 : 0;

  const offscreenDistance = viewport.width * 0.8;
  const startX = phase === "enter" ? targetCenterX + (direction > 0 ? offscreenDistance : -offscreenDistance) : targetCenterX;

  const positionX = useRef(startX);
  const velocity = useRef(0);
  const currentRotation = useRef(0);
  const previousX = useRef(startX);

  useFrame((state, delta) => {
    if (!isLoaded) return;

    let targetX = targetCenterX;
    if (phase === "exit") {
      targetX = targetCenterX + (direction > 0 ? -offscreenDistance : offscreenDistance);
    }

    const stiffness = 8.0;
    const damping = 4.5;

    const dt = Math.min(delta, 0.03);

    const acceleration = (targetX - positionX.current) * stiffness;
    velocity.current += acceleration * dt;
    velocity.current -= velocity.current * damping * dt;

    positionX.current += velocity.current * dt;

    const standUpDist = 5.5;
    const distanceToCenter = Math.abs(positionX.current - targetCenterX);

    let pitch = Math.PI / 2; 
    if (distanceToCenter < standUpDist) {
      const t = distanceToCenter / standUpDist;
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      pitch = ease * (Math.PI / 2);
    }

    const yPosition = floorY + (height / 2) * Math.cos(pitch) + radius * Math.sin(pitch);

    const distanceTravelled = positionX.current - previousX.current;

    const rollingRatio = Math.sin(pitch);
    const rotationDelta = (distanceTravelled / radius) * rollingRatio;
    currentRotation.current += rotationDelta;

    const baseTargetRotation = Math.round(currentRotation.current / (Math.PI * 2)) * (Math.PI * 2);
    const textureOffset = 0.5; 
    const targetRotation = baseTargetRotation + textureOffset;

    const alignmentStrength = 1 - Math.sin(pitch);
    currentRotation.current += (targetRotation - currentRotation.current) * (alignmentStrength * 0.15);

    previousX.current = positionX.current;

    if (groupRef.current) {
      groupRef.current.position.x = positionX.current;
      groupRef.current.position.y = yPosition + mobileYOffset;

      groupRef.current.rotation.x = pitch;
      groupRef.current.rotation.y = currentRotation.current;
      groupRef.current.rotation.z = 0;
    }
  });

  return (
    <group ref={groupRef}>
      <PrimitiveBottle color={product.color} radius={radius} modelUrl={product.modelUrl} />
    </group>
  );
};

// ----------------------------------------------------------------------
// 3. Scene and Transitions
// ----------------------------------------------------------------------
interface RollingSceneProps {
  currentIndex: number;
  direction: number;
  activeProduct: any;
  isLoaded?: boolean;
}

const RollingScene = ({ currentIndex, direction, activeProduct, isLoaded }: RollingSceneProps) => {
  const [transitionState, setTransitionState] = useState({
    current: activeProduct,
    previous: null as any,
    direction: direction,
  });

  useEffect(() => {
    if (transitionState.current.id !== activeProduct.id) {
      setTransitionState({
        previous: transitionState.current,
        current: activeProduct,
        direction: direction || 1,
      });
    }
  }, [activeProduct, direction, transitionState.current.id]);

  useEffect(() => {
    if (transitionState.previous) {
      const timer = setTimeout(() => {
        setTransitionState((prev) => ({ ...prev, previous: null }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [transitionState.previous]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, -2, -5]} intensity={0.5} color="#ffffff" />
      <Environment preset="studio" />

      {transitionState.previous && (
        <RollingPhysics
          key={`prev-${transitionState.previous.id}`}
          phase="exit"
          direction={transitionState.direction}
          product={transitionState.previous}
          isLoaded={isLoaded}
        />
      )}
      <RollingPhysics
        key={`curr-${transitionState.current.id}`}
        phase="enter"
        direction={transitionState.direction}
        product={transitionState.current}
        isLoaded={isLoaded}
      />

      {/* Floor Contact Shadow */}
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.65}
        scale={40}
        blur={1.5}
        far={4}
        resolution={128}
      />
    </>
  );
};

// ----------------------------------------------------------------------
// 4. Main Export
// ----------------------------------------------------------------------
export default function RollingBottle3D({ currentIndex, direction, activeProduct, isLoaded }: RollingSceneProps) {
  useEffect(() => {
    // Lazily preload the other models in the background after the first one is rendered
    const timer = setTimeout(() => {
      useGLTF.preload('/3d3/mango-pickle.glb');
      useGLTF.preload('/3d3/Extra-Crunchy-Peanut-Butter.glb');
      useGLTF.preload('/3d3/peanut-butter-choco.glb');
      useGLTF.preload('/3d3/Happy-Strawberry-Jam.glb');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Canvas camera={{ position: [0, 3, 11], fov: 40 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <RollingScene currentIndex={currentIndex} direction={direction} activeProduct={activeProduct} isLoaded={isLoaded} />
      </Suspense>
    </Canvas>
  );
}
