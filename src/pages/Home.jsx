import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FaFlask, FaDna, FaMicroscope, FaRobot } from 'react-icons/fa';

function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4"
          >
            🧬 Desi Scientists
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-2xl md:text-3xl text-purple-200 mb-12"
          >
           
          </motion.p>
        </div>

        {session && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                title: 'Pixels',
                description: 'Explore our research gallery',
                icon: FaMicroscope,
                href: '/pixels',
                color: 'from-purple-600 to-pink-600',
              },
              {
                title: 'Bored?',
                description: 'Watch scientific documentaries',
                icon: FaRobot,
                href: '/bored',
                color: 'from-blue-600 to-purple-600',
              },
              {
                title: 'Research',
                description: 'Access research papers',
                icon: FaDna,
                href: '/assignments',
                color: 'from-indigo-600 to-blue-600',
              },
              {
                title: 'Lab Access',
                description: 'Request lab permissions',
                icon: FaFlask,
                href: '/permissions',
                color: 'from-pink-600 to-purple-600',
              },
            ].map((item) => (
              <motion.a
                key={item.title}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-xl bg-gray-900 p-8 shadow-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-50 transition-opacity group-hover:opacity-70`} />
                <div className="relative">
                  <item.icon className="h-12 w-12 text-white mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
                  <p className="text-purple-200">{item.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Home;