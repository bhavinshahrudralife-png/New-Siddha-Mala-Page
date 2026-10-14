import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { BEADS } from '../data/content';

// Curved, dimensional photo surfaces preserve the actual Rudralife bead details.
// These are not scanned 360-degree models; rotations deliberately stay front-facing.
function PhotoBead({ bead, origin, size, speed, progress, index }) {
  const mesh = useRef();
  const texture = useTexture(bead.img);
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(1, 1, 40, 40);
    const positions = g.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i), y = positions.getY(i);
      positions.setZ(i, Math.sqrt(Math.max(0, 1 - 4 * (x*x + y*y))) * 0.18);
    }
    g.computeVertexNormals(); return g;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame(({ clock, viewport, size: canvasSize }, delta) => {
    if (!mesh.current) return;
    const p = progress.get();
    const mobile = canvasSize.width <= 600;
    const compact = canvasSize.width < 1800;
    // Small screens reserve the entire title and lower copy areas. Only the
    // two side-lane beads remain, never crossing the necklace or text.
    mesh.current.visible = mobile ? index < 2 : !compact || index < 2;
    const laneX = mobile ? (index === 0 ? -0.38 : 0.38) : origin[0];
    const laneY = mobile ? (index === 0 ? 0.08 : -0.03) : origin[1];
    const descent = mobile ? 0.33 : speed;
    const screenY = 0.5 - laneY + p * descent;
    const x = laneX * viewport.width;
    const y = laneY * viewport.height - p * viewport.height * descent;
    mesh.current.position.x = THREE.MathUtils.damp(mesh.current.position.x, x, 8, delta);
    mesh.current.position.y = THREE.MathUtils.damp(mesh.current.position.y, y + Math.sin(clock.elapsedTime * 0.65 + index) * 0.055, 8, delta);
    mesh.current.rotation.set(Math.sin(p * 4 + index) * 0.18, Math.sin(clock.elapsedTime * 0.24 + index) * 0.22, p * (index % 2 ? 1.5 : -1.3) + index * 0.15);
    const scale = mobile ? viewport.height * 0.074 : Math.min(size, viewport.width * 0.073);
    mesh.current.scale.setScalar(scale);
    const laneFade = mobile ? 1 - THREE.MathUtils.smoothstep(screenY, 0.67, 0.73) : compact ? 1 - THREE.MathUtils.smoothstep(screenY, 0.36, 0.43) : 1;
    mesh.current.material.opacity = laneFade * (1 - THREE.MathUtils.smoothstep(p, 0.52, 0.88));
  });
  return <mesh ref={mesh} geometry={geometry} position={[0, 20, 0]}>
    <meshBasicMaterial map={texture} transparent depthWrite={false} side={THREE.DoubleSide} toneMapped={false}/>
  </mesh>;
}

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function Scene3D({ progress, visible }) {
  const reduced = useReducedMotion();
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    setSupported(Boolean(gl));
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  }, []);
  if (reduced || !supported) return null;
  const composition = [
    [4, [-0.39, 0.29], 1.25, 0.72], [10, [0.37, 0.18], 0.78, 0.85],
    [6, [-0.45, -0.22], 0.62, 0.9], [13, [0.45, -0.3], 1.05, 0.7],
    [2, [0.44, 0.68], 0.48, 1.15],
  ];
  return <div className="bead-canvas" data-testid="scene-3d" aria-hidden="true">
    <SceneBoundary><Canvas camera={{ position: [0, 0, 10], fov: 38 }} dpr={[1, 1.5]} frameloop={visible ? 'always' : 'never'} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}>
      <Suspense fallback={null}>{composition.map(([id, origin, size, speed], i) => <PhotoBead key={id} bead={BEADS[id]} origin={origin} size={size} speed={speed} progress={progress} index={i}/>)}</Suspense>
    </Canvas></SceneBoundary>
  </div>;
}