import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ChecklistPage from './pages/ChecklistPage.jsx';

// App is the top-level shell: it sets up routing and decides which page to show.
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Visiting "/" sends you straight to the checklist for Phase 1 testing */}
        <Route path="/" element={<Navigate to="/checklist" replace />} />
        <Route path="/checklist" element={<ChecklistPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
