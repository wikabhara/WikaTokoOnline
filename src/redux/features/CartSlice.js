import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      const existingItem = state.find((item) => item.id === productToAdd.id);

      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity++;
          Swal.fire({
            icon: "success",
            title: "Kuantitas ditambah!",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire(
            "Oops!",
            `Stok untuk ${existingItem.name} tidak mencukupi.`,
            "warning"
          );
        }
      } else {
        state.push({ ...productToAdd, quantity: 1 });
        Swal.fire({
          icon: "success",
          title: "Ditambahkan ke keranjang!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },

    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;
      const itemToUpdate = state.find((item) => item.id === id);

      if (itemToUpdate) {
        const newQuantity = itemToUpdate.quantity + amount;

        if (newQuantity >= 1 && newQuantity <= itemToUpdate.stock) {
          itemToUpdate.quantity = newQuantity;
        }
      }
    },

    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      return state.filter((item) => item.id !== itemIdToRemove);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
