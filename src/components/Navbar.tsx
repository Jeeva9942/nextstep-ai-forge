import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Compass, Sparkles, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'AI Advisor', href: '/advisor' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-intense transition-shadow duration-300">
                <Compass className="w-6 h-6 text-primary-foreground transition-transform duration-500 group-hover:rotate-[360deg]" />
              </div>
            </motion.div>
            <div>
              <span className="font-display text-xl font-bold text-foreground block leading-tight">
                Career<span className="text-gradient-primary">Path</span>
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">AI Guidance</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium relative group py-2"
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    e.preventDefault();
                    navigate(link.href);
                  }
                }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground max-w-32 truncate">{user.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/auth')} className="font-medium">
                  Sign In
                </Button>
                <Button variant="hero" size="sm" onClick={() => navigate('/auth?mode=signup')} className="shadow-glow">
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground rounded-lg hover:bg-secondary/50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-border/50"
            >
              <div className="py-6 space-y-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="block text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2"
                    onClick={(e) => {
                      setIsOpen(false);
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        setTimeout(() => {
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                      } else {
                        e.preventDefault();
                        navigate(link.href);
                      }
                    }}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {user.email}
                      </div>
                      <Button variant="outline" onClick={() => { setIsOpen(false); handleSignOut(); }}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => { setIsOpen(false); navigate('/auth'); }}>
                        Sign In
                      </Button>
                      <Button variant="hero" onClick={() => { setIsOpen(false); navigate('/auth?mode=signup'); }}>
                        <Sparkles className="w-4 h-4" />
                        Get Started Free
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
