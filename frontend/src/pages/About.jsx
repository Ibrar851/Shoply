// src/pages/About.jsx
import { motion } from "framer-motion";
import { FaLeaf, FaHandshake, FaLightbulb } from "react-icons/fa";

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* ---- Our Story ---- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
              Our Story
            </h2>
            <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-4">
              Rooted in Passion, Grown with Purpose
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
              Welcome to{" "}
              <span className="font-semibold text-blue-700 dark:text-blue-400">
                Shoply
              </span>
              — your trusted destination for premium tech products. We're
              passionate about delivering innovation and quality that elevate
              your digital lifestyle.
            </p>

            <h4 className="text-xl font-semibold mb-4 dark:text-white">
              Our Values
            </h4>
            <div className="flex flex-wrap gap-8">
              {[
                { icon: <FaLeaf />, label: "Sustainability" },
                { icon: <FaHandshake />, label: "Customer Trust" },
                { icon: <FaLightbulb />, label: "Innovation" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="text-blue-600 dark:text-blue-400 text-3xl mb-2">
                    {item.icon}
                  </div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-10 bg-blue-700 text-white px-8 py-3 rounded-md hover:bg-blue-800 transition shadow-md"
            >
              Shop Our Latest Collection
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80"
              alt="Our Story"
              className="rounded-xl shadow-lg object-cover w-full max-w-md hover:scale-105 transition-transform"
            />
          </motion.div>
        </motion.div>

        {/* ---- Mission ---- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center"
        >
          <h3 className="text-3xl font-semibold mb-6 dark:text-white">
            Our Mission
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Our mission is to make technology accessible to everyone. From
            smartphones to smartwatches, every product we offer balances quality,
            innovation, and affordability.
          </p>
        </motion.div>

        {/* ---- Vision ---- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center"
        >
          <h3 className="text-3xl font-semibold mb-6 dark:text-white">
            Our Vision
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            We envision a world where technology empowers people and simplifies
            life. Shoply bridges innovation with affordability, helping
            individuals live smarter and better.
          </p>
        </motion.div>

        {/* ---- Team ---- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12"
        >
          <h3 className="text-3xl font-semibold mb-12 text-center dark:text-white">
            Meet Our Team
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                name: "Ibrar Ul Haq",
                role: "Founder & Full Stack Developer",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Sarah Khan",
                role: "UI/UX Designer",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Ali Ahmed",
                role: "Backend Engineer",
                img: "https://randomuser.me/api/portraits/men/45.jpg",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="mx-auto rounded-full mb-4 shadow-md w-32 h-32 object-cover"
                />
                <h4 className="text-lg font-semibold dark:text-white">
                  {member.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
