import { Edit3Icon } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/authUser";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, updateProfile } = useAuthStore();
  const [username, setUsername] = useState(user.username || "");
  const navigate = useNavigate();

  console.log(user);

  const handleSave = async () => {
    try {
      await updateProfile({ username });
      navigate("/"); // Redirect về trang chính sau khi cập nhật thành công
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <>
      <div className="flex item-center h-screen justify-center bg-black text-white">
        <div className="mt-10 w-2/3 lg:w-1/2">
          <p className="text-4xl border-b-[1px] border-gray-800 lg:text-7xl">
            Edit Profile
          </p>
          <div className="flex gap-4 mt-5">
            {/* left side */}
            <div className="w-1/5 relative">
              <img
                src={user?.image}
                alt="Avatar"
                className="h-30 rounded lg:h-40 w-full object-cover"
              />

              <Edit3Icon className="size-6 cursor-pointer absolute top-0 right-0 bg-black rounded-full p-1 lg:size-11 hover:bg-slate-600" />
            </div>
            {/* right side */}
            <div className="w-4/5 flex flex-col gap-2">
              <input
                type="text"
                value={username}
                placeholder="Username"
                className="w-full p-2 bg-gray-600 focus:outline-none"
                onChange={(e) => setUsername(e.target.value)}
              />
              <span>Language:</span>
              <select
                name="language"
                id="language"
                className="w-1/4 p-2 bg-transparent focus:outline-none border-[1px] border-gray-800"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </select>

              <div className="w-full border-[1px] border-gray-800" />

              <span>Language:</span>
              <select
                name="language"
                id="language"
                className="w-1/4 p-2 bg-transparent focus:outline-none border-[1px] border-gray-800"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </select>
            </div>
          </div>
          <div className="w-full border-[1px] border-gray-800 my-3" />
          <div className="flex gap-5">
            <button
              className="bg-white text-black py-2 px-4 hover:bg-red-700"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-black text-slate-500 py-2 px-4 border border-slate-500 hover:text-white hover:border-white"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button className="bg-black text-slate-500 py-2 px-4 border border-slate-500 hover:text-white hover:border-white">
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
