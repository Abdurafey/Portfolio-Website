'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`);
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  if (!blog) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-6 bg-white dark:bg-darkTheme"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-darkHover rounded-lg shadow-md overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="p-8">
            <h1 className="text-4xl font-bold text-[#2a004a] dark:text-white mb-4">
              {blog.title}
            </h1>
            <div 
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-[#2a004a] dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;