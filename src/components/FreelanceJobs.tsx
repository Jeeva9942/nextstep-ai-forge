import { motion } from 'framer-motion';
import { Briefcase, ExternalLink, Globe, Users, DollarSign } from 'lucide-react';

const freelancePlatforms = [
  {
    name: 'Upwork',
    description: 'World\'s largest freelance marketplace with millions of jobs across all categories.',
    url: 'https://www.upwork.com',
    categories: ['Development', 'Design', 'Writing', 'Marketing'],
    avgEarning: '₹25,000 - ₹2,00,000/month',
  },
  {
    name: 'Fiverr',
    description: 'Create gigs and sell your services to clients worldwide starting from ₹400.',
    url: 'https://www.fiverr.com',
    categories: ['Graphics', 'Video', 'Music', 'Programming'],
    avgEarning: '₹15,000 - ₹1,50,000/month',
  },
  {
    name: 'Freelancer',
    description: 'Bid on projects and compete with freelancers globally for diverse opportunities.',
    url: 'https://www.freelancer.com',
    categories: ['Web Dev', 'Mobile Apps', 'Data Entry', 'SEO'],
    avgEarning: '₹20,000 - ₹1,80,000/month',
  },
  {
    name: 'Toptal',
    description: 'Elite network for top 3% of freelance talent. Premium projects and clients.',
    url: 'https://www.toptal.com',
    categories: ['Software', 'Finance', 'Design', 'Project Management'],
    avgEarning: '₹1,00,000 - ₹5,00,000/month',
  },
  {
    name: 'Guru',
    description: 'Professional freelance marketplace with secure payment and work management.',
    url: 'https://www.guru.com',
    categories: ['Engineering', 'Admin', 'Legal', 'Accounting'],
    avgEarning: '₹18,000 - ₹1,20,000/month',
  },
  {
    name: 'PeoplePerHour',
    description: 'UK-based platform connecting businesses with vetted freelance professionals.',
    url: 'https://www.peopleperhour.com',
    categories: ['Technology', 'Marketing', 'Business', 'Social Media'],
    avgEarning: '₹20,000 - ₹1,50,000/month',
  },
];

export default function FreelanceJobs() {
  return (
    <section id="freelance-jobs" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Freelance Opportunities
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Start <span className="text-gradient-primary">Freelancing</span> Today
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore top freelance platforms to monetize your skills and build your independent career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancePlatforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block"
            >
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:border-primary/30 hover:shadow-glow hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h3 className="font-display text-xl font-bold mb-2 text-foreground">
                  {platform.name}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {platform.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {platform.categories.map((cat) => (
                    <span 
                      key={cat}
                      className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground font-medium">
                    {platform.avgEarning}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
