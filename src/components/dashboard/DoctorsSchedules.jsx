"use client";

import React, { useState } from 'react';
import { FaPlus, FaChevronDown } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const DoctorsSchedules = () => {
    const [days, setDays] = useState(['Monday', 'Wednesday', 'Friday']);
    const [selectedDay, setSelectedDay] = useState('Monday');

    const [timeSlots, setTimeSlots] = useState(['09:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '03:30 PM']);
    const [selectedTime, setSelectedTime] = useState('09:00 AM');

    const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const availableTimes = [
        '08:00 AM', '09:00 AM', '10:00 AM', '10:30 AM', '11:00 AM', 
        '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '03:30 PM', '04:00 PM'
    ];

    const handleAddDay = () => {
        if (!days.includes(selectedDay)) setDays([...days, selectedDay]);
    };

    const handleRemoveDay = (dayToRemove) => {
        setDays(days.filter(day => day !== dayToRemove));
    };

    const handleAddTimeSlot = () => {
        if (!timeSlots.includes(selectedTime)) setTimeSlots([...timeSlots, selectedTime]);
    };

    const handleRemoveTimeSlot = (timeToRemove) => {
        setTimeSlots(timeSlots.filter(time => time !== timeToRemove));
    };

    return (
        <div className="min-h-screen bg-[#090e1a] text-white p-6 md:p-10 font-sans antialiased">
            <div className="max-w-6xl mx-auto">
                
                <h1 className="text-2xl font-bold text-white tracking-tight mb-8">
                    Manage Clinical Schedule Slots
                </h1>

                <div className="grid grid-cols-1 gap-8">

                    {/* কার্ড ১: Working Weekdays */}
                    <div className="bg-[#0f172a] rounded-[20px] p-8 border border-gray-800 shadow-2xl transition-all duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-sm font-bold text-gray-300 tracking-wider uppercase">Working Weekdays</h2>
                            <span className="text-[11px] font-bold px-3 py-1 bg-[#1e293b] text-emerald-400 rounded-full border border-emerald-900/50">
                                Configure Days
                            </span>
                        </div>

                        <div className="flex gap-3 mb-6">
                            <div className="relative flex-1">
                                <select 
                                    value={selectedDay}
                                    onChange={(e) => setSelectedDay(e.target.value)}
                                    className="w-full bg-[#0a1120] border border-gray-700 text-white text-sm rounded-xl pl-4 pr-10 py-3 outline-none focus:border-emerald-500 transition-all cursor-pointer"
                                >
                                    {availableDays.map((day, index) => (
                                        <option key={index} value={day} className="bg-[#0f172a]">{day}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                                    <FaChevronDown size={12} />
                                </div>
                            </div>
                            <button 
                                onClick={handleAddDay}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/20"
                            >
                                <FaPlus /> Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {days.map((day, index) => (
                                <div key={index} className="flex items-center gap-2 bg-[#1e293b] border border-gray-700 text-gray-200 text-xs font-bold px-4 py-2.5 rounded-lg">
                                    {day}
                                    <button onClick={() => handleRemoveDay(day)} className="text-gray-500 hover:text-red-400">
                                        <IoClose size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* কার্ড ২: Appointment Hours */}
                    <div className="bg-[#0f172a] rounded-[20px] p-8 border border-gray-800 shadow-2xl transition-all duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-sm font-bold text-gray-300 tracking-wider uppercase">Configured Appointment Hours</h2>
                        </div>

                        <div className="flex gap-3 mb-6">
                            <div className="relative flex-1">
                                <select 
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    className="w-full bg-[#0a1120] border border-gray-700 text-white text-sm rounded-xl pl-4 pr-10 py-3 outline-none focus:border-emerald-500 transition-all cursor-pointer"
                                >
                                    {availableTimes.map((time, index) => (
                                        <option key={index} value={time} className="bg-[#0f172a]">{time}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                                    <FaChevronDown size={12} />
                                </div>
                            </div>
                            <button 
                                onClick={handleAddTimeSlot}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/20"
                            >
                                <FaPlus /> Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {timeSlots.map((time, index) => (
                                <div key={index} className="flex items-center gap-2 bg-emerald-950/30 border border-emerald-800/50 text-emerald-400 text-xs font-bold px-4 py-2.5 rounded-lg">
                                    {time}
                                    <button onClick={() => handleRemoveTimeSlot(time)} className="text-emerald-500 hover:text-red-400">
                                        <IoClose size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorsSchedules;