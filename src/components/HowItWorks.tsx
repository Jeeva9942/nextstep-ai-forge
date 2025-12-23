import { motion } from 'framer-motion';
import { UserPlus, MessageCircle, LineChart, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create Your Profile',
    description: 'Sign up and tell us about your background, skills, interests, and career aspirations.',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Chat With AI Advisor',
    description: 'Engage in deep conversations with our AI to explore career options and get personalized guidance.',
  },
  {
    number: '03',
    icon: LineChart,
    title: 'Get Your Roadmap',
    description: 'Receive a customized career roadmap with actionable steps, skill recommendations, and timelines.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Achieve Your Goals',
    description: 'Follow your personalized plan, track progress, and reach your career milestones.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <div className="container px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Process
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            How It <span className="text-gradient-primary">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Four simple steps to transform your career journey with the power of AI.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20 hidden md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Card */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className="glass-card rounded-2xl p-6 md:p-8 inline-block text-left transition-all duration-300 hover:border-primary/30 hover:shadow-glow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 md:hidden">
                      <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                    <div>
                      <span className="text-primary font-display font-bold text-sm">{step.number}</span>
                      <h3 className="font-display text-xl font-semibold mt-1 mb-2 text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Icon (Desktop) */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-primary items-center justify-center shadow-glow z-10">
                <step.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Spacer */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
