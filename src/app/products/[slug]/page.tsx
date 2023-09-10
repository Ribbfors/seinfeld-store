import type { Metadata, ResolvingMetadata } from "next";
import { getSingleProduct } from "@/utils/getProducts";
import formatPriceToSek from "@/utils/formatPrices";
import AddToCart from "@/components/AddToCart";
import Image from "next/image";

const getProductData = async ({ slug }: { slug: string }) => {
  const product = await getSingleProduct(slug);
  return product;
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const product = await getProductData(params);
  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const product = await getProductData(params);

  return (
    <div className="flex justify-between gap-16 p-14 text-gray-600">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="max-h-[30rem]"
      />

      <div className="font-medium text-gray-700">
        <h1 className="text-2xl py-2">{product.name}</h1>
        <p className="py-2">{product.description}</p>
        <div className="flex flex-col gap-2">
          <p>Size:</p>
          <p>{product.size}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold text-teal-700">
            {product.price && formatPriceToSek(product.price)}
          </p>
        </div>
        <AddToCart {...product} />
      </div>
    </div>
  );
};

export default ProductPage;
