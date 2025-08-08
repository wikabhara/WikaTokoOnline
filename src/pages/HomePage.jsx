import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../configs/Firebase";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/CartSlice";
import Swal from "sweetalert2";
import Cards from "../components/Cards";

const PRODUCTS_PER_PAGE = 4;

export default function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  async function getAllProducts() {
    setIsLoading(true);
    try {
      const q = query(collection(db, "products"), orderBy("name", "asc"));
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllProducts(result);
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
      Swal.fire("Error", "Gagal mengambil data produk.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    let tempProducts = [...allProducts];

    if (searchQuery) {
      tempProducts = tempProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterCategory !== "All") {
      tempProducts = tempProducts.filter((p) => p.category === filterCategory);
    }

    if (sortBy === "price-asc") {
      tempProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      tempProducts.sort((a, b) => b.price - a.price);
    }

    setCurrentPage(1);
    setProducts(tempProducts);
    setIsLastPage(tempProducts.length <= PRODUCTS_PER_PAGE);
  }, [searchQuery, filterCategory, sortBy, allProducts]);

  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setIsLastPage(currentPage * PRODUCTS_PER_PAGE >= products.length);
  }, [currentPage, products]);

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
          <select
            className="select select-bordered w-full md:w-xs"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option>Skincare</option>
            <option>Makeup</option>
            <option>Haircare</option>
            <option>Bodycare</option>
            <option>Fragrance</option>
            <option>Others</option>
          </select>

          <select
            className="select select-bordered w-full md:w-xs"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort by Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <input
            type="text"
            placeholder="Cari produk..."
            className="input input-bordered w-full md:w-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <main>
          {isLoading ? (
            <div className="text-center py-16">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((p) => (
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
                Oops! Tidak ada produk yang cocok dengan kriteria Anda.
              </p>
            </div>
          )}

          {!isLoading && products.length > PRODUCTS_PER_PAGE && (
            <div className="flex justify-center items-center mt-12">
              <div className="join">
                <button
                  onClick={handlePrevPage}
                  className="join-item btn"
                  disabled={currentPage === 1}
                >
                  «
                </button>
                <button className="join-item btn">Page {currentPage}</button>
                <button
                  onClick={handleNextPage}
                  className="join-item btn"
                  disabled={isLastPage}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
