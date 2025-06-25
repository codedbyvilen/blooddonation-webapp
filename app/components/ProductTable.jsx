'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Save, Search, Trash2 } from 'lucide-react';
import Image from 'next/image';

const ProductTable = () => {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editRow, setEditRow] = useState(null);
  const [editValues, setEditValues] = useState({ price: '', stock: '', sales: '' });

  const filteredProducts = useMemo(() => {
    return product.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [product, searchTerm]);

  const handleEditClick = (prod) => {
    setEditRow(prod.id);
    setEditValues({
      price: prod.price,
      stock: prod.stock,
      sales: prod.sales,
    });
  };

  const handleSaveClick = (id) => {
    setProduct((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, price: Number(editValues.price), stock: Number(editValues.stock), sales: Number(editValues.sales) } : p
      )
    );
    setEditRow(null);
  };

  const handleDeleteClick = (id) => {
    setProduct((prev) => prev.filter((p) => p.id !== id));
  };

  const handleChange = (field, value) => {
    if (!/^\d*\.?\d*$/.test(value)) return;
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setProduct(data.products));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0 mb-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
        <h2 className="text-base md:text-xl font-semibold text-gray-100 text-center md:text-left">
          Products List
        </h2>

        <div className="relative w-full md:w-auto">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="Search Products..."
            className="bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 text-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-gray-700">
          <thead>
            <tr>
              {['Name', 'Product Id', 'Category', 'Price', 'Stock', 'Sales', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="px-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((p) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className={`flex flex-col md:table-row mb-4 md:mb-0 border-b md:border-b-0 border-gray-700 md:border-none p-2 md:p-0 ${
                  editRow === p.id ? 'bg-[#2f2f2f] ring-1 ring-gray-500' : ''
                }`}
              >
                {/* Mobile View */}
                <td className="md:hidden px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image src={p.image} alt={p.name} width={36} height={36} className="w-9 h-9 rounded-full" />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-100">{p.name}</div>
                        <div className="text-xs text-gray-100">ID: {p.id}</div>
                      </div>
                    </div>

                    <div className="flex space-x-1 -mt-1 -mr-1">
                      {editRow === p.id ? (
                        <button className="text-green-500 hover:text-green-300" onClick={() => handleSaveClick(p.id)}>
                          <Save size={16} />
                        </button>
                      ) : (
                        <button className="text-indigo-500 hover:text-indigo-300" onClick={() => handleEditClick(p)}>
                          <Edit size={16} />
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-300" onClick={() => handleDeleteClick(p.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-gray-300 space-y-1">
                    <div>Category: {p.category}</div>
                    <div>
                      Price:{' '}
                      {editRow === p.id ? (
                        <input
                          type="text"
                          value={editValues.price}
                          onChange={(e) => handleChange('price', e.target.value)}
                          className="bg-[#3a3a3a] text-white rounded px-1 w-16"
                        />
                      ) : (
                        `$${p.price.toFixed(2)}`
                      )}
                    </div>
                    <div>
                      Stock:{' '}
                      {editRow === p.id ? (
                        <input
                          type="text"
                          value={editValues.stock}
                          onChange={(e) => handleChange('stock', e.target.value)}
                          className="bg-[#3a3a3a] text-white rounded px-1 w-12"
                        />
                      ) : (
                        p.stock
                      )}
                    </div>
                    <div>
                      Sales:{' '}
                      {editRow === p.id ? (
                        <input
                          type="text"
                          value={editValues.sales}
                          onChange={(e) => handleChange('sales', e.target.value)}
                          className="bg-[#3a3a3a] text-white rounded px-1 w-12"
                        />
                      ) : (
                        p.sales
                      )}
                    </div>
                  </div>
                </td>

                {/* Desktop View */}
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  <div className="flex items-center">
                    <Image src={p.image} alt={p.name} width={40} height={40} className="w-10 h-10 rounded-full" />
                    <span className="ml-3">{p.name}</span>
                  </div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-300">{p.id}</td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-300">{p.category}</td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-300">
                  {editRow === p.id ? (
                    <input
                      type="text"
                      value={editValues.price}
                      onChange={(e) => handleChange('price', e.target.value)}
                      className="bg-[#3a3a3a] text-white rounded px-1 w-20"
                    />
                  ) : (
                    `$${p.price.toFixed(2)}`
                  )}
                </td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-300">
                  {editRow === p.id ? (
                    <input
                      type="text"
                      value={editValues.stock}
                      onChange={(e) => handleChange('stock', e.target.value)}
                      className="bg-[#3a3a3a] text-white rounded px-1 w-16"
                    />
                  ) : (
                    p.stock
                  )}
                </td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-300">
                  {editRow === p.id ? (
                    <input
                      type="text"
                      value={editValues.sales}
                      onChange={(e) => handleChange('sales', e.target.value)}
                      className="bg-[#3a3a3a] text-white rounded px-1 w-16"
                    />
                  ) : (
                    p.sales
                  )}
                </td>
                <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-300">
                  <div className="flex space-x-1 -ml-2">
                    {editRow === p.id ? (
                      <button className="text-green-500 hover:text-green-300" onClick={() => handleSaveClick(p.id)}>
                        <Save size={18} />
                      </button>
                    ) : (
                      <button className="text-indigo-500 hover:text-indigo-300" onClick={() => handleEditClick(p)}>
                        <Edit size={18} />
                      </button>
                    )}
                    <button className="text-red-500 hover:text-red-300" onClick={() => handleDeleteClick(p.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductTable;
