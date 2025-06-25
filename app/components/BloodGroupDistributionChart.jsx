'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import {
  PieChart as RechartsPieChart,
  Cell,
  Legend,
  Pie,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const BloodGroupDistributionChart = () => {
  const colors = ['#D32F2F', '#FF6B6B', '#FFD166', '#06D6A0', '#4D96FF'];
  const [bloodData, setBloodData] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setBloodData(data.bloodGroups));
  }, []);

  useEffect(() => {
    const updateSize = () => setIsSmallScreen(window.innerWidth <= 758);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const outerRadius = isSmallScreen ? 70 : 90;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-white shadow-lg rounded-xl p-4 md:p-6 border border-[#D32F2F] mx-2 md:mx-0"
    >
      <h2 className="text-lg font-semibold mb-4 text-[#121212] text-center md:text-left">
        Blood Group Distribution
      </h2>

      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={bloodData}
              cx="50%"
              cy="50%"
              labelLine={false}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={outerRadius}
            >
              {bloodData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{ backgroundColor: '#F9FAFB', borderColor: '#D32F2F', borderRadius: 8, padding: 8, fontSize: 12 }}
              itemStyle={{ color: '#121212' }}
            />
            <Legend iconType="circle" layout="horizontal" align="center" />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default BloodGroupDistributionChart;