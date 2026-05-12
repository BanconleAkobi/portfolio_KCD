"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, TorusKnot, Torus } from "@react-three/drei";
import type { Mesh } from "three";

function WireframePart() {
  const meshRef = useRef<Mesh>(null);
  const innerRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.x = Math.sin(t * 0.12) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.1;
      innerRef.current.rotation.z = t * 0.06;
    }
  });

  return (
    <group>
      {/* Outer torusknot — precision engineering shape */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.32, 120, 16, 2, 3]} />
        <meshBasicMaterial
          color="#3B82F6"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Inner ring — bearing aesthetic */}
      <mesh ref={innerRef} position={[0, 0, 0]}>
        <torusGeometry args={[1.8, 0.015, 8, 60]} />
        <meshBasicMaterial color="#9CA3AF" transparent opacity={0.25} />
      </mesh>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.012, 8, 80]} />
        <meshBasicMaterial color="#4A5260" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function MechanicalWireframe() {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <WireframePart />
        </Suspense>
        {/* Very subtle ambient */}
        <ambientLight intensity={0.4} color="#3B82F6" />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
      </Canvas>
    </div>
  );
}
