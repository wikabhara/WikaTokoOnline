import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../configs/Firebase";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/CartSlice";
import Swal from "sweetalert2";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  async function getProducts() {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
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
  }, []);

  return (
    <div className="bg-base-200 min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">Welcome to WikaToko</h1>

          <p className="py-4 text-lg">
            Temukan produk kecantikan terbaik pilihan Anda di sini.
          </p>
        </div>

        <main>
          {isLoading ? (
            <div className="text-center py-16">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="card bg-base-100 transition-transform hover:scale-105"
                >
                  <figure
                    onClick={() => navigate(`product/${p.id}`)}
                    className="px-6 pt-6 cursor-pointer"
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-48 w-full object-contain rounded-xl"
                    />
                  </figure>

                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{p.name}</h2>

                    <p className="text-lg font-semibold text-primary">
                      Rp {Number(p.price).toLocaleString("id-ID")}
                    </p>

                    <button
                      onClick={() => handleAddToCart(p)}
                      className="btn btn-primary flex-grow"
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
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
