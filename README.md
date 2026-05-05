# Tech Jobs Platform 🚀

A modern, full-stack tech job board platform designed for the tech community in Bangladesh. It features a sleek dark-themed interface, robust recruitment management, and real-time administrative oversight.

**Live Demo:** [tech-jobs-aru.vercel.app](https://tech-jobs-aru.vercel.app/)  
**Backend API:** [tech-jobs-backend.vercel.app](https://tech-jobs-backend.vercel.app/)

## 🌟 Key Features

### 👤 For Candidates
- **Browse & Filter:** Discover jobs by specialty, location, and job type.
- **Rich Company Profiles:** Explore verified tech companies with detailed mission statements and open roles.
- **Premium UI:** Smooth animations using Framer Motion and a modern "Glassmorphism" aesthetic.
- **Currency Support:** Prices displayed in BDT (৳) with localized formatting.

### 💼 For Recruiters
- **Company Management:** Create and manage company profiles.
- **Job Posting:** Post roles with tech stack tags, salary ranges, and custom descriptions.
- **Role-Based Dashboards:** Private management area to track your own listings and company profiles.
- **Verified Status:** Showcase credibility with a "Blue Tick" (Facebook-style) verified badge (granted by admins).

### 🛡️ For Administrators
- **User Oversight:** View and manage all users on the platform.
- **Company Verification:** Admin-only status toggles (Verified/Pending) via a specialized management dashboard.
- **Full Transparency:** Access to all system data for moderation and verification.

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Vanilla CSS + Tailwind CSS (for utility layouts)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Auth Integration:** Custom hooks for JWT & Google OAuth handling
- **Deployment:** Vercel

### Backend
- **Framework:** Django 4.2 + Django REST Framework
- **Authentication:** JWT (SimpleJWT) + Social Auth (dj-rest-auth)
- **Database:** PostgreSQL (Hosted on Supabase)
- **Image Storage:** Cloudinary (Production)
- **Deployment:** Vercel (WSGI)

## 📂 Project Structure

```text
├── Tech-jobs-backend/       # Django Backend API
│   ├── accounts/            # User authentication & Profile management
│   ├── companies/           # Company profiles & verification
│   ├── jobs/                # Job listings, categories & tech stack
│   ├── dashboard/           # Admin & Recruiter analytics
│   └── Tech_Jobs_Backend/   # Project configuration & settings
└── tech-jobs-app/           # Next.js Frontend
    ├── src/
    │   ├── app/             # Application routes & pages
    │   ├── components/      # Reusable UI components
    │   ├── hooks/           # Custom React hooks (Auth, etc.)
    │   └── lib/             # API services & utility functions
    └── public/              # Static assets (Favicons, etc.)
```

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- Supabase Account (for PostgreSQL)
- Cloudinary Account (for image storage)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Tech-jobs-backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up your `.env` file with Supabase and Cloudinary credentials.
5. Run migrations:
   ```bash
   python manage.py migrate
   ```
6. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd tech-jobs-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env.local` with the backend API URL.
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

---
Built with ❤️ by Arif
