export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  photo: string;
  createdAt: Date;
  updateAt: Date;
  userId: number;
}

export interface ProfileContentProps {
  username: string;
  avatar: string | null;
  products: Product[];
  createdAt: Date;
}
