'use client';

import React, { useState } from 'react';
import { Search, Download } from 'lucide-react';

export default function Certificate() {
  const [searchTerm, setSearchTerm] = useState('');
  const [certificates, setCertificates] = useState([
    { id: 'DNR1', name: 'Ali Khan', date: '2025-06-29' },
    { id: 'DNR2', name: 'Sara Ahmed', date: '2025-06-29' },
  ]);

  const filtered = certificates.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (name) => {
    alert(`Generating certificate for ${name}...`);
    // Here you can generate a PDF using libraries like jsPDF or open a pre-designed template
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-[#D32F2F]">Donor Certificates</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-[#D32F2F] rounded px-3 py-2 w-full md:w-64"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Donor Name</th>
              <th className="px-4 py-2">Donation Date</th>
              <th className="px-4 py-2">Certificate</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-2">{c.id}</td>
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.date}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDownload(c.name)} className="flex items-center gap-2 text-[#D32F2F] hover:underline">
                    <Download size={16} /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
