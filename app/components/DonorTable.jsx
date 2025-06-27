'use client';

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Search, Edit, Save, Trash2 } from 'lucide-react';
import { Droplet, Users, HeartHandshake } from 'lucide-react';

// Simple StatCard component
const StatCard = ({ name, icon: Icon, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg border border-red-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{name}</p>
        <p className="text-2xl font-bold text-[#D32F2F]">{value}</p>
      </div>
      <div className="bg-red-100 p-3 rounded-full">
        <Icon className="h-6 w-6 text-[#D32F2F]" />
      </div>
    </div>
  </div>
);

export default function DonorTable() {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editValues, setEditValues] = useState({ weight: '', contact: '' });

  // React Hook Form setup - SIMPLE!
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm();

  // Filter donors for search
  const filteredDonors = useMemo(() => {
    return donors.filter(d =>
      d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.referrer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [donors, searchTerm]);

  // Calculate stats - SIMPLE!
  const totalDonors = donors.length;
  const recentDonors = donors.filter(d => d.recentDonation === 'Yes').length;
  const maleCount = donors.filter(d => d.gender === 'Male').length;
  const femaleCount = donors.filter(d => d.gender === 'Female').length;

  // Fix text format - SIMPLE!
  const fixText = (text, type) => {
    const clean = text.trim();
    
    if (type === 'yesno') {
      return clean.toLowerCase() === 'yes' ? 'Yes' : 'No';
    }
    if (type === 'gender') {
      return clean.toLowerCase() === 'male' ? 'Male' : 'Female';
    }
    if (type === 'source') {
      const lower = clean.toLowerCase();
      if (lower === 'whatsapp') return 'WhatsApp';
      if (lower === 'facebook') return 'Facebook';
      if (lower === 'instagram') return 'Instagram';
      if (lower === 'other') return 'Other';
      return clean;
    }
    return clean;
  };

  // Add new donor - SIMPLE!
  const onSubmit = (data) => {
    const newDonor = {
      id: `DNR${donors.length + 1}`,
      fullName: data.fullName.trim(),
      email: data.email.toLowerCase().trim(),
      age: data.age,
      gender: fixText(data.gender, 'gender'),
      weight: data.weight,
      contact: data.contact.trim(),
      recentDonation: fixText(data.recentDonation, 'yesno'),
      criteria: fixText(data.criteria, 'yesno'),
      willing: fixText(data.willing, 'yesno'),
      sharedVia: fixText(data.sharedVia, 'source'),
      referrer: data.referrer.trim(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    setDonors([...donors, newDonor]);
    setShowModal(false);
    reset(); // Clear form
  };

  // Save edited donor - SIMPLE!
  const saveEdit = (donorId) => {
    setDonors(donors.map(d => 
      d.id === donorId 
        ? { ...d, weight: editValues.weight, contact: editValues.contact }
        : d
    ));
    setEditRow(null);
  };

  // Delete donor - SIMPLE!
  const deleteDonor = (donorId) => {
    setDonors(donors.filter(d => d.id !== donorId));
  };

  return (
    <div className="p-4 space-y-8">
      
      {/* Stats Cards - Updated automatically! */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard name="Total Donors" icon={Droplet} value={totalDonors} />
        <StatCard name="Recent Donors" icon={HeartHandshake} value={recentDonors} />
        <StatCard name="Male/Female" icon={Users} value={`${maleCount} / ${femaleCount}`} />
      </div>

      {/* Main Table */}
      <div className="bg-white shadow-lg p-4 border border-[#D32F2F] rounded-lg">
        
        {/* Top buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <button 
            onClick={() => setShowModal(true)} 
            className="bg-[#D32F2F] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#b71c1c]"
          >
            <Plus size={16} /> Add Donor
          </button>
          
          {/* Search box */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search donors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-[#D32F2F] rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
            />
            <Search className="absolute left-3 top-2.5 text-[#D32F2F]" size={18} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Weight</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Willing</th>
                <th className="px-4 py-2">Referrer</th>
                <th className="px-4 py-2">Source</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.map(donor => (
                <tr key={donor.id} className="border-t">
                  <td className="px-4 py-2">{donor.fullName}</td>
                  <td className="px-4 py-2">{donor.email}</td>
                  <td className="px-4 py-2">{donor.age}</td>
                  <td className="px-4 py-2">{donor.gender}</td>
                  <td className="px-4 py-2">
                    {editRow === donor.id ? (
                      <input 
                        value={editValues.weight} 
                        onChange={(e) => setEditValues({...editValues, weight: e.target.value})} 
                        className="border rounded px-2 py-1 w-20" 
                      />
                    ) : donor.weight}
                  </td>
                  <td className="px-4 py-2">
                    {editRow === donor.id ? (
                      <input 
                        value={editValues.contact} 
                        onChange={(e) => setEditValues({...editValues, contact: e.target.value})} 
                        className="border rounded px-2 py-1 w-32" 
                      />
                    ) : donor.contact}
                  </td>
                  <td className="px-4 py-2">{donor.willing}</td>
                  <td className="px-4 py-2">{donor.referrer}</td>
                  <td className="px-4 py-2">{donor.sharedVia}</td>
                  <td className="px-4 py-2">{donor.createdAt}</td>
                  <td className="px-4 py-2 flex gap-2">
                    {editRow === donor.id ? (
                      <button onClick={() => saveEdit(donor.id)} className="text-green-600 hover:text-green-400">
                        <Save size={18} />
                      </button>
                    ) : (
                      <button onClick={() => {
                        setEditRow(donor.id);
                        setEditValues({ weight: donor.weight, contact: donor.contact });
                      }} className="text-blue-600 hover:text-blue-400">
                        <Edit size={18} />
                      </button>
                    )}
                    <button onClick={() => deleteDonor(donor.id)} className="text-red-600 hover:text-red-400">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredDonors.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {donors.length === 0 ? 'No donors yet. Add your first donor!' : 'No donors found.'}
            </div>
          )}
        </div>
      </div>

      {/* Add Donor Modal - SIMPLE FORM! */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 w-[90%] md:w-[50%] rounded-lg space-y-4 overflow-y-auto max-h-[90vh] border-2 border-[#D32F2F]">
            <h3 className="text-lg font-bold text-[#D32F2F] mb-4">Add New Donor</h3>

            {/* Form starts here */}
            <div className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name *</label>
                <input
                  {...register('fullName', { 
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name too short' }
                  })}
                  placeholder="Enter full name"
                  className={`border rounded px-3 py-2 w-full ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium mb-1 block">Email *</label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
                  })}
                  placeholder="Enter email"
                  className={`border rounded px-3 py-2 w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Age */}
              <div>
                <label className="text-sm font-medium mb-1 block">Age *</label>
                <input
                  {...register('age', { 
                    required: 'Age is required',
                    min: { value: 18, message: 'Must be 18+' },
                    max: { value: 60, message: 'Must be under 60' }
                  })}
                  type="number"
                  placeholder="18-60"
                  className={`border rounded px-3 py-2 w-full ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
              </div>

              {/* Gender */}
              <div>
                <label className="text-sm font-medium mb-1 block">Gender *</label>
                <input
                  {...register('gender', { 
                    required: 'Gender is required',
                    validate: value => {
                      const clean = value.toLowerCase().trim();
                      return clean === 'male' || clean === 'female' || 'Type "Male" or "Female"';
                    }
                  })}
                  placeholder="Male or Female"
                  className={`border rounded px-3 py-2 w-full ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
              </div>

              {/* Weight */}
              <div>
                <label className="text-sm font-medium mb-1 block">Weight (kg) *</label>
                <input
                  {...register('weight', { 
                    required: 'Weight is required',
                    min: { value: 50, message: 'Minimum 50kg' }
                  })}
                  type="number"
                  placeholder="50+"
                  className={`border rounded px-3 py-2 w-full ${errors.weight ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>}
              </div>

              {/* Contact */}
              <div>
                <label className="text-sm font-medium mb-1 block">WhatsApp Contact *</label>
                <input
                  {...register('contact', { 
                    required: 'Contact is required',
                    pattern: { value: /^(\+92|92|0)?3[0-9]{9}$/, message: 'Invalid Pakistani number' }
                  })}
                  placeholder="03XXXXXXXXX"
                  className={`border rounded px-3 py-2 w-full ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
              </div>

              {/* Recent Donation */}
              <div>
                <label className="text-sm font-medium mb-1 block">Donated in Last 3 Months? *</label>
                <input
                  {...register('recentDonation', { 
                    required: 'Required',
                    validate: value => {
                      const clean = value.toLowerCase().trim();
                      return clean === 'yes' || clean === 'no' || 'Type "Yes" or "No"';
                    }
                  })}
                  placeholder="Yes or No"
                  className={`border rounded px-3 py-2 w-full ${errors.recentDonation ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.recentDonation && <p className="text-red-500 text-xs mt-1">{errors.recentDonation.message}</p>}
              </div>

              {/* Criteria */}
              <div>
                <label className="text-sm font-medium mb-1 block">Fulfils Criteria? *</label>
                <input
                  {...register('criteria', { 
                    required: 'Required',
                    validate: value => {
                      const clean = value.toLowerCase().trim();
                      return clean === 'yes' || clean === 'no' || 'Type "Yes" or "No"';
                    }
                  })}
                  placeholder="Yes or No"
                  className={`border rounded px-3 py-2 w-full ${errors.criteria ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.criteria && <p className="text-red-500 text-xs mt-1">{errors.criteria.message}</p>}
              </div>

              {/* Willing */}
              <div>
                <label className="text-sm font-medium mb-1 block">Willing to Donate? *</label>
                <input
                  {...register('willing', { 
                    required: 'Required',
                    validate: value => {
                      const clean = value.toLowerCase().trim();
                      return clean === 'yes' || clean === 'no' || 'Type "Yes" or "No"';
                    }
                  })}
                  placeholder="Yes or No"
                  className={`border rounded px-3 py-2 w-full ${errors.willing ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.willing && <p className="text-red-500 text-xs mt-1">{errors.willing.message}</p>}
              </div>

              {/* Shared Via */}
              <div>
                <label className="text-sm font-medium mb-1 block">Shared Via *</label>
                <input
                  {...register('sharedVia', { 
                    required: 'Required',
                    validate: value => {
                      const clean = value.toLowerCase().trim();
                      const valid = ['whatsapp', 'facebook', 'instagram', 'other'];
                      return valid.includes(clean) || 'Type WhatsApp, Facebook, Instagram, or Other';
                    }
                  })}
                  placeholder="WhatsApp, Facebook, Instagram, Other"
                  className={`border rounded px-3 py-2 w-full ${errors.sharedVia ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.sharedVia && <p className="text-red-500 text-xs mt-1">{errors.sharedVia.message}</p>}
              </div>

              {/* Referrer */}
              <div>
                <label className="text-sm font-medium mb-1 block">Referrer Name & Council *</label>
                <input
                  {...register('referrer', { 
                    required: 'Referrer info is required',
                    minLength: { value: 3, message: 'Too short' }
                  })}
                  placeholder="Name and Local Council"
                  className={`border rounded px-3 py-2 w-full ${errors.referrer ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.referrer && <p className="text-red-500 text-xs mt-1">{errors.referrer.message}</p>}
              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button 
                type="button" 
                onClick={() => {
                  setShowModal(false);
                  reset();
                }} 
                className="px-4 py-2 border border-[#D32F2F] text-[#D32F2F] rounded hover:bg-red-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit(onSubmit)}
                className="px-4 py-2 bg-[#D32F2F] text-white rounded hover:bg-[#b71c1c]"
              >
                Add Donor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}