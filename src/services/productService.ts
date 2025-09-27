import type { Product } from '../types/product';

const API_URL = 'https://dummyjson.com/products';

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.products;
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const res = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return res.json();
}

// Asegúrate de tener esta función exportada:
export async function deleteProduct(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}