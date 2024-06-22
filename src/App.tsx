import React from 'react';
import { Routes, Route } from 'react-router-dom';

import InitialPage from './pages/InitialPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<InitialPage />} />
    </Routes>
  );
};

export default App;
