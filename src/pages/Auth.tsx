import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Compass, Mail, Lock, ArrowLeft, Loader2, Sparkles, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate('/advisor');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/advisor');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/advisor` }
        });
        if (error) {
          if (error.message.includes('already registered')) {
            toast({ title: 'Account exists', description: 'This email is already registered. Please sign in instead.', variant: 'destructive' });
            setIsSignUp(false);
          } else {
            throw error;
          }
        } else {
          toast({ title: 'Welcome aboard!', description: 'Your account has been created successfully.' });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: 'Welcome back!', description: 'You have signed in successfully.' });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'AI-powered career guidance',
    'Personalized roadmaps',
    '24/7 advisor access',
    'Industry insights'
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </button>

          <div className="glass-card rounded-3xl p-8 shadow-elevated">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Compass className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display text-xl font-bold block">CareerPath</span>
                <span className="text-xs text-muted-foreground">AI Career Guidance</span>
              </div>
            </div>

            <h1 className="font-display text-3xl font-bold mb-2">
              {isSignUp ? 'Start Your Journey' : 'Welcome Back'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {isSignUp ? 'Create your account and unlock AI-powered career guidance' : 'Sign in to continue your career journey'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary rounded-xl" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary rounded-xl" 
                    required 
                    minLength={6} 
                  />
                </div>
                {isSignUp && (
                  <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
                )}
              </div>

              <Button type="submit" variant="hero" size="xl" className="w-full rounded-xl" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)} 
                  className="text-primary hover:underline font-semibold"
                >
                  {isSignUp ? 'Sign in' : 'Sign up for free'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Feature showcase */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 max-w-md"
        >
          <h2 className="font-display text-4xl font-bold mb-6">
            Transform Your <span className="text-gradient-primary">Career</span> Today
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join 50,000+ professionals who have discovered their ideal career path with AI-powered guidance.
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
