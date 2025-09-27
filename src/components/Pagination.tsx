import { useEffect, useState } from 'react';
import { getProducts, deleteProduct, updateProduct } from '../services/productService';
import type { Product } from '../types/product';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const navigate = useNavigate();
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => setError('Error al cargar productos'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDelete = async () => {
    if (deleteId) {
      setLoading(true);
      await deleteProduct(deleteId);
      setProducts(products.filter(p => p.id !== deleteId));
      setDeleteId(null);
      setLoading(false);
    }
  };

  const handleEdit = async (product: Product) => {
    setLoading(true);
    const updated = await updateProduct(product.id, { title: product.title, price: product.price });
    setProducts(products.map(p => (p.id === product.id ? updated : p)));
    setEditProduct(null);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de productos</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border px-2 py-1 rounded w-full"
          placeholder="Buscar por título"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded"
          onClick={() => navigate('/nuevo')}
        >
          Añadir
        </button>
      </div>
      {loading && <div className="text-blue-600">Cargando...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(p => (
            <tr key={p.id}>
              <td className="p-2 border">{p.id}</td>
              <td className="p-2 border">{p.title}</td>
              <td className="p-2 border">${p.price}</td>
              <td className="p-2 border flex gap-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded"
                  onClick={() => setEditProduct(p)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => setDeleteId(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginación */}
      <div className="flex gap-2 justify-center mb-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {/* Modal de edición */}
      {editProduct && (
        <EditModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={handleEdit}
        />
      )}
      {/* Modal de eliminación */}
      {deleteId && (
        <DeleteModal
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

// Modal de edición
function EditModal({ product, onClose, onSave }: {
  product: Product;
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return setError('El título es requerido');
    if (price <= 0) return setError('El precio debe ser mayor a 0');
    onSave({ ...product, title, price });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-2">Editar producto</h2>
        <input
          className="border px-2 py-1 rounded w-full mb-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título"
        />
        <input
          type="number"
          className="border px-2 py-1 rounded w-full mb-2"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          placeholder="Precio"
        />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="flex gap-2 justify-end">
          <button className="px-3 py-1 bg-gray-300 rounded" onClick={onClose}>Cancelar</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={handleSubmit}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

// Modal de eliminación
function DeleteModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">¿Eliminar producto?</h2>
        <div className="flex gap-2 justify-end">
          <button className="px-3 py-1 bg-gray-300 rounded" onClick={onCancel}>Cancelar</button>
          <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default Home;