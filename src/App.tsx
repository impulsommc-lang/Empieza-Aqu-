/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/zapatos" element={<Catalog />} />
            <Route path="/zapatos/:slug" element={<ProductDetail />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}
