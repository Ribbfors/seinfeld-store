import { NextResponse } from "next/server";
import Stripe from "stripe";
import StripeType from "@/types/StripeType";
import config from "../../../../config";

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-08-16",
  });

  try {
    const requestBody = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: requestBody.items.map((item: StripeType) => ({
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
      success_url: `${config.website_url}/success`,
      customer_email: requestBody.email || undefined,
    });

    return NextResponse.json({ id: session?.id });
  } catch (error) {
    return NextResponse.json(error);
  }
}
