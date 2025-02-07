# 🧬 Desi Scientists

Welcome to the **Desi Scientists** class website! 

## 🚀 Features

- **Interactive Navigation**: Smooth and responsive navigation with a beautiful gradient background.
- **Authentication**: Secure sign-in and sign-up functionality using Supabase.
- **Assignments**: Access and manage class assignments with ease.
- **Photo Gallery**: Explore a stunning gallery of research photos.
- **Movie Collection**: Watch scientific documentaries and movies.
- **Permission Requests**: Submit and manage permission requests for various activities.

## 🛠️ Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Supabase**: An open-source Firebase alternative for authentication and database management.
- **Framer Motion**: A library for animations and gestures in React.
- **React Router**: Declarative routing for React applications.

## 📚 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/akhil-varsh/desiscientists.git
   cd desiscientists
   ```

2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your Supabase credentials:
     ```env
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```

## 📜 Available Scripts

- `npm run dev` - Start the development server.
- `npm run build` - Build the project for production.
- `npm run preview` - Preview the built project.
- `npm run lint` - Lint the codebase.

## 📂 Project Structure

```
📦 desiscientists
├── 📂 public          # Static assets (images, icons, etc.)
├── 📂 src             # Main source code
│   ├── 📂 components  # Reusable React components
│   ├── 📂 pages       # Page components for routing
│   ├── 📂 assets      # Images and other assets
│   ├── 📂 utils       # Utility functions
│   ├── App.jsx        # Main app component
│   ├── main.jsx      # Entry point
├── .env               # Environment variables
├── package.json       # Project dependencies
├── tailwind.config.js # Tailwind CSS configuration
└── vite.config.js     # Vite configuration
```

## 🚀 Deployment

### Deploying to Vercel
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Run the deployment command:
   ```sh
   vercel
   ```

## 📖 Contributing
We welcome contributions! Feel free to open an issue or submit a pull request.

## 📝 License
This project is licensed under the MIT License. See `LICENSE` for details.

---

**Made with ❤️ by Akhil**

