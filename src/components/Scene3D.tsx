import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Box, Icosahedron } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function FloatingShape({ position, color, scale = 1, speed = 1 }: { 
  position: [number, number, number]; 
  color: string; 
  scale?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.5} floatIntensity={1}>
      <Icosahedron ref={meshRef} args={[1, 1]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Icosahedron>
    </Float>
  );
}

function GlowingSphere({ position, color, scale = 1 }: { 
  position: [number, number, number]; 
  color: string; 
  scale?: number;
}) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere args={[1, 32, 32]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}

function OrbitingRing({ radius, color, speed = 1 }: { 
  radius: number; 
  color: string; 
  speed?: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Torus ref={ringRef} args={[radius, 0.02, 16, 100]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </Torus>
  );
}

function ParticleField() {
  const count = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#4fd1c5"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#a855f7" />
        <pointLight position={[5, -5, -5]} intensity={0.3} color="#4fd1c5" />

        {/* Main career growth sphere */}
        <GlowingSphere position={[0, 0, 0]} color="#4fd1c5" scale={1.5} />
        
        {/* Orbiting elements representing career paths */}
        <OrbitingRing radius={2.5} color="#4fd1c5" speed={0.5} />
        <OrbitingRing radius={3.5} color="#a855f7" speed={0.3} />
        
        {/* Floating shapes representing opportunities */}
        <FloatingShape position={[-3, 2, -2]} color="#4fd1c5" scale={0.4} speed={0.8} />
        <FloatingShape position={[3.5, -1.5, -1]} color="#a855f7" scale={0.5} speed={1.2} />
        <FloatingShape position={[-2.5, -2, 1]} color="#22d3ee" scale={0.35} speed={1} />
        <FloatingShape position={[2, 2.5, -1.5]} color="#f472b6" scale={0.45} speed={0.7} />
        
        {/* Background particles */}
        <ParticleField />
      </Canvas>
    </div>
  );
}
