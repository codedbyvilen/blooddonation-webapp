import { Edit, Plus, Search, Trash2, Save } from 'lucide-react';
import React, { useState } from 'react';

const ScreeningTable = ({ donors,setModelOpen, screenlist, setScreenlist }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedData(screenlist[index]);
  };

  const handleSave = (index) => {
    const updatedList = [...screenlist];
    updatedList[index] = {
      ...editedData,
      Eligible: checkEligibility(editedData) ? 'Yes' : 'No',
    };
    setScreenlist(updatedList);
    setEditIndex(null);
    setEditedData({});
  };

  const handleDelete = (index) => {
    const updatedList = screenlist.filter((_, i) => i !== index);
   setScreenlist(updatedList);
  };

  const checkEligibility = (data) => {
    const haveDisease =
      data.HepatitisB.toLowerCase() === 'positive' ||
      data.HepatitisC.toLowerCase() === 'positive' ||
      data.Hiv.toLowerCase() === 'positive' ||
      data.Malaria.toLowerCase() === 'positive' ||
      data.Syphilis.toLowerCase() === 'positive';

    const weightOk = parseFloat(data.Weight) >= 50;
    const hemoglobinOk = parseFloat(data.Hemoglobin) >= 12.5;
    const bpOk = parseFloat(data.Bp) >= 80 && parseFloat(data.Bp) <= 120;

    return weightOk && hemoglobinOk && bpOk && !haveDisease;
  };

  const filteredList = screenlist.filter(
    (val) =>
      val.ScreenID.includes(searchQuery) ||
      val.DonorID.includes(searchQuery) ||
      val.BloodGroup.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl rounded-lg shadow-lg border-2 p-4 border-[#D32F2F]">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setModelOpen(true)}
          className="bg-[#D32F2F] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#b71c1c]"
        >
          <Plus size={16} /> Add Screening
        </button>

        <div className="relative border py-2 rounded-md border-red-500 bg-white">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-5 outline-none ml-6"
            type="text"
            placeholder="Search by ID or Blood Group..."
          />
          <Search width={20} className="absolute text-[#D32F2F] top-[0.33rem] left-2" />
        </div>
      </div>

      <table className="w-full mt-8">
        <thead className="text-center">
          <tr className="bg-gray-100 text-gray-700 text-sm">
            <th className="px-4 py-2">ScreenID</th>
            <th className="px-2 py-2">DonorID</th>
              <th className="px-2 py-2">Donor Name</th>
            <th className="px-2 py-2">Date</th>
            <th className="px-2 py-2">Weight</th>
            <th className="px-2 py-2">Hemoglobin</th>
            <th className="px-2 py-2">Bp</th>
            <th className="px-2 py-2">HepB</th>
            <th className="px-2 py-2">HepC</th>
            <th className="px-2 py-2">Malaria</th>
            <th className="px-2 py-2">Hiv</th>
            <th className="px-2 py-2">Syphilis</th>
            <th className="px-2 py-2">Blood Group</th>
            <th className="px-2 py-2">Eligible</th>
            <th className="px-2 py-2">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center text-sm">
          {filteredList.map((val, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{val.ScreenID}</td>
              <td className="px-2 py-2">{val.DonorID}</td>
<td className="px-2 py-2">
  {donors.find((d) => d.id === val.DonorID)?.FullName || "Unknown"}
</td>
              <td className="px-2 py-2">{val.Date}</td>

              {editIndex === index ? (
  <>
    <td className="px-2 py-2">
      <input
        value={editedData.Weight}
        onChange={(e) => setEditedData({ ...editedData, Weight: e.target.value })}
        className="border w-full text-center px-2 py-1 rounded"
        type="number"
      />
    </td>
    <td className="px-2 py-2">
      <input
        value={editedData.Hemoglobin}
        onChange={(e) => setEditedData({ ...editedData, Hemoglobin: e.target.value })}
        className="border w-full text-center px-2 py-1 rounded"
        type="number"
        step="0.1"
      />
    </td>
    <td className="px-2 py-2">
      <input
        value={editedData.Bp}
        onChange={(e) => setEditedData({ ...editedData, Bp: e.target.value })}
        className="border w-full text-center px-2 py-1 rounded"
        type="number"
      />
    </td>
  </>
) : (
  <>
    <td className="px-2 py-2">{val.Weight}</td>
    <td className="px-2 py-2">{val.Hemoglobin}</td>
    <td className="px-2 py-2">{val.Bp}</td>
  </>
)}

              <td>{val.HepatitisB}</td>
              <td>{val.HepatitisC}</td>
              <td>{val.Malaria}</td>
              <td>{val.Hiv}</td>
              <td>{val.Syphilis}</td>
              <td>{val.BloodGroup}</td>
              <td className="px-2 py-2">
                {val.Eligible === 'Yes' ? (
                  <p className="text-green-600">Yes</p>
                ) : (
                  <p className="text-red-500">No</p>
                )}
              </td>
              <td className="flex justify-center gap-2 py-2">
                {editIndex === index ? (
                  <button onClick={() => handleSave(index)}>
                    <Save size={18} className="text-green-600 hover:text-green-400" />
                  </button>
                ) : (
                  <button onClick={() => handleEdit(index)}>
                    <Edit size={18} className="text-blue-600 hover:text-blue-400" />
                  </button>
                )}
                <button onClick={() => handleDelete(index)}>
                  <Trash2 size={18} className="text-red-600 hover:text-red-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {screenlist.length === 0 && (
        <h2 className="bg-gray-100 text-center text-gray-500 w-full p-5">
          No Screening Data yet. Add your first donor screening!
        </h2>
      )}
    </div>
  );
};

export default ScreeningTable;