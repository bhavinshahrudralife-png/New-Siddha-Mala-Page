import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

function useScrollProgress() {
  const ref = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return ref;
}

function Rudraksha({ progressRef }) {
  const group = useRef();
  const bead = useRef();
  const mat = useRef();
  const ring = useRef();
  useFrame((state, delta) => {
    const p = progressRef.current; // 0..1 whole page
    const journey = Math.min(p / 0.22, 1); // hero journey over first 22% of scroll
    const wide = state.viewport.width > 6.5;
    if (group.current) {
      group.current.rotation.y += delta * 0.35;
      group.current.rotation.x = journey * Math.PI * 2.2;
      group.current.position.y = THREE.MathUtils.lerp(0.2, -30, Math.pow(journey, 1.6));
      const xBase = wide ? 2.3 : 0;
      group.current.position.x = xBase + Math.sin(journey * Math.PI * 2) * 1.2;
      const s = (wide ? 0.85 : 0.7) + journey * 0.5;
      group.current.scale.setScalar(s);
    }
    if (mat.current) {
      // fade out after the journey
      const fade = p > 0.2 ? Math.max(0, 1 - (p - 0.2) / 0.04) : 1;
      mat.current.opacity = fade;
      mat.current.transparent = true;
    }
    if (ring.current) {
      ring.current.rotation.x += delta * 0.4;
      ring.current.rotation.z += delta * 0.2;
      const fade = p > 0.2 ? Math.max(0, 1 - (p - 0.2) / 0.04) : 1;
      ring.current.material.opacity = 0.5 * fade;
    }
  });
  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh ref={bead}>
          <sphereGeometry args={[1.15, 96, 96]} />
          <MeshDistortMaterial
            ref={mat}
            color="#7a3a14"
            emissive="#1f0d02"
            emissiveIntensity={0.4}
            distort={0.34}
            speed={1.4}
            roughness={0.68}
            metalness={0.3}
          />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.15, 0.02, 16, 128]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  const progressRef = useScrollProgress();
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    <div
      data-testid="scene-3d"
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <ambientLight intensity={0.9} />
        <pointLight position={[5, 5, 5]} intensity={60} color="#ffd98a" />
        <pointLight position={[-6, -3, 2]} intensity={30} color="#c96b2a" />
        <pointLight position={[0, -4, 5]} intensity={22} color="#d4af37" />
        <directionalLight position={[0, 4, 6]} intensity={2.4} color="#fff3d6" />
        <Rudraksha progressRef={progressRef} />
        <Sparkles count={110} scale={[14, 14, 6]} size={2.2} speed={0.25} color="#d4af37" opacity={0.55} />
      </Canvas>
    </div>
  );
}
