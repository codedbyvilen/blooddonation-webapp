"use client";
import { motion } from "framer-motion";
import React from "react";
import StatCard from "../components/StatCard";
import {
  ChartBarStacked,
  CheckCircle,
  DollarSign,
  Droplet,
  HeartHandshake,
  ShoppingBag,
  SquareActivity,
  Users,
} from "lucide-react";
import DonorTable from "../components/DonorTable";

const ProductPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <DonorTable />
      </main>
    </div>
  );
};

export default ProductPage;
