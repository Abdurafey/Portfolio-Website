import { assets, serviceData } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Services = () => {
  const rowVariants = {
    hidden: { opacity: 0, x: -150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Message sent successfully!");
  };

  return (
    <div id="services" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg font-Ovo">What we Offer</h4>
      <h2 className="text-center text-5xl font-Ovo">Our Services</h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        We are here to maintain the financial information required by your
        investors, regulators, and management through our:
      </p>
      <div className="my-10">
        {Array.from({ length: Math.ceil(serviceData.length / 4) }).map(
          (_, rowIndex) => (
            <motion.div
              key={rowIndex}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
            >
              {serviceData
                .slice(rowIndex * 4, rowIndex * 4 + 4)
                .map(({ icon, title, description, link }, index) => (
                  <div 
                    key={index}
                    className="border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black
                         cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 
                         dark:hover:bg-darkHover dark:hover:shadow-white"
                  >
                    <Image src={icon} alt="" className="w-10" />
                    <h3 className="text-lg my-4 text-gray-700 dark:text-white">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-5 dark:text-white/80">
                      {description}
                    </p>

                    <a
                      href={link}
                      className="flex items-center gap-2 text-sm mt-5"
                    >
                      Read more{" "}
                      <Image alt="" src={assets.right_arrow} className="w-4" />
                    </a>
                  </div>
                ))}
            </motion.div>
          )
        )}
      </div>
      <section
        id="contact"
        className="w-full px-10 py-16 flex flex-col lg:flex-row items-center gap-10 bg-white dark:bg-gray-800/30"
      >
        <motion.div
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full lg:w-[60%]  shadow-lg p-8 rounded-lg flex flex-col justify-center h-auto lg:h-[450px]"
        >
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
            Get in Touch
          </h2>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="First Name"
                className=" flex p-3 outline-none border-[0.5px] border-gray-400 rounded-md
                bg-white dark:bg-darkHover/30 dark:border-white/90"
              />
              <input
                type="text"
                placeholder="Last Name"
                className=" flex p-3 outline-none border-[0.5px] border-gray-400 rounded-md
                      bg-white dark:bg-darkHover/30 dark:border-white/90"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="email"
                placeholder="Email"
                className=" flex p-3 outline-none border-[0.5px] border-gray-400 rounded-md
                      bg-white dark:bg-darkHover/30 dark:border-white/90"
              />
              <input
                type="text"
                placeholder="Phone"
                className=" flex p-3 outline-none border-[0.5px] border-gray-400 rounded-md
                      bg-white dark:bg-darkHover/30 dark:border-white/90"
              />
            </div>

            <div>
              <textarea
                placeholder="Your Message"
                rows="2"
                className="w-full flex p-3 outline-none border-[0.5px] border-gray-400 rounded-md
                      bg-white dark:bg-darkHover/30 dark:border-white/90"
              ></textarea>
            </div>

            <button
              className=" py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80
                   text-white rounded-full mx-auto hover:bg-black duration-500
                    dark:bg-transparent dark:border-[0.5px] dark:hover:bg-darkHover"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full lg:w-[40%] h-[450px] flex justify-center items-center"
        >
          <img
            src="https://ledgerwise.org/wp-content/uploads/2022/09/istockphoto-1290300704-612x612-1.jpg"
            alt="Contact"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </section>{" "}
    </div>
  );
};

export default Services;
