import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Pixels', href: '/pixels' },
  { name: 'Bored?', href: '/bored' },
  { name: 'Research', href: '/assignments' },
  { name: 'Lab Access', href: '/permissions' },
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <Disclosure as="nav" className="bg-gray-900 backdrop-blur-lg bg-opacity-80 border-b border-purple-900/50 fixed w-full z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                  >
                    🧬 Desi Scientists
                  </motion.span>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                        location.pathname === item.href
                          ? 'border-purple-500 text-purple-400'
                          : 'border-transparent text-gray-300 hover:text-purple-300 hover:border-purple-300'
                      } transition-colors duration-300`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                {!session ? (
                  <>
                    <Link to="/signin">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 text-sm font-medium text-purple-300 hover:text-purple-200 transition-colors duration-300"
                      >
                        Sign In
                      </motion.button>
                    </Link>
                    <Link to="/signup">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-md hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                      >
                        Sign Up
                      </motion.button>
                    </Link>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-pink-600 rounded-md hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                  >
                    Sign Out
                  </motion.button>
                )}
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-purple-300 hover:text-purple-200 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    location.pathname === item.href
                      ? 'border-purple-500 text-purple-400 bg-purple-900/50'
                      : 'border-transparent text-gray-300 hover:text-purple-300 hover:bg-purple-900/25 hover:border-purple-300'
                  } transition-colors duration-300`}
                >
                  {item.name}
                </Link>
              ))}
              {!session ? (
                <div className="pt-4 pb-3 border-t border-purple-900/50">
                  <div className="space-y-1">
                    <Link
                      to="/signin"
                      className="block w-full text-left px-4 py-2 text-base font-medium text-purple-300 hover:text-purple-200 hover:bg-purple-900/25 transition-colors duration-300"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full text-left px-4 py-2 text-base font-medium text-purple-300 hover:text-purple-200 hover:bg-purple-900/25 transition-colors duration-300"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="pt-4 pb-3 border-t border-purple-900/50">
                  <div className="space-y-1">
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-base font-medium text-red-400 hover:text-red-300 hover:bg-red-900/25 transition-colors duration-300"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;