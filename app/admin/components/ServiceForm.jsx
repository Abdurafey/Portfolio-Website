'use client'
import { useState, useEffect } from 'react';

const ServiceForm = ({ editItem, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (editItem) {
      setFormData({
        title: editItem.title,
        description: editItem.description,
        image: editItem.image
      });
      setPreview(editItem.image);
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // First upload the image if there's a new one
      let imageUrl = formData.image;
      if (formData.image instanceof File) {
        const imageFormData = new FormData();
        imageFormData.append('file', formData.image);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        });
        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.filename;
      }

      // Then send the service data as JSON
      const serviceData = {
        title: formData.title,
        description: formData.description,
        image: imageUrl
      };

      if (editItem) {
        await fetch(`/api/services/${editItem._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(serviceData),
        });
      } else {
        await fetch('/api/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(serviceData),
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {editItem ? 'Edit' : 'Create'} Service
      </h2>

      <div>
        <label className="form-label">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="form-input"
          required
        />
      </div>

      <div>
        <label className="form-label">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={6}
          className="form-input resize-none"
          required
        />
      </div>

      <div>
        <label className="form-label">Image</label>
        <div className="mt-2 flex items-center space-x-4">
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 dark:text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              dark:file:bg-blue-900 dark:file:text-blue-100
              hover:file:bg-blue-100 dark:hover:file:bg-blue-800
              transition-colors"
            accept="image/*"
          />
          {preview && (
            <img src={preview} alt="Preview" className="h-20 w-20 object-cover rounded-lg" />
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="form-button-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="form-button-primary"
        >
          {editItem ? 'Update' : 'Create'} Service
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;