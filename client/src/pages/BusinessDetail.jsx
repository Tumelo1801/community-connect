import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BusinessDetail() {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchBusiness = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/businesses/${id}`);
        if (isMounted) {
          setBusiness(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching business:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBusiness();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCall = () => {
    if (business?.phone) {
      window.location.href = `tel:${business.phone}`;
    }
  };

  const handleWhatsApp = () => {
    if (business?.whatsapp) {
      window.open(`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🔍</div>
          <div className="text-2xl font-bold text-gray-600">Loading business...</div>
        </div>
      </div>
    );
  }

  if (!business) {
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
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="text-6xl mb-6">😔</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Business not found</h2>
            <button
              onClick={() => navigate('/businesses')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors"
            >
              Back to Businesses
            </button>
          </div>
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
              
              <button className="px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors">
                Add Your Business
              </button>
             
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/businesses')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-semibold transition-colors"
        >
          ← Back to Businesses
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Business Image */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="h-96 bg-linear-to-br from-blue-100 to-purple-100 overflow-hidden">
                {business.image ? (
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-9xl">
                    {business.category === 'Salon' ? '💇' : 
                     business.category === 'Restaurant' ? '🍽️' : 
                     business.category === 'Auto Repair' ? '🔧' : 
                     business.category === 'Tailor' ? '👔' : 
                     business.category === 'Grocery' ? '🛒' : 
                     business.category === 'Tech Repair' ? '📱' : '🏪'}
                  </div>
                )}
              </div>
            </div>

            {/* Business Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    {business.name}
                  </h1>
                  <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                    {business.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-orange-500 text-2xl font-bold">
                  ⭐ {business.rating}
                  <span className="text-sm text-gray-500">({business.review_count} reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">About</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {business.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Location</h2>
                  <div className="flex items-center text-gray-700 text-lg">
                    <span className="mr-3 text-2xl">📍</span>
                    <span>{business.location}</span>
                    {business.distance && (
                      <span className="ml-auto text-gray-500">{business.distance} km away</span>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Operating Hours</h2>
                  <div className="flex items-center text-gray-700 text-lg">
                    <span className="mr-3 text-2xl">⏰</span>
                    <span>{business.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <button
                  onClick={handleCall}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold text-lg"
                >
                  📞 Call Now
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold text-lg"
                >
                  💬 WhatsApp
                </button>

                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-600 mb-2">Phone Number</div>
                  <div className="font-semibold text-gray-900">{business.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default BusinessDetail;