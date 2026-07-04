/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import AcreageCalculator from './pages/AcreageCalculator';
import PerimeterCalculator from './pages/PerimeterCalculator';
import CostEstimator from './pages/CostEstimator';
import FenceTypesGuide from './pages/FenceTypesGuide';
import Assumptions from './pages/Assumptions';
import FAQ from './pages/FAQ';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="acreage" element={<AcreageCalculator />} />
          <Route path="perimeter" element={<PerimeterCalculator />} />
          <Route path="cost" element={<CostEstimator />} />
          <Route path="guide" element={<FenceTypesGuide />} />
          <Route path="assumptions" element={<Assumptions />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
