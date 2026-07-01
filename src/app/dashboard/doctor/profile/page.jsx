import React from 'react';
import { 
  FaSave, FaUserMd, FaStethoscope, FaClock, 
  FaAward, FaDollarSign, FaHospital, FaLink 
} from 'react-icons/fa';

const CredentialsEditor = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#0a1120] rounded-xl shadow-2xl border border-gray-800 text-gray-200">
      <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-700 pb-4 flex items-center gap-3">
        <FaAward className="text-blue-500" /> Professional Credentials Editor
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Specialty */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
            <FaStethoscope /> Clinical Specialties
          </label>
          <select className="w-full p-3 bg-[#111c30] border border-gray-700 rounded-lg outline-none text-white focus:border-blue-500">
            <option>Cardiology</option>
            <option>Gynecologist</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
            <FaClock /> Experience (Years)
          </label>
          <input type="number" defaultValue="14" className="w-full p-3 bg-[#111c30] border border-gray-700 rounded-lg outline-none text-white" />
        </div>

        {/* Qualification */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
            <FaAward /> Qualifications Statement
          </label>
          <input type="text" defaultValue="MD, FACC - Harvard Medical School" className="w-full p-3 bg-[#111c30] border border-gray-700 rounded-lg outline-none text-white" />
        </div>

        {/* Fee */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
            <FaDollarSign /> Co-pay Consultation Fee ($)
          </label>
          <input type="number" defaultValue="150" className="w-full p-3 bg-[#111c30] border border-gray-700 rounded-lg outline-none text-white" />
        </div>
      </div>

      {/* Hospital */}
      <div className="mt-8">
        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
          <FaHospital /> Attached Medical Hospital Name
        </label>
        <input type="text" defaultValue="Boston General Hospital" className="w-full p-3 bg-[#111c30] border border-gray-700 rounded-lg outline-none text-white" />
      </div>

      {/* Profile Photo */}
      <div className="mt-8">
        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
          <FaLink /> Profile Photo / Avatar Image (URL)
        </label>
        <input type="text" className="w-full p-3 bg-[#111c30] border border-gray-700 rounded-lg outline-none text-white" placeholder="https://..." />
      </div>

      {/* Save Button */}
      <div className="mt-10 flex justify-end">
        <button className="flex items-center gap-3 bg-[#10b981] hover:bg-[#059669] text-white px-8 py-3 rounded-lg font-bold transition-all">
          <FaSave /> Save Professional Records
        </button>
      </div>
    </div>
  );
};

export default CredentialsEditor;