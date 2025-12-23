import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProducts, searchProductByBarcode, getCategories, getAllProducts, searchProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortDropdown from '../components/SortDropdown';
import LoadingSpinner from '../components/LoadingSpinner';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [barcodeSearch, setBarcodeSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      const categoryData = data.slice(0, 10).map(cat => ({
        tag: cat.id,
        name: cat.name || cat.id
      }));
      setCategories(categoryData);
    };
    fetchCategories();
  }, []);

  const fetchProducts = async (pageNum) => {
    setLoading(true);
    const data = await getAllProducts(pageNum);
    if (data.length === 0) {
      setHasMore(false);
    } else {
      setProducts(prev => pageNum === 1 ? data : [...prev, ...data]);
      setPage(pageNum);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  useEffect(() => {
    let filtered = [...products];
    filtered = sortProducts(filtered, sortBy);
    setFilteredProducts(filtered);
  }, [products, sortBy]);

  const handleCategoryChange = async (categoryTag) => {
    setSelectedCategory(categoryTag);
    setProducts([]);
    setFilteredProducts([]);
    setLoading(true);
    setPage(1);
    
    if (categoryTag) {
      const data = await searchProductsByCategory(categoryTag);
      setProducts(data);
      setHasMore(false);
    } else {
      setHasMore(true);
      const data = await getAllProducts(1);
      setProducts(data);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setHasMore(true);
      fetchProducts(1);
      return;
    }

    setLoading(true);
    const data = await searchProducts(searchTerm);
    setProducts(data);
    setHasMore(false);
    setLoading(false);
  };

  const handleBarcodeSearch = async () => {
    if (!barcodeSearch.trim()) return;

    setLoading(true);
    const product = await searchProductByBarcode(barcodeSearch);
    if (product) {
      navigate(`/product/${barcodeSearch}`);
    } else {
      alert('Product not found with this barcode');
    }
    setLoading(false);
  };

  const sortProducts = (products, sortType) => {
    const sorted = [...products];

    switch (sortType) {
      case 'name-asc':
        return sorted.sort((a, b) => 
          (a.product_name || '').localeCompare(b.product_name || '')
        );
      case 'name-desc':
        return sorted.sort((a, b) => 
          (b.product_name || '').localeCompare(a.product_name || '')
        );
      case 'grade-asc':
        return sorted.sort((a, b) => {
          const gradeA = a.nutrition_grades || a.nutrition_grade_fr || 'z';
          const gradeB = b.nutrition_grades || b.nutrition_grade_fr || 'z';
          return gradeA.localeCompare(gradeB);
        });
      case 'grade-desc':
        return sorted.sort((a, b) => {
          const gradeA = a.nutrition_grades || a.nutrition_grade_fr || 'z';
          const gradeB = b.nutrition_grades || b.nutrition_grade_fr || 'z';
          return gradeB.localeCompare(gradeA);
        });
      default:
        return sorted;
    }
  };

  const handleProductClick = (product) => {
    if (product.code) {
      navigate(`/product/${product.code}`);
    }
  };

  const loadMore = () => {
    fetchProducts(page + 1);
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Food Product Explorer</h1>
        <p>Search and explore food products using OpenFoodFacts API</p>
      </header>

      <div className="search-section">
        <div className="search-wrapper">
          <h3>Search by Name</h3>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={handleSearch}
            placeholder="Search for food products..."
          />
        </div>

        <div className="search-wrapper">
          <h3>Search by Barcode</h3>
          <SearchBar
            value={barcodeSearch}
            onChange={setBarcodeSearch}
            onSearch={handleBarcodeSearch}
            placeholder="Enter barcode..."
          />
        </div>
      </div>

      <div className="filters-section">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <SortDropdown
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      {filteredProducts.length === 0 && loading && <LoadingSpinner />}

      {filteredProducts.length === 0 && !loading && (
        <div className="no-results">
          <p>No products found. Try a different search term or filter.</p>
        </div>
      )}

      {filteredProducts.length > 0 && (
        <>
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={`${product.code}-${index}`}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>

          {hasMore && (
            <div className="load-more-section">
              <button 
                className="load-more-button" 
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
