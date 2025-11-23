import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  Star, 
  Gift, 
  Users, 
  Crown, 
  Zap, 
  TrendingUp,
  Shield,
  Check
} from 'lucide-react';
import { rwnPacks } from '../data/products';
import { useAuthStore } from '../store/authStore';

const GetRWNPage: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const { user, updateRWNBalance } = useAuthStore();

  const handlePurchase = (pack: any) => {
    // Simulate purchase
    updateRWNBalance(pack.tokens + pack.bonus);
    setSelectedPack(null);
    // Show success message
  };

  const perks = [
    {
      icon: <Star className="h-6 w-6" />,
      title: "Early Access to Drops",
      description: "Be the first to shop new collections before they go public"
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Exclusive Discounts",
      description: "Access member-only sales and special pricing"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Giveaway Access",
      description: "Enter exclusive giveaways for premium products"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Referral Bonuses",
      description: "Earn extra RWN when friends join using your code"
    },
    {
      icon: <Crown className="h-6 w-6" />,
      title: "VIP Tier Benefits",
      description: "Unlock premium perks as you level up your membership"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Priority Support",
      description: "Get faster customer service and dedicated support"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Coins className="h-12 w-12" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-6">Get RWN Tokens</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Unlock exclusive rewards, discounts, and VIP perks with REOWN's revolutionary token system
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
              <div className="text-3xl font-bold mb-2">$1 RWN = $0.01 USD</div>
              <div className="text-blue-100">Plus 10% discount when paying with RWN</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Balance */}
      {user && (
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {user.rwnBalance.toLocaleString()} RWN
                </div>
                <div className="text-gray-600">Current Balance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${(user.rwnBalance * 0.01).toFixed(2)}
                </div>
                <div className="text-gray-600">USD Value</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Token Packs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Pack</h2>
            <p className="text-xl text-gray-600">Select the perfect RWN token pack for your needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rwnPacks.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
                  pack.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {pack.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      ${pack.price}
                    </div>
                    <div className="text-lg text-gray-600 mb-4">
                      {pack.tokens.toLocaleString()} RWN
                    </div>
                    {pack.bonus > 0 && (
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                        +{pack.bonus} Bonus RWN
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>10% discount on all purchases</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>No expiration date</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Instant delivery</span>
                    </div>
                    {pack.bonus > 0 && (
                      <div className="flex items-center text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>Bonus tokens included</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handlePurchase(pack)}
                    className={`w-full py-3 px-4 rounded-md font-semibold transition-colors ${
                      pack.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    Purchase Pack
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How RWN Works</h2>
            <p className="text-xl text-gray-600">Simple, transparent, and rewarding</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Purchase RWN Tokens",
                description: "Buy RWN token packs at $0.01 per token with bonus rewards on larger packs"
              },
              {
                step: "2",
                title: "Shop & Save",
                description: "Use RWN tokens to pay for products and automatically get 10% off your total"
              },
              {
                step: "3",
                title: "Earn More Rewards",
                description: "Unlock VIP perks, early access, and exclusive discounts as you use more RWN"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Holder Perks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">RWN Holder Perks</h2>
            <p className="text-xl text-gray-600">Exclusive benefits for our token holders</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{perk.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-gray-600">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Tiers */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">VIP Tier Benefits</h2>
            <p className="text-xl text-purple-100">Level up your membership for even more rewards</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tier: "Standard",
                requirement: "0+ RWN",
                benefits: ["10% RWN discount", "Basic support", "Standard shipping"],
                color: "bg-white/10"
              },
              {
                tier: "VIP",
                requirement: "10,000+ RWN",
                benefits: ["15% RWN discount", "Priority support", "Free shipping", "Early access"],
                color: "bg-white/20"
              },
              {
                tier: "Premium",
                requirement: "50,000+ RWN",
                benefits: ["20% RWN discount", "Dedicated support", "Express shipping", "Exclusive events", "Personal shopper"],
                color: "bg-white/30"
              }
            ].map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`${tier.color} backdrop-blur-sm rounded-lg p-6`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{tier.tier}</h3>
                  <p className="text-purple-100">{tier.requirement}</p>
                </div>
                
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-300" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetRWNPage;