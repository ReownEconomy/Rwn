import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavigationItem } from '../../types';

interface NavigationDropdownProps {
  items: NavigationItem[];
}

const NavigationDropdown: React.FC<NavigationDropdownProps> = ({ items }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200"
    >
      {items.map((item, index) => (
        <div key={item.label} className="relative group">
          <Link
            to={item.href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {item.label}
          </Link>
          
          {/* Nested dropdown for items with children */}
          {item.children && (
            <div className="absolute left-full top-0 ml-1 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200">
              {item.children.map((child) => (
                <Link
                  key={child.label}
                  to={child.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default NavigationDropdown;