import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state)=> state.auth)

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      await dispatch(loginUser({ email, password })).unwrap();
      
      
      
      toast.success(`Welcome `)
      
      // ✅ only runs on success
      navigate("/dashboard");
    } catch (error) {
      // ❌ stays on login
      toast.error(error)
    }
  };

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
    //   <form
    //     onSubmit={submitHandler}
    //     className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
    //   >
    //     <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
    //       Login
    //     </h2>

    //     <div className="mb-4">
    //       <label className="block text-gray-600 mb-2">Email</label>
    //       <input
    //         type="email"
    //         name="email"
    //         autoComplete="email"
    //         required
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    //       />
    //     </div>

    //     <div className="mb-6">
    //       <label className="block text-gray-600 mb-2">Password</label>
    //       <input
    //         type="password"
    //         name="password"
    //         autoComplete="password"
    //         required
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    //       />
    //     </div>

    //     <button
    //       type="submit"
    //       className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-red-200 transition duration-200"
    //     >
    //       Login
    //     </button>
    //   </form>
    //   <p className="text-2xl font-bold text-center  text-gray-800 ">
    //     No account?{" "}
    //     <Link
    //       to="/register"
    //       className="text-blue-600 font-medium hover:underline"
    //     >
    //       Register here
    //     </Link>
    //   </p>
    // </div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
  
  <form
    onSubmit={submitHandler}
    className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
  >
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
      Login
    </h2>

    {/* Email */}
    <div className="mb-4">
      <label className="block text-gray-600 mb-2">Email</label>
      <input
        type="email"
        name="email"
        autoComplete="email"
        required
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Password */}
    <div className="mb-6">
      <label className="block text-gray-600 mb-2">Password</label>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Button */}
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded-lg 
                 hover:bg-blue-600 transition duration-200"
    >
      { isLoading ? "logging ..." : "login" }
    </button>
  </form>

  {/* Register Link */}
  <p className="mt-4 text-gray-700">
    No account?{" "}
    <Link
      to="/register"
      className="text-blue-600 font-medium hover:underline"
    >
      Register here
    </Link>
  </p>

</div>
  );
}
