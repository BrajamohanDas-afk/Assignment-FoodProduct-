// API service for OpenFoodFacts
const BASE_URL = 'https://world.openfoodfacts.org';

// Headers to help with CORS and identify our app
const fetchOptions = {
  headers: {
    'User-Agent': 'FoodProductExplorer - React App'
  }
};

export const getAllProducts = async (page = 1, pageSize = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}/cgi/search.pl?action=process&json=true&page=${page}&page_size=${pageSize}&sort_by=unique_scans_n&fields=code,product_name,image_url,image_front_url,image_small_url,categories_tags,nutrition_grades,nutrition_grade_fr,ingredients_text`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};

export const searchProducts = async (searchTerm) => {
  try {
    const response = await fetch(
      `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(searchTerm)}&json=true&page_size=20&fields=code,product_name,image_url,image_front_url,image_small_url,categories_tags,nutrition_grades,nutrition_grade_fr,ingredients_text`
    );
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

export const searchProductByBarcode = async (barcode) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
    const data = await response.json();
    return data.product || null;
  } catch (error) {
    console.error('Error fetching product by barcode:', error);
    return null;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.json`);
    const data = await response.json();
    // Return the full category objects with id (tag) and name
    return data.tags || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const searchProductsByCategory = async (categoryTag) => {
  try {
    // Use the category tag directly for the API URL
    const response = await fetch(
      `${BASE_URL}/category/${encodeURIComponent(categoryTag)}.json?page_size=20&fields=code,product_name,image_url,image_front_url,image_small_url,categories_tags,nutrition_grades,nutrition_grade_fr,ingredients_text`
    );
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error searching products by category:', error);
    return [];
  }
};
