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
                
                {/* 📌 মেইন হেডিং */}
                <h1 className="text-2xl font-bold text-white tracking-tight mb-8">
                    Manage Clinical Schedule Slots
                </h1>

                {/* 🗂️ মডার্ন গ্রিড লেআউট */}
                <div className="grid grid-cols-1  gap-8">

                    {/* 🗓️ কার্ড ১: Working Weekdays */}
                    <div className="bg-white rounded-[20px] p-6 sm:p-8 flex flex-col justify-between min-h-[280px] shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 style={{ color: '#0f172a' }} className="text-sm font-semibold tracking-wide">
                                    Working Weekdays
                                </h2>
                                <span style={{ color: '#047857', backgroundColor: '#ecfdf5' }} className="text-[11px] font-medium px-2.5 py-1 rounded-full tracking-wide">
                                    Configure Days
                                </span>
                            </div>

                            {/* ইনপুট গ্রুপ */}
                            <div className="flex gap-3 mb-6">
                                <div className="relative flex-1">
                                    <select 
                                        value={selectedDay}
                                        onChange={(e) => setSelectedDay(e.target.value)}
                                        style={{ color: '#334155' }}
                                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-4 pr-10 py-3 font-medium appearance-none outline-none focus:border-[#1e533c] focus:ring-1 focus:ring-[#1e533c] cursor-pointer transition-all"
                                    >
                                        {availableDays.map((day, index) => (
                                            <option key={index} value={day} style={{ color: '#334155' }}>{day}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 text-xs">
                                        <FaChevronDown />
                                    </div>
                                </div>
                                <button 
                                    onClick={handleAddDay}
                                    style={{ backgroundColor: '#1e533c', color: '#ffffff' }}
                                    className="text-xs font-semibold px-5 py-3 rounded-xl flex items-center gap-1.5 hover:bg-[#153b2b] active:scale-95 transition-all shadow-sm shrink-0"
                                >
                                    <FaPlus className="text-[10px]" /> Add
                                </button>
                            </div>

                            {/* মডার্ন পিলস/চিপস ডিজাইন */}
                            <div className="flex flex-wrap gap-2">
                                {days.map((day, index) => (
                                    <div 
                                        key={index} 
                                        style={{ color: '#475569', backgroundColor: '#f8fafc' }}
                                        className="flex items-center gap-2 border border-slate-200/80 font-medium text-xs px-3.5 py-2 rounded-xl transition-all hover:border-slate-300"
                                    >
                                        <span>{day}</span>
                                        <button 
                                            onClick={() => handleRemoveDay(day)}
                                            className="text-slate-400 hover:text-red-500 transition-colors ml-1 p-0.5 rounded-md hover:bg-slate-100"
                                        >
                                            <IoClose className="text-sm" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 🕒 কার্ড ২: Configured Appointment Hours */}
                    <div className="bg-white rounded-[20px] p-6 sm:p-8 flex flex-col justify-between min-h-[280px] shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 style={{ color: '#0f172a' }} className="text-sm font-semibold tracking-wide">
                                    Configured Appointment Hours
                                </h2>
                            </div>

                            {/* ইনপুট গ্রুপ */}
                            <div className="flex gap-3 mb-6">
                                <div className="relative flex-1">
                                    <select 
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        style={{ color: '#334155' }}
                                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-4 pr-10 py-3 font-medium appearance-none outline-none focus:border-[#1e533c] focus:ring-1 focus:ring-[#1e533c] cursor-pointer transition-all"
                                    >
                                        {availableTimes.map((time, index) => (
                                            <option key={index} value={time} style={{ color: '#334155' }}>{time}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 text-xs">
                                        <FaChevronDown />
                                    </div>
                                </div>
                                <button 
                                    onClick={handleAddTimeSlot}
                                    style={{ backgroundColor: '#1e533c', color: '#ffffff' }}
                                    className="text-xs font-semibold px-5 py-3 rounded-xl flex items-center gap-1.5 hover:bg-[#153b2b] active:scale-95 transition-all shadow-sm shrink-0"
                                >
                                    <FaPlus className="text-[10px]" /> Add
                                </button>
                            </div>

                            {/* টাইম স্লটের আকর্ষণীয় চিপস */}
                            <div className="flex flex-wrap gap-2">
                                {timeSlots.map((time, index) => (
                                    <div 
                                        key={index} 
                                        style={{ color: '#065f46', backgroundColor: '#e6f7f0' }}
                                        className="flex items-center gap-2 font-semibold text-xs px-3.5 py-2 rounded-xl border border-[#bfead9] transition-all hover:bg-[#d8f3e5]"
                                    >
                                        <span>{time}</span>
                                        <button 
                                            onClick={() => handleRemoveTimeSlot(time)}
                                            className="text-emerald-700/60 hover:text-red-500 transition-colors ml-1 p-0.5 rounded-md hover:bg-emerald-100/60"
                                        >
                                            <IoClose className="text-sm" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DoctorsSchedules;