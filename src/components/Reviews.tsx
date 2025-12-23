import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Mitchell',
    role: 'Software Engineer at Google',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "CareerPath AI completely transformed my career trajectory. The AI advisor helped me identify skills I needed and within 6 months I landed my dream job at Google. The personalized roadmap was incredibly accurate.",
  },
  {
    name: 'James Rodriguez',
    role: 'Product Manager at Meta',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "I was stuck in a dead-end job for years. The AI analysis showed me career paths I never considered. Now I am leading product teams at Meta. This platform is a game-changer for anyone serious about their career.",
  },
  {
    name: 'Emily Chen',
    role: 'Data Scientist at Netflix',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "The skill gap analysis was eye-opening. It pinpointed exactly what I needed to learn. The 24/7 AI advisor answered all my questions and kept me motivated throughout my transition into data science.",
  },
  {
    name: 'Michael Thompson',
    role: 'UX Director at Apple',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "From junior designer to UX Director in 3 years. CareerPath AI provided the strategic guidance I needed. The market insights helped me negotiate a 40% salary increase. Absolutely worth every penny.",
  },
  {
    name: 'Lisa Park',
    role: 'Engineering Manager at Amazon',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "As a career changer from finance to tech, I was lost. The AI advisor created a realistic transition plan and connected me with the right resources. Now managing a team of 20 engineers at Amazon!",
  },
  {
    name: 'David Kim',
    role: 'Startup Founder, Ex-Microsoft',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: "Used CareerPath AI to plan my exit from corporate to entrepreneurship. The AI helped me identify market opportunities and build the skills I needed. My startup just raised Series A funding!",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
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
            Success Stories
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Trusted by <span className="text-gradient-primary">50,000+</span> Professionals
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real stories from real people who transformed their careers with our AI-powered guidance.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:border-primary/30 hover:shadow-glow hover:-translate-y-1">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                
                {/* Review text */}
                <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                  "{review.text}"
                </p>
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <img 
                    src={review.image} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div>
                    <h4 className="font-display font-semibold text-foreground">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 glass-card rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Career Transformations' },
              { value: '4.9/5', label: 'Average Rating' },
              { value: '98%', label: 'Success Rate' },
              { value: '120+', label: 'Countries Served' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
