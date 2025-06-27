import { Edit, Plus, Search, Trash2 } from 'lucide-react'
import React from 'react'

const ScreeningTable = ({handleModel,isEligible,data}) => {
  return (
   <>
   {/*Grid Layout*/}
      <div className="max-w-7xl  rounded-lg shadow-lg border-2 p-4 border-[#D32F2F]">
       

       {/*Add Screening and Search Functionality*/}
        <div className="max-w-full  flex items-center justify-between ">

        {/*Add Screening*/}
        <div className="flex items-center">
            <button 
            onClick={handleModel} 
            className="bg-[#D32F2F] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#b71c1c]"
          >
            <Plus size={16} /> Add Screening
          </button>   
        </div>


        {/*Search Functionality*/}
         <div className="relative border-1 py-2 rounded-md border-red-500  bg-white">
          <input className="px-5 outline-none    ml-6 " type="text" placeholder="Search record..." />
          <Search width={20} className="absolute text-[#D32F2F]  flex items-center top-[0.33rem] left-2"/>
        </div>

        </div>
       
       {/*Table */}
        <table className="w-full  mt-8 ">
          <thead className="p-1 text-center">
            <tr className="bg-gray-100 text-gray-700 text-sm p-8">
              <th className="px-4 py-2">ScreenID</th>
              <th className="px-2 py-2">DonorID</th>
              <th className="px-2 py-2">Date</th>
              <th className="px-2 py-2">Weight</th>
              <th className="px-2 py-2">Hemoglobin</th>
              <th className="px-2 py-2">Bp</th>
              <th className="px-2 py-2">HepatitisB</th>
              <th className="px-2 py-2">HepatitisC</th>
              <th className="px-2 py-2">Malaria</th>
              <th className="px-2 py-2">Hiv</th>
              <th className="px-2 py-2">Syphilis</th>
              <th className="px-2 py-2">Blood Group</th>
              <th className="px-2 py-2">Eligible</th>
              <th className="px-2 py-2">Actions</th>
            </tr>
          </thead>

          <tbody className="w-full mx-auto">
            {data.map((val)=>(
            <tr className=" text-sm text-center">
              <td className="px-4 py-2">{val.ScreenID}</td>
              <td className="px-4 py-2">{val.DonorID}</td>
              <td className="px-4 py-2">{val.Date}</td>
              <td className="px-4 py-2">{val.Weight}</td>
              <td className="px-4 py-2">{val.Hemoglobin}</td>
              <td className="px-4 py-2">{val.Bp}</td>
              <td className="px-4 py-2">{val.HepatitisB}</td>
              <td className="px-4 py-2">{val.HepatitisC}</td>
              <td className="px-4 py-2">{val.Malaria}</td>
              <td className="px-4 py-2">{val.Hiv}</td>
              <td className="px-4 py-2">{val.Syphilis}</td>
              <td className="px-4 py-2">{val.BloodGroup}</td>
              <td className="px-4 py-2">{isEligible ? (
    <p className="text-green-600">Yes</p>
  ) : (
    <p className="text-red-500">No</p>
  )}</td>
              <div className="flex gap-2 py-3  items-center">
                <button><Edit  size={18} className="text-blue-600 hover:text-blue-400"/></button>
                <button><Trash2 size={18} className="text-red-600 hover:text-red-400"/></button>
              </div>

            </tr>
            ))}
             
  
            
          </tbody>
        </table>

        {data.length== 0 && <h2 className="bg-gray-100 text-center text-gray-500 w-full p-5">No Screening Data yet. Add your first donor screening!</h2>}
        

      </div>
   </>
  )
}

export default ScreeningTable
