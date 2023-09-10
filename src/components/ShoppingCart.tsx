"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/store";
import {
  AiOutlineShoppingCart,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import formatPriceToSek from "@/utils/formatPrices";
import CheckoutButton from "./ChechoutButton";

type email = string | null | undefined;

const ShoppingCart = ({ email }: { email: email }) => {
  const {
    addToCart,
    toggleCart,
    cart,
    isCartOpen,
    clearProductFromCart,
    removeFromCart,
  } = useCartStore();

  return (
    <AnimatePresence>
      <div
        onClick={() => toggleCart()}
        className="fixed right-10 bottom-10 rounded-full p-4 bg-yellow-100 text-2xl cursor-pointer"
      >
        <AiOutlineShoppingCart />
        {cart?.length > 0 && (
          <motion.span
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            className="absolute top-0 right-0 text-gray-600 bg-gray-200 flex items-center justify-center  text-sm h-6 w-6 rounded-full"
            color="dark"
          >
            {cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)}
          </motion.span>
        )}
      </div>

      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => toggleCart()}
          className="fixed w-screen h-screen z-50 left-0 top-0 bg-black/30"
        >
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 w-4/5 lg:w-1/3 h-screen  bg-white overflow-y-scroll p-10 text-gray-700"
          >
            <h1 className="text-2xl font-semibold">Your cart</h1>
            <div className="flex flex-col gap-4">
              {cart.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  className="flex gap-4 relative"
                >
                  <Link href={`/products/${product.id}`} className="flex gap-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                    />
                    <div>
                      <p>{product.name}</p>
                      <div>
                        Quantity: {product.quantity}
                        <div className="flex py-2">
                          <AiOutlineMinusCircle
                            onClick={() => removeFromCart(product)}
                          />
                          <AiOutlinePlusCircle
                            onClick={() => addToCart(product)}
                            className="ml-1"
                          />
                        </div>
                        <h3
                          onClick={() => clearProductFromCart(product)}
                          className="underline"
                        >
                          Remove
                        </h3>
                      </div>
                      <p className="font-semibold text-teal-700">
                        {product.price &&
                          formatPriceToSek(product.price * product.quantity)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div>
              {cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <>
                  <p className="font-semibold text-teal-700">
                    Total:
                    {cart.length > 0 &&
                      formatPriceToSek(
                        cart.reduce(
                          (acc, cartItem) =>
                            acc + cartItem.price! * cartItem.quantity,
                          0
                        )
                      )}
                  </p>
                  <CheckoutButton email={email} />
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
