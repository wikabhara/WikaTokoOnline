import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../configs/Firebase";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import UploadWidget from "../components/UploadWidget.jsx";

export default function EditProductPage() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  async function editProduct(e) {
    e.preventDefault();
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        name: name,
        imageUrl: imageUrl,
        price: price,
        stock: stock,
        description: description,
        category: category,
      });
      console.log("successfully edit product with id:", id);
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Berhasil edit Product.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/myproducts");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat edit produk",
      });
    }
  }

  useEffect(() => {
    // console.log(id);
    async function getProductById(idProduct) {
      try {
        const docRef = doc(db, "products", idProduct);
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data());
        if (docSnap.exists()) {
          setName(docSnap.data().name);
          setImageUrl(docSnap.data().imageUrl);
          setPrice(docSnap.data().price);
          setStock(docSnap.data().stock);
          setDescription(docSnap.data().description || "");
          setCategory(docSnap.data().category || "");
        } else {
          Swal.fire("Produk Tidak Ditemukan");
        }
      } catch (error) {
        Swal.fire("Gagal", "Terjadi kesalahan saat memperbarui produk.", error);
      }
    }
    getProductById(id);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-base-200 flex-row items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-center mb-6">Edit Product</h1>
        <form onSubmit={editProduct}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Sunscreen Spray"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <div className="flex flex-row gap-2">
              <input
                type="text"
                placeholder="https://uploadfotoprodukmu.com/image.jpg"
                className="input input-bordered w-full"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={true}
              />
              <UploadWidget setImageUrl={setImageUrl} />
            </div>
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="500000"
              className="input input-bordered w-full"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              min="0"
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Stock</span>
            </label>
            <input
              type="number"
              placeholder="10"
              className="input input-bordered w-full"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
              min="0"
            />
          </div>

          <div className="form-control mt-4">
            <label className="label grid flex-col">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option disabled value="">
                Pilih Kategori
              </option>
              <option>Skincare</option>
              <option>Makeup</option>
              <option>Haircare</option>
              <option>Bodycare</option>
              <option>Fragrance</option>
            </select>
          </div>

          <div className="form-control mt-4 flex flex-col">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <input
              className="input input-bordered w-full"
              placeholder="Jelaskan detail produk Anda di sini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
