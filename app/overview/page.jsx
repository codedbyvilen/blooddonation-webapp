'use client';

import { Droplet, Users, SquareActivity, FileText } from 'lucide-react';
import React from 'react';
import StatCard from '../components/StatCard';
import { motion } from 'framer-motion';
import DonationsOverviewChart from '../components/DonationsOverviewChart';
import BloodGroupDistributionChart from '../components/BloodGroupDistributionChart';

const Overview = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Donations" icon={Droplet} value="325 Units" />
          <StatCard name="Total Donors" icon={Users} value="1,437" />
          <StatCard name="Total Screenings" icon={SquareActivity} value="890" />
          <StatCard name="Certificates Issued" icon={FileText} value="764" />
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