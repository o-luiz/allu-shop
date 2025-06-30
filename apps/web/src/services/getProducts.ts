export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
}

export interface PaginatedProductsResponse {
  success: boolean;
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export async function getProducts(
  params: GetProductsParams = {}
): Promise<PaginatedProductsResponse> {
  const { page = 1, limit = 10, search, category } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    queryParams.append('search', search);
  }

  if (category) {
    queryParams.append('category', category);
  }

  try {
    const response = await fetch(
      `/api/catalog/products?${queryParams.toString()}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Erro ao buscar produtos: ${response.status} - ${response.statusText}. ${errorText}`
      );
    }

    const data: PaginatedProductsResponse = await response.json();

    if (!data || typeof data.success !== 'boolean') {
      throw new Error('Resposta da API em formato inválido');
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}

export async function getProductsForInfiniteQuery(
  pageParam = 1,
  limit = 10
): Promise<PaginatedProductsResponse> {
  return getProducts({ page: pageParam, limit });
}

export async function searchProducts(
  query: string,
  limit = 5
): Promise<Product[]> {
  try {
    const response = await getProducts({ search: query, limit });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos para autocomplete:', error);
    return [];
  }
}

export interface SingleProductResponse {
  success: boolean;
  data: Product;
}

export async function getProductBySlug(
  slug: string
): Promise<SingleProductResponse> {
  try {
    const response = await fetch(
      `/api/catalog/products/${encodeURIComponent(slug)}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Erro ao buscar produto: ${response.status} - ${response.statusText}. ${errorText}`
      );
    }

    const data: SingleProductResponse = await response.json();

    if (!data || typeof data.success !== 'boolean') {
      throw new Error('Resposta da API em formato inválido');
    }

    if (!data.success) {
      throw new Error('Produto não encontrado');
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar produto por slug:', error);
    throw error;
  }
}

export interface AutocompleteResponse {
  success: boolean;
  data: Product[];
  total: number;
}

export async function getProductsAutocomplete(
  query: string,
  limit = 5
): Promise<AutocompleteResponse> {
  try {
    const queryParams = new URLSearchParams({
      query: query.trim(),
      limit: limit.toString(),
    });

    const response = await fetch(
      `/api/catalog/products/autocomplete?${queryParams.toString()}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Erro ao buscar autocomplete: ${response.status} - ${response.statusText}. ${errorText}`
      );
    }

    const data: AutocompleteResponse = await response.json();

    if (!data || typeof data.success !== 'boolean') {
      throw new Error('Resposta da API em formato inválido');
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar autocomplete:', error);
    throw error;
  }
}
