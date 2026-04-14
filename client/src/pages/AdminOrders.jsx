import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../features/admin/adminSlice";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const orders = useSelector((state) => state.orders.orders);
  console.log(orders);

  const handleDeleiever = (order) => {
    console.log(order);

    if (!order.isPaid) {
      toast.error("Order not paid yet");
      return;
    } else {
      toast.success("order_no" + order._id + " deleiever");
    }
  };

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    // <div className="pt-20 px-4">
    //   <h1 className="text-2xl font-bold mb-6">All Orders</h1>

    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : (
    //     <div className="overflow-x-auto p-4">
    //       <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

    //       <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
    //         <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
    //           <tr>
    //             <th className="p-4 text-left">User</th>
    //             <th>Total</th>
    //             <th>Status</th>
    //             <th>Date</th>
    //             <th>Action</th>
    //           </tr>
    //         </thead>

    //         <tbody>
    //           {orders.length === 0 ? (
    //             <tr>
    //               <td colSpan="5" className="p-5 text-center text-gray-500">
    //                 No Orders Found
    //               </td>
    //             </tr>
    //           ) : (
    //             orders.map((order) => {
    //               const total = order.orderItems.reduce(
    //                 (acc, item) => acc + item.price * item.quantity,
    //                 0,
    //               );

    //               return (
    //                 <tr
    //                   key={order._id}
    //                   className="border-t text-center hover:bg-gray-50 transition"
    //                 >
    //                   {/* USER */}
    //                   <td className="p-4 font-semibold text-left">
    //                     {order.user?.name}
    //                     <p className="text-xs text-gray-500">
    //                       {order.user?.email}
    //                     </p>
    //                   </td>

    //                   {/* TOTAL */}
    //                   <td className="font-medium text-gray-800">
    //                     ${total.toFixed(2)}
    //                   </td>

    //                   {/* STATUS */}
    //                   <td>
    //                     {order.isPaid ? (
    //                       <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
    //                         Paid
    //                       </span>
    //                     ) : (
    //                       <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
    //                         Not Paid
    //                       </span>
    //                     )}
    //                   </td>

    //                   {/* DATE */}
    //                   <td className="text-sm text-gray-500">
    //                     {new Date(order.createdAt).toLocaleDateString()}
    //                   </td>

    //                   {/* ACTION */}
    //                   <td>
    //                     <button
    //                     onClick={()=> handleDeleiever(order)}
    //                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm transition">
    //                       Mark Delivered
    //                     </button>
    //                   </td>
    //                 </tr>
    //               );
    //             })
    //           )}
    //         </tbody>
    //       </table>
    //     </div>
    //   )}
    // </div>
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>

      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-600">
            Admin Orders
          </h2>

          {orders.length === 0 ? (
            <div className="p-10 text-center bg-white rounded-xl shadow text-gray-500">
              No Orders Found
            </div>
          ) : (
            <>
              {/* MOBILE VIEW: Card Layout (Visible on small screens, hidden on md+) */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {orders.map((order) => {
                  const total = order.orderItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0,
                  );

                  return (
                    <div
                      key={order._id}
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-gray-800">
                            {order.user?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.user?.email}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">
                            ${total.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t">
                        {order.isPaid ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                            Paid
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                            Not Paid
                          </span>
                        )}

                        <button
                          onClick={() => handleDeleiever(order)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm transition"
                        >
                          Mark Delivered
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DESKTOP VIEW: Table Layout (Hidden on small screens, visible on md+) */}
              <div className="hidden md:block overflow-x-auto shadow-md rounded-xl">
                <table className="w-full bg-white">
                  <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                      <th className="p-4 text-left">User</th>
                      <th className="p-4 text-center">Total</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-center">Date</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => {
                      const total = order.orderItems.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0,
                      );

                      return (
                        <tr
                          key={order._id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="p-4">
                            <div className="font-semibold text-gray-800">
                              {order.user?.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.user?.email}
                            </div>
                          </td>
                          <td className="p-4 text-center font-medium text-gray-800">
                            ${total.toFixed(2)}
                          </td>
                          <td className="p-4 text-center">
                            {order.isPaid ? (
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                Paid
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                                Not Paid
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeleiever(order)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm transition"
                            >
                              Mark Delivered
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
