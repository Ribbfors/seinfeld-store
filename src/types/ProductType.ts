type Product = {
  id: string;
  name: string;
  price: number | null;
  image: string;
  description?: string | null;
  size?: string;
  quantity?: number | undefined;
};

export default Product;
