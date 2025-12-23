
# Food Product Explorer

A React-based web application to search, filter, and explore food products using the OpenFoodFacts API. Built as an assignment to demonstrate frontend skills: API integration, state management, and responsive design.

## Table of Contents
- [Objective](#objective)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Methodology & Approach](#methodology--approach)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Future Improvements](#future-improvements)

## Objective
Create a responsive web app to explore food products. Key requirements: fetch from OpenFoodFacts API, implement search/filter/sort, show product details, and manage a shopping cart with persistence.

## Technologies Used
- **Frontend:** React.js (v18)
- **Routing:** React Router DOM (v6)
- **Styling:** Vanilla CSS
- **State Management:** React Context API (for Cart), React Hooks
- **API:** OpenFoodFacts API

## Features
### Homepage
- Product grid with images, names, and nutrition grades
- Pagination: "Load More" to fetch more products
- Responsive design for mobile, tablet, and desktop

### Search & Filter
- **Search by Name:** Real-time product search
- **Search by Barcode:** Lookup by barcode
- **Category Filter:** Filter by food category (e.g., Snacks, Dairy)
- **Sorting:** Sort by Name (A-Z, Z-A) or Nutrition Grade

### Product Detail Page
- Detailed product info: image, ingredients, nutrition grade, nutritional values, and labels
- Add to Cart from detail view

### Shopping Cart
- Global cart state via Context API
- Add from homepage or detail page
- View, update, or remove items
- Cart persists in localStorage

## Methodology & Approach
1. **Component-Based Architecture**
  - Pages: Home, ProductDetail
  - Components: ProductCard, SearchBar, CategoryFilter, SortDropdown, LoadingSpinner, Cart
2. **API Integration**
  - All API calls in `src/services/api.js` for maintainability
  - Functions: fetch all products, search by name, search by barcode, get categories, filter by category
3. **State Management**
  - Local state for search, loading, product lists
  - Global state (CartContext) for cart, with localStorage persistence
4. **Styling**
  - Vanilla CSS for layout and responsiveness
  - Clean, minimalist theme
5. **Routing**
  - React Router for navigation: `/` (Home), `/product/:barcode` (Product Detail)

## Project Structure
```
src/
  assets/                # Images and static assets
  components/            # UI components
   CategoryFilter.js
   ProductCard.js
   SearchBar.js
   SortDropdown.js
   LoadingSpinner.js
   Cart.js
  context/               # Cart context
   CartContext.js
  pages/                 # Page components
   Home.js
   ProductDetail.js
  services/              # API functions
   api.js
  App.js                 # Main app
  index.js               # Entry point
  App.css, index.css     # Global styles
```

## Setup & Installation
1. Install dependencies:
  ```bash
  npm install
  ```
2. Start the development server:
  ```bash
  npm start
  ```
  The app will open at [http://localhost:3000](http://localhost:3000)
3. Build for production:
  ```bash
  npm run build
  ```

## Future Improvements
- Infinite scrolling instead of "Load More"
- User authentication
- Enhanced error handling and loading skeletons
- Unit tests for components and services

---
**Note:** The OpenFoodFacts API is maintained by a non-profit. If the server is slow or unresponsive, please try again later.
