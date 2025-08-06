import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { BsCartX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/features/CartSlice";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart);
  const [subtotal, setSubtotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (item, amount) => {
    dispatch(updateQuantity({ id: item.id, amount: amount }));
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <BsCartX className="text-7xl text-base-content/30 mb-4" />
        <h1 className="text-3xl font-bold">Keranjangmu Masih Kosong!</h1>
        <p className="text-base-content/70 mt-2 mb-6">
          Ayo, temukan produk favoritmu sekarang.
        </p>
        <Link to="/" className="btn btn-primary">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="card card-side bg-base-100 shadow-md flex-col sm:flex-row"
              >
                <figure className="p-4 sm:p-0 sm:w-1/4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-32 sm:h-full object-cover rounded-lg"
                  />
                </figure>
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="card-title">{item.name}</h2>
                      <p className="text-primary font-semibold mt-1">
                        Rp {Number(item.price).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="btn btn-ghost btn-square btn-sm"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="card-actions items-center justify-end mt-2">
                    <div className="join">
                      <button
                        onClick={() => handleUpdateQuantity(item, -1)}
                        className="btn join-item"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="join-item px-4 flex items-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item, 1)}
                        className="btn join-item"
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Ringkasan Pesanan</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkos Kirim</span>
                  <span className="font-semibold">Gratis</span>
                </div>
                <div className="divider my-2"></div>
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
              <div className="card-actions mt-6">
                <button className="btn btn-primary btn-block">
                  Lanjut ke Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
