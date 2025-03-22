'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ServiceTable from '../components/ServiceTable';
import BlogTable from '../components/BlogTable';
import ServiceForm from '../components/ServiceForm';
import BlogForm from '../components/BlogForm';

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('services');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      router.push('/admin/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-darkTheme">
      <nav className="bg-white dark:bg-darkHover shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg
                text-sm font-medium text-white bg-red-600 hover:bg-red-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                transition-colors duration-200 shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-darkHover rounded-xl shadow-lg p-6">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex space-x-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <button
                onClick={() => setActiveTab('services')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200
                  ${activeTab === 'services' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200
                  ${activeTab === 'blogs' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                Blogs
              </button>
            </div>
            <button
              onClick={() => {
                setEditItem(null);
                setShowForm(true);
              }}
              className="inline-flex items-center px-6 py-2.5 border border-transparent 
                rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                transition-colors duration-200 shadow-sm"
            >
              Add New {activeTab.slice(0, -1)}
            </button>
          </div>

          {!showForm ? (
            <div className="bg-white dark:bg-darkHover rounded-lg">
              {activeTab === 'services' ? (
                <ServiceTable onEdit={setEditItem} setShowForm={setShowForm} />
              ) : (
                <BlogTable onEdit={setEditItem} setShowForm={setShowForm} />
              )}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              {activeTab === 'services' ? (
                <ServiceForm editItem={editItem} onClose={() => setShowForm(false)} />
              ) : (
                <BlogForm editItem={editItem} onClose={() => setShowForm(false)} />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;