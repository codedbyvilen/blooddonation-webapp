'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Save, Search, Trash2, Plus } from 'lucide-react';
import StatCard from './StatCard';
import { Droplet, CheckCircle, HeartHandshake, Users } from "lucide-react";

const DonorTable = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editRow, setEditRow] = useState(null);
  const [editValues, setEditValues] = useState({ weightKg: '', contact: '' });
  const [showModal, setShowModal] = useState(false);

  const [newDonor, setNewDonor] = useState({
    fullName: '',
    email: '',
    age: '',
    gender: '',
    weightKg: '',
    contact: '',
    donatedRecently: '',
    willingToDonate: '',
    source: '',
    referredBy: '',
    createdAt: new Date().toISOString().split('T')[0],
  });

  const filteredDonors = useMemo(() => {
    return donors.filter(
      (d) =>
        d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.referredBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.source.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [donors, searchTerm]);

  const handleEditClick = (donor) => {
    setEditRow(donor.id);
    setEditValues({
      weightKg: donor.weightKg,
      contact: donor.contact,
    });
  };

  const handleSaveClick = (id) => {
    setDonors((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, weightKg: Number(editValues.weightKg), contact: editValues.contact } : d
      )
    );
    setEditRow(null);
  };

  const handleDeleteClick = (id) => {
    setDonors((prev) => prev.filter((d) => d.id !== id));
  };

  const handleAddDonor = (e) => {
    e.preventDefault();
    const newEntry = {
      ...newDonor,
      id: `DNR${donors.length + 1}`,
    };
    setDonors((prev) => [...prev, newEntry]);
    setShowModal(false);
    setNewDonor({
      fullName: '',
      email: '',
      age: '',
      gender: '',
      weightKg: '',
      contact: '',
      donatedRecently: '',
      willingToDonate: '',
      source: '',
      referredBy: '',
      createdAt: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <>
      {/* Stat Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard name="Total Registered Donors" icon={Droplet} value={donors.length} />
        <StatCard name="Recent Donors" icon={HeartHandshake} value={donors.filter((d) => d.donatedRecently.toLowerCase() === 'yes').length} />
        <StatCard name="Total Male/Female" icon={Users} value={`${donors.filter((d) => d.gender.toLowerCase() === 'male').length} / ${donors.filter((d) => d.gender.toLowerCase() === 'female').length}`} />
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white shadow-lg rounded-xl p-4 md:p-6 border border-red-500 mx-2 md:mx-0 mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
          <h2 className="text-base md:text-xl font-semibold text-red-700 text-center md:text-left">
            Registered Donors
          </h2>

          <div className="flex gap-4 items-center">
            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              <Plus size={16} /> Add Donor
            </button>

            <div className="relative w-full md:w-auto">
              <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder="Search by Name, Email, Source..."
                className="border border-red-500 text-black placeholder-gray-500 rounded-lg pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <Search className="absolute left-3 top-2.5 text-red-500" size={18} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-xs text-gray-600 uppercase">
                <th className="px-4 py-3">Full Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Weight (kg)</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Willing</th>
                <th className="px-4 py-3">Referred By</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDonors.map((d) => (
                <tr key={d.id} className="text-sm">
                  <td className="px-4 py-2">{d.fullName}</td>
                  <td className="px-4 py-2">{d.email}</td>
                  <td className="px-4 py-2">{d.age}</td>
                  <td className="px-4 py-2">{d.gender}</td>
                  <td className="px-4 py-2">
                    {editRow === d.id ? (
                      <input
                        type="number"
                        value={editValues.weightKg}
                        onChange={(e) => setEditValues((prev) => ({ ...prev, weightKg: e.target.value }))}
                        className="border border-gray-300 rounded px-2 w-20"
                      />
                    ) : (
                      d.weightKg
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editRow === d.id ? (
                      <input
                        type="text"
                        value={editValues.contact}
                        onChange={(e) => setEditValues((prev) => ({ ...prev, contact: e.target.value }))}
                        className="border border-gray-300 rounded px-2 w-32"
                      />
                    ) : (
                      d.contact
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <span className={d.willingToDonate.toLowerCase() === 'yes' ? 'text-green-600' : 'text-red-600'}>
                      {d.willingToDonate}
                    </span>
                  </td>
                  <td className="px-4 py-2">{d.referredBy}</td>
                  <td className="px-4 py-2">{d.source}</td>
                  <td className="px-4 py-2">{d.createdAt}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    {editRow === d.id ? (
                      <button onClick={() => handleSaveClick(d.id)} className="text-green-600 hover:text-green-400">
                        <Save size={18} />
                      </button>
                    ) : (
                      <button onClick={() => handleEditClick(d)} className="text-blue-600 hover:text-blue-400">
                        <Edit size={18} />
                      </button>
                    )}
                    <button onClick={() => handleDeleteClick(d.id)} className="text-red-600 hover:text-red-400">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Donor Modal */}
        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <form
              onSubmit={handleAddDonor}
              className="bg-white p-6 rounded-lg w-[90%] md:w-[50%] space-y-4 overflow-y-auto max-h-[90vh]"
            >
              <h3 className="text-lg font-semibold text-red-600 mb-4">Add New Donor</h3>

              {[
                { label: 'Full Name', name: 'fullName', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Age', name: 'age', type: 'number' },
                { label: 'Gender', name: 'gender', type: 'text' },
                { label: 'Weight (kg)', name: 'weightKg', type: 'number' },
                { label: 'Contact Number', name: 'contact', type: 'text' },
                { label: 'Donated in Last 3 Months (Yes/No)', name: 'donatedRecently', type: 'text' },
                { label: 'Willing to Donate (Yes/No)', name: 'willingToDonate', type: 'text' },
                { label: 'Source', name: 'source', type: 'text' },
                { label: 'Referred By', name: 'referredBy', type: 'text' },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm font-medium mb-1">{field.label}</label>
                  <input
                    required
                    type={field.type}
                    value={newDonor[field.name]}
                    onChange={(e) => setNewDonor((prev) => ({ ...prev, [field.name]: e.target.value }))}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              ))}

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Add Donor
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default DonorTable;
