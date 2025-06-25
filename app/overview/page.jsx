import { DollarSign, ShoppingBag, SquareActivity, Users } from 'lucide-react'
import React from 'react'
import StatCard from '../components/StatCard'

const Overview = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">

        <StatCard name="Total Sales" icon={DollarSign} value="$182,450"/>
          <StatCard name="Total Clients" icon={Users} value="1,437"/>
           <StatCard name="Total Products" icon={ShoppingBag} value="674"/>
          <StatCard name="Stock" icon={SquareActivity} value="12,845"/>
        </div>
      </main>
      
    </div>
  )
}

export default Overview
