import React from 'react'
import { useForm } from 'react-hook-form';


function Modal({setShowModal,onSubmit}) {
    // React Hook Form setup - SIMPLE!
    const { 
      register, 
      handleSubmit, 
      formState: { errors }, 
      reset 
    } = useForm();

    
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 w-[90%] md:w-[50%] rounded-lg space-y-4 overflow-y-auto max-h-[90vh] border-2 border-[#D32F2F]">
          <h3 className="text-lg font-bold text-[#D32F2F] mb-4">Add New Donor</h3>

          {/* Form starts here */}
          <div className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium mb-1 block">Full Name *</label>
              <input
                {...register('fullName', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name too short' }
                })}
                placeholder="Enter full name"
                className={`border rounded px-3 py-2 w-full ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium mb-1 block">Email *</label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
                })}
                placeholder="Enter email"
                className={`border rounded px-3 py-2 w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Age */}
            <div>
              <label className="text-sm font-medium mb-1 block">Age *</label>
              <input
                {...register('age', { 
                  required: 'Age is required',
                  min: { value: 18, message: 'Must be 18+' },
                  max: { value: 60, message: 'Must be under 60' }
                })}
                type="number"
                placeholder="18-60"
                className={`border rounded px-3 py-2 w-full ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-medium mb-1 block">Gender *</label>
              <input
                {...register('gender', { 
                  required: 'Gender is required',
                  validate: value => {
                    const clean = value.toLowerCase().trim();
                    return clean === 'male' || clean === 'female' || 'Type "Male" or "Female"';
                  }
                })}
                placeholder="Male or Female"
                className={`border rounded px-3 py-2 w-full ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
            </div>

            {/* Weight */}
            <div>
              <label className="text-sm font-medium mb-1 block">Weight (kg) *</label>
              <input
                {...register('weight', { 
                  required: 'Weight is required',
                  min: { value: 50, message: 'Minimum 50kg' }
                })}
                type="number"
                placeholder="50+"
                className={`border rounded px-3 py-2 w-full ${errors.weight ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>}
            </div>

            {/* Contact */}
            <div>
              <label className="text-sm font-medium mb-1 block">WhatsApp Contact *</label>
              <input
                {...register('contact', { 
                  required: 'Contact is required',
                  pattern: { value: /^(\+92|92|0)?3[0-9]{9}$/, message: 'Invalid Pakistani number' }
                })}
                placeholder="03XXXXXXXXX"
                className={`border rounded px-3 py-2 w-full ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
            </div>

            {/* Recent Donation */}
            <div>
              <label className="text-sm font-medium mb-1 block">Donated in Last 3 Months? *</label>
              <input
                {...register('recentDonation', { 
                  required: 'Required',
                  validate: value => {
                    const clean = value.toLowerCase().trim();
                    return clean === 'yes' || clean === 'no' || 'Type "Yes" or "No"';
                  }
                })}
                placeholder="Yes or No"
                className={`border rounded px-3 py-2 w-full ${errors.recentDonation ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.recentDonation && <p className="text-red-500 text-xs mt-1">{errors.recentDonation.message}</p>}
            </div>

            {/* Criteria */}
            <div>
              <label className="text-sm font-medium mb-1 block">Fulfils Criteria? *</label>
              <input
                {...register('criteria', { 
                  required: 'Required',
                  validate: value => {
                    const clean = value.toLowerCase().trim();
                    return clean === 'yes' || clean === 'no' || 'Type "Yes" or "No"';
                  }
                })}
                placeholder="Yes or No"
                className={`border rounded px-3 py-2 w-full ${errors.criteria ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.criteria && <p className="text-red-500 text-xs mt-1">{errors.criteria.message}</p>}
            </div>

            {/* Willing */}
            <div>
              <label className="text-sm font-medium mb-1 block">Willing to Donate? *</label>
              <input
                {...register('willing', { 
                  required: 'Required',
                  validate: value => {
                    const clean = value.toLowerCase().trim();
                    return clean === 'yes' || clean === 'no' || 'Type "Yes" or "No"';
                  }
                })}
                placeholder="Yes or No"
                className={`border rounded px-3 py-2 w-full ${errors.willing ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.willing && <p className="text-red-500 text-xs mt-1">{errors.willing.message}</p>}
            </div>

            {/* Shared Via */}
            <div>
              <label className="text-sm font-medium mb-1 block">Shared Via *</label>
              <input
                {...register('sharedVia', { 
                  required: 'Required',
                  validate: value => {
                    const clean = value.toLowerCase().trim();
                    const valid = ['whatsapp', 'facebook', 'instagram', 'other'];
                    return valid.includes(clean) || 'Type WhatsApp, Facebook, Instagram, or Other';
                  }
                })}
                placeholder="WhatsApp, Facebook, Instagram, Other"
                className={`border rounded px-3 py-2 w-full ${errors.sharedVia ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.sharedVia && <p className="text-red-500 text-xs mt-1">{errors.sharedVia.message}</p>}
            </div>

            {/* Referrer */}
            <div>
              <label className="text-sm font-medium mb-1 block">Referrer Name & Council *</label>
              <input
                {...register('referrer', { 
                  required: 'Referrer info is required',
                  minLength: { value: 3, message: 'Too short' }
                })}
                placeholder="Name and Local Council"
                className={`border rounded px-3 py-2 w-full ${errors.referrer ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.referrer && <p className="text-red-500 text-xs mt-1">{errors.referrer.message}</p>}
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button 
              type="button" 
              onClick={() => {
                setShowModal(false);
                reset();
              }} 
              className="px-4 py-2 border border-[#D32F2F] text-[#D32F2F] rounded hover:bg-red-100"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-2 bg-[#D32F2F] text-white rounded hover:bg-[#b71c1c]"
            >
              Add Donor
            </button>
          </div>
        </div>
      </div>
    )
}

export default Modal
