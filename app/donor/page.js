"use client";
import React from "react";
import DonorTable from "../components/DonorTable";

const DonorPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <DonorTable />
      </main>
    </div>
  );
};

export default DonorPage;
