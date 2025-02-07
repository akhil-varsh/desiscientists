import { useState } from 'react';
import { motion } from 'framer-motion';

function Permissions() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    comments: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      reason: '',
      comments: '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-handwritten font-bold text-gray-900 mb-8 text-center">
          Permission Request
        </h1>
        
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                Reason for Permission
              </label>
              <select
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="input"
                required
              >
                <option value="">Select a reason</option>
                <option value="field-trip">Field Trip</option>
                <option value="late-submission">Late Submission</option>
                <option value="absence">Absence</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
                Additional Comments
              </label>
              <textarea
                id="comments"
                rows={4}
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                className="input"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className="w-full btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Request
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}

export default Permissions;