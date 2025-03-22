"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Page = () => {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const router = useRouter();

  const rowVariants = {
    hidden: { opacity: 0, x: -150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  useEffect(() => {
    fetchBlogs();
  }, [search]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`/api/blogs${search ? `?search=${search}` : ''}`);
      const data = await response.json();
      setBlogs(data);
      if (!search) {
        setRecentBlogs(data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-darkTheme">
      <div className="container mx-auto flex gap-6">
        <div className="w-3/4 p-6 rounded-lg shadow-md bg-white dark:bg-darkHover">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Blogs</h2>
          {Array.from({ length: Math.ceil(blogs.length / 3) }).map(
            (_, rowIndex) => (
              <motion.div
                key={rowIndex}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-3 gap-6"
              >
                {blogs
                  .slice(rowIndex * 3, rowIndex * 3 + 3)
                  .map((blog) => (
                    <div
                      key={blog._id}
                      className="mx-2 my-4 bg-white dark:bg-darkTheme p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => router.push(`/blogs/${blog._id}`)}
                    >
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-40 object-cover rounded-md mb-3"
                      />
                      <h3 className="text-lg text-[#2a004a] dark:text-white font-semibold">
                        {blog.title}
                      </h3>
                      <div 
                        className="prose dark:prose-invert max-w-none line-clamp-3 text-sm text-gray-600 dark:text-gray-300"
                        dangerouslySetInnerHTML={{ 
                          __html: blog.description.substring(0, 200) + '...' 
                        }}
                      />
                      <button className="mt-2 text-blue-600 dark:text-blue-400 font-medium">
                        Read More
                      </button>
                    </div>
                  ))}
              </motion.div>
            )
          )}
        </div>

        <div className="w-[30%] p-4 rounded-lg shadow-md bg-white dark:bg-darkHover">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Search</h2>
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full p-2 border rounded-md mb-6 dark:bg-darkTheme dark:text-white dark:border-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <h3 className="text-lg font-semibold mb-3 dark:text-white">Recent Posts</h3>
          <ul className="space-y-2">
            {recentBlogs.map((blog) => (
              <li
                key={blog._id}
                className="dark:text-white cursor-pointer hover:underline"
                onClick={() => router.push(`/blogs/${blog._id}`)}
              >
                {blog.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;