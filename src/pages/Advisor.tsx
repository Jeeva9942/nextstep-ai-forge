import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Compass, Send, ArrowLeft, Bot, User, Loader2, Download, FileText, File, Map, Tag, Award, ExternalLink, TrendingUp, Briefcase, Linkedin, Search, Brain, Zap, Target, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Message = { role: 'user' | 'assistant'; content: string };

type FeatureTag = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  prompt: string;
};

const featureTags: FeatureTag[] = [
  {
    id: 'roadmap',
    name: 'Career Roadmap',
    icon: Map,
    color: 'bg-primary/10 text-primary border-primary/30',
    description: 'Get a step-by-step career path with milestones',
    prompt: 'Create a detailed career roadmap for me with specific milestones, timelines, and actionable steps for the next 5 years. Include short-term (6 months), medium-term (2 years), and long-term (5 years) goals.'
  },
  {
    id: 'skills',
    name: 'Skill Tagging',
    icon: Tag,
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    description: 'Analyze and categorize your skills',
    prompt: 'Analyze my skills and categorize them as [Technical], [Soft Skill], [Tool], or [Certification]. Also identify skill gaps I should fill and suggest learning resources for each.'
  },
  {
    id: 'experience',
    name: 'Experience Levels',
    icon: Award,
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    description: 'Assess your experience level',
    prompt: 'Assess my experience level for different skill areas. Tag each as (Beginner), (Intermediate), or (Advanced). Provide recommendations for moving to the next level in each area.'
  },
  {
    id: 'links',
    name: 'Reference Links',
    icon: ExternalLink,
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    description: 'Get learning resources and references',
    prompt: 'Provide comprehensive reference links for my career path including: online courses, certifications, books, YouTube channels, podcasts, and communities. Organize by category and include free and paid options.'
  },
  {
    id: 'risk',
    name: 'Risk Indicator',
    icon: TrendingUp,
    color: 'bg-green-500/10 text-green-400 border-green-500/30',
    description: 'Career path risk analysis',
    prompt: 'Analyze the career paths and courses relevant to me. For each, indicate if it is: FUTURE-FOCUSED (High demand, growing), MODERATE RISK (Stable but competitive), or HIGH RISK/LOW DEMAND (Declining). Include market trends and job outlook data.'
  },
  {
    id: 'internship',
    name: 'Micro-Internship',
    icon: Briefcase,
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    description: 'Virtual project simulations',
    prompt: 'Create a micro-internship simulation for me. Include: 1) A realistic project brief for my target role, 2) Required deliverables, 3) Timeline (1-2 weeks), 4) Skills I will develop, 5) How to present this in my portfolio.'
  }
];

// Unique features for the platform
const uniqueFeatures = [
  {
    id: 'skills-gap',
    name: 'Skills Gap Analyzer',
    icon: Brain,
    color: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    description: 'AI-powered skills gap analysis',
    prompt: 'Perform a comprehensive Skills Gap Analysis for my target career. Compare my current skills vs required skills for my dream role. Provide a prioritized learning plan with time estimates and resources.'
  },
  {
    id: 'mentor',
    name: 'AI Mentor Match',
    icon: Target,
    color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    description: 'Find your ideal mentor profile',
    prompt: 'Based on my career goals, describe the ideal mentor profile I should seek. Include: industry background, experience level, skills they should have, how to find them on LinkedIn, and conversation starters.'
  },
  {
    id: 'salary',
    name: 'Salary Predictor',
    icon: Zap,
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    description: 'Predict your earning potential',
    prompt: 'Based on my skills, experience, and target roles, predict my salary trajectory in Indian Rupees (₹). Include: current market rate, 2-year projection, 5-year projection, factors that can increase my earnings, and negotiation tips.'
  }
];

