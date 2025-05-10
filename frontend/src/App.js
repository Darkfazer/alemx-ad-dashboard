import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdUpload from './components/AdUpload';

// Add this ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/upload" 
          element={
            <ProtectedRoute>
              <AdUpload />
            </ProtectedRoute>
          } 
        />
        {/* Add other protected routes similarly */}
      </Routes>
    </BrowserRouter>
  );
}