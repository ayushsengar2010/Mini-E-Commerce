import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import FilterBar from './components/FilterBar';
import Cart from './components/Cart';
import ProductModal from './components/ProductModal';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load products from API
  useEffect(() => {
    fetchProducts();
    loadCartFromStorage();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from storage:', error);
      }
    }
  };

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply sorting
    if (sortOrder === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortOrder]);

  const handleAddToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Check if we can add more (assuming max stock is 10 for demo)
        const maxStock = 10;
        if (existingItem.quantity >= maxStock) {
          alert('Cannot add more items. Maximum stock reached.');
          return prevCart;
        }
        
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const handleUpdateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }

    const maxStock = 10;
    if (newQuantity > maxStock) {
      alert('Quantity cannot exceed available stock.');
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, [handleRemoveFromCart]);

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortOrder('');
  }, []);

  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>E-Commerce Store</h1>
          <div className="cart-icon">
            <span className="cart-badge">{cartItemCount}</span>
            🛒
          </div>
        </div>
      </header>

      <main className="container main-content">
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onClearFilters={handleClearFilters}
        />

        <div className="content-grid">
          <div className="products-section">
            {loading ? (
              <div className="loading">Loading products...</div>
            ) : (
              <ProductList
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                cart={cart}
                onProductClick={setSelectedProduct}
              />
            )}
          </div>

          <div className="cart-section">
            <Cart
              cart={cart}
              onRemoveItem={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              total={cartTotal}
            />
          </div>
        </div>
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default App;
