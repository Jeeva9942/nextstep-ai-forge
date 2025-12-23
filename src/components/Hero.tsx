import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, Target, Play, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Scene3D from './Scene3D';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* 3D Scene Background */}
      <Scene3D />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none"
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[120px] pointer-events-none"
        animate={{ 
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="container relative z-10 px-4 py-32 md:py-40">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 mb-8 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-primary">AI-Powered Career Guidance</span>
            <ChevronRight className="w-4 h-4 text-primary" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8"
          >
            <span className="block">Navigate Your</span>
            <span className="text-gradient-primary relative">
              Career Path
              <motion.span
                className="absolute -right-8 -top-4 text-4xl"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </span>
            <span className="block mt-2">With Confidence</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Unlock your potential with AI-driven insights, personalized career recommendations, 
            and expert guidance tailored to your unique skills and aspirations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => navigate('/advisor')}
              className="group text-lg px-10 h-16 rounded-2xl shadow-glow-intense"
            >
              <Sparkles className="w-5 h-5" />
              Start AI Consultation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl"
              onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-10 h-16 rounded-2xl group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            {/* User avatars */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
                ].map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-background object-cover"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.05 }}
                      className="text-yellow-400"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">4.9/5</span> from 2,000+ reviews
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-4">
              {[
                { value: '50K+', label: 'Careers Transformed' },
                { value: '98%', label: 'Success Rate' },
                { value: '24/7', label: 'AI Availability' },
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-display font-bold text-gradient-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-7 h-11 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 backdrop-blur-sm"
        >
          <motion.div 
            className="w-1.5 h-3 rounded-full bg-primary"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
