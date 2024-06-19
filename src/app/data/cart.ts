export interface cart {
  id: string | undefined;
  productId: string;
  userId: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
  quantity: undefined | number;
}
