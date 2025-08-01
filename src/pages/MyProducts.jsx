import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { FaBars, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { db } from "../configs/Firebase";
import { useNavigate } from "react-router";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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
        title: errorCode,
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteProduct(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "products", id));
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          getProducts();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong while deleting the product.",
          });
        }
      }
    });
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-7xl">
          <div className="flex items-center mb-6">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-square btn-ghost lg:hidden mr-2"
            >
              <FaBars />
            </label>
            <h1 className="text-3xl font-bold flex-grow text-center lg:text-left">
              Product Management
            </h1>
          </div>
          <main className="bg-base-100 p-4 rounded-lg shadow-xl overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="text-center p-8">
                      <span className="loading loading-spinner loading-lg"></span>
                    </td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((p, index) => (
                    <tr key={p.id} className="hover">
                      <th>{index + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="w-16 rounded">
                            <img src={p.imageUrl} alt={p.name} />
                          </div>
                        </div>
                      </td>
                      <td className="font-bold">{p.name}</td>
                      <td>Rp {Number(p.price).toLocaleString("id-ID")}</td>
                      <td>{p.stock}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`edit/${p.id}`)}
                            className="btn btn-ghost btn-xs"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="btn btn-ghost btn-xs text-error"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-8">
                      Anda belum memiliki produk.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </main>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li className="text-xl font-bold p-4">WikaToko CMS</li>
          <li>
            <a>Dashboard</a>
          </li>

          <li className="mt-4">
            <button
              onClick={() => navigate("add")}
              className="btn btn-primary w-full"
            >
              Add New Product
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
