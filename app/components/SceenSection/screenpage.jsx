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
import ScreeningModal from "./models/ScreeningModal";
import ScreeningTable from "./table/ScreeningTable";

const screenpage = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const [data, setData] = useState([]);
  const { donors } = useDonorContext();
  const [isEligible, setIsEligible] = useState(false);

  const [screenData, setScreenData] = useState({
    ScreenID: `${data.length + 1}`,
    DonorID: `${data.length + 1}`,
    Date: new Date().toISOString().split("T")[0],
    Weight: "",
    Hemoglobin: "",
    Bp: "",
    HepatitisB: "",
    HepatitisC: "",
    Malaria: "",
    Hiv: "",
    Syphilis: "",
    BloodGroup: "",
  });

  const handleModel = () => {
    setModelOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScreenData({ ...screenData, [name]: value });
  };

  const checkEligibility = () => {
    const haveDisease =
      screenData.HepatitisB?.toLowerCase() === "positive" ||
      screenData.HepatitisC?.toLowerCase() === "positive" ||
      screenData.Hiv?.toLowerCase() === "positive" ||
      screenData.Malaria?.toLowerCase() === "positive" ||
      screenData.Syphilis?.toLowerCase() === "positive";

    // Assuming BP is systolic/diastolic, update accordingly if different
    const weightOk = screenData.Weight >= 50;
    const hemoglobinOk = screenData.Hemoglobin >= 12.5;
    const bpOk = screenData.Bp >= 80 && screenData.Bp <= 120;

    if (weightOk && hemoglobinOk && bpOk && !haveDisease) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(screenData);
    setData([...data, screenData]);
    checkEligibility();
    setModelOpen(false);
  };

  return (
    //Main Parent Container
    <div className="p-4 flex flex-col gap-y-12 space-y-0 ">

      {/*Stat Card*/}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <StatCard name="Total Screenings" icon={Stethoscope} value={0} />
        <StatCard name="Eligible Donors" icon={Droplet} value={0} />
        <StatCard name="Ineligible Donors" icon={UserX} value={0} />
      </div>

      {/*Screening Table*/}
      <ScreeningTable isEligible={isEligible} handleModel={handleModel} data={data} />


      {/*Screening Modal*/}
      {modelOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black opacity-35 z-10"></div>

          {/* Modal Content */}
          <ScreeningModal
            setModelOpen={setModelOpen}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            screenData={screenData}
          />
        </>
      )}
    </div>
  );
};

export default screenpage;
