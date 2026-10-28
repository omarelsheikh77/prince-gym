import { useState, FormEvent } from 'react';
const championPhoto = "/src/assets/images/prince_naseem_new_1783002490146.jpg";
import { 
  Dumbbell, 
  Flame, 
  Trophy, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  Calendar, 
  Check, 
  ChevronRight, 
  Menu, 
  X, 
  Waves, 
  Users, 
  Compass,
  ArrowRight,
  Sparkles,
  ChevronDown,
  MessageSquare,
  Send
} from 'lucide-react';

// Custom bespoke premium Boxing Gloves Icon
const BoxingGlovesLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg 
    viewBox="0 0 64 64" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main glove body */}
    <path 
      d="M16 28C16 16.9543 24.9543 8 36 8C45.9411 8 54 16.0589 54 26V36C54 41.5228 49.5228 46 41 46H31C22.7157 46 16 39.2843 16 31V28Z" 
      fill="currentColor" 
    />
    {/* Thumb */}
    <path 
      d="M16 26C16 22.134 19.134 19 23 19C26.866 19 30 22.134 30 26V35C30 36.6569 28.6569 38 27 38H19C17.3431 38 16 36.6569 16 35V26Z" 
      fill="currentColor"
      fillOpacity="0.8"
      stroke="rgba(0,0,0,0.2)"
      strokeWidth="2"
    />
    {/* Wrist cuff */}
    <path 
      d="M24 46H48V54C48 56.2091 46.2091 58 44 58H28C25.7909 58 24 56.2091 24 54V46Z" 
      fill="currentColor"
      fillOpacity="0.9"
    />
    {/* Wrist band highlight / velcro strap */}
    <path 
      d="M24 50H48" 
      stroke="rgba(255,255,255,0.3)" 
      strokeWidth="3" 
    />
    {/* Highlight sheen for the glossy boxing glove look */}
    <path 
      d="M38 12C45 12 50 17 50 24" 
      stroke="rgba(255,255,255,0.5)" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
    />
  </svg>
);

