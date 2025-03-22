'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';

const BlogTable = ({ onEdit, setShowForm }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-darkHover rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full table-fixed">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="w-1/4 px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Image
            </th>
            <th className="w-2/4 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Title
            </th>
            <th className="w-1/4 px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {blogs.map((blog) => (
            <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td className="w-1/4 px-6 py-4">
                <div className="flex justify-center">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    width={50} 
                    height={50} 
                    className="rounded object-cover"
                  />
                </div>
              </td>
              <td className="w-2/4 px-6 py-4 text-gray-900 dark:text-gray-100">
                <div className="truncate">{blog.title}</div>
              </td>
              <td className="w-1/4 px-6 py-4">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      onEdit(blog);
                      setShowForm(true);
                    }}
                    className="px-3 py-1.5 rounded-md text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;