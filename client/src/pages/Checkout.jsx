import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  
  let totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  ).toFixed(2);
  console.log(totalAmount);
  
 

  const cardOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#1f2937",
        "::placeholder": {
          color: "#9ca3af",
        },
      },
      invalid: {
        color: "#ef4444",
      },
    },
  };
  const handlePayment = async () => {
    setLoading(true);

    // 1. Create PaymentIntent
    const { data } = await axios.post(
      "http://localhost:5000/api/payment/create-payment-intent",
      { amount: totalAmount }
    );

    // 2. Confirm payment
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    console.log(result);
    

    // 3. If success → SAVE ORDER 🔥
    if (result.paymentIntent.status === "succeeded") {
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems: cartItems,
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      dispatch(clearCart());
      setLoading(false);
      alert("Order Placed Successfully 🎉");
    } ;
    
  };
  // const handlePayment = async () => {
  //   setLoading(true);
  //   //create paument intent
  //   const { data } = await axios.post(
  //     "http://localhost:5000/api/payment/create-payment-intent",
  //     { amount: totalAmount },
  //   );

  //   const result = await stripe.confirmCardPayment(data.clientSecret, {
  //     payment_method: {
  //       card: elements.getElement(CardElement),
  //     },
  //   });

  //   if (result.error) {
  //     console.log(result.error.message);
  //   } else {
  //     if (result.paymentIntent.status == "succeeded") {
  //       await axios.post(
  //         "http://localhost:5000/api/orders",
  //         {
  //           orderItems: cartItems,
  //           totalAmount,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${userInfo.token}`,
  //           },
  //         },
  //       );
  //       dispatch(clearCart());
  //       alert("Payment Successful ");
  //     }
  //   }
  //   setLoading(false);
  // };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Checkout 💳
        </h1>

        {/* Name Field */}
        <input
          type="text"
          placeholder="Cardholder Name"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Card Element */}
        <div className="border p-3 rounded-lg mb-4">
          <CardElement options={cardOptions} />
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200"
        >
          {loading ? "Processing..." : `Pay $${totalAmount}`}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