// Strip markdown symbols from text
function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/`{3}[\s\S]*?`{3}/g, '')
    .replace(/`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^[-*+]\s/gm, '• ')
    .replace(/^\d+\.\s/gm, '')
    .trim();
}

// Limit text to approximately 200 lines
function limitLines(text: string, maxLines: number = 200): string {
  const lines = text.split('\n');
  if (lines.length > maxLines) {
    return lines.slice(0, maxLines).join('\n') + '\n...';
  }
  return text;
}

// Generate PDF content
function generatePDF(content: string, title: string = 'AI Career Advisor Report') {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #333; }
          h1 { color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 10px; }
          .content { white-space: pre-wrap; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div class="content">${content}</div>
        <div class="footer">Generated by CareerPath AI Advisor - ${new Date().toLocaleDateString()}</div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
}

// Generate DOCX content
function generateDOCX(content: string, title: string = 'AI Career Advisor Report') {
  const htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
    <head><meta charset="utf-8"><title>${title}</title></head>
    <body style="font-family: Arial, sans-serif;">
    <h1 style="color: #0066cc;">${title}</h1>
    <div style="white-space: pre-wrap;">${content}</div>
    <p style="margin-top: 40px; color: #666;">Generated by CareerPath AI Advisor - ${new Date().toLocaleDateString()}</p>
    </body>
    </html>
  `;
  const blob = new Blob([htmlContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/\s+/g, '_')}.doc`;
  a.click();
  URL.revokeObjectURL(url);
}

// Mock LinkedIn job data based on AI recommendations
const generateLinkedInJobs = (content: string) => {
  const keywords = ['developer', 'engineer', 'analyst', 'manager', 'designer', 'consultant'];
  const matchedKeyword = keywords.find(k => content.toLowerCase().includes(k)) || 'professional';
  
  return [
    {
      title: `Junior ${matchedKeyword.charAt(0).toUpperCase() + matchedKeyword.slice(1)}`,
      company: 'TCS Digital',
      location: 'Bangalore, India',
      salary: '₹4L - ₹6L',
      postedDays: 2,
      applicants: 45,
      url: 'https://www.linkedin.com/jobs'
    },
    {
      title: `${matchedKeyword.charAt(0).toUpperCase() + matchedKeyword.slice(1)} - FinTech`,
      company: 'Razorpay',
      location: 'Bangalore, India',
      salary: '₹6L - ₹10L',
      postedDays: 1,
      applicants: 120,
      url: 'https://www.linkedin.com/jobs'
    },
    {
      title: `Associate ${matchedKeyword.charAt(0).toUpperCase() + matchedKeyword.slice(1)}`,
      company: 'Infosys',
      location: 'Hyderabad, India',
      salary: '₹3.5L - ₹5L',
      postedDays: 3,
      applicants: 200,
      url: 'https://www.linkedin.com/jobs'
    },
    {
      title: `Senior ${matchedKeyword.charAt(0).toUpperCase() + matchedKeyword.slice(1)}`,
      company: 'Wipro',
      location: 'Chennai, India',
      salary: '₹8L - ₹15L',
      postedDays: 5,
      applicants: 80,
      url: 'https://www.linkedin.com/jobs'
    }
  ];
};

export default function Advisor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I am your AI Career Advisor. I can help you explore career paths, analyze your skills, and provide personalized guidance including:\n\n• Career Roadmaps\n• Skill Tagging (Technical, Soft Skills, Tools)\n• Experience Level Assessment\n• Reference Links & Resources\n• Risk Indicators for Career Paths\n• Micro-Internship Simulations\n• Skills Gap Analysis\n• Salary Predictions\n\nClick on any feature tag above to get started, or ask me anything about your career!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showJobsDialog, setShowJobsDialog] = useState(false);
  const [linkedInJobs, setLinkedInJobs] = useState<ReturnType<typeof generateLinkedInJobs>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (customPrompt?: string) => {
    const messageContent = customPrompt || input;
    if (!messageContent.trim() || isLoading) return;
    
    const userMsg: Message = { role: 'user', content: customPrompt ? `[${activeFeature || 'Query'}] ${messageContent.slice(0, 100)}...` : messageContent };
    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setIsLoading(true);

    try {
      const enhancedPrompt = `${messageContent}

Please provide a comprehensive response that includes:
1. CAREER ROADMAP: A step-by-step path with milestones
2. SKILL TAGS: Categorize skills as [Technical], [Soft Skill], [Tool], or [Certification]
3. EXPERIENCE LEVEL: Tag recommendations as (Beginner), (Intermediate), or (Advanced)
4. REFERENCE LINKS: Include relevant learning resources, articles, or certification links
5. RISK INDICATOR: For each career path or course, indicate if it is:
   - FUTURE-FOCUSED (High demand, growing field)
   - MODERATE RISK (Stable but competitive)
   - HIGH RISK/LOW DEMAND (Declining or oversaturated)

Keep the response clear, actionable, and within 200 lines. Use Indian Rupee (₹) for any salary or cost references.`;

      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/career-advisor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: enhancedPrompt }] }),
      });

      if (!resp.ok) throw new Error('Failed to get response');

      const reader = resp.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

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
                assistantContent += content;
                const cleanedContent = limitLines(cleanMarkdown(assistantContent));
                setMessages(prev => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1] = { role: 'assistant', content: cleanedContent };
                  return newMsgs;
                });
              }
            } catch {}
          }
        }
      }

      // Generate LinkedIn jobs based on response
      setLinkedInJobs(generateLinkedInJobs(assistantContent));
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I am having trouble connecting. Please try again." }]);
    } finally {
      setIsLoading(false);
      setActiveFeature(null);
    }
  };

  const handleFeatureClick = (feature: FeatureTag | typeof uniqueFeatures[0]) => {
    setActiveFeature(feature.name);
    sendMessage(feature.prompt);
  };

  const lastAssistantMessage = messages.filter(m => m.role === 'assistant').pop()?.content || '';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="glass-nav border-b border-border p-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-lg uppercase block">AI CAREER ADVISOR</span>
                <span className="text-xs text-muted-foreground">Powered by AI</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* LinkedIn Jobs Button */}
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowJobsDialog(true)}
              disabled={linkedInJobs.length === 0}
            >
              <Linkedin className="w-4 h-4" />
              Jobs
            </Button>

            {/* Download Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card border-border/50">
                <DropdownMenuItem onClick={() => generatePDF(lastAssistantMessage)} className="cursor-pointer">
                  <FileText className="w-4 h-4 mr-2" />
                  Download as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => generateDOCX(lastAssistantMessage)} className="cursor-pointer">
                  <File className="w-4 h-4 mr-2" />
                  Download as DOCX
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Feature Tags - Clickable */}
      <div className="border-b border-border/50 py-3 px-4 overflow-x-auto">
        <div className="container flex items-center gap-2 text-xs">
          {featureTags.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleFeatureClick(feature)}
              disabled={isLoading}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border whitespace-nowrap transition-all duration-200 hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${feature.color} ${activeFeature === feature.name ? 'ring-2 ring-offset-2 ring-offset-background' : ''}`}
              title={feature.description}
            >
              <feature.icon className="w-3 h-3" />
              {feature.name}
            </button>
          ))}
        </div>
      </div>

      {/* Unique Features - Second Row */}
      <div className="border-b border-border/50 py-3 px-4 overflow-x-auto bg-secondary/20">
        <div className="container flex items-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium mr-2">UNIQUE:</span>
          {uniqueFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleFeatureClick(feature)}
              disabled={isLoading}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border whitespace-nowrap transition-all duration-200 hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${feature.color} ${activeFeature === feature.name ? 'ring-2 ring-offset-2 ring-offset-background' : ''}`}
              title={feature.description}
            >
              <feature.icon className="w-3 h-3" />
              {feature.name}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container max-w-3xl space-y-4">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-gradient-primary text-primary-foreground' : 'glass-card'}`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" />
              </div>
              <div className="glass-card rounded-2xl p-4">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-200" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-400" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 bg-card/50 backdrop-blur-xl">
        <div className="container max-w-3xl">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-3">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask about careers, skills, industry trends..." 
              className="flex-1 h-12 bg-secondary/50 border-border/50 focus:border-primary" 
              disabled={isLoading} 
            />
            <Button type="submit" variant="hero" size="lg" disabled={isLoading || !input.trim()} className="h-12 px-6">
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-3">
            AI can make mistakes. Verify important career decisions with professionals.
          </p>
        </div>
      </div>

      {/* LinkedIn Jobs Dialog */}
      <Dialog open={showJobsDialog} onOpenChange={setShowJobsDialog}>
        <DialogContent className="glass-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Linkedin className="w-5 h-5 text-blue-500" />
              Recommended Jobs Based on AI Analysis
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {linkedInJobs.map((job, index) => (
              <a
                key={index}
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">{job.salary}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.postedDays}d ago</span>
                  <span>•</span>
                  <span>{job.applicants} applicants</span>
                </div>
              </a>
            ))}
            {linkedInJobs.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Ask the AI advisor a question first to get personalized job recommendations.</p>
              </div>
            )}
          </div>
          <Button 
            className="w-full mt-4 gap-2" 
            variant="outline"
            onClick={() => window.open('https://www.linkedin.com/jobs', '_blank')}
          >
            <Search className="w-4 h-4" />
            Browse More on LinkedIn
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
