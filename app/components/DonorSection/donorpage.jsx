'use client';

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Search, Edit, Save, Trash2 } from 'lucide-react';
import { Droplet, Users, HeartHandshake } from 'lucide-react';
import { useDonorContext } from '../../hook/useDonorContext';
import StatCard from '../StatCard';
import DonorModal from './modal/modal';
import { motion } from 'framer-motion';
import DonorTable from './table/Donortable';



export default function donorpage() {
  const {donors,setDonors} = useDonorContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editValues, setEditValues] = useState({ Weight: '', Contact: '' });



  // Filter donors for search
  const filteredDonors = useMemo(() => {
    return donors.filter(d =>
      d.FullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.Referrer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [donors, searchTerm]);

  // Calculate stats - SIMPLE!
  const totalDonors = donors.length;
  const recentDonors = donors.filter(d => d.RecentDonation === 'Yes').length;
  const maleCount = donors.filter(d => d.Gender === 'Male').length;
  const femaleCount = donors.filter(d => d.Gender === 'Female').length;



  // Save edited donor - SIMPLE!
  const saveEdit = (donorId) => {
    setDonors(donors.map(d => 
      d.id === donorId 
        ? { ...d, Weight: editValues.Weight, Contact: editValues.Contact }
        : d
    ));
    setEditRow(null);
  };

  // Delete donor - SIMPLE!
  const deleteDonor = (donorId) => {
    setDonors(donors.filter(d => d.id !== donorId));
  };

  return (
    <motion.div className="p-4 space-y-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}>
      
      {/* Stats Cards - Updated automatically! */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard name="Total Donors" icon={Droplet} value={totalDonors} />
        <StatCard name="Recent Donors" icon={HeartHandshake} value={recentDonors} />
        <StatCard name="Male/Female" icon={Users} value={`${maleCount} / ${femaleCount}`} />
      </div>

      {/* Main Table */}
      <DonorTable saveEdit={saveEdit} donors={donors} searchTerm={searchTerm} setSearchTerm={setSearchTerm} editRow={editRow} deleteDonor={deleteDonor} setShowModal={setShowModal} setEditRow={setEditRow} saveEdit={saveEdit} filteredDonors={filteredDonors} editValues={editValues} setEditValues={setEditValues}/>

      {/* Add Donor Modal - SIMPLE FORM! */}
      {showModal && (
        <DonorModal donors={donors} setDonors={setDonors} setShowModal={setShowModal} />
      )}
    </motion.div>
  );
}