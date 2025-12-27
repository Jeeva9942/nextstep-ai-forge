import { motion } from 'framer-motion';
import { BookOpen, Code, Zap, Award, ExternalLink, Clock, Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type RiskLevel = 'future-focused' | 'moderate' | 'high-risk';

interface Course {
  title: string;
  category: string;
  duration: string;
  students: string;
  price: string;
  certificationLink: string;
  referenceLink: string;
  icon: React.ElementType;
  gradient: string;
  riskLevel: RiskLevel;
}

const courses: Course[] = [
  {
    title: 'Python Programming',
    category: 'Programming Language',
    duration: '8 weeks',
    students: '12K+',
    price: '₹2,499',
    certificationLink: 'https://www.coursera.org/learn/python',
    referenceLink: 'https://docs.python.org/3/',
    icon: Code,
    gradient: 'from-blue-500 to-cyan-400',
    riskLevel: 'future-focused',
  },
  {
    title: 'JavaScript Mastery',
    category: 'Programming Language',
    duration: '10 weeks',
    students: '15K+',
    price: '₹2,999',
    certificationLink: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
    referenceLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    icon: Code,
    gradient: 'from-yellow-500 to-orange-400',
    riskLevel: 'future-focused',
  },
  {
    title: 'React Development',
    category: 'Frontend Framework',
    duration: '12 weeks',
    students: '10K+',
    price: '₹3,499',
    certificationLink: 'https://react.dev/learn',
    referenceLink: 'https://react.dev/reference/react',
    icon: Zap,
    gradient: 'from-cyan-500 to-blue-400',
    riskLevel: 'future-focused',
  },
  {
    title: 'Basics of EEE',
    category: 'Electrical Engineering',
    duration: '6 weeks',
    students: '5K+',
    price: '₹1,999',
    certificationLink: 'https://www.coursera.org/learn/electronics',
    referenceLink: 'https://www.electrical4u.com/',
    icon: Zap,
    gradient: 'from-amber-500 to-yellow-400',
    riskLevel: 'moderate',
  },
  {
    title: 'Data Science Fundamentals',
    category: 'Data & Analytics',
    duration: '14 weeks',
    students: '8K+',
    price: '₹4,999',
    certificationLink: 'https://www.coursera.org/professional-certificates/ibm-data-science',
    referenceLink: 'https://pandas.pydata.org/docs/',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-400',
    riskLevel: 'future-focused',
  },
  {
    title: 'Machine Learning',
    category: 'AI & ML',
    duration: '16 weeks',
    students: '7K+',
    price: '₹5,999',
    certificationLink: 'https://www.coursera.org/learn/machine-learning',
    referenceLink: 'https://scikit-learn.org/stable/',
    icon: BookOpen,
    gradient: 'from-indigo-500 to-purple-400',
    riskLevel: 'future-focused',
  },
  {
    title: 'Cloud Computing (AWS)',
    category: 'Cloud & DevOps',
    duration: '10 weeks',
    students: '9K+',
    price: '₹4,499',
    certificationLink: 'https://aws.amazon.com/certification/',
    referenceLink: 'https://docs.aws.amazon.com/',
    icon: Award,
    gradient: 'from-orange-500 to-red-400',
    riskLevel: 'future-focused',
  },
  {
    title: 'Cybersecurity Basics',
    category: 'Security',
    duration: '8 weeks',
    students: '6K+',
    price: '₹3,999',
    certificationLink: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
    referenceLink: 'https://www.cybrary.it/',
    icon: BookOpen,
    gradient: 'from-red-500 to-pink-400',
    riskLevel: 'future-focused',
  },
];

const getRiskBadge = (riskLevel: RiskLevel) => {
  switch (riskLevel) {
    case 'future-focused':
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
          <CheckCircle className="w-3 h-3" />
          Future-Focused
        </div>
      );
    case 'moderate':
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
          <AlertTriangle className="w-3 h-3" />
          Moderate Risk
        </div>
      );
    case 'high-risk':
      return (
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
          <AlertTriangle className="w-3 h-3" />
          High Risk / Low Demand
        </div>
      );
  }
};

export default function ExtraCourses() {
  return (
    <section id="extra-courses" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            Extra Courses
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Expand Your <span className="text-gradient-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Enhance your career with certification courses in programming, engineering, and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:border-primary/30 hover:shadow-glow hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${course.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <course.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  {getRiskBadge(course.riskLevel)}
                </div>

                <span className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
                  {course.category}
                </span>
                
                <h3 className="font-display text-lg font-semibold mb-3 text-foreground">
                  {course.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {course.students}
                  </span>
                </div>

                <div className="text-2xl font-bold text-gradient-primary mb-4">
                  {course.price}
                </div>

                <div className="mt-auto space-y-2">
                  <a 
                    href={course.certificationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Award className="w-4 h-4" />
                    Get Certification
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a 
                    href={course.referenceLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <BookOpen className="w-4 h-4" />
                    Reference Docs
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
