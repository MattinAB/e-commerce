type User = {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
};
interface Product {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  sku: string;
  isActive: boolean;
  categories: Category[];
  genres: Genre[];
}

type Category = {
  name: string;
  slug: string;
  description?: string;
  image?: string;
};
type Genre = {
  name: string;
  slug: string;
};

type OrderItem = {
  orderId: string;
  order: Order;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
};

type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

type Order = {
  userId: string;
  user: User;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
};

export type { User, Category, Genre, OrderItem, OrderStatus, Order, Product };
