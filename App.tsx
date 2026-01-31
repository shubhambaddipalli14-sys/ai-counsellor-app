import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, User, LogOut, BookOpen, CheckCircle, Lock, ChevronRight, Star, Target, Shield, MapPin, DollarSign, TrendingUp, Send, Plus, Trash2, Sparkles, Menu, X, Zap, Trophy, TrendingUp as Trending, BarChart3, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
// Progress component imported via other components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppStore } from '@/store/AppStore';
import { GamificationBar, AIAvatar, UniversityComparison, SocialFeed, ThemeToggle } from '@/components';
import type { Todo } from '@/types';
import { countries, degreeOptions, fieldOptions, educationLevels, intakeSeasons, intakeYears } from '@/data/universities';
import './App.css';

type View = 'landing' | 'login' | 'signup' | 'onboarding' | 'dashboard';

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const store = useAppStore();

  useEffect(() => {
    if (store.isAuthenticated) {
      if (store.profile.isOnboardingComplete) {
        setCurrentView('dashboard');
      } else {
        setCurrentView('onboarding');
      }
    }
  }, [store.isAuthenticated, store.profile.isOnboardingComplete]);

  // Apply theme
  useEffect(() => {
    if (store.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [store.theme]);

  const handleLogout = () => {
    store.logout();
    setCurrentView('landing');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${store.theme === 'dark' ? 'dark bg-slate-900' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
      {store.isAuthenticated && <GamificationBar />}
      
      {/* Navigation */}
      {store.isAuthenticated && (
        <nav className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl"
                >
                  <GraduationCap className="h-6 w-6 text-white" />
                </motion.div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI Counsellor
                </span>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <ThemeToggle />
                <span className="text-sm text-slate-600 dark:text-slate-400">Welcome, {store.user?.name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="dark:text-slate-300">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>

              <div className="md:hidden flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-slate-600 dark:text-slate-300"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-4 py-3">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Welcome, {store.user?.name}</p>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start dark:text-slate-300">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </nav>
      )}

      <main className={store.theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}>
        {currentView === 'landing' && <LandingPage onGetStarted={() => setCurrentView('signup')} />}
        {currentView === 'login' && <LoginPage onLogin={() => {}} onBack={() => setCurrentView('landing')} />}
        {currentView === 'signup' && <SignupPage onSignup={() => {}} onBack={() => setCurrentView('landing')} />}
        {currentView === 'onboarding' && <OnboardingPage onComplete={() => setCurrentView('dashboard')} />}
        {currentView === 'dashboard' && <DashboardPage />}
      </main>
    </div>
  );
}

// Landing Page with animated elements
function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 dark:from-indigo-900/20 dark:to-purple-900/20" />
        
        {/* Animated background shapes */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="flex justify-center mb-8"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-3xl shadow-2xl shadow-indigo-500/30">
                <GraduationCap className="h-20 w-20 text-white" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Your AI-Powered Path to
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Global Education</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10"
            >
              Confused about studying abroad? Our AI Counsellor guides you step-by-step from profile building 
              to university shortlisting and application preparation.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="text-lg px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl shadow-indigo-500/30"
                onClick={onGetStarted}
              >
                <Zap className="mr-2 h-5 w-5" />
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 dark:border-slate-600 dark:text-slate-300">
                <Trending className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-slate-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">How AI Counsellor Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">A gamified approach to your study abroad journey</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<User className="h-8 w-8" />}
              title="Profile Analysis"
              description="Share your academic background, goals, and budget. Our AI analyzes your profile strengths and gaps."
              step="1"
              delay={0}
            />
            <FeatureCard 
              icon={<Target className="h-8 w-8" />}
              title="Smart Shortlisting"
              description="Get personalized university recommendations categorized as Dream, Target, and Safe options."
              step="2"
              delay={0.1}
            />
            <FeatureCard 
              icon={<CheckCircle className="h-8 w-8" />}
              title="Earn XP & Badges"
              description="Complete tasks, maintain streaks, and unlock achievements as you progress toward your goals."
              step="3"
              delay={0.2}
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50K+', label: 'Students Helped' },
              { value: '500+', label: 'Universities' },
              { value: '95%', label: 'Success Rate' },
              { value: '4.9★', label: 'User Rating' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center text-white"
              >
                <p className="text-4xl md:text-5xl font-bold">{stat.value}</p>
                <p className="text-indigo-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-2xl mx-auto"
          >
            Join thousands of students who have found their perfect university with AI Counsellor.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button 
              size="lg" 
              className="text-lg px-8 bg-gradient-to-r from-indigo-600 to-purple-600"
              onClick={onGetStarted}
            >
              <Trophy className="mr-2 h-5 w-5" />
              Create Free Account
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <GraduationCap className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">AI Counsellor</span>
            </div>
            <p className="text-sm">© 2025 AI Counsellor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, step, delay }: { icon: React.ReactNode; title: string; description: string; step: string; delay: number }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl text-white">
          {icon}
        </div>
        <span className="text-4xl font-bold text-slate-200 dark:text-slate-700">{step}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </motion.div>
  );
}

// Login Page
function LoginPage({ onLogin, onBack }: { onLogin: () => void; onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const store = useAppStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    const success = store.login(email, password);
    if (success) onLogin();
    else setError('Invalid credentials');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl dark:text-white">Welcome Back</CardTitle>
            <CardDescription className="dark:text-slate-400">Sign in to continue your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div>
                <Label htmlFor="email" className="dark:text-slate-300">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="password" className="dark:text-slate-300">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="ghost" onClick={onBack} className="dark:text-slate-400">Back to Home</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

// Signup Page
function SignupPage({ onSignup, onBack }: { onSignup: () => void; onBack: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const store = useAppStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const success = store.signup(name, email, password);
    if (success) onSignup();
    else setError('Signup failed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl dark:text-white">Create Account</CardTitle>
            <CardDescription className="dark:text-slate-400">Start your study abroad journey today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div>
                <Label htmlFor="name" className="dark:text-slate-300">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="dark:text-slate-300">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="password" className="dark:text-slate-300">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="dark:text-slate-300">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600">
                <Zap className="mr-2 h-4 w-4" />
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="ghost" onClick={onBack} className="dark:text-slate-400">Back to Home</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

// Onboarding Page (abbreviated for space - keeping the same structure)
function OnboardingPage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const store = useAppStore();

  const handleComplete = () => {
    store.completeOnboarding();
    onComplete();
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Complete Your Profile</h1>
          <p className="text-slate-600 dark:text-slate-400">Help us understand you better to provide personalized guidance</p>
          <div className="mt-6">
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
              <span>Step {step} of 4</span>
              <span>{Math.round((step / 4) * 100)}% Complete</span>
            </div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
              />
            </div>
          </div>
        </motion.div>

        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardContent className="pt-6">
            {step === 1 && <AcademicBackgroundStep onNext={() => setStep(2)} />}
            {step === 2 && <StudyGoalsStep onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <BudgetStep onNext={() => setStep(4)} onBack={() => setStep(2)} />}
            {step === 4 && <ExamReadinessStep onComplete={handleComplete} onBack={() => setStep(3)} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Onboarding Steps (abbreviated)
function AcademicBackgroundStep({ onNext }: { onNext: () => void }) {
  const store = useAppStore();
  const [data, setData] = useState(store.profile.academicBackground);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateAcademicBackground(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold dark:text-white">Academic Background</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label className="dark:text-slate-300">Highest Education</Label>
          <Select value={data.highestEducation} onValueChange={(v) => setData({ ...data, highestEducation: v })}>
            <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {educationLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="dark:text-slate-300">Field of Study</Label>
          <Select value={data.fieldOfStudy} onValueChange={(v) => setData({ ...data, fieldOfStudy: v })}>
            <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {fieldOptions.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="dark:text-slate-300">GPA</Label>
          <Input 
            placeholder="e.g., 3.5"
            value={data.gpa}
            onChange={(e) => setData({ ...data, gpa: e.target.value })}
            className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          />
        </div>
        <div>
          <Label className="dark:text-slate-300">Institution</Label>
          <Input 
            placeholder="University name"
            value={data.institution}
            onChange={(e) => setData({ ...data, institution: e.target.value })}
            className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600">Continue</Button>
      </div>
    </form>
  );
}

function StudyGoalsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const store = useAppStore();
  const [data, setData] = useState(store.profile.studyGoals);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateStudyGoals(data);
    onNext();
  };

  const toggleCountry = (country: string) => {
    const newCountries = data.targetCountries.includes(country)
      ? data.targetCountries.filter(c => c !== country)
      : [...data.targetCountries, country];
    setData({ ...data, targetCountries: newCountries });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold dark:text-white">Study Goals</h2>
      <div className="space-y-4">
        <div>
          <Label className="dark:text-slate-300">Target Degree</Label>
          <Select value={data.targetDegree} onValueChange={(v) => setData({ ...data, targetDegree: v })}>
            <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {degreeOptions.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="dark:text-slate-300">Target Countries</Label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
            {countries.map(country => (
              <div key={country} className="flex items-center space-x-2">
                <Checkbox 
                  checked={data.targetCountries.includes(country)}
                  onCheckedChange={() => toggleCountry(country)}
                />
                <Label className="text-sm dark:text-slate-300">{country}</Label>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="dark:text-slate-300">Intake Season</Label>
            <Select value={data.intakeSeason} onValueChange={(v) => setData({ ...data, intakeSeason: v })}>
              <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {intakeSeasons.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="dark:text-slate-300">Intake Year</Label>
            <Select value={data.intakeYear} onValueChange={(v) => setData({ ...data, intakeYear: v })}>
              <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {intakeYears.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} className="dark:border-slate-600 dark:text-slate-300">Back</Button>
        <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600">Continue</Button>
      </div>
    </form>
  );
}

function BudgetStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const store = useAppStore();
  const [data, setData] = useState(store.profile.budget);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateBudget(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold dark:text-white">Budget Information</h2>
      <div className="space-y-4">
        <div>
          <Label className="dark:text-slate-300">Total Budget (per year)</Label>
          <div className="flex gap-2">
            <Select value={data.budgetCurrency} onValueChange={(v) => setData({ ...data, budgetCurrency: v })}>
              <SelectTrigger className="w-24 dark:bg-slate-700 dark:border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['USD', 'EUR', 'GBP', 'CAD', 'AUD'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input 
              type="number"
              placeholder="50000"
              value={data.totalBudget || ''}
              onChange={(e) => setData({ ...data, totalBudget: parseInt(e.target.value) || 0 })}
              className="flex-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
          </div>
        </div>
        <div>
          <Label className="dark:text-slate-300">Funding Source</Label>
          <Select value={data.fundingSource} onValueChange={(v) => setData({ ...data, fundingSource: v })}>
            <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {['self', 'family', 'loan', 'scholarship', 'mixed'].map(s => (
                <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            checked={data.needsScholarship}
            onCheckedChange={(v) => setData({ ...data, needsScholarship: v as boolean })}
          />
          <Label className="dark:text-slate-300">I need scholarship assistance</Label>
        </div>
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} className="dark:border-slate-600 dark:text-slate-300">Back</Button>
        <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600">Continue</Button>
      </div>
    </form>
  );
}

function ExamReadinessStep({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
  const store = useAppStore();
  const [data, setData] = useState(store.profile.examReadiness);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateExamReadiness(data);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold dark:text-white">Exam Readiness</h2>
      <div className="space-y-4">
        {[
          { key: 'hasTakenIELTS', score: 'ieltsScore', label: 'IELTS', min: 0, max: 9, step: 0.5 },
          { key: 'hasTakenTOEFL', score: 'toeflScore', label: 'TOEFL', min: 0, max: 120, step: 1 },
          { key: 'hasTakenGRE', score: 'greScore', label: 'GRE', min: 260, max: 340, step: 1 },
          { key: 'hasTakenGMAT', score: 'gmatScore', label: 'GMAT', min: 200, max: 800, step: 1 },
        ].map((exam: { key: string; score: string; label: string; min: number; max: number; step: number }) => (
          <div key={exam.key} className="border dark:border-slate-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="font-medium dark:text-slate-300">{exam.label}</Label>
              <Checkbox 
                checked={data[exam.key as keyof typeof data] as boolean}
                onCheckedChange={(v) => setData({ ...data, [exam.key]: v })}
              />
            </div>
            {data[exam.key as keyof typeof data] && (
              <Input 
                type="number"
                step={exam.step}
                min={exam.min}
                max={exam.max}
                placeholder={`Score (${exam.min}-${exam.max})`}
                value={(data[exam.score as keyof typeof data] as number) || ''}
                onChange={(e) => setData({ ...data, [exam.score]: parseFloat(e.target.value) })}
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} className="dark:border-slate-600 dark:text-slate-300">Back</Button>
        <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600">
          <Trophy className="mr-2 h-4 w-4" />
          Complete (+100 XP)
        </Button>
      </div>
    </form>
  );
}

// Dashboard
function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <StageProgress />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex bg-slate-100 dark:bg-slate-800">
            <TabsTrigger value="overview" className="dark:data-[state=active]:bg-slate-700">Overview</TabsTrigger>
            <TabsTrigger value="counsellor" className="dark:data-[state=active]:bg-slate-700">AI Counsellor</TabsTrigger>
            <TabsTrigger value="universities" className="dark:data-[state=active]:bg-slate-700">Universities</TabsTrigger>
            <TabsTrigger value="application" className="dark:data-[state=active]:bg-slate-700">Application</TabsTrigger>
            <TabsTrigger value="community" className="dark:data-[state=active]:bg-slate-700">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="counsellor" className="mt-6">
            <AICounsellorTab />
          </TabsContent>
          <TabsContent value="universities" className="mt-6">
            <UniversitiesTab />
          </TabsContent>
          <TabsContent value="application" className="mt-6">
            <ApplicationTab />
          </TabsContent>
          <TabsContent value="community" className="mt-6">
            <SocialFeed />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StageProgress() {
  const store = useAppStore();

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Your Journey</h1>
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-100 dark:border-slate-700 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {store.stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  stage.isCompleted 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                  stage.isActive 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' :
                    'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                {stage.isCompleted && <CheckCircle className="h-4 w-4 mr-1" />}
                {stage.isActive && <motion.div className="h-2 w-2 bg-white rounded-full mr-2 animate-pulse" />}
                <span>{stage.name}</span>
              </motion.div>
              {index < store.stages.length - 1 && (
                <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-600 mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OverviewTab() {
  const store = useAppStore();
  const completedTodos = store.todos.filter(t => t.isCompleted).length;
  const progress = store.todos.length > 0 ? (completedTodos / store.todos.length) * 100 : 0;
  const { level, xp, streak, badges } = store;
  const levelProgress = store.getLevelProgress();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Gamification Card */}
      <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-300" />
              <span className="text-lg font-bold">Level {level}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4 text-yellow-300" />
              <span>{xp} XP</span>
            </div>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress.progress}%` }}
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
            />
          </div>
          <p className="text-sm text-white/80">{levelProgress.currentXP} / {levelProgress.requiredXP} XP to next level</p>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="font-bold">{streak} Days</p>
                <p className="text-xs text-white/70">Current Streak</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">{badges.length}</p>
              <p className="text-xs text-white/70">Badges</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Summary */}
      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center dark:text-white">
            <User className="h-5 w-5 mr-2 text-indigo-500" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Education</span>
            <span className="font-medium dark:text-slate-200">{store.profile.academicBackground.highestEducation || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Field</span>
            <span className="font-medium dark:text-slate-200">{store.profile.academicBackground.fieldOfStudy || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">GPA</span>
            <span className="font-medium dark:text-slate-200">{store.profile.academicBackground.gpa || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Target</span>
            <span className="font-medium dark:text-slate-200">{store.profile.studyGoals.targetDegree || 'Not set'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Application Progress */}
      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center dark:text-white">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{Math.round(progress)}%</div>
            <p className="text-slate-500 dark:text-slate-400">Tasks Completed</p>
          </div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
            />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 text-center">
            {completedTodos} of {store.todos.length} tasks done
          </p>
        </CardContent>
      </Card>

      {/* Shortlisted */}
      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center dark:text-white">
            <BookOpen className="h-5 w-5 mr-2 text-purple-500" />
            Shortlisted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{store.shortlistedUniversities.length}</div>
            <p className="text-slate-500 dark:text-slate-400">Universities</p>
          </div>
          <div className="flex justify-center gap-2">
            <Badge className="bg-purple-100 text-purple-700">
              Dream: {store.shortlistedUniversities.filter(u => u.category === 'Dream').length}
            </Badge>
            <Badge className="bg-blue-100 text-blue-700">
              Target: {store.shortlistedUniversities.filter(u => u.category === 'Target').length}
            </Badge>
            <Badge className="bg-green-100 text-green-700">
              Safe: {store.shortlistedUniversities.filter(u => u.category === 'Safe').length}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card className="md:col-span-2 lg:col-span-2 dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center dark:text-white">
            <Award className="h-5 w-5 mr-2 text-yellow-500" />
            Your Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          {badges.length === 0 ? (
            <p className="text-center text-slate-500 dark:text-slate-400 py-4">
              Complete tasks to earn badges! 🎯
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-700"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <p className="font-semibold text-sm dark:text-slate-200">{badge.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{badge.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function AICounsellorTab() {
  const store = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [store.chatMessages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    store.addChatMessage({ role: 'user', content: input });
    setInput('');
    setIsTyping(true);
    setTimeout(async () => {
      const response = await store.generateAIResponse(input);
      store.addChatMessage({ role: 'assistant', content: response });
      setIsTyping(false);
    }, 1000);
  };

  const suggestedPrompts = ['Analyze my profile', 'Recommend universities', 'What are my chances?', 'Help me shortlist'];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 dark:bg-slate-800 dark:border-slate-700">
        <CardHeader className="flex flex-row items-center gap-4">
          <AIAvatar isTyping={isTyping} size="md" />
          <div>
            <CardTitle className="dark:text-white">AI Counsellor</CardTitle>
            <CardDescription className="dark:text-slate-400">Ask anything about your study abroad journey</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4" ref={scrollRef}>
            {store.chatMessages.length === 0 && (
              <div className="text-center py-8">
                <Sparkles className="h-12 w-12 text-indigo-300 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400 mb-4">Start a conversation with your AI Counsellor</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestedPrompts.map(prompt => (
                    <Button key={prompt} variant="outline" size="sm" onClick={() => setInput(prompt)} className="dark:border-slate-600 dark:text-slate-300">
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-4">
              {store.chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                  }`}>
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5 }} className="h-2 w-2 bg-slate-400 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="h-2 w-2 bg-slate-400 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="h-2 w-2 bg-slate-400 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <div className="flex w-full gap-2">
            <Input 
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
            <Button onClick={handleSend} className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Profile Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-green-600 dark:text-green-400 mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Strengths
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Academic profile review complete</li>
              <li>• Clear study goals defined</li>
              <li>• Budget planning done</li>
            </ul>
          </div>
          <Separator className="dark:bg-slate-700" />
          <div>
            <h4 className="font-medium text-amber-600 dark:text-amber-400 mb-2 flex items-center">
              <Target className="h-4 w-4 mr-1" />
              Areas to Improve
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Consider taking English proficiency test</li>
              <li>• Research scholarship options</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function UniversitiesTab() {
  const store = useAppStore();
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const filteredUniversities = store.allUniversities.filter(u => {
    return selectedCountry === 'all' || u.country === selectedCountry;
  });

  const isShortlisted = (id: string) => store.shortlistedUniversities.some(u => u.id === id);

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(i => i !== id));
    } else if (compareList.length < 5) {
      setCompareList([...compareList, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters & Compare */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-40 dark:bg-slate-700 dark:border-slate-600">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>

        {compareList.length >= 2 && (
          <Button onClick={() => setShowComparison(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <BarChart3 className="h-4 w-4 mr-2" />
            Compare ({compareList.length})
          </Button>
        )}
      </div>

      {/* Comparison Dialog */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>University Comparison</DialogTitle>
          </DialogHeader>
          <UniversityComparison 
            universities={store.allUniversities.filter(u => compareList.includes(u.id))}
            onClose={() => setShowComparison(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Shortlisted Summary */}
      {store.shortlistedUniversities.length > 0 && (
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-indigo-200 dark:border-indigo-700">
          <CardHeader>
            <CardTitle className="text-indigo-900 dark:text-indigo-300">Your Shortlist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {store.shortlistedUniversities.map(u => (
                <motion.div
                  key={u.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold dark:text-white">{u.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{u.country}</p>
                    </div>
                    <Badge className={
                      u.category === 'Dream' ? 'bg-purple-100 text-purple-700' :
                      u.category === 'Target' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }>
                      {u.category}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => store.removeFromShortlist(u.id)}>Remove</Button>
                    {!store.lockedUniversity && (
                      <Button size="sm" onClick={() => store.lockUniversity(u.id)}>
                        <Lock className="h-3 w-3 mr-1" />
                        Lock
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* University Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((university, i) => (
          <motion.div
            key={university.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="overflow-hidden dark:bg-slate-800 dark:border-slate-700 group hover:shadow-xl transition-shadow">
              <div className="h-40 bg-slate-200 relative overflow-hidden">
                <img 
                  src={university.imageUrl} 
                  alt={university.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-white/90 text-slate-900">Rank #{university.ranking}</Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Checkbox 
                    checked={compareList.includes(university.id)}
                    onCheckedChange={() => toggleCompare(university.id)}
                    className="bg-white/90"
                  />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">{university.name}</CardTitle>
                <CardDescription className="flex items-center dark:text-slate-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  {university.city}, {university.country}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{university.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {university.acceptanceRate}% acceptance
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ${(university.tuitionFee / 1000).toFixed(0)}k/year
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {university.programs.slice(0, 3).map(p => (
                    <Badge key={p} variant="secondary" className="text-xs dark:bg-slate-700">{p}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                {!isShortlisted(university.id) ? (
                  <>
                    <Button size="sm" variant="outline" className="flex-1 dark:border-slate-600" onClick={() => store.shortlistUniversity(university.id, 'Dream')}>
                      <Star className="h-4 w-4 mr-1" /> Dream
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 dark:border-slate-600" onClick={() => store.shortlistUniversity(university.id, 'Target')}>
                      <Target className="h-4 w-4 mr-1" /> Target
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 dark:border-slate-600" onClick={() => store.shortlistUniversity(university.id, 'Safe')}>
                      <Shield className="h-4 w-4 mr-1" /> Safe
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="secondary" className="w-full" disabled>
                    <CheckCircle className="h-4 w-4 mr-1" /> Shortlisted
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ApplicationTab() {
  const store = useAppStore();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoCategory, setNewTodoCategory] = useState<Todo['category']>('other');

  if (!store.lockedUniversity) {
    return (
      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardContent className="py-12 text-center">
          <Lock className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mb-2">Lock a University First</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            You need to lock a university before accessing application guidance.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Go to the Universities tab and lock your target university to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleAddTodo = () => {
    if (!newTodoTitle.trim()) return;
    store.addTodo({
      title: newTodoTitle,
      description: '',
      category: newTodoCategory,
      isCompleted: false,
      priority: 'medium',
      xpReward: 25,
    });
    setNewTodoTitle('');
  };

  const categoryColors: Record<Todo['category'], string> = {
    document: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    exam: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    application: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    financial: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    visa: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    other: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  };

  const categoryLabels: Record<Todo['category'], string> = {
    document: 'Document', exam: 'Exam', application: 'Application',
    financial: 'Financial', visa: 'Visa', other: 'Other',
  };

  return (
    <div className="space-y-6">
      <Card className="border-indigo-200 dark:border-indigo-700 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30">
        <CardHeader>
          <CardTitle className="flex items-center text-indigo-900 dark:text-indigo-300">
            <Lock className="h-5 w-5 mr-2" />
            Application for {store.lockedUniversity.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-600 dark:text-slate-400">Country:</span>
              <span className="ml-2 font-medium dark:text-slate-200">{store.lockedUniversity.country}</span>
            </div>
            <div>
              <span className="text-slate-600 dark:text-slate-400">Tuition:</span>
              <span className="ml-2 font-medium dark:text-slate-200">${store.lockedUniversity.tuitionFee.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-600 dark:text-slate-400">Acceptance:</span>
              <span className="ml-2 font-medium dark:text-slate-200">{store.lockedUniversity.acceptanceRate}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center dark:text-white">
            <Plus className="h-5 w-5 mr-2" />
            Add Task
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input 
              placeholder="Enter task title..."
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
              className="flex-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            />
            <Select value={newTodoCategory} onValueChange={(v) => setNewTodoCategory(v as Todo['category'])}>
              <SelectTrigger className="w-32 dark:bg-slate-700 dark:border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddTodo} className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Application Checklist</CardTitle>
          <CardDescription className="dark:text-slate-400">
            {store.todos.filter(t => t.isCompleted).length} of {store.todos.length} tasks completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {store.todos.length === 0 && (
              <p className="text-center text-slate-500 dark:text-slate-400 py-8">No tasks yet. Add your first task above!</p>
            )}
            {store.todos.map(todo => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center justify-between p-3 rounded-xl border dark:border-slate-600 ${
                  todo.isCompleted ? 'bg-slate-50 dark:bg-slate-700/50' : 'bg-white dark:bg-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={todo.isCompleted}
                    onCheckedChange={() => store.toggleTodo(todo.id)}
                  />
                  <div>
                    <p className={`font-medium ${todo.isCompleted ? 'line-through text-slate-400' : 'dark:text-slate-200'}`}>
                      {todo.title}
                    </p>
                    {todo.description && <p className="text-sm text-slate-500 dark:text-slate-400">{todo.description}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={categoryColors[todo.category]}>
                    {categoryLabels[todo.category]}
                  </Badge>
                  <span className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center">
                    <Zap className="h-3 w-3 mr-0.5" />
                    {todo.xpReward}
                  </span>
                  <Button size="sm" variant="ghost" onClick={() => store.deleteTodo(todo.id)}>
                    <Trash2 className="h-4 w-4 text-slate-400" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
