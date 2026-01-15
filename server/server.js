const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const supabase = require('./config/db');

dotenv.config();

// console.log('=== SERVER STARTING ===');
// console.log('Supabase URL:', process.env.SUPABASE_URL);
// console.log('Supabase Key exists:', !!process.env.SUPABASE_SERVICE_KEY);
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for development
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Get all businesses from database
app.get('/api/businesses', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
});

// Get single business by ID from database
app.get('/api/businesses/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Business not found' });
    }
  } catch (error) {
    console.error('Error fetching business:', error);
    res.status(500).json({ error: 'Failed to fetch business' });
  }
});

// Add new business to database
app.post('/api/businesses', async (req, res) => {
  try {
    const { name, category, location, description, phone, whatsapp, hours, image } = req.body;

    const { data, error } = await supabase
      .from('businesses')
      .insert([
        {
          name,
          category,
          location,
          description,
          phone,
          whatsapp,
          hours,
          rating: 4.5, // Default rating for new businesses
          review_count: 0,
          distance: Math.random() * 5, // Random distance for now
          image: image || null
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error adding business:', error);
    res.status(500).json({ error: 'Failed to add business' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});