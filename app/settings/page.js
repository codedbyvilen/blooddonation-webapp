'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Settings() {
  const [eventInfo, setEventInfo] = useState({
    date: '2025-06-29',
    time: '4:00 PM onwards',
    venue: 'Habitt, Tipu Sultan Road, Karachi',
  });
  
  const [contactInfo, setContactInfo] = useState({
    councilName: 'VFAHT Sindh',
    councilContact: '0300-1234567',
  });

  const [formOpen, setFormOpen] = useState(true);

  const handleSave = () => {
    alert('Settings updated successfully!');
    // Here you'd save to Firebase or backend
  };

  return (
    <motion.div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-[#D32F2F]">Settings</h2>

      {/* Event Info */}
      <div className="space-y-4 border p-4 rounded border-[#D32F2F]">
        <h3 className="font-semibold text-[#D32F2F]">Event Details</h3>
        <input
          type="text"
          className="input"
          placeholder="Event Date"
          value={eventInfo.date}
          onChange={(e) => setEventInfo(prev => ({ ...prev, date: e.target.value }))}
        />
        <input
          type="text"
          className="input"
          placeholder="Event Time"
          value={eventInfo.time}
          onChange={(e) => setEventInfo(prev => ({ ...prev, time: e.target.value }))}
        />
        <input
          type="text"
          className="input"
          placeholder="Event Venue"
          value={eventInfo.venue}
          onChange={(e) => setEventInfo(prev => ({ ...prev, venue: e.target.value }))}
        />
      </div>

      {/* Council Info */}
      <div className="space-y-4 border p-4 rounded border-[#D32F2F]">
        <h3 className="font-semibold text-[#D32F2F]">Council Contact</h3>
        <input
          type="text"
          className="input"
          placeholder="Council Name"
          value={contactInfo.councilName}
          onChange={(e) => setContactInfo(prev => ({ ...prev, councilName: e.target.value }))}
        />
        <input
          type="text"
          className="input"
          placeholder="Council Contact Number"
          value={contactInfo.councilContact}
          onChange={(e) => setContactInfo(prev => ({ ...prev, councilContact: e.target.value }))}
        />
      </div>

      {/* Toggle Form */}
      <div className="flex items-center gap-4 border p-4 rounded border-[#D32F2F]">
        <span className="font-semibold">Donor Registration Form:</span>
        <button
          onClick={() => setFormOpen(prev => !prev)}
          className={`px-4 py-2 rounded ${formOpen ? 'bg-green-600 text-white' : 'bg-gray-300 text-black'}`}
        >
          {formOpen ? 'Open' : 'Closed'}
        </button>
      </div>

      <button onClick={handleSave} className="mt-4 px-4 py-2 bg-[#D32F2F] text-white rounded hover:bg-[#b71c1c] flex items-center gap-2">
        <Save size={16} /> Save Settings
      </button>
    </motion.div>
  );
}
