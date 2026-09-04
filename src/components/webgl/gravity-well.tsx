"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";

/**
 * Gravity Auto's own name, taken literally: a real gravity well.
 *
 * A flat grid warps downward around a moving mass, the way mass actually
 * curves spacetime — a textbook illustration rebuilt as real geometry
 * rather than an image of one. No dealership sourced for this series has
 * a name that maps onto an actual physics concept, so this is the one
 * site where the 3D piece is an information diagram of the brand's own
 * word rather than a treatment of a photograph or a real object.
 */

const SEGMENTS = 46;
const SIZE = 6.4;

function Grid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const well = useRef({ x: 0, z: 0 });
  const t0 = useRef(0);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  const base = useMemo(() => {
    const pos = geometry.attributes.position;
    const arr = new Float32Array(pos.count * 3);
    arr.set(pos.array as Float32Array);
    return arr;
  }, [geometry]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1, active: true };
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useFrame((state, delta) => {
    t0.current += delta;
    const targetX = pointer.current.active
      ? pointer.current.x * SIZE * 0.42
      : Math.cos(t0.current * 0.35) * SIZE * 0.28;
    const targetZ = pointer.current.active
      ? -pointer.current.y * SIZE * 0.42
      : Math.sin(t0.current * 0.35) * SIZE * 0.28;
    well.current.x = THREE.MathUtils.damp(well.current.x, targetX, 3, delta);
    well.current.z = THREE.MathUtils.damp(well.current.z, targetZ, 3, delta);

    const mesh = meshRef.current;
    if (!mesh) return;
    const pos = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const mass = 2.1;
    const softening = 0.55;
    for (let i = 0; i < pos.count; i++) {
      const bx = base[i * 3];
      const bz = base[i * 3 + 2];
      const dx = bx - well.current.x;
      const dz = bz - well.current.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      const y = -mass / (dist + softening);
      pos.setY(i, y);
    }
    pos.needsUpdate = true;

    if (dotRef.current) {
      const centerY = -mass / softening;
      dotRef.current.position.set(well.current.x, Math.max(centerY, -2.4), well.current.z);
    }
  });

  return (
    <group rotation={[0.55, 0, 0]}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial color="#cfd6e0" wireframe transparent opacity={0.65} />
      </mesh>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshBasicMaterial color="#eef2f7" />
      </mesh>
    </group>
  );
}

function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export function GravityWell({ className, alt }: { className?: string; alt: string }) {
  const { lost, bind } = useWebglHealth();
  const [supported, setSupported] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canRenderWebgl());
  }, []);

  if (lost || supported !== true) {
    return (
      <div className={className} role="img" aria-label={alt}>
        <svg viewBox="0 0 200 140" className="h-full w-full text-steel" aria-hidden>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M 10,${20 + i * 18} Q 100,${10 + i * 18} 190,${20 + i * 18}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity={0.7}
            />
          ))}
        </svg>
      </div>
    );
  }

  const fov = 42;
  const camZ = SIZE / (0.62 * Math.tan((fov / 2) * (Math.PI / 180)));

  return (
    <div className={className} role="img" aria-label={alt}>
      <Canvas
        style={{ width: "100%", height: "100%", opacity: ready ? 1 : 0, transition: "opacity 1s ease" }}
        camera={{ position: [0, 1.6, camZ], fov }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          bind(gl.domElement);
          setReady(true);
        }}
      >
        <Suspense fallback={null}>
          <Grid />
        </Suspense>
      </Canvas>
    </div>
  );
}
