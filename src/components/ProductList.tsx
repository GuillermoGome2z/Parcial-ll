import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import type { Product } from '../types/product';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h2>Lista de productos</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <strong>{p.title}</strong> - ${p.price} <br />
            {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}