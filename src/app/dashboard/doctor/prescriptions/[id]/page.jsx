"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaSave, FaArrowLeft, FaFilePrescription, FaNotesMedical, FaPills } from 'react-icons/fa';

export default function EditPrescriptionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    diagnosis: '',
    meds: '',
    notes: ''
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prescriptions/${id}`)
      .then(res => res.json())
      .then(data => data.success && setFormData(data.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _id, ...dataToSend } = formData; 

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/prescriptions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    });

    if (res.ok) {
      alert("Prescription updated successfully!");
      router.push('/dashboard/doctor/prescriptions');
    } else {
      alert("Failed to update.");
    }
  };

  return (
    <div className="p-8 bg-[#0f172a] min-h-screen text-gray-100 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <button 
          onClick={() => router.back()} 
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
        >
          <FaArrowLeft /> Back to List
        </button>

        <form onSubmit={handleSubmit} className="bg-[#1e293b] p-8 rounded-3xl border border-gray-700 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-emerald-500/10 rounded-2xl">
              <FaFilePrescription size={32} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Edit Prescription</h1>
              <p className="text-gray-400 text-sm">Update clinical details for {formData.patientName}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                <FaNotesMedical className="text-emerald-500" /> Diagnosis
              </label>
              <input 
                className="w-full p-4 bg-[#0f172a] border border-gray-700 rounded-2xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" 
                value={formData.diagnosis} 
                onChange={e => setFormData({...formData, diagnosis: e.target.value})} 
              />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                <FaPills className="text-blue-500" /> Medications
              </label>
              <textarea 
                className="w-full p-4 bg-[#0f172a] border border-gray-700 rounded-2xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all h-32 resize-none" 
                value={formData.meds} 
                onChange={e => setFormData({...formData, meds: e.target.value})} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full mt-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <FaSave /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}