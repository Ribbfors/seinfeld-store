import { getProducts } from "@/utils/getProducts";
import ProductCard from "@/components/ProductCard";

const HomePage = async () => {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
      {products.map((product) => (
        <div key={product.id} className="w-full px-4 my-8 min-h-max">
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
