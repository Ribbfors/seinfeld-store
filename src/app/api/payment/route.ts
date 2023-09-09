import { NextResponse } from "next/server";
import Stripe from "stripe";
import StripeType from "@/types/StripeType";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-08-16",
  });

  const res = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: res.map((item: any) => ({
      price_data: {
        currency: "sek",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: "http://localhost:3000/success",
  });
  return NextResponse.json({ id: session?.id });
}
