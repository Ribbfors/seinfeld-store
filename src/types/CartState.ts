type CartItem = {
  name: string;
  id: string;
  price: number | null;
  quantity: number;
  image: string;
};

type CartState = {
  cart: CartItem[];
  isCartOpen: boolean;
  paymentIntent: string;
  setPaymentIntent: (val: string) => void;
  toggleCart: () => void;
  addToCart: (product: CartItem) => void;
  removeFromCart: (product: CartItem) => void;
  clearProductFromCart: (product: CartItem) => void;
};

export default CartState;
