import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { ICart } from "@/lib/types";
import { RootState } from "@/lib/store";

interface CartState {
  items: ICart[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<ICart>) => {
      const item = action.payload;
      if (item && item.quantity > 0) {
        const indexOfItem = state.items.findIndex(
          (it) => it.productID === item.productID
        );

        const newItems = [...state.items];

        if (indexOfItem !== -1) {
          const newQuantity = newItems[indexOfItem].quantity + item.quantity;
          newItems[indexOfItem] = { ...item, quantity: newQuantity };
        } else {
          newItems.push({ ...item });
        }

        return { ...state, items: newItems };
      } else {
        const items = state.items.filter(
          (it) => it.productID !== item.productID
        );
        return { ...state, items: items };
      }
    },
    removeCartItem: (state, action: PayloadAction<ICart>) => {
      const item = action.payload;
      if (item && item.quantity > 0) {
        const indexOfItem = state.items.findIndex(
          (it) => it.productID === item.productID
        );

        let newItems = [...state.items];

        if (
          indexOfItem !== -1 &&
          newItems[indexOfItem].quantity - item.quantity > 0
        ) {
          const newQuantity = newItems[indexOfItem].quantity - item.quantity;

          newItems[indexOfItem] = { ...item, quantity: newQuantity };
        } else {
          newItems = newItems.filter((it) => it.productID !== item.productID);
        }

        return { ...state, items: newItems };
      } else {
        const items = state.items.filter(
          (it) => it.productID !== item.productID
        );
        return { ...state, items: items };
      }
    },
    clearCart: (state) => {
      return { items: [] };
    },
  },
});

export const { addCartItem, removeCartItem, clearCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.carts.items;
export default cartSlice.reducer as Reducer<CartState>;
