'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Save, Search, Trash2 } from 'lucide-react';
import Image from 'next/image';

const UserTable = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editRow, setEditRow] = useState(null);
  const [editValues, setEditValues] = useState({ phoneNumber: '', country: '' });

  const filteredClients = useMemo(() => {
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  const handleEditClick = (client) => {
    setEditRow(client.id);
    setEditValues({
      phoneNumber: client.phoneNumber,
      country: client.country,
    });
  };

  const handleSaveClick = (id) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, phoneNumber: editValues.phoneNumber, country: editValues.country } : c
      )
    );
    setEditRow(null);
  };

  const handleDeleteClick = (id) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  const handleChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setClients(data.clients));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0 mb-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
        <h2 className="text-base md:text-xl font-semibold text-gray-100 text-center md:text-left">
          Clients
        </h2>

        <div className="relative w-full md:w-auto">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search Clients..."
            className="bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-gray-700">
          <thead>
            <tr>
              {['Name', 'Email', 'Phone Number', 'Country', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="px-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredClients.map((c) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className={`flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-b-0 border-gray-700 md:border-none p-2 md:p-0 ${
                  editRow === c.id ? 'bg-[#2f2f2f] ring-1 ring-gray-500' : ''
                }`}
              >
                {/* Mobile View */}
                <td className="md:hidden px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image src={c.image} alt={c.name} width={36} height={36} className="w-9 h-9 rounded-full" />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-100">{c.name}</div>
                        <div className="text-xs text-gray-100">{c.email}</div>
                      </div>
                    </div>

                    <div className="flex space-x-1 -mt-1 -mr-1">
                      {editRow === c.id ? (
                        <button className="text-green-500 hover:text-green-300" onClick={() => handleSaveClick(c.id)}>
                          <Save size={16} />
                        </button>
                      ) : (
                        <button className="text-indigo-500 hover:text-indigo-300" onClick={() => handleEditClick(c)}>
                          <Edit size={16} />
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-300" onClick={() => handleDeleteClick(c.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-gray-300 space-y-1">
                    <div>
                      Phone:{' '}
                      {editRow === c.id ? (
                        <input
                          type="text"
                          value={editValues.phoneNumber}
                          onChange={(e) => handleChange('phoneNumber', e.target.value)}
                          className="bg-[#3a3a3a] text-white rounded px-1 w-32"
                        />
                      ) : (
                        c.phoneNumber
                      )}
                    </div>
                    <div>
                      Country:{' '}
                      {editRow === c.id ? (
                        <input
                          type="text"
                          value={editValues.country}
                          onChange={(e) => handleChange('country', e.target.value)}
                          className="bg-[#3a3a3a] text-white rounded px-1 w-32"
                        />
                      ) : (
                        c.country
                      )}
                    </div>
                  </div>
                </td>

                {/* Desktop View */}
                <td className="hidden md:table-cell px-6 py-4 text-sm font-medium text-gray-100">
                  <div className="flex items-center">
                    <Image src={c.image} alt={c.name} width={40} height={40} className="w-10 h-10 rounded-full" />
                    <span className="ml-3">{c.name}</span>
                  </div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-300">{c.email}</td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-300">
                  {editRow === c.id ? (
                    <input
                      type="text"
                      value={editValues.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      className="bg-[#3a3a3a] text-white rounded px-1 w-32"
                    />
                  ) : (
                    c.phoneNumber
                  )}
                </td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-300">
                  {editRow === c.id ? (
                    <input
                      type="text"
                      value={editValues.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      className="bg-[#3a3a3a] text-white rounded px-1 w-32"
                    />
                  ) : (
                    c.country
                  )}
                </td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-300">
                  <div className="flex space-x-1 -ml-2">
                    {editRow === c.id ? (
                      <button className="text-green-500 hover:text-green-300" onClick={() => handleSaveClick(c.id)}>
                        <Save size={18} />
                      </button>
                    ) : (
                      <button className="text-indigo-500 hover:text-indigo-300" onClick={() => handleEditClick(c)}>
                        <Edit size={18} />
                      </button>
                    )}
                    <button className="text-red-500 hover:text-red-300" onClick={() => handleDeleteClick(c.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserTable;
