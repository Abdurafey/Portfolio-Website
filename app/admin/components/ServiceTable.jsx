'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';

const ServiceTable = ({ onEdit, setShowForm }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await fetch(`/api/services/${id}`, { method: 'DELETE' });
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-darkHover rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {services.map((service) => (
            <tr key={service._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Image src={service.image} alt={service.title} width={50} height={50} className="rounded" />
              </td>
              <td className="px-6 py-4">{service.title}</td>
              <td className="px-6 py-4">{service.description.substring(0, 100)}...</td>
              <td className="px-6 py-4 space-x-2">
                <button
                  onClick={() => {
                    onEdit(service);
                    setShowForm(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;