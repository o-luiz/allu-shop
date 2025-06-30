// Versão mockada de dados para construção de ui
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

export interface CatalogResponse {
  success: boolean;
  data: Product[];
  total: number;
}

export interface PaginatedCatalogResponse {
  success: boolean;
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}

const API_BASE_URL = 'http://localhost:3330/api';

export async function fetchProducts(): Promise<CatalogResponse> {
  const response = await fetch(`${API_BASE_URL}/catalog`);

  if (!response.ok) {
    throw new Error(`Error fetching products: ${response.status}`);
  }

  const data: CatalogResponse = await response.json();
  return data;
}

export async function fetchProductsPaginated(
  page = 1,
  limit = 10
): Promise<PaginatedCatalogResponse> {
  try {
    const allProductsResponse = await fetchProducts();

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = allProductsResponse.data.slice(startIndex, endIndex);

    const totalPages = Math.ceil(allProductsResponse.total / limit);
    const hasNextPage = page < totalPages;

    return {
      success: true,
      data: paginatedData,
      total: allProductsResponse.total,
      page,
      limit,
      totalPages,
      hasNextPage,
    };
  } catch (error) {
    console.error('Error fetching paginated products:', error);
    throw error;
  }
}
