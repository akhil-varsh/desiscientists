import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const movies = [
  {
    id: 1,
    title: 'Salaar',
    poster: 'https://m.media-amazon.com/images/I/71iYQyC96sL._AC_UF1000,1000_QL80_.jpg',
    synopsis: 'Just when the prince of Khansaar is about to rise to the throne, a plan of overthrowing him is exercised and only one man can help him retrieve power.',
    trailer: 'https://www.youtube.com/embed/4GPvYMKtrtI?si=Io6GMSYhNfaKdWVc',
  },
  {
    id: 2,
    title: 'Inception',
    poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg',
    synopsis: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    trailer: 'https://www.youtube.com/embed/YoHD9XEInc0',
  },
  {
    id: 3,
    title: 'The Matrix',
    poster: 'https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    synopsis: 'A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.',
    trailer: 'https://www.youtube.com/embed/vKQi3bBA1y8',
  },
  {
    id: 4,
    title: 'Interstellar',
    poster: 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    trailer: 'https://www.youtube.com/embed/zSWdZVtXT7E',
  },
  
];


function Bored() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4"
    >
      <h1 className="text-4xl font-display font-bold text-gray-900 mb-8 text-center">
        Movie Collection
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="card overflow-hidden cursor-pointer"
            onClick={() => setSelectedMovie(movie)}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMovie(null)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="bg-white rounded-lg max-w-3xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
              <div className="aspect-video mb-4">
                <iframe
                  src={selectedMovie.trailer}
                  className="w-full h-full rounded"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-gray-600 mb-4">{selectedMovie.synopsis}</p>
              <button
                onClick={() => setSelectedMovie(null)}
                className="btn"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Bored;