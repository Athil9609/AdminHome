import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './Dash';
import DashboardMain from './DashboardMain';
import Categories from './Category/Categories';
import Subcategories from './Category/SubCategories';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />}>
        <Route index element={<DashboardMain />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/subcategories/:categoryId/:categoryName" element={<Subcategories />} />
      </Route>
    </Routes>
  );
};

export default App;
