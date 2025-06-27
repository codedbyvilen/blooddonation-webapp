import { useContext } from "react"
import { DonateContext } from "../context/donationContext"

export const useDonorContext = ()=>useContext(DonateContext)