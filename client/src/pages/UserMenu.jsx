import { useState } from "react";
import { FaUser } from "react-icons/fa";

const UserMenu = ({ userInfo }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* 👤 Icon */}
      <FaUser className="text-xl cursor-pointer text-white" />

      {/* 🔽 Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg p-4 z-50">
          
          {/* User Info */}
          <div className="border-b pb-2 mb-2">
            <p className="font-semibold text-gray-800">
              {userInfo?.name}
            </p>
            <p className="text-sm text-gray-500">
              {userInfo?.email}
            </p>
          </div>

          {/* Menu Items */}
          <ul className="space-y-2">
            <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
              Profile
            </li>
            <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
              Orders
            </li>
            <li className="hover:bg-red-100 text-red-500 p-2 rounded cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;