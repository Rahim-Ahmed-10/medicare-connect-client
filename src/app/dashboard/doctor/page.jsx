"use client"
import React, { useState, useEffect } from 'react';

const DoctorPage = () => {
    // ডিফল্ট ডাক্তার হিসেবে Dr. Ahsan Habib কে রাখা হলো
    const [selectedDoctor, setSelectedDoctor] = useState("Dr. Ahsan Habib");
    
    // ডাইনামিক ডাটা স্টেটসমূহ
    const [bookings, setBookings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // ১. আপনার ডাটাবেজের সম্পূর্ণ মক ডাটা (image_587c96.png ও image_588437.png এর স্ট্রাকচার অনুযায়ী)
    const allMockBookings = [
        { id: "6a429dde67f16d93c120d210", doctorName: "Dr. Nusrat Jahan", userEmail: "kulsum@gmail.com", date: "2026-06-30", time: "03:00 PM", amount: "80", status: "Approved" },
        { id: "6a429dde67f16d93c120d211", doctorName: "Dr. Nusrat Jahan", userEmail: "mimi@gmail.com", date: "2026-07-02", time: "12:00 PM", amount: "80", status: "Pending" },
        { id: "6a3f90bb21c74516178c71af", doctorName: "Dr. Ahsan Habib", userEmail: "rahimahmed01690@gmail.com", date: "2026-06-27", time: "11:30 AM", amount: "100", status: "Approved" },
        { id: "6a3f90bb21c74516178c71b0", doctorName: "Dr. Ahsan Habib", userEmail: "karim@gmail.com", date: "2026-07-01", time: "05:00 PM", amount: "100", status: "Pending" },
        { id: "6a3f90bb21c74516178c71b1", doctorName: "Dr. Ahsan Habib", userEmail: "shafiq@gmail.com", date: "2026-07-02", time: "06:00 PM", amount: "100", status: "Pending" },
        { id: "6a3f90bb21c74516178c71b5", doctorName: "Dr. Asif Rahman", userEmail: "russel@gmail.com", date: "2026-06-29", time: "02:15 PM", amount: "120", status: "Approved" },
    ];

    const allMockReviews = [
        { id: "6a40317afc23fc61cf375cb3", doctorName: "Dr. Ahsan Habib", email: "rahimahmed01690@gmail.com", rating: 5, comment: "Excellent service!" },
        { id: "6a40317afc23fc61cf375cb4", doctorName: "Dr. Ahsan Habib", email: "user@gmail.com", rating: 4, comment: "Good experience" },
        { id: "6a40317afc23fc61cf375cb5", doctorName: "Dr. Nusrat Jahan", email: "patientK@gmail.com", rating: 4, comment: "Very polite doctor" },
        { id: "6a40317afc23fc61cf375cb6", doctorName: "Dr. Asif Rahman", email: "patientX@gmail.com", rating: 3, comment: "Average" },
    ];

    // ২. নির্বাচিত ডাক্তারের উপর ভিত্তি করে ডাইনামিক ফিল্টারিং
    useEffect(() => {
        setLoading(true);
        
        // বাস্তব প্রজেক্টে এখানে আপনি API কল করতে পারেন: 
        // fetch(`https://your-server.com/bookings?doctorName=${selectedDoctor}`)
        
        const filteredBookings = allMockBookings.filter(b => b.doctorName === selectedDoctor);
        const filteredReviews = allMockReviews.filter(r => r.doctorName === selectedDoctor);

        setBookings(filteredBookings);
        setReviews(filteredReviews);
        setLoading(false);
    }, [selectedDoctor]); // selectedDoctor পরিবর্তন হলেই এই useEffect আবার রান করবে

    // ৩. ডাইনামিক ক্যালকুলেশনসমূহ
    const totalPatients = bookings.filter(b => b.status === "Approved").length;
    const pendingPatients = bookings.filter(b => b.status === "Pending").length;
    
    const averageRating = reviews.length > 0 
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) 
        : "No reviews yet";

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            
            {/* Top Bar with Doctor Switcher Dropdown */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Doctor Management Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Select a doctor to view their real-time practice stats</p>
                </div>
                
                {/* ডাইনামিক ডাক্তার সিলেক্টর */}
                <div className="flex items-center gap-3 bg-gray-100 p-2 rounded-xl border border-gray-200 w-full md:w-auto">
                    <label className="text-sm font-semibold text-gray-600 pl-2">Active Doctor:</label>
                    <select 
                        value={selectedDoctor} 
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        className="bg-white text-gray-800 font-medium px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-emerald-500 shadow-sm cursor-pointer outline-none"
                    >
                        <option value="Dr. Ahsan Habib">Dr. Ahsan Habib (Neurologist)</option>
                        <option value="Dr. Nusrat Jahan">Dr. Nusrat Jahan (Gynecologist)</option>
                        <option value="Dr. Asif Rahman">Dr. Asif Rahman (Cardiologist)</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-xl font-medium text-gray-500">Updating Dashboard Stats...</div>
            ) : (
                <>
                    {/* Dynamic Counter Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {/* Total Patients Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500 transform hover:scale-[1.01] transition-all">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Patients (Added)</p>
                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">{totalPatients}</h3>
                                </div>
                                <div className="p-3 bg-blue-50 text-blue-500 rounded-xl text-xl">👥</div>
                            </div>
                        </div>

                        {/* Pending Approvals Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-amber-500 transform hover:scale-[1.01] transition-all">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Pending Approvals</p>
                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">{pendingPatients}</h3>
                                </div>
                                <div className="p-3 bg-amber-50 text-amber-500 rounded-xl text-xl">⏳</div>
                            </div>
                        </div>

                        {/* Average Rating Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500 transform hover:scale-[1.01] transition-all">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Average Rating Score</p>
                                    <h3 className="text-3xl font-bold text-gray-800 mt-2 flex items-center gap-2">
                                        {averageRating} {reviews.length > 0 && <span className="text-amber-400 text-2xl">★</span>}
                                    </h3>
                                </div>
                                <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl text-xl">⭐</div>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Based on {reviews.length} filtered reviews</p>
                        </div>
                    </div>

                    {/* Dynamic Table Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-800">Appointments for <span className="text-emerald-600">{selectedDoctor}</span></h2>
                            <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                                {bookings.length} Found
                            </span>
                        </div>
                        
                        {bookings.length === 0 ? (
                            <div className="text-center py-12 text-gray-400">No appointments found for this doctor.</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                                            <th className="p-4">Patient Email</th>
                                            <th className="p-4">Appointment Date</th>
                                            <th className="p-4">Time Slot</th>
                                            <th className="p-4">Consultation Fee</th>
                                            <th className="p-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                                        {bookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="p-4 font-medium text-gray-900">{booking.userEmail}</td>
                                                <td className="p-4 text-gray-600">{booking.date}</td>
                                                <td className="p-4 text-gray-600">{booking.time}</td>
                                                <td className="p-4 font-semibold text-gray-800">${booking.amount}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                                                        booking.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                                    }`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default DoctorPage;