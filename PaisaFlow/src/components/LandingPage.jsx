import React, { useEffect } from 'react';
import { 
  BrowserRouter,
  Routes,
  Route,
  Link 
} from 'react-router-dom';
import { 
  TrendingUp, 
  Target, 
  Wallet, 
  MessageCircle, 
  BarChart3, 
  Smartphone,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';

// --- Placeholder Components for Routes ---
const AboutPage = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <h1 className="text-4xl font-bold">About Us Page</h1>
  </div>
);

const ContactPage = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <h1 className="text-4xl font-bold">Contact Page</h1>
  </div>
);


// --- Landing Page Component ---
const LandingPage = ({ onGetStarted }) => {
  const features = [
    {
      icon: BarChart3,
      title: 'Smart Analytics & Reporting',
      description: 'Get a comprehensive overview and detailed insights into your spending patterns with beautiful, easy-to-understand charts and downloadable reports.'
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set and track financial goals with visual progress indicators and deadline reminders.'
    },
    {
      icon: Wallet,
      title: 'Budget Management',
      description: 'Create category-wise budgets and get alerts when you\'re approaching your limits.'
    },
    {
      icon: MessageCircle,
      title: 'AI Assistant',
      description: 'Ask questions about your finances in natural language and get instant, helpful insights.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Access your finances anywhere with our responsive design that works on all devices.'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer',
      content: 'This app completely transformed how I manage my finances. The AI assistant is incredibly helpful!',
      rating: 5
    },
    {
      name: 'Rahul Patel',
      role: 'Business Owner',
      content: 'The budget tracking features helped me save ₹50,000 in just 3 months. Highly recommended!',
      rating: 5
    },
    {
      name: 'Anita Kumar',
      role: 'Marketing Manager',
      content: 'Love the goal tracking feature. It keeps me motivated to achieve my financial targets.',
      rating: 5
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Users' },
    { number: '₹50Cr+', label: 'Money Managed' },
    { number: '95%', label: 'User Satisfaction' },
    { number: '24/7', label: 'AI Support' }
  ];

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PaisaFlow</h1>
              </div>
            </div>
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Take Control of Your
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Finances</span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Monitor your financial health with AI-powered insights, smart budgeting, and goal tracking. 
                    Your personal finance companion that grows with you.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onGetStarted}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <span>Start Your Journey</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center space-x-8 pt-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Monthly Overview</h3>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-green-600 font-medium">Income</div>
                        <div className="text-2xl font-bold text-green-700">₹75,000</div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="text-sm text-red-600 font-medium">Expenses</div>
                        <div className="text-2xl font-bold text-red-700">₹45,000</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Savings Goal Progress</span>
                        <span className="font-medium">67%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-2/3"></div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-5 w-5 text-blue-600" />
                        <span className="text-sm text-blue-800">"You're on track to save ₹30,000 this month!"</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id='features' className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                A Feature Set for Financial Fitness
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful tools designed to help you understand, control, and grow your finances with confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isLastItem = index === features.length - 1;

                if (isLastItem) {
                  return (
                    <div key={index} className="md:col-span-2 bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 flex flex-col md:flex-row items-center gap-8 border-2 border-transparent hover:border-blue-500">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300">
                        <Icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300">
                      <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Loved by Thousands of Users
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                See what our users have to say about their financial transformation journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Ready to Transform Your Financial Future?
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Join thousands of users who have already taken control of their finances. 
                Start your journey today with our AI-powered financial companion.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8">
                <div className="flex items-center space-x-2 text-gray-400">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Setup in 2 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-white font-semibold">PaisaFlow</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your financial assistant for smarter money management.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Budget Tracking</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Goal Management</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">AI Assistant</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
          </div>
              
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 PaisaFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;