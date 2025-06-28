import React from 'react';
import { useForm } from 'react-hook-form';

export default function Modal({ donors, setShowModal, setDonors }) {
  const fixText = (text, type) => {
    const clean = text.trim().toLowerCase();
    if (type === 'yesno') return clean === 'yes' ? 'Yes' : 'No';
    if (type === 'gender') return clean === 'male' ? 'Male' : 'Female';
    if (type === 'source') {
      if (clean === 'whatsapp') return 'WhatsApp';
      if (clean === 'facebook') return 'Facebook';
      if (clean === 'instagram') return 'Instagram';
      return 'Other';
    }
    return text.trim();
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    const newDonor = {
      id: `${donors.length + 1}`,
      FullName: data.FullName.trim(),
      Email: data.Email.toLowerCase().trim(),
      Age: data.Age,
      Gender: fixText(data.Gender, 'gender'),
      Weight: data.Weight,
      Contact: data.Contact.trim(),
      RecentDonation: fixText(data.RecentDonation, 'yesno'),
      Criteria: fixText(data.Criteria, 'yesno'),
      Willing: fixText(data.Willing, 'yesno'),
      SharedVia: fixText(data.SharedVia, 'source'),
      Referrer: data.Referrer.trim(),
      CreatedAt: new Date().toISOString().split('T')[0],
    };

    setDonors([...donors, newDonor]);
    setShowModal(false);
    reset();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/55 z-50">
      <div className="bg-white p-6 w-[90%] md:w-[45%] rounded-2xl space-y-6 max-h-[90vh] overflow-y-auto border border-[#D32F2F] shadow-2xl">

        <h2 className="text-2xl font-bold text-center text-[#D32F2F] mb-2">Add New Blood Donor</h2>
        <p className="text-center text-gray-600 mb-4">Kindly fill all required details carefully.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Basic Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                {...register('FullName', { required: 'FullName is required', minLength: { value: 2, message: 'Name too short' } })}
                placeholder="Enter full name"
                className={`border px-3 py-2 w-full rounded-lg ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                {...register('Email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                placeholder="example@email.com"
                className={`border px-3 py-2 w-full rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          {/* Age, Gender, Weight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Age *</label>
              <input
                {...register('Age', { required: 'Age is required', min: 18, max: 60 })}
                type="number"
                placeholder="18 - 60"
                className={`border px-3 py-2 w-full rounded-lg ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender *</label>
              <select
                {...register('Gender', { required: 'Gender is required' })}
                className={`border px-3 py-2 w-full rounded-lg ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Weight (kg) *</label>
              <input
                {...register('Weight', { required: 'Weight is required', min: 50,max:60 })}
                type="number"
                placeholder="Minimum 50kg"
                className={`border px-3 py-2 w-full rounded-lg ${errors.weight ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm font-medium mb-1">WhatsApp Contact *</label>
            <input
              {...register('Contact', { required: 'Contact is required', pattern: { value: /^(\+92|92|0)?3[0-9]{9}$/, message: 'Invalid Pakistani number' } })}
              placeholder="03XXXXXXXXX"
              className={`border px-3 py-2 w-full rounded-lg ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
          </div>

          {/* Donation Eligibility */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {['RecentDonation', 'Criteria', 'Willing'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-1">{field.replace(/([A-Z])/g, ' $1')} *</label>
                <select
                  {...register(field, { required: 'Required' })}
                  className={`border px-3 py-2 w-full rounded-lg ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            ))}
          </div>

          {/* Source & Referrer */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Shared Via *</label>
              <select
                {...register('SharedVia', { required: 'Required' })}
                className={`border px-3 py-2 w-full rounded-lg ${errors.sharedVia ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Source</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Referrer Name & Council *</label>
              <input
                {...register('Referrer', { required: 'Required', minLength: 3 })}
                placeholder="e.g., Dr. Ali - SMDC"
                className={`border px-3 py-2 w-full rounded-lg ${errors.referrer ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={() => { setShowModal(false); reset(); }}
              className="px-4 cursor-pointer py-2 border border-[#D32F2F] text-[#D32F2F] rounded-lg hover:bg-red-100"
            >
              Cancel
            </button>


            <button
              type="submit"
              className="px-4 cursor-pointer py-2 bg-[#D32F2F] text-white rounded-lg hover:bg-[#b71c1c]"
            >
              Add Donor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
