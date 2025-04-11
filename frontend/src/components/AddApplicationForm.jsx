import { useState } from 'react';
import api from '../services/api';

function AddApplicationForm({ onAdd }) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    dateOfApplication: '',
    link: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post('/applications', formData);
      onAdd(res.data);
      setFormData({
        company: '',
        role: '',
        status: 'Applied',
        dateOfApplication: '',
        link: '',
      });
    } catch (error) {
      console.error('Failed to add application:', error);
      alert('Failed to add application');
    }
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-semibold mb-2">Add New Application</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="border p-2 rounded"
        />
        <input
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
          className="border p-2 rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          name="dateOfApplication"
          value={formData.dateOfApplication}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Link (optional)"
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Application
      </button>
    </div>
  );
}

export default AddApplicationForm;