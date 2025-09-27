import { useState } from 'react';
import { addProduct } from '../services/productService';
import { useNavigate } from 'react-router-dom';

function NewProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setError('El título es requerido');
    if (price <= 0) return setError('El precio debe ser mayor a 0');
    setLoading(true);
    await addProduct({ title, price });
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nuevo producto</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          className="border px-2 py-1 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título"
        />
        <input
          type="number"
          className="border px-2 py-1 rounded"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          placeholder="Precio"
        />
        {error && <div className="text-red-600">{error}</div>}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          type="button"
          onClick={() => navigate('/')}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default NewProduct;