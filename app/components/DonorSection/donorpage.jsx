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
  const [editValues, setEditValues] = useState({ weight: '', contact: '' });



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
      <DonorTable donors={donors} searchTerm={searchTerm} setSearchTerm={setSearchTerm} editRow={editRow} deleteDonor={deleteDonor} setShowModal={setShowModal} setEditRow={setEditRow} saveEdit={saveEdit} filteredDonors={filteredDonors} editValues={editValues} setEditValues={setEditValues}/>

      {/* Add Donor Modal - SIMPLE FORM! */}
      {showModal && (
        <DonorModal setShowModal={setShowModal} onSubmit={onSubmit}/>
      )}
    </motion.div>
  );
}