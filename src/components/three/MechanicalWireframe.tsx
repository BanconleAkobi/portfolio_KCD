"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";

// Gyroscope de précision — 3 anneaux imbriqués à différentes inclinaisons
// Évoque un instrument de navigation ou un capteur inertiel
function Gyroscope() {
  const outerRef = useRef<Group>(null);
  const midRef   = useRef<Group>(null);
  const innerRef = useRef<Group>(null);
  const coreRef  = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Rotations lentes, indépendantes — effet gyroscopique réaliste
    if (outerRef.current) outerRef.current.rotation.y = t * 0.22;
    if (midRef.current)   midRef.current.rotation.x   = t * 0.18;
    if (innerRef.current) innerRef.current.rotation.z = t * 0.14;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.35;
      coreRef.current.rotation.x = t * 0.2;
    }
  });

  const ringMat = { color: "#4B7CF3" as const, wireframe: true, transparent: true, opacity: 0.55 };
  const rimMat  = { color: "#9CA3AF" as const, transparent: true, opacity: 0.18 };
  const coreMat = { color: "#06B6D4" as const, wireframe: true, transparent: true, opacity: 0.7 };

  return (
    <group>
      {/* Anneau extérieur — inclinaison 0° */}
      <group ref={outerRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.04, 6, 80]} />
          <meshBasicMaterial {...rimMat} />
        </mesh>
        {/* Fils de structure */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[2.2, 0.012, 4, 80]} />
          <meshBasicMaterial color="#4A5260" transparent opacity={0.15} />
        </mesh>
      </group>

      {/* Anneau médian — inclinaison 90° */}
      <group ref={midRef} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.7, 0.04, 6, 72]} />
          <meshBasicMaterial {...rimMat} color="#6B7280" opacity={0.22} />
        </mesh>
      </group>

      {/* Anneau intérieur — inclinaison 45° */}
      <group ref={innerRef} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[1.2, 0.035, 6, 64]} />
          <meshBasicMaterial {...ringMat} opacity={0.45} />
        </mesh>
      </group>

      {/* Noyau central — octaèdre */}
      <group ref={coreRef}>
        <mesh>
          <octahedronGeometry args={[0.52, 0]} />
          <meshBasicMaterial {...coreMat} />
        </mesh>
        {/* Halo autour du noyau */}
        <mesh>
          <octahedronGeometry args={[0.65, 1]} />
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.12} />
        </mesh>
      </group>

      {/* Axe vertical — comme un arbre de rotation */}
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 4.6, 6]} />
        <meshBasicMaterial color="#4A5260" transparent opacity={0.3} />
      </mesh>
      {/* Axe horizontal */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 4.6, 6]} />
        <meshBasicMaterial color="#4A5260" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function MechanicalWireframe() {
  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Gyroscope />
        </Suspense>
        <ambientLight intensity={0.3} color="#3B82F6" />
        <directionalLight position={[3, 5, 3]} intensity={0.4} color="#ffffff" />
      </Canvas>
    </div>
  );
}
