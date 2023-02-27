import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './index'
import { Product } from "../types/product"

interface CartState {
    yourCart: Product[],
    itemsTotal: number,
}

const initialState = {
    yourCart: [],
    itemsTotal: 0,
} as CartState

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, { payload }) => {
            return {
                ...state, yourCart: state.yourCart.some((product: Product) => product._id === payload._id)
                    ? [...state.yourCart]

                    // state.yourCart.map((product: product) => {
                    //         if (product._id === payload._id) {
                    //             return {
                    //                 ...product,
                    //                 quantity: product.quantity + 1,
                    //             };
                    //         }
                    //         return product;
                    //     })

                    : [...state.yourCart, {
                        ...payload, quantity: 1, itemTotal: payload.price
                    }],
            }
        },
        removeFromCart: (state, { payload }) => {
            return {
                ...state, yourCart: state.yourCart.filter((product: Product) => product._id !== payload)
            }
        },
        increaseQty: (state, { payload }) => {
            return {
                ...state, yourCart: state.yourCart.map((product: Product) => {
                    if (product._id === payload) {
                        return {
                            ...product,
                            quantity: product.quantity + 1,
                            itemTotal: (product.quantity + 1) * product.price
                        };
                    }
                    return product;
                })
            };
        },
        decreaseQty: (state, { payload }) => {
            return {
                ...state, yourCart: state.yourCart.map((product: Product) => {
                    if (product.quantity > 0) {
                        if (product._id === payload) {
                            return {
                                ...product,
                                quantity: product.quantity - 1,
                                itemTotal: (product.quantity - 1) * product.price
                            };
                        }
                    } else {
                        state.yourCart.filter((product: Product) => product._id !== payload);
                    }
                    return product;
                })
            };
        },
        getTotals: (state) => {
            const itemsTotal = state.yourCart
                .map((product: Product): number => product.price * product.quantity)
                .reduce((a: any, b: any) => a + b, 0)
                .toFixed(2)
            return {
                ...state, itemsTotal
            }
        },
        clearCart: () => {
            return {
                yourCart: [],
                itemsTotal: 0,
            }
        },
    }
})

export const { addToCart, removeFromCart, increaseQty, decreaseQty, getTotals, clearCart } = cartSlice.actions
export const selectCart = (state: AppState) => state.cart;
export default cartSlice.reducer

