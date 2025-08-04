import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../configs/Firebase";
import { FaShoppingCart } from "react-icons/fa";
import { useParams } from "react-router";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProductById() {
      setIsLoading(true);
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Produk tidak ditemukan!");
        }
      } catch (error) {
        console.error("Error mengambil data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getProductById();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold">Produk Tidak Ditemukan</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8 lg:p-12">
      <div className="container mx-auto">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure className="lg:w-1/2 p-8">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto object-contain max-h-[70vh] rounded-lg"
            />
          </figure>
          <div className="card-body lg:w-1/2">
            <h1 className="card-title text-4xl font-bold">{product.name}</h1>
            <p className="text-3xl text-primary my-4">
              Rp {Number(product.price).toLocaleString("id-ID")}
            </p>
            <div className="badge badge-secondary">Stok: {product.stock}</div>

            <p className="py-6">{product.description}</p>

            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-lg">
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
