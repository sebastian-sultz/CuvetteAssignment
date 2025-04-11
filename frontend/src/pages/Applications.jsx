import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ApplicationTable from '../components/ApplicationTable';
import AddApplicationForm from '../components/AddApplicationForm';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        console.log('Fetching applications with token:', token); // Debug
        const params = {};
        if (statusFilter) params.status = statusFilter;
        if (dateFilter) params.dateOfApplication = { $gte: new Date(dateFilter) };
        const res = await api.get('/applications', { params });
        console.log('Applications fetched:', res.data); // Debug
        setApplications(res.data);
      } catch (error) {
        console.error('Failed to fetch applications:', error.response?.data || error.message);
        if (error.response?.status === 401) {
          console.log('Unauthorized, logging out'); // Debug
          logout();
          navigate('/login');
        } else {
          alert('Failed to fetch applications');
        }
      }
    };

    if (!token) {
      console.log('No token, redirecting to login'); // Debug
      navigate('/login');
    } else {
      fetchApplications();
    }
  }, [statusFilter, dateFilter, token, logout, navigate]);

  const handleAdd = (newApplication) => {
    setApplications([...applications, newApplication]);
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await api.put(`/applications/${id}`, { status });
      setApplications(
        applications.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await api.delete(`/applications/${id}`);
        setApplications(applications.filter((app) => app._id !== id));
      } catch (error) {
        console.error('Failed to delete application:', error);
        alert('Failed to delete application');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Job Applications</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <div>
          <label className="mr-2">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Filter by Date (After):</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>
      <AddApplicationForm onAdd={handleAdd} />
      <ApplicationTable
        applications={applications}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Applications;