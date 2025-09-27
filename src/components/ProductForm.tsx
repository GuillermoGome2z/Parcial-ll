import { useState } from 'react';
import { addProduct } from '../services/productService';

export default function ProductForm({ onAdd }: { onAdd: () => void }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct({ title, price, description });
    setTitle('');
    setPrice(0);
    setDescription('');
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" required />
      <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Precio" required />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" required />
      <button type="submit">Agregar producto</button>
    </form>
  );
}