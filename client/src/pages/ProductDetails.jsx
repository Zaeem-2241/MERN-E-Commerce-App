import { useDispatch, useSelector } from "react-redux";
import { addTOCart } from "../features/cart/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProductDetails } from "../features/product/productSlice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isLoading } = useSelector((state) => state.product);
  console.log(product);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);
  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div className="bg-red-500 py-16 min-h-screen m-16">
      
      <div className="max-w-6xl mx-auto mt-16 bg-white  rounded-2xl shadow-lg py-16 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 🖼️ IMAGE SECTION */}
        <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4">
          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt={product.name}
            className="w-full max-w-sm md:max-w-md h-64 md:h-80 object-contain"
          />
        </div>

        {/* 📦 PRODUCT INFO */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {product.name}
            </h1>

            <p className="text-gray-500 mt-3 text-sm md:text-base leading-relaxed">
              {product.description || "No description available"}
            </p>

            <p className="text-2xl font-bold text-green-600 mt-4">
              ${product.price}
            </p>

            {/* ⭐ RATING */}
            <div className="flex items-center mt-3">
              <span className="text-yellow-500 text-lg">★★★★☆</span>
              <span className="ml-2 text-gray-600 text-sm">(4.0)</span>
            </div>
          </div>

          {/* 🛒 ACTIONS */}
          <div className="mt-6">
            {/* QUANTITY */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gray-700">Qty:</span>
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-20 border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* ADD TO CART */}
            <button
              onClick={() => dispatch(addTOCart({ ...product, quantity: 1 }))}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Add to Cart 🛒
            </button>

            {/* BUY NOW */}
            <button
              onClick={() => navigate("/cart")}
              className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Buy Now ⚡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
