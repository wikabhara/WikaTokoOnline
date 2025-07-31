import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FaBars, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { db } from "../configs/Firebase";
import { useNavigate } from "react-router";

export default function MyProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
                    <button className="btn btn-ghost btn-xs">
                      <FaEdit />
                    </button>
                    <button className="btn btn-ghost btn-xs text-error">
                      <FaTrash />
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </thead>
        </table>
      </main>
    </>
  );
}
