import { useDispatch, useSelector } from "react-redux";
import { addTOCart } from "../features/cart/cartSlice";
import { useEffect } from "react";
import { fetchProducts } from "../features/product/productSlice";
// import clickSound from "../assets/sound/soundreality-pop-423717.mp3";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useRef } from "react";

function Product() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const lastItemRef = useRef(null);
  const { products, isLoading, pages } = useSelector((state) => state.product);
  console.log(page);

  // const [hasMore, setHasMore] = useState(true);
  // console.log(products);
  const searchHandler = () => {
    setPage(1);
    dispatch(fetchProducts({ keyword, minPrice, maxPrice, page }));
  };
  useEffect(() => {
    dispatch(fetchProducts({ page }));
  }, [dispatch, page]);
  

  // const playSound = () => {
  //   const audio = new Audio(clickSound);
  //   audio.volume = 0.5;
  //   audio.play();
  // };
  const handleAddToCart = (product) => {
    dispatch(addTOCart(product));
    toast.success("added successfully");
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Products
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8 w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        {/* Search Input - Expands to take more space */}
        <div className="grow relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-xl outline-none transition-all duration-200 text-gray-700"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {/* Price Range Inputs - Grouped on Desktop */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min $"
            className="w-24 md:w-32 px-4 py-2.5 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-xl outline-none transition-all duration-200 text-gray-700"
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max $"
            className="w-24 md:w-32 px-4 py-2.5 bg-gray-50 border border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-xl outline-none transition-all duration-200 text-gray-700"
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <button
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-8 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200"
          onClick={searchHandler}
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading ? (
          <p>loading...</p>
        ) : (
          products.map((product, index) => (
            <div
              key={product._id}
              ref={index === product.length ? lastItemRef : null}
              className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* 1. Image Container with Aspect Ratio */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Badge for Stock Status */}
                {product.countInStock > 0 ? (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                    In Stock
                  </span>
                ) : (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* 2. Content Section */}
              <div className="p-4 flex flex-col grow">
                {/* Category/Brand (Small label) */}
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
                  Electronics
                </p>

                {/* Title */}
                <h2 className="text-gray-800 font-semibold text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  <Link to={`/product/${product._id}`}>{product.name}</Link>
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 grow">
                  {product.description}
                </p>

                {/* Price and Action */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Price</span>
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>

                  <button
                    disabled={product.countInStock === 0}
                    onClick={() => handleAddToCart(product)}
                    className={`p-3 rounded-full transition-colors ${
                      product.countInStock > 0
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    aria-label="Add to cart"
                  >
                    {/* Shopping Cart Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center justify-center">
        {page < pages && (
          <button
            className=" bg-blue-500 font-bold text-white px-4 py-2 rounded mt-6 "
            onClick={() => {
              const currentScroll = window.scrollY;

              setPage((pre) => pre + 1);

              setTimeout(() => {
                window.scrollTo({
                  top: currentScroll,
                  behavior: "auto",
                });
              }, 100);
            }}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default Product;
