import { ApiClient } from './ApiClient.js';

export class ProductService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getProductList(
    params?: Record<string, string | number | boolean>
  ): Promise<{
    products: unknown[];
    totalPages: number;
    currentPage: number;
    count: number;
  }> {
    const defaultParams: Record<string, string | number | boolean> = {
      name: 'all',
      category: 'all',
      brand: 'all',
      min: '1',
      max: '2500',
      rating: '0',
      order: '0',
      page: '1',
      limit: '10',
      sortOrder: JSON.stringify({ _id: -1 }),
    };
    const finalParams = { ...defaultParams, ...params };
    const response = await this.client.get<{
      products: unknown[];
      totalPages: number;
      currentPage: number;
      count: number;
    }>('/api/product/list', finalParams);
    return response.data;
  }

  async getProductItem(slug: string): Promise<{ product: unknown }> {
    const response = await this.client.get<{ product: unknown }>(
      `/api/product/item/${slug}`
    );
    return response.data;
  }
}
