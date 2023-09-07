"use client";

import formatPrice from "@/utils/formatPrices";
import Product from "@/types/ProductType";
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ name, price, image, id, description }: Product) => {
  return (
    <Link href={{ pathname: `/products/${id}` }}>
      <Image
        src={image}
        alt={name}
        width={800}
        height={800}
        className="object-fill h-[32rem] md:h-80 md:w-96 w-full shadow-md rounded-lg"
      />
      <h5 className="text-xl font-bold tracking-tight text-gray-900">{name}</h5>
      <div className="font-normal text-gray-700 ">
        <p className="text-teal-700">{price ? formatPrice(price) : "NaN"}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
