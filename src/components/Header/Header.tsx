import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { mainNavigation, authenticatedNavigation } from '../../data/navigation';
import NavigationDropdown from './NavigationDropdown';
import MobileMenu from './MobileMenu';
import AuthModal from '../Auth/AuthModal';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  
  const { isAuthenticated, user, logout } = useAuthStore();
  const { toggleCart, getTotalItems } = useCartStore();
  
  const totalItems = getTotalItems();

  const headerImages = {
    'Womens': 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'Mens': 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'Electronics': 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1920'
  };

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
    if (headerImages[label as keyof typeof headerImages]) {
      setHeaderImage(headerImages[label as keyof typeof headerImages]);
    }
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
    setHeaderImage(null);
  };

  const handleLogout = () => {
    logout();
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Dynamic Header Image Overlay */}
      <AnimatePresence>
        {headerImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pointer-events-none"
          >
            <div className="relative w-full h-screen">
              <img
                src={headerImage}
                alt="Header Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-center text-white"
                >
                  <h2 className="text-5xl font-bold mb-4">
                    {activeDropdown === 'Mens' ? "Men's Collection" : 
                     activeDropdown === 'Womens' ? "Women's Collection" : 
                     "Electronics"}
                  </h2>
                  <p className="text-xl text-gray-200 mb-8">
                    {activeDropdown === 'Mens' ? "Discover premium men's fashion and accessories" : 
                     activeDropdown === 'Womens' ? "Explore luxury women's fashion and style" : 
                     "Cutting-edge technology and gadgets"}
                  </p>
                  <Link
                    to={`/${activeDropdown?.toLowerCase()}`}
                    className="inline-flex items-center px-8 py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        {/* Top Banner */}
        <div className="bg-black text-white text-center py-2 text-sm">
          <p>Free shipping on orders over $100 | Use RWN tokens for 10% off</p>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src="/1000000240.jpg" 
                alt="REOWN" 
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {mainNavigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.href}
                    className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                  
                  <AnimatePresence>
                    {activeDropdown === item.label && item.children && (
                      <NavigationDropdown items={item.children} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              {/* Authenticated Navigation */}
              {isAuthenticated && authenticatedNavigation.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* RWN Balance (if authenticated) */}
              {isAuthenticated && user && (
                <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  <span className="font-medium">{user.rwnBalance.toLocaleString()} RWN</span>
                </div>
              )}

              {/* User Account */}
              <div className="relative">
                {isAuthenticated ? (
                  <div
                    className="relative"
                    onMouseEnter={() => handleMouseEnter('account')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                      <User className="h-6 w-6" />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === 'account' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                        >
                          <Link
                            to="/account"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            My Account
                          </Link>
                          <Link
                            to="/orders"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Orders
                          </Link>
                          <Link
                            to="/wishlist"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Wishlist
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <User className="h-6 w-6" />
                  </button>
                )}
              </div>

              {/* Shopping Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ShoppingBag className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Header;