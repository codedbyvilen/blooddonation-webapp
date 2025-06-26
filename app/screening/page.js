'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, CheckCircle, XCircle, Save } from 'lucide-react';

const dummyDonors = [
  { id: 'D001', fullName: 'John Doe' },
  { id: 'D002', fullName: 'Aisha Khan' },
];

export default function Screening() {
  const [screenings, setScreenings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    donorId: '',
    date: '',
    weight: '',
    hemoglobin: '',
    bp: '',
    hepatitisB: '',
    hepatitisC: '',
    malaria: '',
    hiv: '',
    syphilis: '',
  });
  const [editRow, setEditRow] = useState(null);

  const filteredScreenings = screenings.filter((s) => {
    const donor = dummyDonors.find((d) => d.id === s.donorId);
    return donor?.fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const calculateEligibility = (data) => {
    return (
      Number(data.hemoglobin) >= 12.5 &&
      data.hepatitisB === 'Negative' &&
      data.hepatitisC === 'Negative' &&
      data.malaria === 'Negative' &&
      data.hiv === 'Negative' &&
      data.syphilis === 'Negative'
    );
  };

  const handleSave = () => {
    const eligible = calculateEligibility(formData);

    if (editRow) {
      setScreenings((prev) =>
        prev.map((s) => (s.id === editRow ? { ...formData, eligible } : s))
      );
    } else {
      setScreenings((prev) => [
        ...prev,
        { ...formData, id: `S${prev.length + 1}`.padStart(4, '0'), eligible },
      ]);
    }
    setShowForm(false);
    setFormData({
      id: '',
      donorId: '',
      date: '',
      weight: '',
      hemoglobin: '',
      bp: '',
      hepatitisB: '',
      hepatitisC: '',
      malaria: '',
      hiv: '',
      syphilis: '',
    });
    setEditRow(null);
  };

  const handleEditClick = (s) => {
    setFormData(s);
    setEditRow(s.id);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setScreenings((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard title="Total Screenings" value={screenings.length} />
          <StatCard title="Eligible Donors" value={screenings.filter(s => s.eligible).length} />
          <StatCard title="Ineligible Donors" value={screenings.filter(s => !s.eligible).length} />
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
          <h2 className="text-xl font-semibold text-[#121212]">Screening Records</h2>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Donor..."
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none w-full md:w-64"
            />
            <button onClick={() => setShowForm(true)} className="flex items-center gap-1 text-white bg-red-600 px-3 py-2 rounded">
              <Plus size={16} /> Add Screening
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donor Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight (kg)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hb (g/dL)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Eligible</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredScreenings.map((s) => (
                <tr key={s.id}>
                  <td className="px-6 py-4 text-sm text-gray-700">{dummyDonors.find(d => d.id === s.donorId)?.fullName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{s.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{s.weight}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{s.hemoglobin}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{s.bp}</td>
                  <td className="px-6 py-4 text-sm">
                    {s.eligible ? (
                      <span className="flex items-center text-green-600"><CheckCircle size={16} className="mr-1" /> Yes</span>
                    ) : (
                      <span className="flex items-center text-red-600"><XCircle size={16} className="mr-1" /> No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <button onClick={() => handleEditClick(s)} className="text-blue-600 hover:text-blue-400">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDeleteClick(s.id)} className="text-red-600 hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-[90%] md:w-1/2 space-y-4">
              <h3 className="text-lg font-semibold mb-2">{editRow ? 'Edit Screening' : 'Add Screening'}</h3>

              <select
                value={formData.donorId}
                onChange={(e) => setFormData((prev) => ({ ...prev, donorId: e.target.value }))}
                disabled={!!editRow}
                className="border w-full p-2 rounded"
              >
                <option value="">Select Donor</option>
                {dummyDonors.map((d) => (
                  <option key={d.id} value={d.id}>{d.fullName}</option>
                ))}
              </select>

              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                className="border w-full p-2 rounded"
              />

              <input
                type="number"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                className="border w-full p-2 rounded"
              />

              <input
                type="number"
                placeholder="Hemoglobin (g/dL)"
                value={formData.hemoglobin}
                onChange={(e) => setFormData((prev) => ({ ...prev, hemoglobin: e.target.value }))}
                className="border w-full p-2 rounded"
              />

              <input
                type="text"
                placeholder="Blood Pressure (e.g., 120/80)"
                value={formData.bp}
                onChange={(e) => setFormData((prev) => ({ ...prev, bp: e.target.value }))}
                className="border w-full p-2 rounded"
              />

              {['hepatitisB', 'hepatitisC', 'malaria', 'hiv', 'syphilis'].map((test) => (
                <select
                  key={test}
                  value={formData[test]}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [test]: e.target.value }))}
                  className="border w-full p-2 rounded"
                >
                  <option value="">{test.replace(/([A-Z])/g, ' $1')} Result</option>
                  <option value="Negative">Negative</option>
                  <option value="Positive">Positive</option>
                </select>
              ))}

              <div className="flex justify-end gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 bg-red-600 text-white rounded">{editRow ? 'Update' : 'Add'}</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="p-4 bg-white shadow rounded-lg flex flex-col justify-center items-center border border-[#D32F2F]">
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className="text-2xl font-semibold text-[#121212]">{value}</p>
    </div>
  );
}
