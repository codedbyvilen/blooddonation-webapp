'use State'
import React, { useContext, useState } from "react";
import StatCard from "./StatCard";
import { CheckCircle, Droplet, Plus, Search, Stethoscope,UserX, X } from "lucide-react";
import { Edit, Save, Trash2 } from 'lucide-react';
import { useDonorContext } from "../hook/useDonorContext";

const ScreeningTable = () => {
  const [modelOpen,setModelOpen] = useState(false);
  const [data,setData] = useState([]);
  const {donors} = useDonorContext() ;


  const [screenData,setScreenData] = useState({
    ScreenID:`${data.length + 1}`,
    DonorID: `DN-${data.length + 1}`,
    Date:new Date().toISOString().split('T')[0],
    Weight:'',
    Hemoglobin:'',
    Bp:'',
    HepatitisB:'',
    HepatitisC:'',
    Malaria:'',
    Hiv:'',
    Syphilis:'',
    BloodGroup:'',
  });

  const handleModel = ()=>{
    setModelOpen((prev)=>!prev)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(screenData)
    setData([...data,screenData])
    setModelOpen(false)
  }

  const handleChange = (e)=>{
     const {name,value} = e.target;
     setScreenData({...screenData,[name]:value})
  }

  return (
    //Main Parent Container
    <div className='p-4 flex flex-col gap-y-12 space-y-0 '>

      {/*Stat Card*/}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <StatCard name="Total Screenings" icon={Stethoscope} value={0} />
        <StatCard name="Eligible Donors" icon={Droplet} value={0} />
        <StatCard name="Ineligible Donors" icon={UserX} value={0} />
      </div>


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
              <td className="px-4 py-2">{val.ID}</td>
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
              <td className="px-4 py-2">{'Yes' ? <CheckCircle className="text-green-600" size={18} />:<X size={18}/>}</td>
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

    {modelOpen && (
  <>
    {/* Backdrop */}
    <div className="fixed inset-0 bg-black opacity-35 z-10"></div>

    {/* Modal Content */}
    <div className="fixed inset-0  flex justify-center items-center z-50">
      <div className="w-[40%]  relative h-[90%] bg-white p-4 rounded-lg">

      {/*Cross Icon*/}
      <div className="absolute right-3">
          <button className="cursor-pointer" onClick={()=>setModelOpen(false)}><X/></button>
      </div> 
      
      {/*Heading*/}
      <div className="w-full flex justify-center items-center h-15 ">
        <h2 className="text-xl font-semibold">Add Screening Data</h2>
      </div>

      {/*Form Data*/}
      <form onSubmit={handleSubmit} className="w-full justify-center flex flex-col  gap-y-2 h-[93%] " action="">


      {/*Weight*/}
      <div className="w-full h-12 bg-white">
        <input name="Weight" onChange={handleChange} value={screenData.Weight} className="w-full border-2 border-black rounded-md p-2 h-full" placeholder="Enter Weight in KG" type="text" required />
      </div>


      {/*Hemoglobin*/}
      <div className="w-full h-12 bg-white">
        <input name="Hemoglobin" value={screenData.Hemoglobin} onChange={handleChange} className="w-full border-2 border-black rounded-md p-2 h-full" placeholder="Enter Hemoglobin" type="float" required/>
      </div>


      {/*Bp*/}
      <div className="w-full h-12 bg-white">
        <input name="Bp" value={screenData.Bp} onChange={handleChange} className="w-full border-2 border-black rounded-md p-2 h-full" placeholder="Enter BP" type="number" />
      </div>


      {/*HepatitisB*/}
      <div className="w-full h-18 bg-white">
      <label className="block" htmlFor="HepatitisB">HepatitisB</label>
       <select name="HepatitisB" className="px-3 outline-none border-2 border-black" onChange={handleChange}>
        <option>Select...</option>
        <option value="Positive">Positive</option>
        <option value="Negative">Negative</option>
       </select>
      </div>


      {/*HepatitisC*/}
       <div className="w-full h-18 bg-white">
        <label className="block" htmlFor="HepatitisC">HepatitisC</label>
       <select name="HepatitisB" className="px-3 outline-none border-2 border-black" onChange={handleChange}>
        <option>Select...</option>
        <option value="Positive">Positive</option>
        <option value="Negative">Negative</option>
       </select>
      </div>

      {/*Malaria*/}
       <div className="w-full h-18 bg-white">
        <label className="block" htmlFor="Malaria">Malaria</label>
       <select name="Malaria" className="px-3 outline-none border-2 border-black" onChange={handleChange}>
        <option>Select...</option>
        <option value="Positive">Positive</option>
        <option value="Negative">Negative</option>
       </select>
      </div>


      {/*HIV*/}
       <div className="w-full h-18 bg-white">
        <label className="block" htmlFor="Hiv">Hiv</label>
       <select name="Hiv" className="px-3 outline-none border-2 border-black" onChange={handleChange}>
        <option>Select...</option>
        <option value="Positive">Positive</option>
        <option value="Negative">Negative</option>
       </select>
      </div>


      {/*Syphilis*/}
       <div className="w-full h-18 bg-white">
        <label className="block" htmlFor="Syphilis">Syphilis</label>
       <select name="Syphilis" className="px-3 outline-none border-2 border-black" onChange={handleChange}>
        <option>Select...</option>
        <option value="Positive">Positive</option>
        <option value="Negative">Negative</option>
       </select>
      </div>


      {/*BloodGroup*/}
      <div className="w-full h-12 bg-white">
        <input value={screenData.BloodGroup} onChange={handleChange} className="w-full border-2 border-black rounded-md p-2 h-full" placeholder="Enter Blood Group" type="number" />
      </div>

      {/*Submit*/}
      <div className="w-full flex justify-center items-center h-8">
          <button className="px-8 py-2 bg-red-500" type="submit">Submit</button>
      </div>



      </form>

      </div>
    </div>
  </>
)}


    </div>
  );
};

export default ScreeningTable;
