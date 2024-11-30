import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, Shield, BookOpen, ArrowRight, ChevronDown } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { connectWallet, isConnected, account } = useWallet();

  const handleConnect = async (isAdmin = false) => {
    try {
      await connectWallet();
      if (isConnected) {
        if (isAdmin) {
          console.log('Admin access granted for:', account);
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Connection error:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const handleAdminAccess = () => {
    handleConnect(true);
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center opacity-20" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold text-white mb-8"
            >
              Secure Land Registry
              <span className="block text-blue-400">on the Blockchain</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto"
            >
              Transform land transactions in Zambia with our blockchain-powered platform.
              Secure, transparent, and efficient property management.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <button
                onClick={() => handleConnect(false)}
                className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold
                  hover:bg-blue-400 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto
                  shadow-lg hover:shadow-blue-500/50"
              >
                Connect with MetaMask
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={scrollToFeatures}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
            >
              <ChevronDown size={32} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-16 text-gray-900"
          >
            Why Choose Our Platform?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Building2,
                title: "Secure Property Management",
                description: "Manage your properties with blockchain-backed security and transparency."
              },
              {
                icon: Shield,
                title: "Smart Contracts",
                description: "Automated and secure transactions with smart contract technology."
              },
              {
                icon: BookOpen,
                title: "Digital Title Deeds",
                description: "Access and manage your title deeds digitally with blockchain verification."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-white p-8 rounded-lg shadow-lg">
                  <div className="bg-blue-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-blue-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { value: "5000+", label: "Properties Registered" },
              { value: "10K+", label: "Successful Transactions" },
              { value: "3K+", label: "Active Users" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Link */}
      <div className="bg-blue-900 text-center pb-8">
        <button
          onClick={handleAdminAccess}
          className="px-6 py-2 text-sm text-blue-200 hover:text-white transition-colors border border-blue-200 hover:border-white rounded-lg"
        >
          Admin Access
        </button>
      </div>
    </div>
  );
};

export default LandingPage;