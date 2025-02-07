import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const images = [
  {
    id: 1,
    src: 'https://tse1.mm.bing.net/th?id=OIP.xcU4yPmuvHKmxFdLpbM1_QHaFj&pid=Api',
    alt: 'avengers',
  },
  {
    id: 2,
    src: 'https://tse1.mm.bing.net/th?id=OIP.Bot8KBqqAC1qDiqKG_VX1AHaF6&pid=Api',
    alt: 'avengers',
  },
  {
    id: 3,
    src: 'https://tse1.mm.bing.net/th?id=OIP.6BnsoxrhgtaFZWsWuG3CEAHaEo&pid=Api',
    alt: 'avengers',
  },
  {
    id: 4,
    src: 'https://tse2.mm.bing.net/th?id=OIP.cqHqmEDx16SnQfIMItp0_gHaFs&pid=Api',
    alt: 'avengers',
  },
  {
    id: 5,
    src: 'https://images2.minutemediacdn.com/image/upload/c_fill,w_1200,ar_4:3,f_auto,q_auto,g_auto/shape/cover/sport/584459-istock-183342824-24fbfe616cffa90eb7dcf9d4aa8e445c.jpg',
    alt: 'Architecture',
  },
  {
    id: 6,
    src: 'https://st2.depositphotos.com/3837271/5507/i/450/depositphotos_55072853-stock-photo-time-to-travel-wooden-sign.jpg',
    alt: 'Travel',
  },
];

function Pixels() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4"
    >
      <h1 className="text-4xl font-display font-bold text-gray-900 mb-8 text-center">
        Photo Gallery
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <motion.div
            key={image.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative aspect-video cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Pixels;