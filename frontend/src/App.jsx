import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import { Home, Target, Users, DollarSign, Heart, Menu, X, Bot, Send, ArrowRight, Search, UserPlus, Check, Mail, Key, Contact } from 'lucide-react';
import axios from 'axios'
import { serverURL } from './main';


// --- Mock Data for Campaigns ---
const mockCampaigns = [
  {
    id: 1,
    title: "Clean Water for Villages",
    description: "Providing access to clean and safe drinking water for remote communities.",
    goal: 10000,
    raised: 7500,
    image: "../src/assets/water.jpg"
  },
  {
    id: 2,
    title: "Educate a Child",
    description: "Sponsoring the education of underprivileged children, giving them a brighter future.",
    goal: 25000,
    raised: 12000,
    image: "../src/assets/educate.webp"
  },
  {
    id: 3,
    title: "Forest Reforestation Project",
    description: "Planting trees to combat climate change and restore natural habitats.",
    goal: 50000,
    raised: 45000,
    image: "../src/assets/reforestation.jpg"
  },
  {
    id: 4,
    title: "Community Health Clinic",
    description: "Building a free health clinic for a community without medical access.",
    goal: 75000,
    raised: 30000,
    image: "../src/assets/health.webp"
  },
  {
    id: 5,
    title: "Stray Animal Shelter",
    description: "Providing food, shelter, and medical care for abandoned animals.",
    goal: 5000,
    raised: 4800,
    image: "../src/assets/shelter.jpg"
  },
  {
    id: 6,
    title: "Disaster Relief Fund",
    description: "Providing immediate aid to areas affected by natural disasters.",
    goal: 100000,
    raised: 25000,
    image: "../src/assets/diaster.webp"
  }
];

// --- SIMULATED BACKEND FUNCTIONS ---

/**
 * Simulates sending an OTP to an email address.
 * @param {string} email The email to send the OTP to.
 * @returns {Promise<object>} A promise that resolves with a success message.
 */


/**
 * Simulates verifying an email OTP.
 * @param {string} email The email associated with the OTP.
 * @param {string} otp The OTP code entered by the user.
 * @returns {Promise<object>} A promise that resolves if the OTP is correct.
 */



// --- Icon Map ---
// A robust way to map string names to imported icon components
const iconMap = {
  Home: Home,
  Target: Target,
  Users: Users,
  DollarSign: DollarSign,
  Heart: Heart,
  Menu: Menu,
  X: X,
  Bot: Bot,
  Send: Send,
  ArrowRight: ArrowRight,
  Search: Search,
  UserPlus: UserPlus,
  Check: Check,
  Mail: Mail,
  Key: Key
};


// --- Context for Modal ---
const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, selectedCampaign }}>
      {children}
    </ModalContext.Provider>
  );
};


const useModal = () => useContext(ModalContext);


