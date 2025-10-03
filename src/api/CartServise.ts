import { ApiClient } from './ApiClient.js';

export class CartService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async addCartItem(
    productId: string,
    quantity: number = 1
  ): Promise<{ cart: { cartItems: unknown[] } }> {
    const response = await this.client.post<{ cart: { cartItems: unknown[] } }>(
      '/api/cart',
      { productId, quantity }
    );
    return response.data;
  }
}
