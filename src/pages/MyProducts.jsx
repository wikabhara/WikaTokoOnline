import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { FaBars, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { db } from "../configs/Firebase";
import { useNavigate } from "react-router";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  async function getProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    const result = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setProducts(result);
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
          getProducts(); // Refresh the product list
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
    <>
      <main>
        <h1> Product List</h1>

        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>

            {/* product list di-looping  */}
            {products?.map((p, index) => (
              <tr key={p.id} className="hover">
                <th>{index + 1}</th>
                <th>
                  {" "}
                  <div className="avatar">
                    <div className="w-16 rounded">
                      <img src={p.imageUrl} alt={p.name} />
                    </div>
                  </div>
                </th>
                <th className="font-bold">{p.name}</th>
                <th>Rp {Number(p.price).toLocaleString("id-ID")}</th>
                <th>{p.stock}</th>
                <th>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`products/edit/${p.id}`)}
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
                </th>
              </tr>
            ))}
          </thead>
        </table>
        <div>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("products/add")}
              className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
            >
              Add Product
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
