import { collection, addDoc } from "firebase/firestore";
import { db } from "../configs/Firebase";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import UploadWidget from "../components/UploadWidget.jsx";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  async function submitProduct(e) {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: name,
        imageUrl: imageUrl,
        price: price,
        stock: stock,
        description: description,
        category: category,
      });
      // console.log(docRef);
      navigate("/myproducts");
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Produk berhasil ditambahkan.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat menambahkan produk.",
      });
    }
  }

  useEffect(() => {}, []);
  return (
    <>
      <div className="min-h-screen bg-base-200 flex-row items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-center mb-6">Add Product</h1>
        <form onSubmit={submitProduct}>
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
              <option>Others</option>
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
