'use client'
import { createContext, useState } from "react";

export const DonateContext = createContext();

export default function DonorProvider({children}){
    const [donors, setDonors] = useState([]);

    return <DonateContext.Provider value={{donors,setDonors}}>{children}</DonateContext.Provider>

}