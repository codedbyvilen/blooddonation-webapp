'use client'

import { motion } from 'framer-motion'
import { PieChart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { 
  PieChart as RechartsPieChart, 
  Cell, 
  Legend, 
  Pie, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts'

const CategoryDistributionChart = () => {
  const colors = ["#FF6B68", "#4D96FF", "#FFD166", "#06D6A0", "#A29BFE"]
  const [categorydata, setCategoryData] = useState([]);
  const [isSmallerMedium,setIsSmallMedium] = useState([]);


  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setCategoryData(data.categories))
  }, []);


  useEffect(()=>{
    const updatesize = ()=>{
        setIsSmallMedium(window.innerWidth <= 758)
    }

    updatesize()
    window.addEventListener("resize",updatesize)
    return ()=>window.removeEventListener("resize",updatesize)
},[])

    const outerRadius = isSmallerMedium ? 60:80

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl 
       p-4 md:p-6 border  border-[#1f1f1f]  mx-2 md:mx-0"
    >
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left">
        Category Distribution
      </h2>

      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={categorydata}
              cx="50%"
              cy="50%"
              labelLine={false}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={outerRadius}
            >
              {categorydata.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41,55,0.8)",
                borderColor: "#4b5563",
                borderRadius: "8px",
                padding: "8px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#e5e7eb" }}
            />

            <Legend iconType="circle" layout="horizontal" align='center' />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default CategoryDistributionChart