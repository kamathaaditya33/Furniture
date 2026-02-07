import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner@2.0.3';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ARViewerPage } from './pages/ARViewerPage';
import { BlueprintDesignerPage } from './pages/BlueprintDesignerPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/ar-viewer" element={<ARViewerPage />} />
            <Route path="/blueprint" element={<BlueprintDesignerPage />} />
            <Route path="/comparison/:id" element={<ComparisonPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
          <Footer />
          <Toaster position="bottom-right" richColors />
        </div>
      </Router>
    </AppProvider>
  );
}