import { motion } from 'framer-motion';
import { FaFilePdf, FaBook, FaCalculator, FaFlask } from 'react-icons/fa';

const subjects = [
  {
    name: 'Mathematics',
    icon: FaCalculator,
    color: 'bg-blue-500',
    assignments: [
      { name: 'Calculus Homework', url: '#' },
      { name: 'Algebra Quiz', url: '#' },
      { name: 'Geometry Project', url: '#' },
    ],
  },
  {
    name: 'Science',
    icon: FaFlask,
    color: 'bg-green-500',
    assignments: [
      { name: 'Physics Lab Report', url: '#' },
      { name: 'Chemistry Notes', url: '#' },
      { name: 'Biology Research', url: '#' },
    ],
  },
  {
    name: 'Literature',
    icon: FaBook,
    color: 'bg-purple-500',
    assignments: [
      { name: 'Essay Guidelines', url: '#' },
      { name: 'Book Report Template', url: '#' },
      { name: 'Poetry Analysis', url: '#' },
    ],
  },
];

function Assignments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-handwritten font-bold text-gray-900 mb-8 text-center">
          Class Assignments
        </h1>
        
        <div className="grid gap-8">
          {subjects.map((subject) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6"
            >
              <div className="flex items-center mb-4">
                <subject.icon className={`w-8 h-8 ${subject.color} text-white p-1 rounded-lg mr-3`} />
                <h2 className="text-2xl font-handwritten font-bold">{subject.name}</h2>
              </div>
              
              <div className="grid gap-4">
                {subject.assignments.map((assignment) => (
                  <motion.a
                    key={assignment.name}
                    href={assignment.url}
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaFilePdf className="w-5 h-5 text-red-500 mr-3" />
                    <span className="font-medium">{assignment.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Assignments;