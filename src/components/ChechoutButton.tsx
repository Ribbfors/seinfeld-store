"use client";

const CheckoutButton = () => {
  return (
    <form action="/api/payment" method="POST">
      <section>
        <button
          type="submit"
          role="link"
          className="bg-yellow-400 rounded-md p-2"
        >
          Checkout
        </button>
      </section>
    </form>
  );
};

export default CheckoutButton;
