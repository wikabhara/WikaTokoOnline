import React from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function Cards({ p, onClickAddCart, onClickNavigate }) {
  return (
    <div className="card bg-base-100 transition-transform hover:scale-105">
      <figure onClick={onClickNavigate} className="px-6 pt-6 cursor-pointer">
        <img
          src={p.imageUrl}
          alt={p.name}
          className="h-48 w-full object-contain rounded-xl"
        />
      </figure>

      <div className="card-body items-center text-center">
        {p.category && (
          <div className="badge badge-outline mb-2">{p.category}</div>
        )}
        <h2 className="card-title">{p.name}</h2>

        <p className="text-lg font-semibold text-primary">
          Rp {Number(p.price).toLocaleString("id-ID")}
        </p>

        <button onClick={onClickAddCart} className="btn btn-primary flex-grow">
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
