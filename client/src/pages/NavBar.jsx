import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import { toast } from "react-toastify";

export function NavBar() {
  const { cartItems } = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log(userInfo);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    Navigate("/login");
  };

  return (
    <div className="flex items-center justify-between h-16 bg-white px-3 sm:px-6 py-3 sm:py-4 shadow-md fixed top-0 left-0 w-full z-50 text-sm sm:text-base">
      {/* Title */}
      <button
        onClick={() => Navigate("/")}
        className="text-lg sm:text-2xl font-bold text-gray-800 truncate max-w-35 sm:max-w-full"
      >
        One-Click-Shopping
      </button>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/*admin-panel*/}
        {userInfo?.isAdmin && (
          <button 
          className="text-lg sm:text-xl cursor-pointer"
          onClick={() => Navigate("/admin/orders")}>Admin Panel</button>
        )}
        {/* 👤 User */}
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <FontAwesomeIcon
            icon={faUser}
            className="text-lg sm:text-xl cursor-pointer"
          />

          {open && (
            <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg p-3 sm:p-4 z-50">
              <div className="border-b pb-2 mb-2">
                <p className="text-gray-800 font-bold text-sm sm:text-base truncate">
                  {userInfo?.name}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {userInfo?.email}
                </p>
              </div>

              <ul className="space-y-1 sm:space-y-2">
                <li className="hover:bg-gray-100 p-2 rounded cursor-pointer text-sm">
                  Profile
                </li>
                <li className="hover:bg-gray-100 p-2 rounded cursor-pointer text-sm">
                  Orders
                </li>
                <li className="hover:bg-red-100 text-red-500 p-2 rounded cursor-pointer text-sm">
                  <button onClick={() => dispatch(handleLogout())}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* 🛒 Cart */}
        <button
          onClick={() => Navigate("/cart")}
          className="relative bg-gray-100 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-gray-200 transition"
        >
          🛒
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full">
            {cartItems.length}
          </span>
        </button>

        {/* 🔥 Logout (Hide on mobile) */}
        <button
          onClick={() => handleLogout()}
          className="hidden sm:block bg-red-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
