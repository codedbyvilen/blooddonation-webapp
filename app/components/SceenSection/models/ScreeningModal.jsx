import { X } from 'lucide-react'
import React from 'react'

const ScreeningModal = ({setModelOpen,handleSubmit,handleChange,screenData}) => {
  return (
     <div className="fixed inset-0  flex justify-center items-center z-50">
      <div className="w-[40%]  relative h-[90%] bg-white border-2 border-red-500 p-4 rounded-lg">

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
       <div className="w-full h-20 bg-white">
        <label className="block" htmlFor="Weight">Weight</label>
        <input name="Weight" value={screenData.Weight} onChange={handleChange} className="w-full border-2 border-black rounded-md p-2 " placeholder="Enter Weight" type="number" required/>
      </div>


      {/*Hemoglobin*/}
      <div className="w-full h-20 bg-white">
        <label className="block" htmlFor="Hemoglobin">Hemoglobin</label>
        <input name="Hemoglobin" value={screenData.Hemoglobin} onChange={handleChange} className="w-full border-2 border-black rounded-md p-2 " placeholder="Enter Hemoglobin" type="decimal" required/>
      </div>


      {/*Bp*/}
      <div className="w-full h-20 bg-white">
        <label className="block" htmlFor="Bp">Bp</label>
        <input name="Bp" value={screenData.Bp} onChange={handleChange} className="w-full border-2 border-black rounded-md p-2 " placeholder="Enter Hemoglobin" type="decimal" required/>
      </div>


      {/*HepatitisB*/}
      <div className="w-full h-18 bg-white">
      <label className="block" htmlFor="HepatitisB">HepatitisB</label>
       <select name="HepatitisB" className="px-3 outline-none border-2 border-black" onChange={handleChange} required>
        <option>Select...</option>
        <option value="Positive">Positive</option>
        <option value="Negative">Negative</option>
       </select>
      </div>


      {/*HepatitisC*/}
       <div className="w-full h-18 bg-white">
        <label className="block" htmlFor="HepatitisC">HepatitisC</label>
       <select name="HepatitisC" className="px-3 outline-none border-2 border-black" onChange={handleChange} required>
        <option>Select...</option>
        <option value="Positive">Positive</option>
        <option value="Negative">Negative</option>
       </select>
      </div>

      {/*Malaria*/}
       <div className="w-full h-18 bg-white">
        <label className="block" htmlFor="Malaria">Malaria</label>
       <select name="Malaria" className="px-3 outline-none border-2 border-black" onChange={handleChange} required>
        <option>Select...</option>
        <option value="Positive">Positive</option>
        <option value="Negative">Negative</option>
       </select>
      </div>


      {/*HIV*/}
       <div className="w-full h-18 bg-white">
        <label className="block" htmlFor="Hiv">Hiv</label>
       <select name="Hiv" className="px-3 outline-none border-2 border-black" onChange={handleChange} required>
        <option>Select...</option>
        <option value="Positive">Positive</option>
        <option value="Negative">Negative</option>
       </select>
      </div>


      {/*Syphilis*/}
       <div className="w-full h-18 bg-white">
        <label className="block" htmlFor="Syphilis">Syphilis</label>
       <select name="Syphilis" className="px-3 outline-none border-2 border-black" onChange={handleChange} required>
        <option>Select...</option>
        <option value="Positive">Positive</option>
        <option value="Negative">Negative</option>
       </select>
      </div>


      {/*BloodGroup*/}
       <div className="w-full h-20 bg-white">
        <label className="block" htmlFor="BloodGroup">BloodGroup</label>
        <input name="BloodGroup" value={screenData.BloodGroup} onChange={handleChange} className="w-full border-2 border-black rounded-md p-2 " placeholder="Enter BloodGroup" type="decimal" required/>
      </div>

      {/*Submit*/}
      <div className="w-full flex justify-center items-center h-8">
          <button className="px-8 py-2 bg-red-500 text-white" type="submit">Submit</button>
      </div>



      </form>

      </div>
    </div>
  )
}

export default ScreeningModal
