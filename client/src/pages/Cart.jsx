import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  decreaseQty,
  increaseQty,
} from "../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { fetchProductDetails } from "../features/product/productSlice";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalAmount = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  console.log(totalAmount);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Cart
      </h1>

      {/* Cart Content */}
      {cartItems.length === 0 ? (
        <h2 className="text-center text-gray-500 text-lg">Cart is empty</h2>
      ) : (
        <div className="w-full max-w-full sm:max-w-2xl mx-auto px-3 sm:px-0 space-y-3 sm:space-y-4 ">
          {cartItems.map((cart) => (
            <div
              key={cart._id}
              className="flex items-center justify-between bg-white p-3 sm:p-4 rounded-xl shadow-md gap-2 sm:gap-4 flex-wrap sm:flex-nowrap"
            >
              {/* Name */}
              <Link to={`/product/${cart._id}`}>
                <span className="text-gray-700 font-medium w-1/4">
                  {cart.name}
                </span>
              </Link>

              {/* Price */}
              <span className="text-gray-700 font-medium">${cart.price}</span>

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <button
                  className="bg-gray-200 px-3 py-1 rounded-lg text-xl font-bold hover:bg-gray-300"
                  onClick={() => dispatch(decreaseQty(cart._id))}
                >
                  -
                </button>

                <span className="text-lg font-medium">{cart?.quantity}</span>

                <button
                  className="bg-gray-200 px-3 py-1 rounded-lg text-xl font-bold hover:bg-gray-300"
                  disabled={cart.quantity >= cart.countInStock}
                  onClick={() => dispatch(increaseQty(cart._id))}
                >
                  +
                </button>
              </div>

              {/* Item Total */}
              <span className="text-gray-700 font-medium">
                ${(cart.price * cart.quantity).toFixed(2)}
              </span>

              {/* Remove */}
              <button
                onClick={() => dispatch(removeFromCart(cart._id))}
                className="bg-red-500 text-white px-4 py-1 rounded-lg 
                       hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}

          {/* 🔥 Grand Total */}
          <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Grand Total</h2>

            <span className="text-xl font-bold text-green-600">
              ${totalAmount}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            {/* Checkout */}
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg 
                     hover:bg-blue-600 transition duration-200"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>

            {/* Clear Cart */}
            <button
              onClick={() => {
                dispatch(clearCart());
                navigate("/dashboard");
              }}
              className="w-full bg-gray-800 text-white py-2 rounded-lg 
                     hover:bg-gray-900 transition duration-200"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
