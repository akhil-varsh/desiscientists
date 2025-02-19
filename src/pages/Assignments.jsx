import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaBook, FaCalculator, FaFlask } from 'react-icons/fa';
import { supabase } from '../lib/supabase';
import { Document, Page } from 'react-pdf';

// File Upload Component
function FileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return; // No file selected

    setLoading(true);
    setMessage('');

    try {
      // Get authenticated user
      const user = supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to upload a file');

      // Create unique file name to avoid conflicts
      const fileName = `${Date.now()}-${file.name}`;

      // Upload file to Supabase storage (bucket name should match your configuration)
      const { data, error: uploadError } = await supabase
        .storage
        .from('assignments') // Make sure to replace with your actual bucket name
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL of the uploaded file
      const { publicURL, error: urlError } = supabase
        .storage
        .from('assignments')
        .getPublicUrl(fileName);

      if (urlError) throw urlError;

      // Store file information in 'files' table
      const { error: dbError } = await supabase
        .from('files')
        .insert([{
          name: file.name,
          file_url: publicURL,
          user_id: user.id,
        }]);

      if (dbError) throw dbError;

      setMessage('File uploaded successfully!');
      setFile(null); // Reset file input
    } catch (error) {
      console.error(error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md"
      >
        {loading ? 'Uploading...' : 'Upload PDF'}
      </button>
      {message && <p className="mt-4 text-center text-gray-200">{message}</p>}
    </div>
  );
}

// File Preview Component
function FilePreview({ fileUrl }) {
  return (
    <div className="pdf-preview-container">
      <h3 className="text-gray-200">Preview of PDF:</h3>
      <Document file={fileUrl}>
        <Page pageNumber={1} width={200} />
      </Document>
    </div>
  );
}

// Main Assignments Component
function Assignments() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list of files uploaded by users (globally accessible)
  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase.from('files').select('*');
      if (error) {
        console.error('Error fetching files:', error);
      } else {
        setFiles(data);
      }
      setLoading(false);
    };

    fetchFiles();
  }, []);

  if (loading) return <div className="text-center text-gray-300">Loading...</div>;

  const subjects = [
    {
      name: 'Syllabus',
      icon: FaCalculator,
      color: 'bg-purple-600',
      assignments: [
        { name: 'VNR SYLLABUS', url: '/static/CSE-DS-II-YEAR-R22.pdf' },
        { name: 'Algebra Quiz', url: '/static/sample-pdf.pdf' },
        { name: 'Geometry Project', url: '/static/sample-pdf.pdf' },
      ],
    },
    {
      name: 'Science',
      icon: FaFlask,
      color: 'bg-green-600',
      assignments: [
        { name: 'Physics Lab Report', url: '/static/sample-pdf.pdf' },
        { name: 'Chemistry Notes', url: '/static/sample-pdf.pdf' },
        { name: 'Biology Research', url: '/static/sample-pdf.pdf' },
      ],
    },
    {
      name: 'Literature',
      icon: FaBook,
      color: 'bg-indigo-600',
      assignments: [
        { name: 'Essay Guidelines', url: '/static/sample-pdf.pdf' },
        { name: 'Book Report Template', url: '/static/sample-pdf.pdf' },
        { name: 'Poetry Analysis', url: '/static/sample-pdf.pdf' },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-handwritten font-bold text-gray-100 mb-8 text-center">
          Class Assignments
        </h1>

        <FileUpload /> {/* File upload component */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6 rounded-lg shadow-lg bg-gray-800"
            >
              <div className="flex items-center mb-4">
                <subject.icon className={`w-8 h-8 ${subject.color} text-white p-1 rounded-lg mr-3`} />
                <h2 className="text-2xl font-handwritten font-bold text-gray-100">{subject.name}</h2>
              </div>

              <div className="grid gap-4">
                {subject.assignments.map((assignment) => {
                  // Check if the file is uploaded in the Supabase table
                  const file = files.find((file) => file.name === assignment.name);
                  return (
                    <motion.a
                      key={assignment.name}
                      href={file ? file.file_url : assignment.url}
                      className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaFilePdf className="w-5 h-5 text-red-500 mr-3" />
                      <span className="font-medium text-gray-200">{assignment.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Assignments;
