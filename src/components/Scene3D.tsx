import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, RoundedBox } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Career ladder ascending steps
function CareerLadder() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const steps = [
    { y: -2, scale: 1.2, color: '#1e40af' },
    { y: -0.8, scale: 1, color: '#2563eb' },
    { y: 0.4, scale: 0.85, color: '#3b82f6' },
    { y: 1.5, scale: 0.7, color: '#60a5fa' },
    { y: 2.5, scale: 0.55, color: '#93c5fd' },
  ];

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {steps.map((step, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <RoundedBox 
            args={[step.scale * 2.5, 0.3, step.scale * 1.2]} 
            position={[0, step.y, 0]} 
            radius={0.08}
            smoothness={4}
          >
            <meshStandardMaterial 
              color={step.color} 
              metalness={0.4} 
              roughness={0.3}
              emissive={step.color}
              emissiveIntensity={0.15}
            />
          </RoundedBox>
        </Float>
      ))}
    </group>
  );
}

// Floating achievement nodes representing career milestones
function AchievementNode({ position, color, scale = 1, delay = 0 }: { 
  position: [number, number, number]; 
  color: string; 
  scale?: number;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3;
      meshRef.current.rotation.z = t * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={position}>
        {/* Glow sphere */}
        <Sphere ref={glowRef} args={[scale * 0.7, 16, 16]}>
          <meshBasicMaterial color={color} transparent opacity={0.15} />
        </Sphere>
        {/* Core shape */}
        <Box ref={meshRef} args={[scale * 0.5, scale * 0.5, scale * 0.5]}>
          <MeshDistortMaterial
            color={color}
            distort={0.2}
            speed={3}
            roughness={0.2}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </Box>
      </group>
    </Float>
  );
}

// Connection lines representing career network
function NetworkConnections() {
  const linesRef = useRef<THREE.Group>(null);
  
  const connections = useMemo(() => {
    const points: [THREE.Vector3, THREE.Vector3][] = [];
    const nodes = [
      new THREE.Vector3(-3, 1.5, -1),
      new THREE.Vector3(3.5, 0.5, -0.5),
      new THREE.Vector3(-2.5, -1.5, 0.5),
      new THREE.Vector3(2.8, 2, -1),
      new THREE.Vector3(0, 0, 0),
    ];
    
    for (let i = 0; i < nodes.length - 1; i++) {
      points.push([nodes[i], nodes[nodes.length - 1]]);
    }
    return points;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={linesRef}>
      {connections.map((conn, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                conn[0].x, conn[0].y, conn[0].z,
                conn[1].x, conn[1].y, conn[1].z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} />
        </line>
      ))}
    </group>
  );
}

// Ambient particles
function AmbientParticles() {
  const count = 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
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
        size={0.04}
        color="#60a5fa"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Rising growth indicator
function GrowthIndicator() {
  const arrowRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (arrowRef.current) {
      arrowRef.current.position.y = 2.8 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });

  return (
    <group ref={arrowRef} position={[0, 2.8, 0]}>
      <Float speed={3} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial 
            color="#60a5fa" 
            emissive="#60a5fa" 
            emissiveIntensity={0.5}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <coneGeometry args={[0.25, 0.4, 4]} />
          <meshStandardMaterial 
            color="#93c5fd" 
            emissive="#93c5fd" 
            emissiveIntensity={0.6}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
        <pointLight position={[-5, 3, 5]} intensity={0.4} color="#3b82f6" />
        <pointLight position={[5, -3, -5]} intensity={0.3} color="#a855f7" />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#60a5fa" />

        {/* Career ladder - central element */}
        <CareerLadder />
        
        {/* Growth arrow at top */}
        <GrowthIndicator />
        
        {/* Achievement nodes around the ladder */}
        <AchievementNode position={[-3, 1.5, -1]} color="#3b82f6" scale={0.8} delay={0} />
        <AchievementNode position={[3.5, 0.5, -0.5]} color="#8b5cf6" scale={0.7} delay={1} />
        <AchievementNode position={[-2.5, -1.5, 0.5]} color="#06b6d4" scale={0.6} delay={2} />
        <AchievementNode position={[2.8, 2, -1]} color="#a855f7" scale={0.65} delay={3} />
        <AchievementNode position={[-3.5, 0, -1.5]} color="#0ea5e9" scale={0.5} delay={4} />
        <AchievementNode position={[3, -1.5, 0]} color="#6366f1" scale={0.55} delay={5} />
        
        {/* Network connections */}
        <NetworkConnections />
        
        {/* Background particles */}
        <AmbientParticles />
      </Canvas>
    </div>
  );
}
