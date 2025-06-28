'use client'
import React, { useContext, useState } from "react";
import StatCard from "../StatCard";
import {
  Droplet,
  Stethoscope,
  UserX,
} 

from "lucide-react";
import { useDonorContext } from "../../hook/useDonorContext";
import ScreeningModal from "./modal/ScreeningModal";
import ScreeningTable from "./table/ScreeningTable";
import { motion } from "framer-motion";


const screenpage = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const { donors,screenlist,setScreenlist } = useDonorContext();





  return (
    //Main Parent Container
    <motion.div className="p-8 flex flex-col gap-y-12 space-y-0 "
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}>

      {/*Stat Card*/}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <StatCard name="Total Screenings" icon={Stethoscope} value={screenlist.length} />
         <StatCard name="Eligible Donors" icon={Droplet} value={screenlist.filter((val) => val.Eligible === "Yes").length} />
        <StatCard name="Ineligible Donors" icon={UserX} value={screenlist.filter((val)=>val.Eligible === "No").length} />
      </div>

      {/*Screening Table*/}
      <ScreeningTable donors={donors} setScreenlist={setScreenlist} setModelOpen={setModelOpen}  screenlist={screenlist} />


      {/*Screening Modal*/}
      {modelOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black opacity-35 z-10"></div>

          {/* Modal Content */}
          <ScreeningModal
            setScreenlist={setScreenlist}
            screenlist={screenlist}
            donors={donors}
            setModelOpen={setModelOpen}
          />
        </>
      )}
    </motion.div>
  );
};

export default screenpage;
