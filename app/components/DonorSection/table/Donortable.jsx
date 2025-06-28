import { Edit, Plus, Save, Search, Trash2 } from 'lucide-react';
import React from 'react'

function DonorTable({donors,searchTerm,editRow,deleteDonor,setShowModal,setEditRow,setEditValues,filteredDonors,editValues}) {
    return (
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
    )
}

export default DonorTable
