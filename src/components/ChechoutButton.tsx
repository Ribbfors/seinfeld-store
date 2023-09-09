"use client";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "@/store/store";

const CheckoutButton = () => {
  const testData = [
    {
      name: "TESTZZZ",
      id: "price_1JQY2nG2ZvKYlo2CJ5X0QX6B",
      object: "price",
      price: 1000,
      amount: 2,
      image: [
        "https://www.emp-shop.se/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw22db5db7/images/4/8/6/6/486631a3.jpg?sfrm=png",
      ],
    },
    {
      name: "TESTZZ333333333333333333333333",
      id: "price_1JQY2nG2ZvKYlo2CJ5X0QX3B",
      object: "price",
      price: 2000,
      amount: 2,
      image: [
        "https://www.emp-shop.se/dw/image/v2/BBQV_PRD/on/demandware.static/-/Sites-master-emp/default/dw22db5db7/images/4/8/6/6/486631a3.jpg?sfrm=png",
      ],
    },
  ];

  const { cart } = useCartStore();

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  );

  const handleCheckout = async () => {
    console.log("cartz", cart);
    const stripe = await stripePromise;
    const { data } = await axios.post("/api/payment", cart);

    await stripe?.redirectToCheckout({
      sessionId: data.id,
    });
  };

  return <button onClick={() => handleCheckout()}>Checkout</button>;
};

export default CheckoutButton;
