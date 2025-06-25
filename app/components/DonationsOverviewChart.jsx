'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import {
  LineChart as RechartsLineChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const DonationsOverviewChart = () => {
  const [donationData, setDonationData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setDonationData(data.donations));
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-white shadow-lg rounded-xl p-4 md:p-6 border border-[#D32F2F] mx-2 md:mx-0"
    >
      <h2 className="text-lg font-semibold mb-4 text-[#121212] text-center md:text-left">
        Donations Overview
      </h2>

      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={donationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
            <XAxis dataKey="name" stroke="#616161" tick={{ fontSize: 12 }} />
            <YAxis stroke="#616161" tick={{ fontSize: 12 }} width={40} />
            <Tooltip
              contentStyle={{ backgroundColor: '#F9FAFB', borderColor: '#D32F2F', fontSize: 12 }}
              itemStyle={{ color: '#121212' }}
            />
            <Line type="monotone" dataKey="donations" stroke="#D32F2F" strokeWidth={3} dot={{ fill: '#D32F2F', r: 4 }} activeDot={{ r: 6 }} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DonationsOverviewChart;


