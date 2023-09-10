"use client";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "@/store/store";

type email = string | null | undefined;

const CheckoutButton = ({ email }: { email: email }) => {
  const { cart } = useCartStore();

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  );

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const { data } = await axios.post("/api/payment", {
      items: cart,
      email,
    });

    await stripe?.redirectToCheckout({
      sessionId: data.id,
    });
  };

  return (
    <>
      {email && cart.length > 0 ? (
        <button
          className="bg-yellow-400 hover:bg-yellow-300 w-full p-4 absolute bottom-0 left-0"
          onClick={() => handleCheckout()}
        >
          Checkout
        </button>
      ) : (
        <button
          className="bg-yellow-400 hover:bg-yellow-300 w-full p-4 absolute bottom-0 left-0"
          disabled
        >
          Log in to checkout
        </button>
      )}
    </>
  );
};

export default CheckoutButton;
