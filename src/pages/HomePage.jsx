import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../configs/Firebase";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/CartSlice";
import Swal from "sweetalert2";
import Cards from "../components/Cards";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  async function getProducts() {
    setIsLoading(true);
    try {
      let productsQuery = collection(db, "products");
      const queryConstraints = [];
      if (filterCategory !== "All") {
        queryConstraints.push(where("category", "==", filterCategory));
      }
      if (sortBy === "price-asc") {
        queryConstraints.push(orderBy("price", "asc"));
      } else if (sortBy === "price-desc") {
        queryConstraints.push(orderBy("price", "desc"));
      }
      const q = query(productsQuery, ...queryConstraints);
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(result);
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil data produk:",
        text: error,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, [filterCategory, sortBy]);

  return (
    <div className="bg-base-200 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">Welcome to WikaToko</h1>

          <p className="py-4 text-lg">
            Temukan produk kecantikan terbaik pilihan Anda di sini.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          {/* filter by category */}
          <div className="form-control w-full md:w-xs">
            <label className="label">
              <span className="label-text">Filter by Category</span>
            </label>
            <select
              className="select select-bordered"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Skincare">Skincare</option>
              <option value="Makeup">Makeup</option>
              <option value="Haircare">Haircare</option>
              <option value="Bodycare">Bodycare</option>
              <option value="Fragrance">Fragrance</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* sort by price */}
          <div className="form-control w-full md:w-xs">
            <label className="label">
              <span className="label-text">Sort by Price</span>
            </label>
            <select
              className="select select-bordered"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <main>
          {isLoading ? (
            <div className="text-center py-16">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <Cards
                  key={p.id}
                  p={p}
                  onClickAddCart={() => handleAddToCart(p)}
                  onClickNavigate={() => navigate(`product/${p.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl">
                Oops! Belum ada produk yang tersedia saat ini.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
