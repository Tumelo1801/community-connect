import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Businesses() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchTerm = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  // Filter businesses based on search and category
  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !category || business.category === category;
    return matchesSearch && matchesCategory;
  });
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const load = async () => {
      try {
        const response = await axios.get('https://community-connect-backend-w11v.onrender.com/api/businesses', {
          signal: controller.signal,
        });
        if (!isMounted) return;
        setBusinesses(response.data);
      } catch (error) {
        // Ignore abort errors, log others
        if (error.name !== 'CanceledError' && !(axios.isCancel && axios.isCancel(error))) {
          console.error('Error fetching businesses:', error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🔍</div>
          <div className="text-2xl font-bold text-gray-600">Finding businesses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-linear-to-br from-orange-400 via-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🏘️</span>
              </div>
              <span className="text-xl font-bold">Community Connect</span>
            </div>
            
            <div className="flex items-center gap-4">
              
              <button 
  onClick={() => navigate('/add-business')}
  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors"
>
  Add Your Business
</button>
              
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div className="bg-linearq-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-gray-200 mb-6 transition-colors"
          >
            ← Back to Home
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category ? `${category}` : 'All Businesses'}
          </h1>
          
          {searchTerm && (
            <p className="text-xl text-blue-100 mb-2">
              Search results for: "{searchTerm}"
            </p>
          )}
          
          <div className="flex items-center gap-2 text-blue-100">
            <span className="text-2xl font-bold">{filteredBusinesses.length}</span>
            <span>businesses found</span>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/businesses')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                !category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => navigate('/businesses?category=Salon')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                category === 'Salon' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💇 Salons
            </button>
            <button
              onClick={() => navigate('/businesses?category=Restaurant')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                category === 'Restaurant' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🍽️ Restaurants
            </button>
            <button
              onClick={() => navigate('/businesses?category=Auto Repair')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                category === 'Auto Repair' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔧 Mechanics
            </button>
          </div>
        </div>
      </div>

      {/* Business Grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">😔</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No businesses found</h2>
            <p className="text-xl text-gray-600 mb-8">
              Try adjusting your search or browse all businesses
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors"
            >
              Go Back Home
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <div
                key={business.id}
                onClick={() => navigate(`/business/${business.id}`)}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-1"
              >
                {/* Business Image Placeholder */}
                <div className="h-48 bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-6xl">
                    {business.category === 'Salon' ? '💇' : 
                     business.category === 'Restaurant' ? '🍽️' : 
                     business.category === 'Auto Repair' ? '🔧' : '🏪'}
                  </span>
                </div>

                {/* Business Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {business.name}
                      </h3>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {business.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-orange-500 font-bold ml-2">
                      ⭐ 4.8
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-2">📍</span>
                    <span>{business.location}</span>
                    <span className="ml-auto text-sm text-gray-500">2.5 km</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Calling...');
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-semibold"
                    >
                      📞 Call
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Opening WhatsApp...');
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      💬 WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-orange-400 via-red-400 to-pink-500 rounded-lg"></div>
                <span className="text-xl font-bold">Community Connect</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting communities with local businesses across South Africa.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Community Connect. Proudly South African 🇿🇦
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Businesses;