import React from "react";
import { useForm } from "react-hook-form";

const ScreeningModal = ({
  setModelOpen,
  screenlist,
  donors,
  setScreenlist,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const haveDisease =
      data.HepatitisB.toLowerCase() === "positive" ||
      data.HepatitisC.toLowerCase() === "positive" ||
      data.Hiv.toLowerCase() === "positive" ||
      data.Malaria.toLowerCase() === "positive" ||
      data.Syphilis.toLowerCase() === "positive";

    const weightOk = parseFloat(data.Weight) >= 50;
    const hemoglobinOk = parseFloat(data.Hemoglobin) >= 12.5;
    const bpOk = parseFloat(data.Bp) >= 80 && parseFloat(data.Bp) <= 120;

    const isEligible = weightOk && hemoglobinOk && bpOk && !haveDisease;

    const newObj = {
      ScreenID: `${screenlist.length + 1}`,
      DonorID: data.DonorID,
      Date: new Date().toISOString().split("T")[0],
      Weight: data.Weight,
      Hemoglobin: data.Hemoglobin,
      Bp: data.Bp,
      HepatitisB: data.HepatitisB,
      HepatitisC: data.HepatitisC,
      Malaria: data.Malaria,
      Hiv: data.Hiv,
      Syphilis: data.Syphilis,
      BloodGroup: data.BloodGroup,
      Eligible: isEligible ? "Yes" : "No",
    };

    setScreenlist([...screenlist, newObj]);
    setModelOpen(false);
    reset();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="w-[90%] md:w-[45%] relative max-h-[90vh] bg-white border-2 border-red-500 p-6 rounded-2xl space-y-4 overflow-y-auto shadow-xl">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl text-[#D32F2F] font-bold">
            Add Screening Data
          </h2>
          <p className="text-gray-600">
            Kindly fill all required details carefully.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Donor Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Donor *</label>
            <select
              {...register("DonorID", { required: "Donor is required" })}
              className={`w-full border px-3 py-2 rounded-lg ${
                errors.DonorID ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Donor...</option>
              {donors.map((donor) => (
                <option key={donor.id} value={donor.id}>
                  {donor.FullName} (ID: {donor.id})
                </option>
              ))}
            </select>
            {errors.DonorID && (
              <p className="text-red-500 text-sm">{errors.DonorID.message}</p>
            )}
          </div>
          {/* Weight */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Weight (kg) *
            </label>
            <input
              {...register("Weight", {
                required: "Weight is required",
                min: { value: 50, message: "Minimum 50kg required to donate" },
              })}
              type="number"
              placeholder="Enter Weight"
              className={`w-full border px-3 py-2 rounded-lg ${
                errors.Weight ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.Weight && (
              <p className="text-red-500 text-sm">{errors.Weight.message}</p>
            )}
          </div>

          {/* Hemoglobin */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Hemoglobin (g/dL) *
            </label>
            <input
              {...register("Hemoglobin", {
                required: "Hemoglobin is required",
                min: { value: 12.5, message: "Minimum 12.5 g/dL required" },
              })}
              type="number"
              step="0.1"
              placeholder="Enter Hemoglobin"
              className={`w-full border px-3 py-2 rounded-lg ${
                errors.Hemoglobin ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.Hemoglobin && (
              <p className="text-red-500 text-sm">
                {errors.Hemoglobin.message}
              </p>
            )}
          </div>

          {/* Blood Pressure */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Blood Pressure (Systolic) *
            </label>
            <input
              {...register("Bp", {
                required: "Blood Pressure is required",
                min: { value: 80, message: "Minimum BP is 80" },
                max: { value: 120, message: "Maximum BP is 120" },
              })}
              type="number"
              placeholder="Enter BP"
              className={`w-full border px-3 py-2 rounded-lg ${
                errors.Bp ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.Bp && (
              <p className="text-red-500 text-sm">{errors.Bp.message}</p>
            )}
          </div>

          {/* Infections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["HepatitisB", "HepatitisC", "Malaria", "Hiv", "Syphilis"].map(
              (disease) => (
                <div key={disease}>
                  <label className="block text-sm font-medium mb-1">
                    {disease} *
                  </label>
                  <select
                    {...register(disease, {
                      required: `${disease} status is required`,
                    })}
                    className={`w-full border px-3 py-2 rounded-lg ${
                      errors[disease] ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select...</option>
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                  </select>
                  {errors[disease] && (
                    <p className="text-red-500 text-sm">
                      {errors[disease].message}
                    </p>
                  )}
                </div>
              )
            )}
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Blood Group *
            </label>
            <select
              {...register("BloodGroup", {
                required: "Blood Group is required",
              })}
              className={`w-full border px-3 py-2 rounded-lg ${
                errors.BloodGroup ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select...</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.BloodGroup && (
              <p className="text-red-500 text-sm">
                {errors.BloodGroup.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setModelOpen(false)}
              className="px-4 py-2 border border-[#D32F2F] text-[#D32F2F] rounded-lg hover:bg-red-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#D32F2F] text-white rounded-lg hover:bg-[#b71c1c]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScreeningModal;
