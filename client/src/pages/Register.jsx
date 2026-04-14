import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
// import { Await } from "react-router-dom";

export function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading} = useSelector((state)=> state.auth)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      dispatch(registerUser(form));
      navigate("/dashboard");
      toast.success("Registered-Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>

        {/* <!-- Name --> */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoComplete="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* <!-- Email --> */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoComplete="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* <!-- Password --> */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            autoComplete="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* <!-- Button --> */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg 
             hover:bg-blue-600 transition duration-200"
        >
          {isLoading ? "registering..." : "register"}
        </button>
      </form>
      <p className="mt-4 text-gray-700 font-bold">
        already have an account? {" "}
        <Link
          to="/login"
          className="text-blue-600 font-medium hover:underline"
        >
          login
        </Link>
      </p>
    </div>
  );
}
