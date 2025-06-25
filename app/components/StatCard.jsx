import { motion } from 'framer-motion';
import React from 'react';

const StatCard = ({ name, icon: Icon, value }) => {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.15)" }}
      className="bg-white overflow-hidden shadow-lg rounded-xl border border-[#F5F5F5]"
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-600">
          <Icon size={20} className="mr-2 text-[#D32F2F]" />
          {name}
        </span>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
