"use client";
import { blogs } from "@/assets/assets";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Page = () => {
  const [search, setSearch] = useState("");
  const rowVariants = {
    hidden: { opacity: 0, x: -150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" min-h-screen p-6">
      <div className="container mx-auto flex gap-6">
        <div className=" w-3/4 p-6 rounded-lg shadow-md">
          <h2 className=" text-2xl font-bold mb-4">Blogs</h2>
          {Array.from({ length: Math.ceil(blogs.length / 4) }).map(
            (_, rowIndex) => (
              <motion.div
                key={rowIndex}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-3 gap-6"
              >
                {filteredBlogs
                  .slice(rowIndex * 3, rowIndex * 3 + 3)
                  .map((blog, index) => (
                    <div
                      key={index}
                      className="mx-2 my-4 bg-white p-4 rounded-lg shadow-md"
                    >
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full max-h-40 object-cover rounded-md mb-3"
                      />
                      <h3 className="text-lg text-[#2a004a] font-semibold">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {blog.description}
                      </p>
                      <button className="mt-2 text-blue-600 font-medium">
                        Read More
                      </button>
                    </div>
                  ))}
              </motion.div>
            )
          )}
        </div>

        <div className="w-[30%]  p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Search</h2>
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full p-2 border rounded-md mb-6"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <h3 className="text-lg font-semibold mb-3">Recent Posts</h3>
          <ul className="space-y-2">
            {blogs.slice(0, 5).map((blog, index) => (
              <li
                key={index}
                className="dark:text-white cursor-pointer hover:underline"
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