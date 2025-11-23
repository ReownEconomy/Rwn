import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, CreditCard, Coins } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

const CartSidebar: React.FC = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeItem, 
    getTotalPrice, 
    getRWNPrice 
  } = useCartStore();
  
  const { isAuthenticated, user } = useAuthStore();
  
  const totalPrice = getTotalPrice();
  const rwnPrice = getRWNPrice();
  const canPayWithRWN = isAuthenticated && user && user.rwnBalance >= rwnPrice;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={toggleCart}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-96 bg-white z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex space-x-4 p-4 border border-gray-200 rounded-lg">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.product.name}</h3>
                          <p className="text-xs text-gray-500">{item.product.brand}</p>
                          <p className="text-xs text-gray-500">
                            {item.size} • {item.color}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-medium text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                              {item.product.rwnEligible && (
                                <p className="text-xs text-blue-600">
                                  {Math.ceil(item.product.price * item.quantity * 0.9 * 100).toLocaleString()} RWN
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.product.id, item.size, item.color)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <X className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t pt-6">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Payment Options */}
                    <div className="space-y-3">
                      {/* Regular Checkout */}
                      <button className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Checkout - ${totalPrice.toFixed(2)}</span>
                      </button>

                      {/* RWN Checkout */}
                      {isAuthenticated && (
                        <button
                          disabled={!canPayWithRWN}
                          className={`w-full py-3 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 ${
                            canPayWithRWN
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <Coins className="h-4 w-4" />
                          <span>
                            Pay with RWN - {rwnPrice.toLocaleString()} RWN
                            {!canPayWithRWN && ' (Insufficient Balance)'}
                          </span>
                        </button>
                      )}

                      {!isAuthenticated && (
                        <p className="text-sm text-gray-600 text-center">
                          Sign in to pay with RWN tokens and get 10% off
                        </p>
                      )}
                    </div>

                    {/* RWN Balance Display */}
                    {isAuthenticated && user && (
                      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Your RWN Balance</span>
                          <span className="font-medium text-blue-600">
                            {user.rwnBalance.toLocaleString()} RWN
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;