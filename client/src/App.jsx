import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Businesses from './pages/Businesses';
import BusinessDetail from './pages/BusinessDetail';
import AddBusiness from './pages/AddBusiness';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/business/:id" element={<BusinessDetail />} />
        <Route path="/add-business" element={<AddBusiness />} />
      </Routes>
    </Router>
  );
}

export default App;