'use client'
import { createContext, useState } from "react";

export const DonateContext = createContext();

export default function DonorProvider({children}){
    const [donors, setDonors] = useState([]);
    const [screenlist,setScreenlist] = useState([]);
    return <DonateContext.Provider value={{donors,setDonors,screenlist,setScreenlist}}>{children}</DonateContext.Provider>
}



