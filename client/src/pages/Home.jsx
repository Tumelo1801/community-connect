import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BusinessMap from '../components/BusinessMap';
import { calculateDistance } from '../utils/distance';


function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

// Set location to Zeerust for consistent portfolio demo
useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setUserLocation([-25.5388, 26.0850]);
}, []);
const navigate = useNavigate();


useEffect(() => {
const fetchBusinesses = async () => {
  try {
    const response = await axios.get('https://community-connect-backend-w11v.onrender.com/api/businesses');
    let businessData = response.data;
    
    // console.log('User Location:', userLocation);
    // console.log('Raw business data:', businessData[0]);
    
    // Calculate distances if user location is available
    if (userLocation) {
      businessData = businessData.map(business => {
        if (business.latitude && business.longitude) {
           
          const distance = calculateDistance(
            userLocation[0],
            userLocation[1],
            business.latitude,
            business.longitude
          );
          // console.log(`Distance to ${business.name}:`, distance, 'km');
          return { ...business, distance };
        }
        return business;
      });
    }
    
    setBusinesses(businessData);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    setLoading(false);
  }
};

  fetchBusinesses();
}, [userLocation]);

  const categories = [
    { name: 'Salon', icon: '💇', displayName: 'Hair & Beauty' },
    { name: 'Restaurant', icon: '🍽️', displayName: 'Food & Drink' },
    { name: 'Auto Repair', icon: '🔧', displayName: 'Repairs & Services' },
    { name: 'Grocery', icon: '🏪', displayName: 'Shops & Spaza' }
  ];

  // Get featured businesses (first 3)
  const featuredBusinesses = businesses.slice(0, 3);

  // Get nearby businesses (sorted by distance)
  const nearbyBusinesses = businesses
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    .slice(0, 3);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/businesses?search=${searchTerm}`);
    } else {
      navigate('/businesses');
    }
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (whatsapp) => {
    window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
  };

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

      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200)',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Discover Local Businesses
          </h1>
          <p className="text-2xl text-white mb-2 drop-shadow-lg">
            in Zeerust, North West
          </p>
          <p className="text-lg text-gray-200 mb-8 drop-shadow-lg">
            Support your community. Find trusted local services near you.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-3 flex gap-3">
            <input
              type="text"
              placeholder="Search for businesses, services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-6 py-4 rounded-lg focus:outline-none text-lg"
            />
            <button
              type="submit"
              className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-linear-to-b from-orange-50 to-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => navigate(`/businesses?category=${cat.name}`)}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 text-center group"
              >
                <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div className="font-bold text-gray-800 text-lg">{cat.displayName}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Businesses Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Businesses</h2>
          <button
            onClick={() => navigate('/businesses')}
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
          >
            View All →
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">Loading businesses...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {featuredBusinesses.map((business) => (
              <div
                key={business.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1"
              >
                <div 
                  className="h-48 bg-gray-200 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/business/${business.id}`)}
                >
                  {business.image ? (
                    <img
                      src={business.image}
                      alt={business.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl">
                      {business.category === 'Salon' ? '💇' : 
                       business.category === 'Restaurant' ? '🍽️' : 
                       business.category === 'Auto Repair' ? '🔧' : '🏪'}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 
                    className="text-xl font-bold text-gray-900 mb-1 cursor-pointer hover:text-blue-600"
                    onClick={() => navigate(`/business/${business.id}`)}
                  >
                    {business.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {business.category} - {business.location}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-orange-500 font-bold">
                      ⭐ {business.rating}
                    </div>
                    {business.distance && (
                      <span className="text-sm text-gray-500">{business.distance} km</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCall(business.phone)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-semibold"
                    >
                      📞 Call
                    </button>
                    <button
                      onClick={() => handleWhatsApp(business.whatsapp)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                    >
                      💬 WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/businesses')}
            className="px-10 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            View All Businesses in Zeerust
          </button>
        </div>

        {/* Two Column Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Nearby Businesses */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Nearby Businesses</h3>
            
            {/* Interactive Map */}
<div className="h-64 rounded-lg mb-6 overflow-hidden">
  <BusinessMap 
    businesses={nearbyBusinesses}
    userLocation={userLocation}
    onBusinessClick={(business) => navigate(`/business/${business.id}`)}
  />
</div>
            <div className="space-y-3">
              {nearbyBusinesses.map((business) => (
                <div
                  key={business.id}
                  onClick={() => navigate(`/business/${business.id}`)}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div>
                    <div className="font-bold text-gray-900">{business.name}</div>
                    <div className="text-sm text-gray-600">
                      {business.category} - {business.distance ? `${business.distance} km away` : 'Distance unknown'}
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                    View →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Why Use Community Connect */}
          <div className="bg-linear-to-br from-orange-50 to-red-50 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Use Community Connect?
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <div className="font-bold text-gray-900">Find Hidden Local Gems</div>
                  <div className="text-sm text-gray-600">Discover businesses in Zeerust you never knew existed</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <div className="font-bold text-gray-900">Support Small Businesses</div>
                  <div className="text-sm text-gray-600">Keep money in your community</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <div className="font-bold text-gray-900">Easy to Use & Free</div>
                  <div className="text-sm text-gray-600">No registration needed to browse</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <div className="font-bold text-gray-900">Real Contact Details</div>
                  <div className="text-sm text-gray-600">Call or WhatsApp businesses directly</div>
                </div>
              </div>
            </div>

            <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400"
                alt="Happy business owner"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
<div className="h-64 bg-gray-200 rounded-lg mb-6 overflow-hidden">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57347.42093662771!2d26.057082!3d-25.538857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebff5d3f2d3f3f3%3A0x3d3d3d3d3d3d3d3d!2sZeerust%2C%20South%20Africa!5e0!3m2!1sen!2s!4v1234567890123"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-orange-400 via-red-400 to-pink-500 rounded-lg"></div>
                <span className="text-xl font-bold">Community Connect</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting Zeerust community with local businesses.
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
              © 2026 Community Connect. Proudly serving Zeerust 🇿🇦
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

export default Home;