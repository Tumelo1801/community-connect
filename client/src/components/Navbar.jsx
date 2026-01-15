import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
          >
            🏪 Community Connect
          </div>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/businesses')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Browse
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add Business
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;