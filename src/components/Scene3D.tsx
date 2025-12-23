import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Target, 
  TrendingUp, 
  Award, 
  Users, 
  Lightbulb,
  FileText,
  Building2,
  Rocket,
  Star,
  Zap,
  BookOpen,
  MessageSquare,
  Globe
} from 'lucide-react';

// Ambient particles in 3D
function AmbientParticles() {
  const count = 120;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
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
        color="#3b82f6"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Floating connection lines
function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
    }
  });

  const lines = useMemo(() => {
    const result = [];
    for (let i = 0; i < 8; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      );
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      );
      result.push({ start, end });
    }
    return result;
  }, []);

  return (
    <group ref={linesRef}>
      {lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                line.start.x, line.start.y, line.start.z,
                line.end.x, line.end.y, line.end.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3b82f6" transparent opacity={0.15} />
        </line>
      ))}
    </group>
  );
}

// Icon configuration with positions and animations
const floatingIcons = [
  { Icon: Briefcase, x: '8%', y: '15%', delay: 0, size: 32, duration: 8 },
  { Icon: GraduationCap, x: '85%', y: '20%', delay: 1.5, size: 36, duration: 9 },
  { Icon: Mail, x: '12%', y: '70%', delay: 0.5, size: 28, duration: 7 },
  { Icon: Target, x: '78%', y: '65%', delay: 2, size: 30, duration: 8.5 },
  { Icon: TrendingUp, x: '92%', y: '45%', delay: 1, size: 34, duration: 7.5 },
  { Icon: Award, x: '5%', y: '40%', delay: 2.5, size: 26, duration: 9.5 },
  { Icon: Users, x: '70%', y: '80%', delay: 0.8, size: 28, duration: 8 },
  { Icon: Lightbulb, x: '25%', y: '25%', delay: 1.2, size: 30, duration: 7 },
  { Icon: FileText, x: '60%', y: '12%', delay: 3, size: 24, duration: 8.5 },
  { Icon: Building2, x: '40%', y: '85%', delay: 0.3, size: 32, duration: 9 },
  { Icon: Rocket, x: '88%', y: '75%', delay: 1.8, size: 28, duration: 7.5 },
  { Icon: Star, x: '18%', y: '55%', delay: 2.2, size: 22, duration: 8 },
  { Icon: Zap, x: '75%', y: '35%', delay: 0.7, size: 26, duration: 9 },
  { Icon: BookOpen, x: '35%', y: '10%', delay: 1.4, size: 28, duration: 7.5 },
  { Icon: MessageSquare, x: '55%', y: '75%', delay: 2.8, size: 24, duration: 8.5 },
  { Icon: Globe, x: '3%', y: '85%', delay: 1.6, size: 30, duration: 9 },
];

// Floating icon component
function FloatingIcon({ Icon, x, y, delay, size, duration }: {
  Icon: LucideIcon;
  x: string;
  y: string;
  delay: number;
  size: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.15, 0.35, 0.15],
        scale: [0.9, 1.1, 0.9],
        y: [0, -20, 0],
        rotate: [-5, 5, -5]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="relative">
        {/* Glow effect */}
        <div 
          className="absolute inset-0 blur-xl rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
            transform: 'scale(2)'
          }}
        />
        <Icon 
          size={size} 
          className="text-blue-400/60 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
        />
      </div>
    </motion.div>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* 3D Canvas for particles and lines */}
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 5, 5]} intensity={0.2} color="#3b82f6" />
        <pointLight position={[-5, -5, 5]} intensity={0.15} color="#8b5cf6" />
        
        <AmbientParticles />
        <ConnectionLines />
      </Canvas>

      {/* Floating career icons overlay */}
      {floatingIcons.map((iconProps, index) => (
        <FloatingIcon key={index} {...iconProps} />
      ))}

      {/* Central glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none" />
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
    </div>
  );
}
