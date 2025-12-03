"use client";

import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { motion } from "framer-motion";

export function FeaturedArticles() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Featured Stories</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Handpicked stories that matter most
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants}>
          <p>coming soon</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
