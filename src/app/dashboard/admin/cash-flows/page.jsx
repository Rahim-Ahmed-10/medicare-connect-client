"use client";
import React, { useState, useEffect } from "react";
import { FaReceipt } from "react-icons/fa";

const CashFlowsPage = () => {
  const [cashFlows, setCashFlows] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/all-cash-flows`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setCashFlows(res.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="p-8 bg-[#0f172a] min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">Secure Stripe Co-Pay Ledger</h2>

      <div className="bg-[#1e293b] rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#334155] text-gray-300 text-sm uppercase">
              <th className="p-4">Payer Patient</th>
              <th className="p-4">Clinical Doctor</th>
              <th className="p-4">Co-Pay Value</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {cashFlows.map((flow) => (
              <tr
                key={flow._id}
                className="border-t border-gray-700 hover:bg-[#2d3748] transition"
              >
                <td className="p-4 font-medium">{flow.userEmail}</td>
                <td className="p-4">{flow.doctorName}</td>
                {/* এখানে ভুল ছিল, ${} এর বদলে শুধু {flow.amount} হবে */}
                <td className="p-4 text-emerald-400 font-bold">
                  ${flow.amount}
                </td>
                <td className="p-4 text-gray-400">{flow.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashFlowsPage;
