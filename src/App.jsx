import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pixels from './pages/Pixels';
import Bored from './pages/Bored';
import Assignments from './pages/Assignments';
import Permissions from './pages/Permissions';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 cursor-[url('/cursor.png'),_auto]">
      <Navbar />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pixels" element={<Pixels />} />
              <Route path="/bored" element={<Bored />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/permissions" element={<Permissions />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;