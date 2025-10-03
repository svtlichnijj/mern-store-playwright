import { ApiClient } from './ApiClient.js';

export class OrderService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getMyOrders(params?: { page?: number; limit?: number }): Promise<{
    orders: unknown[];
    totalPages: number;
    currentPage: number;
    count: number;
  }> {
    const defaultParams: Record<string, string | number | boolean> = {
      page: 1,
      limit: 20,
    };
    const finalParams = { ...defaultParams, ...params };
    const response = await this.client.get<{
      orders: unknown[];
      totalPages: number;
      currentPage: number;
      count: number;
    }>('/api/order/me', finalParams);
    return response.data;
  }

  async createOrder(orderData: {
    orderItems: {
      product: string;
      name: string;
      image: string;
      price: number;
      quantity: number;
    }[];
    shippingAddress: {
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
    paymentMethod: string;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
  }): Promise<unknown> {
    const response = await this.client.post<unknown>('/api/order', orderData);
    return response.data;
  }
}
