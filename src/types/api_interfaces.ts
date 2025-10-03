export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  [key: string]: unknown;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface UserMeResponse {
  user: User;
}

// Додайте інші інтерфейси, які вам потрібні, наприклад для Cart, Product, Order
export interface ProductBase {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  price: number;
  quantity?: number;
}

export interface CartItem extends ProductBase {
  product: string;
  countInStock: number;
}

export interface CartResponse {
  cart: {
    cartItems: CartItem[];
  };
}

export interface OrderItem extends ProductBase {
  product: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrderResponse {
  _id: string;
}
