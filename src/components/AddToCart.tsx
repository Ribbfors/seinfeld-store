"use client";

import { useCartStore } from "@/store/store";
import Product from "@/types/ProductType";
const AddToCart = ({ id, price, image, name }: Product) => {
  const { addToCart } = useCartStore((state) => state);

  return (
    <>
      <button
        onClick={() => addToCart({ id, image, name, price, quantity: 1 })}
        className="text-white py-4 px-6 font-semibold bg-yellow-300"
      >
        Add to cart
      </button>
    </>
  );
};

export default AddToCart;
