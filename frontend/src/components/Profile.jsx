import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosinstance';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'User-7856345662',
    email: '',
    phone: '',
    university: '',
    role: '',
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    console.log()
    if (email) {
      axiosInstance.get(`/profile/${email}`)
        .then((res) => {
            console.log(res.data)
            setUser({
                name: res.data.name || '',
                email: res.data.email || '',
                phone: res.data.phone || '',
                university: res.data.university || '',
                role: res.data.role || '',
            });
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
        });
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full min-h-screen p-4 overflow-hidden bg-black from-gray-900 via-black to-gray-900 ">
      <div className="w-full max-w-xl p-8 space-y-8 border shadow-2xl backdrop-blur-md bg-white/5 border-white/10 rounded-3xl">
        
        {/* Avatar & Name */}
        <div className="flex items-center space-x-5">
          <div className="flex items-center justify-center w-20 h-20 text-3xl font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-indigo-500 ring-2 ring-purple-700/40">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-white">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
            <p className="text-gray-400">{user.university}</p>
            <p className="text-gray-400">{user.phone}</p>
            <p className="text-gray-400 capitalize">{user.role}</p>
          </div>
        </div>

        {/* Optional Progress Section (Commented out) */}
        {/* <div className="space-y-6">
          <ProgressBar label="Coding Progress" value={0} gradient="from-blue-500 to-cyan-500" />
          <ProgressBar label="Aptitude Progress" value={0} gradient="from-green-400 to-green-600" />
          <ProgressBar label="Communication Progress" value={0} gradient="from-yellow-400 to-orange-500" />
        </div> */}
        
      </div>
    </div>
  );
};

/* ProgressBar component ko comment kr diya kyunki backend se progress ka data nahi aa raha abhi */
// const ProgressBar = ({ label, value, gradient }) => (
//   <div>
//     <div className="flex justify-between mb-2">
//       <span className="text-sm text-white">{label}</span>
//       <span className="text-sm text-white">{value}%</span>
//     </div>
//     <div className="w-full h-4 rounded-full bg-white/10">
//       <div
//         className={`h-4 rounded-full bg-gradient-to-r ${gradient} transition-all duration-700 ease-in-out`}
//         style={{ width: `${value}%` }}
//       ></div>
//     </div>
//   </div>
// );

export default Profile;
