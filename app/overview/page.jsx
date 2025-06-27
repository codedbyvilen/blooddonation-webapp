'use client';

import { Droplet, Users, SquareActivity, FileText } from 'lucide-react';
import React from 'react';
import StatCard from '../components/StatCard';
import { motion } from 'framer-motion';
import DonationsOverviewChart from '../components/DonationsOverviewChart';
import BloodGroupDistributionChart from '../components/BloodGroupDistributionChart';
import { useDonorContext } from '../hook/useDonorContext';

const Overview = () => {
  const {donors} = useDonorContext();

  return (
    <div className="flex-1 overflow-auto">
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Donors" icon={Users} value={donors.length} />
          <StatCard name="Total Screenings" icon={SquareActivity} value="0" />
          <StatCard name="Certificates Issued" icon={FileText} value="0" />
        </motion.div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DonationsOverviewChart />
          <BloodGroupDistributionChart />
        </section>
      </main>
    </div>
  );
};

export default Overview;