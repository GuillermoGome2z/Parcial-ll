import { useState } from 'react';
import type { Product } from '../types/product';

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (p: Product) => void;
}

export default function EditProductModal({ product, onClose, onSave }: EditProductModalProps) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setError('El título es requerido');
    if (price <= 0) return setError('El precio debe ser mayor a 0');
    onSave({ ...product, title, price });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded shadow-lg w-80 flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-2 text-blue-700">Editar producto</h2>
        <input
          className="border px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título"
        />
        <input
          type="number"
          className="border px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          placeholder="Precio"
        />
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex gap-2 justify-end mt-2">
          <button
            type="button"
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}