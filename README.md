# Himalayan Adventures - Trek Booking Platform

A modern, responsive web application for booking Himalayan trekking adventures. Built with React, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Trek Discovery**: Browse and explore various Himalayan treks with detailed information
- **Interactive Search**: Advanced filtering by difficulty, duration, season, and price
- **User Authentication**: Secure signup/login with email verification
- **Shopping Cart**: Add multiple treks and manage bookings
- **Booking System**: Complete booking flow with participant details
- **User Dashboard**: Manage bookings, profile, and booking history
- **Responsive Design**: Optimized for all devices and screen sizes
- **Real-time Updates**: Live booking status and availability

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Storage)
- **Routing**: React Router DOM
- **UI Components**: shadcn/ui with Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or later
- **npm**: v8.0.0 or later
- **Git**: Latest version

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd himalayan-adventures
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment template and configure your variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Note**: You can get these values from your Supabase project dashboard at https://supabase.com/dashboard

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🗄️ Database Setup

The application uses Supabase as the backend. The database schema includes:

### Tables:
- **treks**: Trek information and details
- **user_profiles**: User profile data
- **bookings**: Booking records and status
- **cart_items**: Shopping cart functionality
- **reviews**: User reviews and ratings

### Key Features:
- **Row Level Security (RLS)**: Ensures users can only access their own data
- **Authentication**: Email/password with optional email verification
- **Real-time subscriptions**: Live updates for booking changes

### Setting up Supabase:

1. Create a new project at [Supabase](https://supabase.com)
2. Go to **Settings → API** to get your URL and anon key
3. Update your `.env.local` file with these credentials
4. The database schema will be automatically created when you first run the app

## 📱 Mock Data Mode

For development without internet or to test the UI, you can use mock data:

```typescript
import { useMockData } from '@/lib/mockData';

// In your component
const { treks, isUsingMockData } = useMockData();
```

To toggle mock data mode, set `USE_MOCK_DATA=true` in your `.env.local` file.

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/ui/          # Reusable UI components
├── hooks/                  # Custom React hooks
├── integrations/supabase/  # Supabase configuration and types
├── lib/                    # Utility functions and types
├── pages/                  # Page components
├── assets/                 # Images and static assets
└── main.tsx               # Application entry point
```

## 🎨 Design System

The application uses a custom design system with:

- **Typography**: Display and body font variants
- **Colors**: Semantic color tokens for consistent theming
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components with variants

## 🔐 Authentication

User authentication is handled by Supabase Auth with:

- Email/password signup and login
- Email verification (can be disabled in Supabase settings for development)
- Automatic session management
- Protected routes for authenticated users

## 🛒 Booking Flow

1. **Browse Treks**: Discover available treks
2. **Add to Cart**: Select dates and add treks to cart
3. **Review Cart**: Manage quantities and selections
4. **Booking**: Fill participant details and preferences
5. **Payment**: Secure payment processing (integration ready)
6. **Confirmation**: Booking confirmation and details

## 📊 User Dashboard

Authenticated users can:
- View booking history
- Manage profile information
- Track booking status
- Leave reviews for completed treks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: support@himalayan-adventures.com
- Phone: +91 98765 43210

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Trekking! 🏔️**