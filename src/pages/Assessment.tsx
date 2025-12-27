import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Compass, ArrowLeft, ArrowRight, Loader2, Sparkles, User, Briefcase, GraduationCap, Target, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const skillOptions = [
  'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'SQL', 'Machine Learning',
  'Data Analysis', 'Project Management', 'Communication', 'Leadership', 'Marketing',
  'Design', 'Sales', 'Finance', 'Writing', 'Public Speaking', 'Problem Solving', 'Teamwork'
];

const interestOptions = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Creative Arts', 'Science',
  'Business', 'Engineering', 'Law', 'Marketing', 'Human Resources', 'Consulting',
  'Entrepreneurship', 'Non-profit', 'Government', 'Research'
];

export default function Assessment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    education: '',
    experience: '',
    currentRole: '',
    skills: [] as string[],
    interests: [] as string[],
    goals: '',
    challenges: '',
    preferredWorkStyle: '',
    salaryExpectation: ''
  });

  const totalSteps = 4;

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.goals) {
      toast({ title: 'Missing Information', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    
    try {
      const prompt = `Based on the following career assessment, provide personalized career guidance and recommendations:

Name: ${formData.name}
Age: ${formData.age}
Education Level: ${formData.education}
Years of Experience: ${formData.experience}
Current Role: ${formData.currentRole || 'Not specified'}
Skills: ${formData.skills.join(', ') || 'Not specified'}
Interests: ${formData.interests.join(', ') || 'Not specified'}
Career Goals: ${formData.goals}
Current Challenges: ${formData.challenges || 'Not specified'}
Preferred Work Style: ${formData.preferredWorkStyle || 'Not specified'}
Salary Expectations: ${formData.salaryExpectation || 'Not specified'}

Please provide:
1. Top 3 recommended career paths based on their profile
2. Skills they should develop
3. Actionable next steps they can take immediately
4. Resources or certifications that would help
5. Potential salary ranges for recommended careers

Keep the response clear, encouraging, and actionable.`;

      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/career-advisor`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` 
        },
        body: JSON.stringify({ 
          messages: [{ role: 'user', content: prompt }] 
        }),
      });

      if (!resp.ok) throw new Error('Failed to get response');

      const reader = resp.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6));
              const content = data.choices?.[0]?.delta?.content;
              if (content) {
                fullResponse += content;
                // Clean markdown
                const cleaned = fullResponse
                  .replace(/\*\*/g, '')
                  .replace(/\*/g, '')
                  .replace(/#{1,6}\s/g, '')
                  .replace(/`/g, '');
                setResult(cleaned);
              }
            } catch {}
          }
        }
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to get AI recommendations. Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">Personal Information</h2>
                <p className="text-sm text-muted-foreground">Tell us about yourself</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input 
                  placeholder="Enter your name" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="h-12"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input 
                    type="number" 
                    placeholder="Your age" 
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Education Level</Label>
                  <Select value={formData.education} onValueChange={(v) => setFormData(prev => ({ ...prev, education: v }))}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="doctorate">Doctorate / PhD</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Years of Experience</Label>
                  <Select value={formData.experience} onValueChange={(v) => setFormData(prev => ({ ...prev, experience: v }))}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-4">2-4 years</SelectItem>
                      <SelectItem value="5-9">5-9 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Current Role</Label>
                  <Input 
                    placeholder="e.g. Software Developer" 
                    value={formData.currentRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentRole: e.target.value }))}
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">Your Skills</h2>
                <p className="text-sm text-muted-foreground">Select all skills you have</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {skillOptions.map((skill) => (
                <div
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 text-center text-sm font-medium ${
                    formData.skills.includes(skill)
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-secondary/50 border-border hover:border-primary/50'
                  }`}
                >
                  {skill}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Selected: {formData.skills.length} skills
            </p>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">Your Interests</h2>
                <p className="text-sm text-muted-foreground">Select industries that interest you</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interestOptions.map((interest) => (
                <div
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 text-center text-sm font-medium ${
                    formData.interests.includes(interest)
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-secondary/50 border-border hover:border-primary/50'
                  }`}
                >
                  {interest}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Selected: {formData.interests.length} interests
            </p>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">Goals & Preferences</h2>
                <p className="text-sm text-muted-foreground">Tell us about your career aspirations</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Career Goals *</Label>
                <Textarea 
                  placeholder="What do you want to achieve in your career? Where do you see yourself in 5 years?"
                  value={formData.goals}
                  onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                  className="min-h-24 resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label>Current Challenges</Label>
                <Textarea 
                  placeholder="What obstacles are you facing in your career journey?"
                  value={formData.challenges}
                  onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
                  className="min-h-20 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Work Style Preference</Label>
                  <Select value={formData.preferredWorkStyle} onValueChange={(v) => setFormData(prev => ({ ...prev, preferredWorkStyle: v }))}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="office">In-Office</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Salary Expectation</Label>
                  <Select value={formData.salaryExpectation} onValueChange={(v) => setFormData(prev => ({ ...prev, salaryExpectation: v }))}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-5L">₹3L - ₹5L</SelectItem>
                      <SelectItem value="5-8L">₹5L - ₹8L</SelectItem>
                      <SelectItem value="8-12L">₹8L - ₹12L</SelectItem>
                      <SelectItem value="12-20L">₹12L - ₹20L</SelectItem>
                      <SelectItem value="20L+">₹20L+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-background">
        <header className="glass-nav border-b border-border p-4 sticky top-0 z-50">
          <div className="container flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold">AI Career Analysis</span>
            </div>
          </div>
        </header>

        <div className="container max-w-4xl py-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Sparkles className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold">Your Personalized Career Plan</h1>
                <p className="text-muted-foreground">Based on your assessment, {formData.name}</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {result}
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={() => { setResult(null); setStep(1); }} className="flex-1">
                Start New Assessment
              </Button>
              <Button variant="hero" onClick={() => navigate('/advisor')} className="flex-1">
                <Sparkles className="w-4 h-4" />
                Chat with AI Advisor
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-nav border-b border-border p-4 sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold">Career Assessment</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Step {step} of {totalSteps}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1 bg-secondary">
        <motion.div 
          className="h-full bg-gradient-primary"
          initial={{ width: 0 }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Form content */}
      <div className="container max-w-2xl py-8 px-4">
        <div className="glass-card rounded-3xl p-8">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-border">
            {step > 1 && (
              <Button 
                variant="outline" 
                onClick={() => setStep(s => s - 1)}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            )}
            
            {step < totalSteps ? (
              <Button 
                variant="hero" 
                onClick={() => setStep(s => s + 1)}
                className="flex-1"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                variant="hero" 
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Get AI Recommendations
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
