"use client";
import React, { useEffect, useState } from 'react';

const DoctorsProfilePage = ({ doctorEmail }) => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor/profile?email=${doctorEmail}`)
            .then(res => res.json())
            .then(data => setProfile(data.data));
    }, [doctorEmail]);

    const handleUpdate = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor/profile`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile)
        });
        setIsEditing(false);
        alert("Profile Updated Successfully!");
    };

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div className="p-8 max-w-lg mx-auto bg-white shadow-xl rounded-2xl border">
            <h2 className="text-2xl font-bold mb-6">Doctor Profile</h2>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold">Name</label>
                    <input className="w-full border p-2 rounded" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} disabled={!isEditing} />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Specialty</label>
                    <input className="w-full border p-2 rounded" value={profile.specialty} onChange={(e) => setProfile({...profile, specialty: e.target.value})} disabled={!isEditing} />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Consultation Fees</label>
                    <input className="w-full border p-2 rounded" value={profile.fees} onChange={(e) => setProfile({...profile, fees: e.target.value})} disabled={!isEditing} />
                </div>
            </div>

            <div className="mt-6">
                {isEditing ? (
                    <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save Changes</button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Edit Profile</button>
                )}
            </div>
        </div>
    );
};

export default DoctorsProfilePage;