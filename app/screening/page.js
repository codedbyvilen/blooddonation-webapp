"use client";
import React from "react";
import ScreeningTable from "../components/ScreeningTable";
ScreeningTable

const ScreeningPage = () => {
  return (
    <div className="flex-1 relative overflow-auto z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <ScreeningTable/>
      </main>
    </div>
  );
};

export default ScreeningPage;