// --- Header & Navigation ---
const Header = ({ setPage, isAuthenticated }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', page: 'home', icon: 'Home' }, // Use string key
    { name: 'Campaigns', page: 'campaigns', icon: 'Target' }, // Use string key
    { name: 'About Us', page: 'about', icon: 'Users' }, // Use string key
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); setPage('home'); }} className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-700">Smart<span className="text-green-600">Donate</span></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = iconMap[item.icon]; // <-- FIX: Look up icon from map
              if (!Icon) return null; // Safety check
              return (
                <a
                  key={item.name}
                  href="#"
                  onClick={(e) => { e.preventDefault(); setPage(item.page); }}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center space-x-1"
                >
                  <Icon className="w-4 h-4" /> {/* Use capitalized variable */}
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
                <span className="hidden sm:flex items-center space-x-1 text-green-600 font-medium py-2 px-4">
                    <Check className="w-5 h-5" />
                    <span>Verified</span>
                </span>
            ) : (
                <button
                  onClick={() => setPage('signup')}
                  className="hidden sm:inline-block text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded-full transition-colors duration-300"
                >
                  Sign Up
                </button>
            )}
            <button 
              onClick={() => setPage('campaigns')}
              className="hidden sm:inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm"
            >
              Donate Now
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden ml-4 p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* --- CORRECTED Mobile Menu --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 right-0 z-40">
          <nav className="flex flex-col p-4 space-y-2">
            
            {/* Nav Links */}
            {navItems.map((item) => {
              const Icon = iconMap[item.icon]; // <-- FIX: Look up icon from map
              if (!Icon) return null; // Safety check
              return (
                <a
                  key={item.name}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(item.page); // <-- FIX 1: Was hardcoded to 'signup'
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors duration-200 flex items-center space-x-2 p-3 rounded-lg"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              );
            })}
            
            {/* Auth Status / Sign Up Button */}
            {isAuthenticated ? (
                <span className="text-green-600 font-medium flex items-center space-x-2 p-3 rounded-lg">
                    <Check className="w-5 h-5" />
                    <span>Verified</span>
                </span>
            ) : (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage('signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors duration-200 flex items-center space-x-2 p-3 rounded-lg"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Sign Up</span>
                </a>
            )}
            
            {/* Donate Now Button */}
            <button 
              onClick={() => {
                setPage('campaigns');
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm"
            >
              Donate Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

// --- Campaign Card Component ---
const CampaignCard = ({ campaign, setPage, isAuthenticated }) => {
  const { openModal } = useModal();
  const percentage = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100);

  const handleDonateClick = () => {
    if (isAuthenticated) {
      openModal(campaign);
    } else {
      // User is not verified, redirect to sign up page
      setPage('signup');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 flex flex-col">
      <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{campaign.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{campaign.description}</p>
        
        <div>
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="font-bold text-green-600">Rs. {campaign.raised.toLocaleString()} <span className="text-gray-500 font-normal">raised</span></span>
            <span className="text-gray-500">Goal: Rs. {campaign.goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <button 
            onClick={handleDonateClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-sm"
          >
            <Heart className="w-4 h-4" />
            <span>Donate Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Home Page ---
const HomePage = ({ setPage, isAuthenticated }) => {
  const { openModal } = useModal();
  
  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">Give Hope, Change Lives</h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-up">Join our community of donors and make a real impact. Your smart donation can change the world.</p>
          <button
            onClick={() => setPage('campaigns')}
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
          >
            Explore Campaigns
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)", transform: "translateY(1px)" }}></div>
      </section>

      {/* Featured Campaigns Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Featured Campaigns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockCampaigns.slice(0, 3).map(campaign => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                setPage={setPage} 
                isAuthenticated={isAuthenticated} 
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setPage('campaigns')}
              className="text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
            >
              <span>View All Campaigns</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
      
      {/* How it Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-100 text-blue-600 rounded-full p-4">
                  <Search className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Find a Cause</h3>
              <p className="text-gray-600">Browse campaigns and find a cause you are passionate about.</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-green-100 text-green-600 rounded-full p-4">
                  <Heart className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Make a Donation</h3>
              <p className="text-gray-600">Securely donate using our simple and transparent payment gateway.</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-100 text-blue-600 rounded-full p-4">
                  <Target className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. See Your Impact</h3>
              <p className="text-gray-600">Receive updates and see how your contribution is making a difference.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Campaigns Page ---
const CampaignsPage = ({ setPage, isAuthenticated }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState(mockCampaigns);

  useEffect(() => {
    const results = mockCampaigns.filter(campaign =>
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCampaigns(results);
  }, [searchTerm]);

  return (
    <div className="flex-grow bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">All Campaigns</h1>
        
        {/* Search Bar */}
        <div className="mb-8 max-w-lg mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a cause..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map(campaign => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                setPage={setPage} 
                isAuthenticated={isAuthenticated} 
              />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">No campaigns found matching your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- About Us Page ---
const AboutUsPage = () => {
  return (
    <div className="flex-grow bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">About SmartDonate</h1>
          <p className="text-lg text-gray-600 mb-6">
            Welcome to SmartDonate, a platform dedicated to connecting passionate donors with impactful causes. We believe that technology can revolutionize philanthropy, making it more transparent, efficient, and accessible for everyone.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Our mission is to empower individuals and organizations to make a tangible difference in the world. We carefully vet every campaign on our platform to ensure that your donations go directly to the people and projects that need them most.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
            <h3 className="text-2xl font-semibold text-blue-800 mb-3">Our Vision</h3>
            <p className="text-blue-700">
              To create a world where giving is simple, transparent, and a part of everyday life, enabling a global community to solve humanity's greatest challenges together.
            </p>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            Whether it's providing clean water, educating children, or protecting our planet, every donation counts. Join us in our mission to make the world a better place, one smart donation at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- New Sign Up / OTP Page ---
const SignUpPage = ({ setPage, setIsAuthenticated }) => {
  const [step, setStep] = useState('enterEmail'); // 'enterEmail', 'enterOTP', 'success'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);
    
    try {
      const res = await axios.post(`${serverURL}/auth/signup`, { email });
      setMessage(res.data.message);
      setStep('enterOTP');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!otp || otp.length < 6) {
      setError('Please enter your 6-digit OTP.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(`${serverURL}/auth/verify`, {
      verificationCode: otp,
  });
      setMessage(res.data.message);
      setStep('success');
      setIsAuthenticated(true); // <-- Set authenticated state
      // Redirect to home after a short delay
      setTimeout(() => {
        setPage('home');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex-grow bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white p-8 sm:p-10 rounded-lg shadow-xl border border-gray-200">
          
          {step === 'success' ? (
            <div className="text-center">
              <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Verified!</h2>
              <p className="text-gray-600">Welcome to SmartDonate. Redirecting you to the home page...</p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
                {step === 'enterEmail' ? 'Create Your Account' : 'Verify Your Email'}
              </h1>
              
              {step === 'enterEmail' && (
                <form onSubmit={handleSendOtp}>
                  <p className="text-center text-gray-600 mb-6">Enter your email to get a verification code.</p>
                  <div className="relative mb-4">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50"
                  >
                    {isLoading ? 'Sending...' : 'Send Code'}
                  </button>
                </form>
              )}

              {step === 'enterOTP' && (
                <form onSubmit={handleVerifyOtp}>
                  <p className="text-center text-gray-600 mb-2">Enter the 6-digit code sent to:</p>
                  <p className="text-center font-semibold text-gray-800 mb-6">{email}</p>
                  <div className="relative mb-6">
                    <Key className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="6-Digit Code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength="6"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Sign Up'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setStep('enterEmail'); setError(null); setMessage(null); setOtp(''); }}
                    className="w-full text-center text-gray-600 hover:text-blue-600 mt-4 text-sm"
                  >
                    Change email address
                  </button>
                </form>
              )}
              
              {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
              {message && !error && <p className="text-green-500 text-sm text-center mt-4">{message}</p>}
            
            </>
          )}

        </div>
      </div>
    </div>
  );
};


// --- Footer ---
const Footer = ({ setPage }) => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('home'); }} className="flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">Smart<span className="text-green-400">Donate</span></span>
            </a>
            <p className="text-sm">Making philanthropy simple and transparent.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage('home'); }} className="hover:text-white">Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage('campaigns'); }} className="hover:text-white">Campaigns</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage('about'); }} className="hover:text-white">About Us</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-sm mb-2">Subscribe to our newsletter for updates on new campaigns.</p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-l-md text-gray-800 focus:outline-none" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-md">
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SmartDonate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// --- Donation Modal (Payment Gateway Simulation) ---
// ✅ Razorpay modal component
const DonationModal = () => {
  const { isModalOpen, closeModal, selectedCampaign } = useModal();

  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [step, setStep] = useState(1); // 1: Form, 2: Processing, 3: Result
  const [donorName, setDonorName] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null); // 'processing' | 'failed' | 'success'

  const presetAmounts = [25, 50, 100, 250];

  // Handle preset amount selection
  const handleSetAmount = (val) => {
    setAmount(val);
    setCustomAmount("");
  };

  // Handle custom amount input
  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setCustomAmount(val);
      setAmount(Number(val) || 0);
    }
  };

  //  Main payment handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1️ Get Razorpay key
      const {
        data: { key },
      } = await axios.get(`${serverURL}/auth/getkey`);

      // 2️⃣ Create order in backend
      const {
        data: { order },
      } = await axios.post(`${serverURL}/auth/donation`, {
        amount,
        currency: "INR",
      });

      // 3️⃣ Razorpay payment options
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "SmartDonate",
        description: `Donation for ${selectedCampaign?.title}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // ✅ Verify payment on backend
            await axios.post(`${serverURL}/auth/donationVerify`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            setPaymentStatus("success");
            setStep(3);
          } catch (error) {
            console.error("Payment verification failed:", error);
            setPaymentStatus("failed");
            setStep(3);
          }
        },
        prefill: {
          name: donorName || "Generous Donor",
          email: "royal1234@gmail.com",
          contact: "9999999999",
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // Show processing screen
      setPaymentStatus("processing");
    } catch (error) {
      console.error("Error creating donation order:", error);
      alert("Failed to initiate donation. Please try again.");
    }
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setStep(1);
      setAmount(50);
      setCustomAmount("");
      setDonorName("");
      setPaymentStatus(null);
    }, 300);
  };

  if (!isModalOpen) return null;

  // ------------------ UI ------------------
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {step < 3 ? `Donate to ${selectedCampaign?.title}` : "Donation Status"}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step 1️⃣ — Donation Form */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <p className="text-gray-600 text-sm">
              Choose an amount to donate for <strong>{selectedCampaign?.title}</strong>.
            </p>

            {/* Preset Amounts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {presetAmounts.map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => handleSetAmount(amt)}
                  className={`py-2 px-4 rounded-lg border font-semibold transition-all ${
                    amount === amt
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Custom Amount</label>
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Enter amount in ₹"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Donor Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Your Name (optional)</label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Donate Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Proceed to Donate ₹{amount}
            </button>
          </form>
        )}

        {/* Step 2️⃣ — Payment Processing */}
        {step === 2 && (
          <div className="p-8 text-center">
            <div className="animate-spin mx-auto mb-4 border-4 border-blue-300 border-t-blue-600 rounded-full w-12 h-12"></div>
            <p className="text-gray-700 font-medium">Processing your donation...</p>
          </div>
        )}

        {/* Step 3️⃣ — Result (Success / Failed) */}
        {step === 3 && (
          <div className="p-8 text-center">
            {paymentStatus === "success" && (
              <>
                <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Donation Successful!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you, {donorName || "Generous Donor"}! Your ₹{amount} will help{" "}
                  {selectedCampaign?.title?.toLowerCase()}.
                </p>
              </>
            )}

            {paymentStatus === "failed" && (
              <>
                <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h3>
                <p className="text-gray-600 mb-4">
                  Unfortunately, your payment could not be processed. Please try again later.
                </p>
              </>
            )}

            <button
              onClick={handleClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full mt-4"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Chatbot ---
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! How can I help you today? You can ask about campaigns, how to donate, or our mission.' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
  if (input.trim() === '') return;

  // Add user's message
  const newMessages = [...messages, { from: 'user', text: input }];
  setMessages(newMessages);
  const userInput = input;
  setInput('');

  try {
    // Send prompt to your Gemini backend
    const res = await axios.post(`${serverURL}/auth/gemini`, {
      prompt: userInput,
    });

    // Extract AI reply
    const botReply = res.data?.data || "Sorry, I couldn't get a response right now.";

    // Add bot message to chat
    setMessages([...newMessages, { from: 'bot', text: botReply }]);

  } catch (error) {
    console.error(error);
    setMessages([
      ...newMessages,
      { from: 'bot', text: "⚠️ There was an error contacting Smart Donate Assistant. Please try again later." },
    ]);
  }
};


  return (
    <>
      {/* Chat Bubble Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
        aria-label="Open chat"
      >
        <Bot className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-80 sm:w-96 h-[60vh] max-h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ transformOrigin: 'bottom right' }}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bot className="w-8 h-8 bg-white text-blue-600 rounded-full p-1" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-blue-600"></span>
            </div>
            <span className="font-semibold">Support Bot</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200" aria-label="Close chat">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.from === 'bot'
                    ? 'bg-blue-100 text-gray-800 rounded-bl-none'
                    : 'bg-green-500 text-white rounded-br-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
           <div ref={chatEndRef} />
        </div>
        
        {/* Input */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white p-3 rounded-full transition-colors duration-200 hover:bg-blue-700"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Main App Component ---
export default function App() {
  const [page, setPage] = useState('home'); // 'home', 'campaigns', 'about', 'signup'
  const [isAuthenticated, setIsAuthenticated] = useState(false); // <-- Authentication state

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={setPage} isAuthenticated={isAuthenticated} />;
      case 'campaigns':
        return <CampaignsPage setPage={setPage} isAuthenticated={isAuthenticated} />;
      case 'about':
        return <AboutUsPage />;
      case 'signup':
        return <SignUpPage setPage={setPage} setIsAuthenticated={setIsAuthenticated} />;
      default:
        return <HomePage setPage={setPage} isAuthenticated={isAuthenticated} />;
    }
  };

  return (
    <ModalProvider>
      <div className="flex flex-col min-h-screen font-sans bg-white">
        <Header setPage={setPage} isAuthenticated={isAuthenticated} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer setPage={setPage} />
        <DonationModal />
        <Chatbot />
      </div>
      
      {/* Simple CSS Animations have been moved to src/index.css 
      */}
    </ModalProvider>
  );
}

