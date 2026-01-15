# Community Connect

A local business discovery platform for Zeerust, North West Province, South Africa.

## What is this?

I built this platform to help people find local businesses in my town, Zeerust. A lot of great businesses here don't have websites or even show up on Google Maps - like the lady who makes the best vetkoek, or the uncle who fixes phones from his garage. This project connects them with customers.

## Why I built this

In small towns like Zeerust, most businesses rely on word-of-mouth. If you're new to the area or just looking for a specific service, it's hard to know what's available. I wanted to create something that helps both business owners get visibility and customers find what they need.

## Features

**What you can do:**
- Search for businesses by name or type of service
- See businesses on a map with their locations
- Filter by category (salons, restaurants, mechanics, etc.)
- See how far each business is from the town center
- Call or WhatsApp businesses directly
- Add your own business for free

**For business owners:**
- List your business with photos and description
- Share your operating hours and contact details
- Reach more customers in the area

## Technologies I used

**Frontend:**
- React for the user interface
- Tailwind CSS for styling
- React Router for navigation
- Leaflet for the interactive map

**Backend:**
- Node.js and Express for the server
- Supabase (PostgreSQL) for the database
- RESTful API design

## How to run it locally

You'll need Node.js installed on your computer.

**Setup:**

1. Clone this repository
2. Install dependencies for both frontend and backend:
```
   cd server
   npm install
   
   cd ../client
   npm install
```

3. Set up your Supabase database:
   - Create a free account at supabase.com
   - Create a new project
   - Run the SQL schema (in the database setup section below)
   - Copy your project URL and service key

4. Create a `.env` file in the server folder:
```
   SUPABASE_URL=your_project_url
   SUPABASE_SERVICE_KEY=your_service_key
   PORT=5000
```

5. Start the backend:
```
   cd server
   npm run dev
```

6. Start the frontend (in a new terminal):
```
   cd client
   npm run dev
```

7. Open http://localhost:5173 in your browser

**Database setup:**

Run this in your Supabase SQL Editor to create the businesses table:
```sql
CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  phone TEXT,
  whatsapp TEXT,
  hours TEXT,
  rating DECIMAL(2,1),
  review_count INTEGER DEFAULT 0,
  distance DECIMAL(4,1),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Project structure
```
community-connect/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── server/          # Node.js backend
│   ├── config/
│   ├── server.js
│   └── package.json
└── README.md
```

## What I learned

This was my first full-stack project where I handled everything from database design to the user interface. Some key things I learned:

- Building RESTful APIs with Express
- Working with PostgreSQL databases
- Managing state in React applications
- Integrating maps and calculating distances between coordinates
- Responsive design with Tailwind CSS
- Connecting frontend and backend applications

## Challenges I faced

The hardest part was getting the distance calculations right. I had to learn about the Haversine formula to calculate distances between GPS coordinates. Also, getting the map to display business locations correctly took some debugging.

## Future improvements

If I continue working on this, I'd like to add:
- User accounts so people can save favorite businesses
- A proper review and rating system
- The ability for business owners to upload multiple photos
- Better mobile experience
- Support for local languages (Setswana, isiZulu)

## About me

I'm an Information Technolgy student learning full-stack web development. This project is part of my portfolio to demonstrate what I've learned so far. I'm particularly interested in building applications that solve real problems in my community.

## Contact

Feel free to reach out if you have questions or suggestions:
- Email: tumiitumelo32@gmail.com
- LinkedIn: www.linkedin.com/in/tumelo-seleka
- GitHub: @Tumelo1801

