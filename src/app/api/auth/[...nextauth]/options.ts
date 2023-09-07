import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Stripe from "stripe";

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: process.env.STRIPE_API_VERSION as string,
      });
      if (user.email && user.name) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        });
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id },
        });
      }
    },
  },
};
