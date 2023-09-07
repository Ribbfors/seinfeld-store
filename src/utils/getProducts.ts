import Stripe from "stripe";

export const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: process.env.STRIPE_API_VERSION as string,
  });
  const { data } = await stripe.products.list();
  const products = await Promise.all(
    data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: prices.data[0].unit_amount,
        image: product.images[0],
        size: product.metadata.size,
      };
    })
  );

  return products;
};

export const getSingleProduct = async (id: string) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: process.env.STRIPE_API_VERSION as string,
  });
  const product = await stripe.products.retrieve(id);
  const prices = await stripe.prices.list({ product: product.id });

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: prices.data[0].unit_amount,
    image: product.images[0],
    size: product.metadata.size,
  };
};