export default function App() {
  // Navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Interactive Skill Filter for classes
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<'all' | 'beginner' | 'intermediate' | 'pro'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'combat' | 'fitness' | 'aquatics'>('all');

  // Membership Signup form states
  const [planType, setPlanType] = useState<'challenger' | 'champion' | 'royal'>('champion');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    startDate: new Date().toISOString().split('T')[0],
    agreeToTerms: true,
  });
  const [registrationPass, setRegistrationPass] = useState<any | null>(null);
  const [formError, setFormError] = useState('');
  const [dispatchedChannels, setDispatchedChannels] = useState<{
    wa: boolean;
    emailMember: boolean;
    emailAdmin: boolean;
  }>({
    wa: false,
    emailMember: false,
    emailAdmin: false,
  });

  // Gym Classes Data
  const gymClasses = [
    {
      id: 'c1',
      name: 'Championship Boxing',
      category: 'combat',
      level: 'beginner',
      time: 'Mon, Wed, Fri — 07:00 PM',
      duration: '60 mins',
      coach: 'Coach Tariq (Former Heavyweight Pro)',
      description: 'Master boxing fundamentals: proper stance, guard, basic punch combinations, and light bag work.',
      intensity: 'Moderate'
    },
    {
      id: 'c2',
      name: 'Pro Sparring & Ring Control',
      category: 'combat',
      level: 'pro',
      time: 'Tue, Thu — 08:00 PM',
      duration: '90 mins',
      coach: 'Elite Fighting Staff',
      description: 'Full-contact tactical sparring, defensive slip counter maneuvers, and ring positioning secrets.',
      intensity: 'Extreme'
    },
    {
      id: 'c3',
      name: 'MMA Submission Grappling',
      category: 'combat',
      level: 'intermediate',
      time: 'Mon, Wed — 08:30 PM',
      duration: '75 mins',
      coach: 'Coach Marcus (BJJ Blackbelt)',
      description: 'Learn clinch control, explosive takedowns, submissions, and transition escapes for cage competition.',
      intensity: 'High'
    },
    {
      id: 'c4',
      name: 'Heavy Bag Conditioning',
      category: 'fitness',
      level: 'all',
      time: 'Saturdays — 10:00 AM',
      duration: '45 mins',
      coach: 'Coach Tariq',
      description: 'High-octane physical conditioning using boxing combinations to torch body fat and build explosive stamina.',
      intensity: 'High'
    },
    {
      id: 'c5',
      name: 'Olympic Pool Swim Training',
      category: 'aquatics',
      level: 'beginner',
      time: 'Daily — 06:00 AM',
      duration: '60 mins',
      coach: 'Coach Elena (Olympic Trial Coach)',
      description: 'Improve stroke mechanics, streamline posture, and cardiovascular efficiency in our premium 50m pool.',
      intensity: 'Moderate'
    },
    {
      id: 'c6',
      name: 'Elite Free Weights Powerlifting',
      category: 'fitness',
      level: 'intermediate',
      time: 'Tue, Thu — 06:30 PM',
      duration: '60 mins',
      coach: 'Coach Murad (Certified Power Coach)',
      description: 'Perfecting compound lifts (Squat, Bench, Deadlift) with advanced progressive overload methods.',
      intensity: 'High'
    },
    {
      id: 'c7',
      name: 'Advance Tactical Kickboxing',
      category: 'combat',
      level: 'pro',
      time: 'Fridays — 06:00 PM',
      duration: '90 mins',
      coach: 'Coach Marcus',
      description: 'Hard sparring drills, complex leg kicking blocks, and aggressive combination attacks for competitive rings.',
      intensity: 'Extreme'
    },
    {
      id: 'c8',
      name: 'Aqua Power Interval Training',
      category: 'aquatics',
      level: 'all',
      time: 'Wed, Sun — 09:00 AM',
      duration: '45 mins',
      coach: 'Coach Elena',
      description: 'Low-impact, high-resistance water exercises utilizing pool weights to build incredible joint strength and core endurance.',
      intensity: 'Moderate'
    }
  ];

  // Pricing tiers
  const planDetails = {
    challenger: {
      name: 'Challenger Pass',
      monthlyPrice: 199,
      annualPrice: 169,
      features: [
        'Access to the biggest gym floor in Sharjah',
        'State-of-the-art Cardio Arena',
        'Heavy Free Weights Area (Dumbbells up to 80kg)',
        'Olympic Size Temperature-Controlled Swimming Pool',
        'Locker Rooms & Premium Cedar Saunas'
      ],
      tagline: 'Perfect for pure fitness & strength builders'
    },
    champion: {
      name: 'Champion Premium',
      monthlyPrice: 299,
      annualPrice: 249,
      features: [
        'Everything in Challenger Pass',
        'Unlimited Combat Classes (Boxing, MMA, Grappling)',
        'Access to Professional Boxing Rings & Cage Arena',
        'Daily Clean Towel & Personal Digital Locker',
        'Weekly Assessment & Body Composition Testing'
      ],
      tagline: 'Best for combat enthusiasts & serious athletes',
      popular: true
    },
    royal: {
      name: 'Elite Royal',
      monthlyPrice: 499,
      annualPrice: 399,
      features: [
        'Everything in Champion Premium',
        '1-on-1 Personalized Coaching (4 Sessions/month)',
        'Custom Nutrition Plans & Macro Calculators',
        'VIP Shower Suites & Unlimited Sauna access',
        'Free Guest Pass on every visit'
      ],
      tagline: 'Ultimate private champion coaching experience'
    }
  };

  // Filtered classes handler
  const filteredClasses = gymClasses.filter(c => {
    const categoryMatch = selectedCategory === 'all' || c.category === selectedCategory;
    const levelMatch = selectedSkillLevel === 'all' || c.level === selectedSkillLevel || c.level === 'all';
    return categoryMatch && levelMatch;
  });

  // Calculate prices based on selected plan and cycle
  const currentPlan = planDetails[planType];
  const activePrice = billingCycle === 'annual' ? currentPlan.annualPrice : currentPlan.monthlyPrice;
  const savingAmount = billingCycle === 'annual' ? (currentPlan.monthlyPrice - currentPlan.annualPrice) * 12 : 0;

  // Registration handler
  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError('Please fill out all personal details fields.');
      return;
    }
    setFormError('');
    
    // Simulate generation of premium membership card
    const passId = `PG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setRegistrationPass({
      memberId: passId,
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      planName: currentPlan.name,
      billingCycle: billingCycle,
      pricePaid: activePrice,
      startDate: formData.startDate,
      expiryDate: new Date(new Date(formData.startDate).setMonth(new Date(formData.startDate).getMonth() + (billingCycle === 'annual' ? 12 : 1))).toISOString().split('T')[0]
    });
  };

  // Reset registration
  const resetRegistration = () => {
    setRegistrationPass(null);
    setDispatchedChannels({ wa: false, emailMember: false, emailAdmin: false });
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      startDate: new Date().toISOString().split('T')[0],
      agreeToTerms: true,
    });
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#070707] text-white font-sans antialiased selection:bg-orange-600 selection:text-white">
      
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-600/10 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-[1200px] right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[800px] left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Modern High-Contrast Header / Navbar */}
      <nav id="header-nav" className="sticky top-0 z-50 bg-[#0B0B0B]/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-600/30">
                <BoxingGlovesLogo className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter uppercase italic leading-none text-white">
                  PRINCE <span className="text-orange-500">GYM</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Sharjah's Largest</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-wider">
              <a href="#hero" className="text-orange-500 hover:text-orange-400 transition-colors">Home</a>
              <a href="#amenities" className="text-gray-300 hover:text-orange-500 transition-colors">Amenities</a>
              <a href="#classes" className="text-gray-300 hover:text-orange-500 transition-colors">Classes</a>
              <a href="#coaching" className="text-gray-300 hover:text-orange-500 transition-colors">Elite Coaching</a>
              <a href="#pricing" className="text-gray-300 hover:text-orange-500 transition-colors">Pricing</a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a 
                href="#register" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-sm font-black text-xs uppercase tracking-wider italic transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-orange-600/20"
              >
                Join Online Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                id="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation panel */}
        {isMobileMenuOpen && (
          <div id="mobile-nav" className="md:hidden bg-[#0F0F0F] border-b border-white/10 px-4 pt-2 pb-6 space-y-3 shadow-2xl">
            <a 
              href="#hero" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-bold text-orange-500 hover:bg-white/5"
            >
              Home
            </a>
            <a 
              href="#amenities" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-bold text-gray-300 hover:text-orange-500 hover:bg-white/5"
            >
              Amenities
            </a>
            <a 
              href="#classes" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-bold text-gray-300 hover:text-orange-500 hover:bg-white/5"
            >
              Classes
            </a>
            <a 
              href="#coaching" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-bold text-gray-300 hover:text-orange-500 hover:bg-white/5"
            >
              Elite Coaching
            </a>
            <a 
              href="#pricing" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-bold text-gray-300 hover:text-orange-500 hover:bg-white/5"
            >
              Pricing
            </a>
            <div className="pt-4">
              <a
                href="#register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-sm font-black uppercase italic tracking-wider"
              >
                Join Online Now
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[calc(100vh-80px)] flex items-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text details */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-600/10 border border-orange-500/20 text-orange-500 text-xs font-black uppercase tracking-widest rounded-full self-start">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              The Biggest Gym in Sharjah
            </div>
            
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black italic uppercase leading-[0.9] tracking-tighter text-white">
              TRAIN LIKE <br />
              <span className="text-orange-500 underline decoration-8 underline-offset-4 decoration-orange-600/50">
                A KING.
              </span>
            </h1>
            
            <p className="text-gray-400 text-base sm:text-xl max-w-2xl leading-relaxed">
              Unlock ultimate athletic performance at Sharjah's premier combat and fitness facility. Spanning state-of-the-art weights, professional combat cages, customized coaching, and a glorious Olympic swimming pool. 
            </p>

            {/* Core Badges on Hero */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-[#121212] border border-white/5 p-4 rounded-lg flex flex-col justify-center items-center text-center">
                <span className="text-3xl font-extrabold text-orange-500 italic">50K+</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Sq. Ft Facility</span>
              </div>
              <div className="bg-[#121212] border border-white/5 p-4 rounded-lg flex flex-col justify-center items-center text-center">
                <span className="text-3xl font-extrabold text-white italic">50M</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Olympic Pool</span>
              </div>
              <div className="bg-[#121212] border border-white/5 p-4 rounded-lg flex flex-col justify-center items-center text-center">
                <span className="text-3xl font-extrabold text-orange-500 italic">100%</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Pro Coaching</span>
              </div>
              <div className="bg-[#121212] border border-white/5 p-4 rounded-lg flex flex-col justify-center items-center text-center">
                <span className="text-3xl font-extrabold text-white italic">ALL</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Skill Levels</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#register" 
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase italic rounded-sm text-center tracking-wider transition-all hover:shadow-lg hover:shadow-orange-600/20 flex items-center justify-center gap-2"
              >
                Join Now Online
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#amenities" 
                className="px-8 py-4 bg-[#141414] hover:bg-[#1C1C1C] text-gray-300 font-black uppercase italic rounded-sm text-center tracking-wider border border-white/10 transition-all flex items-center justify-center"
              >
                Explore Amenities
              </a>
            </div>
          </div>

          {/* Hero Visual Block with Naseem Hamed photo and visual cues */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-[#111111]">
              
              {/* Backlit glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-orange-600/10 z-10 transition-opacity group-hover:opacity-85 pointer-events-none" />
              
              {/* Actual Image loaded from local folder */}
              <img 
                src={championPhoto} 
                alt="Championship Boxing Legacy Portrait" 
                className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                id="hero-champion-photo"
              />

              {/* Graphic Overlay Details */}
              <div className="absolute top-6 left-6 z-20">
                <div className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">
                  LEGACY & INSPIRATION
                </div>
              </div>

              {/* Glove Overlay Graphic in corner */}
              <div className="absolute top-6 right-6 z-20 bg-black/60 backdrop-blur-sm p-2 rounded-full border border-white/10">
                <BoxingGlovesLogo className="w-6 h-6 text-orange-500" />
              </div>

              {/* Bottom Card details */}
              <div className="absolute bottom-0 inset-x-0 p-6 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                <p className="text-orange-500 font-black italic tracking-widest text-[11px] uppercase mb-1">
                  OUR MOTIVATION
                </p>
                <h3 className="text-2xl font-black italic uppercase text-white tracking-tight">
                  "TRAIN WITH ROYAL DETERMINATION"
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  Inspired by the world's most spectacular, fearless champions. Prince Gym matches royal athletic performance.
                </p>
              </div>

            </div>

            {/* Corner floating badge */}
            <div className="absolute -bottom-4 -right-2 bg-orange-600 text-white px-5 py-3 rounded-md shadow-xl border border-orange-500 z-20 flex items-center gap-3 transform rotate-3 hover:rotate-0 transition-transform hidden sm:flex">
              <Trophy className="w-6 h-6 text-white" />
              <div className="flex flex-col leading-none">
                <span className="text-xs uppercase font-bold tracking-widest text-orange-100">Facility Size</span>
                <span className="text-lg font-black uppercase italic">SHARJAH'S #1</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Quick stats ribbon */}
      <div className="bg-white text-black py-5 overflow-hidden border-y border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around items-center gap-y-4 gap-x-8 text-center font-black uppercase italic tracking-tighter text-sm sm:text-base md:text-lg">
          <div className="flex items-center gap-2 group hover:text-orange-600 transition-colors">
            <span className="w-2.5 h-2.5 bg-orange-600 rounded-full animate-ping" />
            <span>BOXING RINGS & FIGHT CAGES</span>
          </div>
          <div className="flex items-center gap-2 group hover:text-orange-600 transition-colors">
            <span className="w-2.5 h-2.5 bg-black rounded-full" />
            <span>OLYMPIC SIZE SWIMMING POOL</span>
          </div>
          <div className="flex items-center gap-2 group hover:text-orange-600 transition-colors">
            <span className="w-2.5 h-2.5 bg-orange-600 rounded-full" />
            <span>MASSIVE FREE WEIGHT ARSENAL</span>
          </div>
          <div className="flex items-center gap-2 group hover:text-orange-600 transition-colors">
            <span className="w-2.5 h-2.5 bg-black rounded-full" />
            <span>PREMIUM CEDAR WOOD SAUNA</span>
          </div>
        </div>
      </div>

      {/* Amenities Bento Grid Section */}
      <section id="amenities" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-orange-500 text-sm font-black uppercase tracking-widest">WORLD-CLASS INFRASTRUCTURE</span>
            <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter">
              WHAT'S INSIDE <span className="text-orange-500">PRINCE GYM</span>
            </h2>
            <p className="text-gray-400">
              Spanning over 50,000 square feet of high-octane engineering. We provide elite athlete training zones with premium amenities under one spectacular roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Amenity 1: Combat Arena */}
            <div className="bg-[#0D0D0D] border border-white/5 p-8 rounded-xl flex flex-col justify-between group hover:border-orange-600/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-lg bg-orange-600/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <BoxingGlovesLogo className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">FIGHTING ARENAS & RINGS</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Featuring official size professional boxing rings, heavy bag tracks (water bags & tear-drop bags), a premium grappling cage, and custom shock-absorbing mats for safe MMA conditioning and training.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-gray-500 group-hover:text-orange-500 transition-colors">
                <span>ALL SKILL LEVELS (BEGINNER TO PRO)</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Amenity 2: Free Weights */}
            <div className="bg-[#0D0D0D] border border-white/5 p-8 rounded-xl flex flex-col justify-between group hover:border-orange-600/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-lg bg-orange-600/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <Dumbbell className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">ELITE FREE WEIGHT ZONE</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    A heavy-lifter's paradise. Equipped with rubber-grip dumbbells reaching up to 80 kg, pristine custom Olympic weightlifting platforms, compound power racks, and high-quality stainless steel bars.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-gray-500 group-hover:text-orange-500 transition-colors">
                <span>OVER 20 TONS OF STEEL PLATES</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Amenity 3: Cardio Equipment */}
            <div className="bg-[#0D0D0D] border border-white/5 p-8 rounded-xl flex flex-col justify-between group hover:border-orange-600/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-lg bg-orange-600/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <Flame className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">PREMIUM CARDIO CENTER</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Dozens of elite high-end treadmills, curved self-powered runners, assault bikes, air rowers, and dynamic climbmills. Fully loaded with customized performance screens and heart-monitoring setups.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-gray-500 group-hover:text-orange-500 transition-colors">
                <span>HIIT & LISS TRACKING SCREENS</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Amenity 4: Swimming Pool */}
            <div className="bg-[#0D0D0D] border border-white/5 p-8 rounded-xl flex flex-col justify-between group hover:border-orange-600/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-lg bg-orange-600/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <Waves className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">OLYMPIC SIZE SWIMMING POOL</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    A sparkling, temperature-controlled 50-meter Olympic swimming pool. Perfectly aligned swim lanes for stamina training, cardiovascular recovery, or structured aquatic sports programs.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-gray-500 group-hover:text-orange-500 transition-colors">
                <span>50M OLYMPIC SPECIFICATIONS</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Amenity 5: Locker & Saunas */}
            <div className="bg-[#0D0D0D] border border-white/5 p-8 rounded-xl flex flex-col justify-between group hover:border-orange-600/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-lg bg-orange-600/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">LUXURY LOCKERS & SAUNAS</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Enjoy high-end digital lock security systems, massive elegant changing benches, hot rain showers, and dry cedar-wood sauna rooms to recover and flush toxins post-training.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-gray-500 group-hover:text-orange-500 transition-colors">
                <span>INCLUDED IN ALL ACCESS TIERS</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Amenity 6: Pro Coaching */}
            <div className="bg-[#0D0D0D] border border-white/5 p-8 rounded-xl flex flex-col justify-between group hover:border-orange-600/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-lg bg-orange-600/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <Users className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black italic uppercase tracking-tight">PERSONALIZED COACHING</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Our verified pro combat athletes, strength gurus, and sports dietitians provide custom workout regimes and calculated meal plans targeted to lock in your weight goals.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-gray-500 group-hover:text-orange-500 transition-colors">
                <span>ONE-ON-ONE CHAMPION TRACKING</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Class Scheduler & Skill Levels Section */}
      <section id="classes" className="py-24 bg-[#0A0A0A] border-y border-white/5 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="text-orange-500 text-sm font-black uppercase tracking-widest">CLASSES FOR EVERYONE</span>
              <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter">
                FIGHTING & FITNESS SCHEDULE
              </h2>
              <p className="text-gray-400">
                Choose from champion-led classes optimized for all skill levels. From complete beginner fundamentals to competitive professional training rings.
              </p>
            </div>

            {/* Class Skill Level Filters */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Filter by Skill Level</span>
              <div className="inline-flex flex-wrap bg-[#141414] border border-white/5 p-1 rounded-sm">
                <button
                  onClick={() => setSelectedSkillLevel('all')}
                  className={`px-4 py-2 text-xs font-bold uppercase italic tracking-wider transition-all rounded-sm ${
                    selectedSkillLevel === 'all' 
                      ? 'bg-orange-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  All Levels
                </button>
                <button
                  onClick={() => setSelectedSkillLevel('beginner')}
                  className={`px-4 py-2 text-xs font-bold uppercase italic tracking-wider transition-all rounded-sm ${
                    selectedSkillLevel === 'beginner' 
                      ? 'bg-orange-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Beginner Friendly
                </button>
                <button
                  onClick={() => setSelectedSkillLevel('intermediate')}
                  className={`px-4 py-2 text-xs font-bold uppercase italic tracking-wider transition-all rounded-sm ${
                    selectedSkillLevel === 'intermediate' 
                      ? 'bg-orange-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Intermediate
                </button>
                <button
                  onClick={() => setSelectedSkillLevel('pro')}
                  className={`px-4 py-2 text-xs font-bold uppercase italic tracking-wider transition-all rounded-sm ${
                    selectedSkillLevel === 'pro' 
                      ? 'bg-orange-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Pro / Fighter
                </button>
              </div>
            </div>
          </div>

          {/* Quick Category Filters */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border ${
                selectedCategory === 'all'
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              All Programs
            </button>
            <button
              onClick={() => setSelectedCategory('combat')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border ${
                selectedCategory === 'combat'
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              Combat & Boxing
            </button>
            <button
              onClick={() => setSelectedCategory('fitness')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border ${
                selectedCategory === 'fitness'
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              Strength & Cardio
            </button>
            <button
              onClick={() => setSelectedCategory('aquatics')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border ${
                selectedCategory === 'aquatics'
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              Olympic Swimming Pool
            </button>
          </div>

          {/* Displayed Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((c) => (
                <div 
                  key={c.id} 
                  className="bg-[#121212] border border-white/5 rounded-lg p-6 flex flex-col justify-between hover:border-orange-500/30 transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Skill level micro-badge */}
                  <div className="absolute top-0 right-0">
                    <span className={`text-[9px] uppercase font-black px-3 py-1 block rounded-bl ${
                      c.level === 'beginner' ? 'bg-green-600 text-white' :
                      c.level === 'intermediate' ? 'bg-blue-600 text-white' :
                      c.level === 'pro' ? 'bg-orange-600 text-white' : 'bg-gray-700 text-white'
                    }`}>
                      {c.level}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="text-xs uppercase font-extrabold text-orange-500 tracking-wider">
                      {c.category}
                    </div>
                    <h4 className="text-xl font-black uppercase italic text-white group-hover:text-orange-400 transition-colors">
                      {c.name}
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                      {c.description}
                    </p>
                  </div>

                  <div className="space-y-3 mt-6 pt-6 border-t border-white/5 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                      <span>{c.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                      <span className="font-bold text-gray-300">{c.coach}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1A1A1A] text-[10px] font-bold rounded text-white">
                      Intensity: <span className="text-orange-500">{c.intensity}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-[#121212] rounded-lg border border-white/5">
                <p className="text-gray-400">No classes matching current filter selection.</p>
                <button 
                  onClick={() => { setSelectedCategory('all'); setSelectedSkillLevel('all'); }} 
                  className="mt-4 px-4 py-2 bg-orange-600 text-white text-xs font-bold uppercase italic rounded"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Custom Section focusing on Personalized Coaching Services */}
      <section id="coaching" className="py-24 bg-black relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <span className="text-orange-500 text-sm font-black uppercase tracking-widest">1-ON-1 ATHLETE DEVELOPMENT</span>
              <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter leading-none">
                PERSONALIZED <br />COACHING SERVICES
              </h2>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                Unlock your body's champion potential. Prince Gym offers elite custom training programs backed by certified professional fighters and athletic trainers. Every coaching package is custom-sculpted for your fitness level.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-500 flex-shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black uppercase italic text-white text-lg">Custom Weight Training & Body Composition</h4>
                    <p className="text-gray-400 text-sm">Perfect technique, progressive loading curves, and custom weight goals tracking.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-500 flex-shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black uppercase italic text-white text-lg">Combat Sports Technique & Sparring</h4>
                    <p className="text-gray-400 text-sm">Elite pad work, defense blocking drills, and live bag coaching for fighters.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-500 flex-shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black uppercase italic text-white text-lg">Tailored Meal Plans & Macros Calculation</h4>
                    <p className="text-gray-400 text-sm">Delicious calorie-controlled sports nutrition plans mapped out for your weight metrics.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href="#register" 
                  className="inline-block px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase italic rounded-sm tracking-wider transition-all transform hover:-translate-y-0.5"
                >
                  Request A Consultation Call
                </a>
              </div>
            </div>

            {/* Visual Bento Feature block */}
            <div className="bg-[#0B0B0B] border border-white/5 rounded-2xl p-8 space-y-8 relative">
              <div className="absolute top-0 right-0 bg-orange-600 text-white font-black text-xs uppercase px-4 py-1.5 rounded-bl">
                ELITE COACH STAFF
              </div>
              
              <h3 className="text-2xl font-black italic uppercase text-white border-b border-white/5 pb-4">
                SHARJAH'S BEST MENTORS
              </h3>

              <div className="space-y-6">
                
                {/* Coach Tariq */}
                <div className="flex items-center gap-4 bg-[#121212] p-4 rounded-lg border border-white/5">
                  <div className="w-16 h-16 rounded-full bg-orange-600/10 flex items-center justify-center border border-orange-600/20 text-orange-500 flex-shrink-0 font-black italic text-xl">
                    CT
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-black uppercase italic text-white">Coach Tariq</h4>
                      <span className="text-[10px] bg-orange-600 text-white font-bold uppercase px-2 py-0.5 rounded">BOXING</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Former Heavyweight Contender & Professional Boxing Coach with 15+ years experience.</p>
                  </div>
                </div>

                {/* Coach Marcus */}
                <div className="flex items-center gap-4 bg-[#121212] p-4 rounded-lg border border-white/5">
                  <div className="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center border border-blue-600/20 text-blue-500 flex-shrink-0 font-black italic text-xl">
                    CM
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-black uppercase italic text-white">Coach Marcus</h4>
                      <span className="text-[10px] bg-blue-600 text-white font-bold uppercase px-2 py-0.5 rounded">MMA & BJJ</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">First-Degree Brazilian Jiu-Jitsu Black Belt. Grappling expert and active MMA competitor trainer.</p>
                  </div>
                </div>

                {/* Coach Elena */}
                <div className="flex items-center gap-4 bg-[#121212] p-4 rounded-lg border border-white/5">
                  <div className="w-16 h-16 rounded-full bg-teal-600/10 flex items-center justify-center border border-teal-600/20 text-teal-500 flex-shrink-0 font-black italic text-xl">
                    CE
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-black uppercase italic text-white">Coach Elena</h4>
                      <span className="text-[10px] bg-teal-600 text-white font-bold uppercase px-2 py-0.5 rounded">AQUATICS</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Olympic Swim trial coach. Masters degree in athletic swim science & dynamic conditioning.</p>
                  </div>
                </div>

              </div>

              <div className="p-4 bg-orange-600/5 rounded-lg border border-orange-500/10 text-center">
                <span className="text-orange-500 text-xs font-black uppercase tracking-widest block mb-1">PRO-STATUS GUARANTEE</span>
                <p className="text-gray-400 text-xs">All our coaches have active professional athletic licensing and high first-aid certification.</p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#0A0A0A] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-orange-500 text-sm font-black uppercase tracking-widest">FLEXIBLE MEMBERSHIP OFFERS</span>
            <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter">
              CHOOSE YOUR PASSPORT
            </h2>
            <p className="text-gray-400">
              Get full instant access to Sharjah's biggest training facility. No sign-up hidden admin fees. Register online today and secure a custom champion pass.
            </p>

            {/* Billing Cycle Switcher */}
            <div className="inline-flex items-center gap-4 bg-[#141414] border border-white/5 p-1 rounded-sm mt-4">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 text-xs font-bold uppercase italic tracking-wider transition-all rounded-sm ${
                  billingCycle === 'monthly' 
                    ? 'bg-orange-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly Pass
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 text-xs font-bold uppercase italic tracking-wider transition-all rounded-sm flex items-center gap-2 ${
                  billingCycle === 'annual' 
                    ? 'bg-orange-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Annual Pass
                <span className="bg-white text-black text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-normal">
                  SAVE 15%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Plan 1: Challenger */}
            <div className={`bg-[#0D0D0D] border rounded-xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
              planType === 'challenger' ? 'border-orange-500 ring-2 ring-orange-500/10' : 'border-white/5 hover:border-white/10'
            }`}>
              <div className="space-y-6">
                <span className="text-xs uppercase font-extrabold text-gray-500 tracking-wider block">LEVEL 1</span>
                <h3 className="text-3xl font-black italic uppercase text-white">{planDetails.challenger.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{planDetails.challenger.tagline}</p>
                
                <div className="py-4 border-y border-white/5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold italic uppercase text-white">AED</span>
                    <span className="text-6xl font-black italic uppercase text-orange-500">
                      {billingCycle === 'annual' ? planDetails.challenger.annualPrice : planDetails.challenger.monthlyPrice}
                    </span>
                    <span className="text-gray-500 text-xs uppercase font-bold">/ month</span>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {billingCycle === 'annual' ? 'Billed annually as AED 2,028' : 'Billed monthly'}
                  </span>
                </div>

                <ul className="space-y-3.5 pt-4">
                  {planDetails.challenger.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    setPlanType('challenger');
                    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-4 rounded-sm font-black text-xs uppercase tracking-widest italic transition-all ${
                    planType === 'challenger'
                      ? 'bg-orange-600 text-white'
                      : 'bg-[#141414] hover:bg-[#1A1A1A] text-white border border-white/10'
                  }`}
                >
                  Select Challenger Pass
                </button>
              </div>
            </div>

            {/* Plan 2: Champion Premium */}
            <div className={`bg-[#0D0D0D] border rounded-xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
              planType === 'champion' ? 'border-orange-500 ring-4 ring-orange-500/20' : 'border-white/5 hover:border-white/10'
            }`}>
              <div className="absolute -top-4 right-6 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded shadow-lg">
                MOST POPULAR CHOICE
              </div>

              <div className="space-y-6">
                <span className="text-xs uppercase font-extrabold text-orange-500 tracking-wider block">LEVEL 2</span>
                <h3 className="text-3xl font-black italic uppercase text-white">{planDetails.champion.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{planDetails.champion.tagline}</p>
                
                <div className="py-4 border-y border-white/5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold italic uppercase text-white">AED</span>
                    <span className="text-6xl font-black italic uppercase text-orange-500">
                      {billingCycle === 'annual' ? planDetails.champion.annualPrice : planDetails.champion.monthlyPrice}
                    </span>
                    <span className="text-gray-500 text-xs uppercase font-bold">/ month</span>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {billingCycle === 'annual' ? 'Billed annually as AED 2,988' : 'Billed monthly'}
                  </span>
                </div>

                <ul className="space-y-3.5 pt-4">
                  {planDetails.champion.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span className={idx < 2 ? 'font-bold text-white' : ''}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    setPlanType('champion');
                    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-sm font-black text-xs uppercase tracking-widest italic transition-all shadow-lg shadow-orange-600/20"
                >
                  Select Champion Premium
                </button>
              </div>
            </div>

            {/* Plan 3: Elite Royal */}
            <div className={`bg-[#0D0D0D] border rounded-xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
              planType === 'royal' ? 'border-orange-500 ring-2 ring-orange-500/10' : 'border-white/5 hover:border-white/10'
            }`}>
              <div className="space-y-6">
                <span className="text-xs uppercase font-extrabold text-amber-500 tracking-wider block">LEVEL 3</span>
                <h3 className="text-3xl font-black italic uppercase text-white">{planDetails.royal.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{planDetails.royal.tagline}</p>
                
                <div className="py-4 border-y border-white/5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold italic uppercase text-white">AED</span>
                    <span className="text-6xl font-black italic uppercase text-orange-500">
                      {billingCycle === 'annual' ? planDetails.royal.annualPrice : planDetails.royal.monthlyPrice}
                    </span>
                    <span className="text-gray-500 text-xs uppercase font-bold">/ month</span>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {billingCycle === 'annual' ? 'Billed annually as AED 4,788' : 'Billed monthly'}
                  </span>
                </div>

                <ul className="space-y-3.5 pt-4">
                  {planDetails.royal.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span className="font-bold text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    setPlanType('royal');
                    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-4 rounded-sm font-black text-xs uppercase tracking-widest italic transition-all ${
                    planType === 'royal'
                      ? 'bg-orange-600 text-white'
                      : 'bg-[#141414] hover:bg-[#1A1A1A] text-white border border-white/10'
                  }`}
                >
                  Select Elite Royal
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Online Registration Form & Pass Generator */}
      <section id="register" className="py-24 bg-black px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <span className="text-orange-500 text-sm font-black uppercase tracking-widest">ONLINE REGISTRATION PORTAL</span>
              <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter leading-none text-white">
                SIGN UP IN <br /><span className="text-orange-500">30 SECONDS</span>
              </h2>
              <p className="text-gray-400">
                Register your details, choose your passport tier, and instantly unlock your customized digital membership card. Bring your dynamic pass to the reception desk in Sharjah to claim your fitness tracking bands.
              </p>

              {/* Guarantees list */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-500 flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Zero hidden signup charges or setup fees.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-500 flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Instant barcode generated and emailed.</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-orange-600/10 flex items-center justify-center text-orange-500 flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Secure 24/7 entrance enabled for all users.</span>
                </div>
              </div>

              {/* Selector Summary box */}
              <div className="bg-[#0B0B0B] border border-white/5 p-6 rounded-lg space-y-4">
                <h4 className="font-black uppercase italic text-white border-b border-white/5 pb-2">Pass Summary</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Selected Tier:</span>
                  <span className="font-extrabold uppercase text-orange-500">{currentPlan.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Billing Cycle:</span>
                  <span className="font-bold uppercase text-white">{billingCycle}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-white/5 pt-2 font-black">
                  <span className="text-white">Monthly Amount:</span>
                  <span className="text-white">AED {activePrice}/mo</span>
                </div>
                {billingCycle === 'annual' && (
                  <div className="p-2.5 bg-green-600/10 border border-green-500/25 rounded text-green-500 text-xs font-bold text-center">
                    Annual commitment saves you AED {savingAmount} total!
                  </div>
                )}
              </div>
            </div>

            {/* Right Registration/Digital Pass Column */}
            <div className="lg:col-span-7">
              {!registrationPass ? (
                // Form Interface
                <form 
                  onSubmit={handleRegisterSubmit} 
                  className="bg-[#0D0D0D] border border-white/5 p-8 rounded-xl space-y-6"
                >
                  <h3 className="text-2xl font-black italic uppercase text-white">Create Member Passport</h3>
                  <p className="text-gray-400 text-xs">Enter your details to generate your digital membership pass instantly.</p>
                  
                  {formError && (
                    <div className="bg-red-600/10 border border-red-500 text-red-500 p-4 rounded text-sm font-bold">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Select Plan within form */}
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Confirm Your Tier</label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['challenger', 'champion', 'royal'] as const).map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setPlanType(tier)}
                            className={`p-3 border rounded text-center transition-all ${
                              planType === tier
                                ? 'bg-orange-600/20 border-orange-500 text-white font-extrabold'
                                : 'bg-transparent border-white/5 text-gray-400 hover:border-white/20'
                            }`}
                          >
                            <span className="block text-xs uppercase font-black">{tier}</span>
                            <span className="text-[10px] text-gray-500">AED {planDetails[tier][billingCycle === 'annual' ? 'annualPrice' : 'monthlyPrice']}/mo</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Choose Cycle within form */}
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Billing Duration</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setBillingCycle('monthly')}
                          className={`py-2 px-3 border rounded text-xs font-bold uppercase transition-all ${
                            billingCycle === 'monthly'
                              ? 'bg-white/10 border-white text-white'
                              : 'bg-transparent border-white/5 text-gray-400'
                          }`}
                        >
                          Monthly (Standard)
                        </button>
                        <button
                          type="button"
                          onClick={() => setBillingCycle('annual')}
                          className={`py-2 px-3 border rounded text-xs font-bold uppercase transition-all ${
                            billingCycle === 'annual'
                              ? 'bg-white/10 border-white text-white'
                              : 'bg-transparent border-white/5 text-gray-400'
                          }`}
                        >
                          Annual (15% Off)
                        </button>
                      </div>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-500" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="John Doe"
                          className="w-full pl-11 pr-4 py-3 bg-[#121212] border border-white/5 rounded focus:outline-none focus:border-orange-500 text-white placeholder-gray-600 font-bold"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-500" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+971 50 123 4567"
                          className="w-full pl-11 pr-4 py-3 bg-[#121212] border border-white/5 rounded focus:outline-none focus:border-orange-500 text-white placeholder-gray-600 font-bold"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-500" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="johndoe@example.com"
                          className="w-full pl-11 pr-4 py-3 bg-[#121212] border border-white/5 rounded focus:outline-none focus:border-orange-500 text-white placeholder-gray-600 font-bold"
                        />
                      </div>
                    </div>

                    {/* Start Date */}
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Preferred Start Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-500" />
                        <input
                          type="date"
                          required
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 bg-[#121212] border border-white/5 rounded focus:outline-none focus:border-orange-500 text-white font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms checkbox */}
                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.agreeToTerms}
                      onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                      className="w-4 h-4 text-orange-600 bg-black border-white/10 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="terms" className="text-xs text-gray-400 font-bold leading-none select-none">
                      I agree to Prince Gym's Code of Conduct and General Rules.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-sm font-black text-xs uppercase tracking-wider italic transition-all shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2"
                  >
                    Confirm & Generate Digital Member Pass
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                // SUCCESS VIEW: Beautiful digital pass with barcode
                <div className="bg-[#121212] border-2 border-orange-500 p-8 rounded-xl space-y-8 animate-fadeIn text-center relative overflow-hidden">
                  
                  {/* Decorative stamp banner */}
                  <div className="absolute top-0 right-0 bg-orange-600 text-white font-black text-[10px] uppercase tracking-wider px-6 py-1.5 rotate-45 translate-x-6 translate-y-3">
                    OFFICIAL MEMBER
                  </div>

                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-black italic uppercase text-white">WELCOME TO THE KINGDOM!</h3>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                      Your Prince Gym digital registration is finalized. Bring this custom pass code to the Sharjah gym counter to unlock your tracking wristband!
                    </p>
                  </div>

                  {/* Digital pass graphic */}
                  <div className="max-w-md mx-auto bg-black border border-white/10 rounded-xl p-6 text-left space-y-6 relative shadow-2xl">
                    
                    {/* Header info */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2">
                        <BoxingGlovesLogo className="w-8 h-8 text-orange-500" />
                        <div className="flex flex-col leading-none">
                          <span className="font-black italic uppercase text-white text-sm">PRINCE GYM</span>
                          <span className="text-[7px] uppercase tracking-widest text-gray-400 font-bold">Sharjah UAE</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold block">MEMBERSHIP ID</span>
                        <span className="font-mono text-sm text-orange-500 font-extrabold">{registrationPass.memberId}</span>
                      </div>
                    </div>

                    {/* Member specifications */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[8px] uppercase text-gray-500 font-bold block">MEMBER NAME</span>
                        <span className="font-bold text-white text-sm block uppercase truncate">{registrationPass.name}</span>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase text-gray-500 font-bold block">PLAN ASSIGNED</span>
                        <span className="font-black text-orange-500 text-sm block uppercase italic">{registrationPass.planName}</span>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase text-gray-500 font-bold block">START DATE</span>
                        <span className="font-bold text-white text-xs block">{registrationPass.startDate}</span>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase text-gray-500 font-bold block">EXPIRY DATE</span>
                        <span className="font-bold text-white text-xs block">{registrationPass.expiryDate}</span>
                      </div>
                    </div>

                    {/* High-fidelity procedural barcode graphic */}
                    <div className="bg-white p-4 rounded flex flex-col items-center justify-center space-y-2 mt-4">
                      <div className="flex justify-between items-stretch w-full h-12 bg-white px-2">
                        {/* Render individual barcode vertical lines of varying widths */}
                        {[3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 1, 2, 4, 3, 1, 2, 4, 1, 2, 4].map((width, idx) => (
                          <div 
                            key={idx} 
                            style={{ width: `${width}px` }} 
                            className={`h-full ${idx % 2 === 0 ? 'bg-black' : 'bg-transparent'}`}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[10px] text-black font-bold tracking-widest">
                        *{registrationPass.memberId}*
                      </span>
                    </div>

                  </div>

                  {/* Automated Gateway Dispatches Hub */}
                  <div className="bg-[#101010] border border-white/10 p-6 rounded-lg text-left space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                      <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
                      <h4 id="dispatch-hub-title" className="font-black uppercase italic text-sm text-white tracking-wider">
                        ⚡ PRINCE GATEWAY COMMUNICATIONS HUB
                      </h4>
                    </div>
                    
                    <p className="text-gray-400 text-[11px] leading-relaxed">
                      Instant templates generated. Click each channel below to launch simulated automated dispatches directly. This triggers customized confirmation texts to the customer and delivers the full dashboard report to the administrator.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      
                      {/* Channel 1: WhatsApp */}
                      <div className="bg-black/40 border border-white/5 rounded p-4 space-y-3 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-green-500 font-extrabold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                              WhatsApp
                            </span>
                            <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">Member Notice</span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-bold truncate">To: {registrationPass.phone}</p>
                          <p className="text-[9px] text-gray-600 line-clamp-2">"Marhaban! Welcome to Prince Gym Sharjah..."</p>
                        </div>
                        
                        <button
                          id="btn-dispatch-wa"
                          onClick={() => {
                            setDispatchedChannels(prev => ({ ...prev, wa: true }));
                            const waText = `Marhaban! 🥊 Welcome to Prince Gym UAE, the largest gym in Sharjah!\n\nName: ${registrationPass.name}\nMember ID: ${registrationPass.memberId}\nTier: ${registrationPass.planName} (${registrationPass.billingCycle})\nStart Date: ${registrationPass.startDate}\n\nAccess granted. Show this pass at the counter to claim your RFID wristband! Let us conquer today.`;
                            const cleanPhone = registrationPass.phone.replace(/[^\d+]/g, '');
                            window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`, '_blank');
                          }}
                          className={`w-full py-2 rounded text-[10px] font-black uppercase italic tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                            dispatchedChannels.wa
                              ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                              : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          {dispatchedChannels.wa ? '✓ Triggered' : 'Send WhatsApp'}
                        </button>
                      </div>

                      {/* Channel 2: Member Welcome Email */}
                      <div className="bg-black/40 border border-white/5 rounded p-4 space-y-3 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-orange-500 font-extrabold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping" />
                              Email Outbox
                            </span>
                            <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">Welcome Receipt</span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-bold truncate">To: {registrationPass.email}</p>
                          <p className="text-[9px] text-gray-600 line-clamp-2">"Official Member Pass - Prince Gym..."</p>
                        </div>

                        <button
                          id="btn-dispatch-member-mail"
                          onClick={() => {
                            setDispatchedChannels(prev => ({ ...prev, emailMember: true }));
                            const subject = `Official Member Pass - Prince Gym Sharjah UAE`;
                            const body = `Hello ${registrationPass.name},\n\nWelcome to Prince Gym, Sharjah's ultimate arena for combat sports, swimming, and strength training!\n\nYour Digital Passport details:\n--------------------------------------------------\nMember ID: ${registrationPass.memberId}\nAccess Tier: ${registrationPass.planName}\nBilling Cycle: ${registrationPass.billingCycle}\nPrice: AED ${registrationPass.pricePaid}/mo\nPreferred Start Date: ${registrationPass.startDate}\nExpiry Date: ${registrationPass.expiryDate}\n--------------------------------------------------\n\nPresent this code at our main counter to receive your secure RFID access band.\n\nPrince Gym Sharjah, UAE\nSupport: 0561636684\nEmail: jrelshikh@gmail.com`;
                            window.open(`mailto:${registrationPass.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                          }}
                          className={`w-full py-2 rounded text-[10px] font-black uppercase italic tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                            dispatchedChannels.emailMember
                              ? 'bg-orange-600/20 text-orange-400 border border-orange-500/30'
                              : 'bg-orange-600 hover:bg-orange-700 text-white cursor-pointer'
                          }`}
                        >
                          <Mail className="w-3.5 h-3.5" />
                          {dispatchedChannels.emailMember ? '✓ Triggered' : 'Email Member'}
                        </button>
                      </div>

                      {/* Channel 3: Owner Admin Email */}
                      <div className="bg-black/40 border border-white/5 rounded p-4 space-y-3 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-red-500 font-extrabold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                              Admin Outbox
                            </span>
                            <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">Owner Report</span>
                          </div>
                          <p className="text-[10px] text-gray-400 font-bold truncate">To: jrelshikh@gmail.com</p>
                          <p className="text-[9px] text-gray-600 line-clamp-2">"NEW MEMBERSHIP SIGNUP: [Name]..."</p>
                        </div>

                        <button
                          id="btn-dispatch-admin-mail"
                          onClick={() => {
                            setDispatchedChannels(prev => ({ ...prev, emailAdmin: true }));
                            const subject = `NEW MEMBERSHIP SIGNUP: ${registrationPass.name} - ${registrationPass.memberId}`;
                            const body = `Attention Admin,\n\nA new champion has registered on the Prince Gym UAE Online Portal. Please review the details below:\n\nMember Profile:\n--------------------------------------------------\nFull Name: ${registrationPass.name}\nPhone Number: ${registrationPass.phone}\nEmail Address: ${registrationPass.email}\n--------------------------------------------------\n\nMembership Details:\n--------------------------------------------------\nPassport ID: ${registrationPass.memberId}\nAssigned Tier: ${registrationPass.planName}\nBilling Cycle: ${registrationPass.billingCycle}\nActive Price: AED ${registrationPass.pricePaid}/mo\nDeclared Start Date: ${registrationPass.startDate}\nCalculated Expiry Date: ${registrationPass.expiryDate}\n--------------------------------------------------\n\nPlease prepare their secure RFID wristband and schedule their complimentary onboarding session.\n\nSystem Dispatch Hub - Prince Gym Sharjah`;
                            window.open(`mailto:jrelshikh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                          }}
                          className={`w-full py-2 rounded text-[10px] font-black uppercase italic tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                            dispatchedChannels.emailAdmin
                              ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                              : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                          }`}
                        >
                          <Send className="w-3.5 h-3.5" />
                          {dispatchedChannels.emailAdmin ? '✓ Triggered' : 'Notify Admin'}
                        </button>
                      </div>

                    </div>

                    {/* Master dispatch button */}
                    <button
                      id="btn-dispatch-all"
                      onClick={() => {
                        setDispatchedChannels({ wa: true, emailMember: true, emailAdmin: true });
                        
                        // Fire administrative alerts
                        const adminSubject = `NEW MEMBERSHIP SIGNUP: ${registrationPass.name} - ${registrationPass.memberId}`;
                        const adminBody = `Attention Admin,\n\nA new champion has registered on the Prince Gym UAE Online Portal. Please review the details below:\n\nMember Profile:\n--------------------------------------------------\nFull Name: ${registrationPass.name}\nPhone Number: ${registrationPass.phone}\nEmail Address: ${registrationPass.email}\n--------------------------------------------------\n\nMembership Details:\n--------------------------------------------------\nPassport ID: ${registrationPass.memberId}\nAssigned Tier: ${registrationPass.planName}\nBilling Cycle: ${registrationPass.billingCycle}\nActive Price: AED ${registrationPass.pricePaid}/mo\nDeclared Start Date: ${registrationPass.startDate}\nCalculated Expiry Date: ${registrationPass.expiryDate}\n--------------------------------------------------\n\nPlease prepare their secure RFID wristband and schedule their complimentary onboarding session.\n\nSystem Dispatch Hub - Prince Gym Sharjah`;
                        window.open(`mailto:jrelshikh@gmail.com?subject=${encodeURIComponent(adminSubject)}&body=${encodeURIComponent(adminBody)}`, '_blank');

                        // Then member email after a brief delay
                        setTimeout(() => {
                          const memberSubject = `Official Member Pass - Prince Gym Sharjah UAE`;
                          const memberBody = `Hello ${registrationPass.name},\n\nWelcome to Prince Gym, Sharjah's ultimate arena for combat sports, swimming, and strength training!\n\nYour Digital Passport details:\n--------------------------------------------------\nMember ID: ${registrationPass.memberId}\nAccess Tier: ${registrationPass.planName}\nBilling Cycle: ${registrationPass.billingCycle}\nPrice: AED ${registrationPass.pricePaid}/mo\nPreferred Start Date: ${registrationPass.startDate}\nExpiry Date: ${registrationPass.expiryDate}\n--------------------------------------------------\n\nPresent this code at our main counter to receive your secure RFID access band.\n\nPrince Gym Sharjah, UAE\nSupport: 0561636684\nEmail: jrelshikh@gmail.com`;
                          window.open(`mailto:${registrationPass.email}?subject=${encodeURIComponent(memberSubject)}&body=${encodeURIComponent(memberBody)}`, '_blank');
                        }, 500);

                        // Then WhatsApp welcome
                        setTimeout(() => {
                          const waText = `Marhaban! 🥊 Welcome to Prince Gym UAE, the largest gym in Sharjah!\n\nName: ${registrationPass.name}\nMember ID: ${registrationPass.memberId}\nTier: ${registrationPass.planName} (${registrationPass.billingCycle})\nStart Date: ${registrationPass.startDate}\n\nAccess granted. Show this pass at the counter to claim your RFID wristband! Let us conquer today.`;
                          const cleanPhone = registrationPass.phone.replace(/[^\d+]/g, '');
                          window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`, '_blank');
                        }, 1000);
                      }}
                      className="w-full py-3.5 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 hover:from-orange-500 hover:to-red-500 text-white rounded text-xs font-black uppercase tracking-widest italic transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-600/10 hover:shadow-orange-600/20 mt-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                      Dispatch All 3 Channels Sequentially
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#252525] text-white text-xs font-black uppercase italic rounded tracking-wider border border-white/10 cursor-pointer"
                    >
                      Print Passport Code
                    </button>
                    <button
                      onClick={resetRegistration}
                      className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black uppercase italic rounded tracking-wider cursor-pointer"
                    >
                      Register Another Account
                    </button>
                  </div>

                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Elite Coaching & Contact / Maps Section */}
      <section className="py-24 bg-[#070707] border-t border-white/5 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Gym location details */}
          <div className="space-y-8 flex flex-col justify-center">
            <span className="text-orange-500 text-sm font-black uppercase tracking-widest">VISIT THE FORTRESS</span>
            <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter">
              LOCATION & HOURS
            </h2>
            <p className="text-gray-400">
              Conveniently placed in the center of Sharjah, UAE. Spanning multiple floors with free private parking lot access for our gym members.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-black uppercase italic text-white">Sharjah Location Address</h4>
                  <p className="text-gray-400 text-sm">Industrial Area 12, Main King Abdul Aziz Road, Sharjah, United Arab Emirates</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-black uppercase italic text-white">Opening Hours</h4>
                  <p className="text-gray-400 text-sm">Open 24 Hours / 7 Days a week (All public holidays open!)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-black uppercase italic text-white">Phone Support Line</h4>
                  <p className="text-gray-400 text-sm">0561636684</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-black uppercase italic text-white">Email Inquiries</h4>
                  <p className="text-gray-400 text-sm">jrelshikh@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive procedural Vector Map representation of Sharjah center */}
          <div className="relative bg-[#0D0D0D] border border-white/5 rounded-xl p-8 aspect-video flex flex-col justify-between overflow-hidden group">
            
            {/* Background vector road network mesh overlay for professional dark map look */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Procedural lines representing Sharjah highways */}
            <svg className="absolute inset-0 w-full h-full text-white/5 fill-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M-20 80 Q 200 120, 500 40 T 900 150" stroke="currentColor" strokeWidth="6" />
              <path d="M-40 200 L 900 240" stroke="currentColor" strokeWidth="4" />
              <path d="M120 -20 Q 180 180, 260 400" stroke="currentColor" strokeWidth="8" />
              <path d="M420 -20 Q 380 120, 480 400" stroke="currentColor" strokeWidth="5" />
            </svg>

            {/* Glowing Map pin pointing to Prince Gym */}
            <div className="absolute top-[45%] left-[32%] z-10 flex flex-col items-center">
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-orange-600 border border-white flex items-center justify-center">
                  <BoxingGlovesLogo className="w-3.5 h-3.5 text-white" />
                </span>
              </span>
              <div className="bg-[#121212]/95 border border-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 mt-2 rounded shadow-2xl backdrop-blur-sm whitespace-nowrap leading-none">
                PRINCE GYM (SHARJAH CENTRAL)
              </div>
            </div>

            <div className="z-10 bg-black/60 backdrop-blur-sm p-4 rounded border border-white/5 self-end">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-orange-500 block mb-1">FREE MEMBER VALET PARKING</span>
              <p className="text-gray-400 text-xs">Drive directly to the security gate in industrial area 12. Bring your barcode pass code for validated entrance.</p>
            </div>

            <div className="z-10 flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase text-gray-500 tracking-widest">Sharjah Map Coordinator</span>
              <span className="text-[10px] bg-orange-600 text-white font-bold px-2 py-0.5 rounded">GPS APPROVED</span>
            </div>

          </div>

        </div>
      </section>

      {/* Modern Compact Footer */}
      <footer className="bg-[#090909] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
              <BoxingGlovesLogo className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-black tracking-tighter uppercase italic leading-none text-white">
                PRINCE <span className="text-orange-500">GYM</span>
              </span>
              <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">Sharjah's Largest Fitness Sanctuary</span>
            </div>
          </div>

          <p className="text-gray-500 text-xs max-w-md">
            &copy; {new Date().getFullYear()} Prince Gym Sharjah. Engineered for athletic power, combat discipline, and Olympic endurance. All rights reserved.
          </p>

          <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
            <a href="#amenities" className="text-gray-400 hover:text-white transition-colors">Amenities</a>
            <a href="#classes" className="text-gray-400 hover:text-white transition-colors">Classes</a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
          </div>

        </div>
      </footer>

    </div>
  );
}
