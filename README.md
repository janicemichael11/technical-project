# PricePulse - Product Price Comparison

A full-stack web application for comparing product prices across multiple e-commerce platforms.

## Project Structure

```
pricepulse/
├── frontend/          # React + Vite frontend application
│   ├── public/        # Static assets
│   ├── src/          # React source code
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service functions
│   │   ├── hooks/       # Custom React hooks
│   │   ├── context/     # React context providers
│   │   └── data/        # Mock data and constants
│   ├── package.json
│   └── vite.config.js
├── backend/           # Node.js + Express backend API
│   ├── config/        # Database and app configuration
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Express middleware
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── services/      # Business logic services
│   ├── utils/         # Utility functions
│   ├── app.js         # Express app setup
│   ├── server.js      # Server entry point
│   └── package.json
├── .env              # Environment variables (shared)
├── .gitignore        # Git ignore rules
└── package.json      # Root project configuration
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pricepulse
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` in the root directory
   - Update the values as needed

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend (port 5000) and frontend (port 5173) servers concurrently.

### Alternative: Run services separately

**Backend only:**
```bash
cd backend
npm install
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/products/search?q=query` - Search products
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Development

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:server` - Start only the backend server
- `npm run dev:client` - Start only the frontend client
- `npm run build` - Build the frontend for production
- `npm run install:all` - Install dependencies for all services

### Environment Variables

Create a `.env` file in the root directory with:

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/price_comparison
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
CACHE_TTL_MINUTES=10
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.