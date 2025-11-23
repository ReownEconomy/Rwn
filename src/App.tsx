import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import CartSidebar from './components/Cart/CartSidebar';
import HomePage from './pages/HomePage';
import GetRWNPage from './pages/GetRWNPage';
import ProductGrid from './components/ProductGrid/ProductGrid';
import { sampleProducts } from './data/products';

function App() {
  const womensProducts = sampleProducts.filter(p => p.category === 'womens');
  const mensProducts = sampleProducts.filter(p => p.category === 'mens');
  const electronicsProducts = sampleProducts.filter(p => p.category === 'electronics');
  const trendingProducts = sampleProducts.filter(p => p.isTrending);
  const newProducts = sampleProducts.filter(p => p.isNew);
  const saleProducts = sampleProducts.filter(p => p.isOnSale);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/get-rwn" element={<GetRWNPage />} />
            
            {/* Category Pages */}
            <Route 
              path="/womens" 
              element={<ProductGrid products={womensProducts} title="Women's Collection" />} 
            />
            <Route 
              path="/womens/*" 
              element={<ProductGrid products={womensProducts} title="Women's Collection" />} 
            />
            <Route 
              path="/mens" 
              element={<ProductGrid products={mensProducts} title="Men's Collection" />} 
            />
            <Route 
              path="/mens/*" 
              element={<ProductGrid products={mensProducts} title="Men's Collection" />} 
            />
            <Route 
              path="/electronics" 
              element={<ProductGrid products={electronicsProducts} title="Electronics" />} 
            />
            <Route 
              path="/electronics/*" 
              element={<ProductGrid products={electronicsProducts} title="Electronics" />} 
            />
            
            {/* Special Collections */}
            <Route 
              path="/trending" 
              element={<ProductGrid products={trendingProducts} title="Trending Now" />} 
            />
            <Route 
              path="/new" 
              element={<ProductGrid products={newProducts} title="New Arrivals" />} 
            />
            <Route 
              path="/sale" 
              element={<ProductGrid products={saleProducts} title="Sale Items" />} 
            />
            
            {/* Fallback for all other routes */}
            <Route 
              path="*" 
              element={<ProductGrid products={sampleProducts} title="All Products" />} 
            />
          </Routes>
        </main>
        
        <CartSidebar />
      </div>
    </Router>
  );
}

export default App;