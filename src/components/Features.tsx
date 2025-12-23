import { motion } from 'framer-motion';
import { Brain, Target, TrendingUp, Users, Lightbulb, Award, Map, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Career Analysis',
    description: 'Advanced AI algorithms analyze your skills, interests, and market trends to provide personalized career insights.',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Target,
    title: 'Goal Setting',
    description: 'Set clear career objectives and receive actionable steps to achieve your professional aspirations.',
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    description: 'Stay ahead with real-time job market analysis, salary trends, and industry growth predictions.',
    gradient: 'from-cyan-500 to-blue-400',
  },
  {
    icon: Map,
    title: 'Career Roadmaps',
    description: 'Visualize your career journey with detailed roadmaps showing skills to acquire and milestones to hit.',
    gradient: 'from-indigo-500 to-blue-400',
  },
  {
    icon: MessageSquare,
    title: '24/7 AI Advisor',
    description: 'Get instant career advice anytime with our intelligent AI chatbot trained on industry expertise.',
    gradient: 'from-blue-600 to-indigo-500',
  },
  {
    icon: Users,
    title: 'Mentorship Matching',
    description: 'Connect with industry professionals who can guide you through your career transition.',
    gradient: 'from-purple-500 to-indigo-400',
  },
  {
    icon: Lightbulb,
    title: 'Skill Gap Analysis',
    description: 'Identify missing skills for your dream role and get personalized learning recommendations.',
    gradient: 'from-sky-500 to-blue-400',
  },
  {
    icon: Award,
    title: 'Career Assessment',
    description: 'Take comprehensive assessments to understand your strengths, weaknesses, and career fit.',
    gradient: 'from-fuchsia-500 to-violet-400',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Everything You Need to{' '}
            <span className="text-gradient-primary">Succeed</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our comprehensive platform provides all the tools and insights you need 
            to make informed career decisions and achieve your professional goals.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-glow hover:-translate-y-1">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                
                {/* Content */}
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
