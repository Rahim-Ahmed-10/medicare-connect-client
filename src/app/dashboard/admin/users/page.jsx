"use client";

import React, { useState, useEffect } from 'react';
import { FaTrash, FaUserSlash, FaCheckCircle, FaBan } from 'react-icons/fa';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAction = async (id, action) => {
    if (window.confirm("আপনি কি নিশ্চিত?")) {
      const method = action === 'delete' ? 'DELETE' : 'PATCH';
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${action}/${id}`, { method });
      if (res.ok) fetchUsers();
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#0f172a] min-h-screen text-white">
      {/* হেডার - রেসপন্সিভ ফ্লেক্স */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Registered System Accounts</h2>
        <span className="bg-[#1e293b] px-4 py-2 rounded-full text-xs md:text-sm border border-gray-700">
          Total Users: {users.length}
        </span>
      </div>
      
      {/* টেবিল কন্টেইনার - মোবাইল স্ক্রিনে স্ক্রলেবল */}
      <div className="bg-[#1e293b] rounded-xl border border-gray-700 overflow-x-auto shadow-lg">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-[#0f172a] border-b border-gray-700 text-gray-400 text-[10px] md:text-xs uppercase">
            <tr>
              <th className="p-3 md:p-5">User</th>
              <th className="p-3 md:p-5">Role</th>
              <th className="p-3 md:p-5">Email</th>
              <th className="p-3 md:p-5">Status</th>
              <th className="p-3 md:p-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map(user => (
              <tr key={user._id} className="hover:bg-[#2d3748]/50 transition-colors">
                <td className="p-3 md:p-5 flex items-center gap-2 md:gap-4">
                  <img src={user.image || '/default-avatar.png'} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-600" alt="avatar" />
                  <span className="text-sm font-medium">{user.name}</span>
                </td>
                <td className="p-3 md:p-5">
                  <span className="bg-gray-800 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold uppercase border border-gray-600">
                    {user.role}
                  </span>
                </td>
                <td className="p-3 md:p-5 text-[10px] md:text-sm text-gray-400">{user.email}</td>
                <td className="p-3 md:p-5">
                  {user.status === 'suspended' ? 
                    <span className="flex items-center gap-1 text-red-400 text-[10px] md:text-sm"><FaBan size={12} /> Suspended</span> : 
                    <span className="flex items-center gap-1 text-emerald-400 text-[10px] md:text-sm"><FaCheckCircle size={12} /> Active</span>
                  }
                </td>
                <td className="p-3 md:p-5 flex justify-center gap-3 md:gap-5">
                  <button onClick={() => handleAction(user._id, 'suspend')} className="text-amber-400 hover:scale-125 cursor-pointer transition">
                    <FaUserSlash size={16} />
                  </button>
                  <button onClick={() => handleAction(user._id, 'delete')} className="text-red-500 hover:scale-125 cursor-pointer transition">
                    <FaTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;