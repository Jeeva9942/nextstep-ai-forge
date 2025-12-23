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
  const count = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
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
        color="#3b82f6"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Icon configuration with 3D-style animations
const floatingIcons: Array<{
  Icon: LucideIcon;
  x: string;
  y: string;
  delay: number;
  size: number;
  rotateX: number;
  rotateY: number;
  moveX: number;
  moveY: number;
  duration: number;
}> = [
  { Icon: Briefcase, x: '6%', y: '12%', delay: 0, size: 38, rotateX: 15, rotateY: 20, moveX: 30, moveY: 25, duration: 7 },
  { Icon: GraduationCap, x: '88%', y: '18%', delay: 1.2, size: 42, rotateX: -10, rotateY: 25, moveX: -25, moveY: 30, duration: 8 },
  { Icon: Mail, x: '10%', y: '75%', delay: 0.4, size: 32, rotateX: 20, rotateY: -15, moveX: 35, moveY: -20, duration: 6.5 },
  { Icon: Target, x: '82%', y: '68%', delay: 1.8, size: 36, rotateX: -15, rotateY: -20, moveX: -30, moveY: 25, duration: 7.5 },
  { Icon: TrendingUp, x: '94%', y: '42%', delay: 0.8, size: 40, rotateX: 10, rotateY: 30, moveX: -40, moveY: 15, duration: 8.5 },
  { Icon: Award, x: '3%', y: '45%', delay: 2.2, size: 34, rotateX: -20, rotateY: 15, moveX: 40, moveY: -25, duration: 7 },
  { Icon: Users, x: '75%', y: '85%', delay: 0.6, size: 30, rotateX: 15, rotateY: -25, moveX: -20, moveY: -30, duration: 6 },
  { Icon: Lightbulb, x: '22%', y: '22%', delay: 1.4, size: 36, rotateX: -10, rotateY: 20, moveX: 25, moveY: 35, duration: 7.5 },
  { Icon: FileText, x: '65%', y: '8%', delay: 2.6, size: 28, rotateX: 20, rotateY: -10, moveX: -35, moveY: 20, duration: 8 },
  { Icon: Building2, x: '38%', y: '88%', delay: 0.2, size: 38, rotateX: -15, rotateY: 25, moveX: 30, moveY: -35, duration: 9 },
  { Icon: Rocket, x: '92%', y: '78%', delay: 1.6, size: 34, rotateX: 25, rotateY: -15, moveX: -45, moveY: 20, duration: 6.5 },
  { Icon: Star, x: '15%', y: '58%', delay: 2, size: 26, rotateX: -20, rotateY: 30, moveX: 35, moveY: -15, duration: 7 },
  { Icon: Zap, x: '78%', y: '32%', delay: 0.5, size: 32, rotateX: 15, rotateY: -25, moveX: -30, moveY: 40, duration: 8 },
  { Icon: BookOpen, x: '32%', y: '6%', delay: 1.1, size: 34, rotateX: -10, rotateY: 15, moveX: 20, moveY: 30, duration: 7.5 },
  { Icon: MessageSquare, x: '58%', y: '78%', delay: 2.4, size: 28, rotateX: 20, rotateY: -20, moveX: -25, moveY: -25, duration: 6 },
  { Icon: Globe, x: '5%', y: '88%', delay: 1.3, size: 36, rotateX: -15, rotateY: 10, moveX: 40, moveY: -20, duration: 8.5 },
];

// 3D Floating icon component with perspective transform
function FloatingIcon({ Icon, x, y, delay, size, rotateX, rotateY, moveX, moveY, duration }: {
  Icon: LucideIcon;
  x: string;
  y: string;
  delay: number;
  size: number;
  rotateX: number;
  rotateY: number;
  moveX: number;
  moveY: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ 
        left: x, 
        top: y,
        perspective: '1000px',
        perspectiveOrigin: 'center center'
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.2, 0.5, 0.2],
        scale: [0.85, 1.15, 0.85],
        x: [0, moveX, 0],
        y: [0, moveY, 0],
        rotateX: [0, rotateX, 0],
        rotateY: [0, rotateY, 0],
        rotateZ: [-3, 3, -3]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div 
        className="relative"
        style={{ 
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Back shadow layer */}
        <div 
          className="absolute"
          style={{ 
            transform: 'translateZ(-20px) scale(1.2)',
            filter: 'blur(15px)',
            opacity: 0.4
          }}
        >
          <Icon size={size} className="text-blue-500" />
        </div>
        
        {/* Middle glow layer */}
        <div 
          className="absolute"
          style={{ 
            transform: 'translateZ(-10px) scale(1.1)',
            filter: 'blur(8px)',
            opacity: 0.6
          }}
        >
          <Icon size={size} className="text-blue-400" />
        </div>
        
        {/* Front icon layer */}
        <div style={{ transform: 'translateZ(0px)' }}>
          <Icon 
            size={size} 
            className="text-blue-300 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" 
            strokeWidth={1.5}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* 3D Canvas for particles */}
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 5, 5]} intensity={0.2} color="#3b82f6" />
        <AmbientParticles />
      </Canvas>

      {/* 3D Floating career icons */}
      {floatingIcons.map((iconProps, index) => (
        <FloatingIcon key={index} {...iconProps} />
      ))}

      {/* Central pulsing glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-blue-600/5 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  );
}
