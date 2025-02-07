import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-md"
    >
      <form onSubmit={handleAuth} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-purple-200">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-900 border-purple-500 text-white focus:border-purple-400 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-200">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-900 border-purple-500 text-white focus:border-purple-400 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          disabled={loading}
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </motion.button>
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-sm text-purple-300 hover:text-purple-100"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </form>
    </motion.div>
  );
}