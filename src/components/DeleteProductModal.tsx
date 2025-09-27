interface DeleteProductModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteProductModal({ onCancel, onConfirm }: DeleteProductModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4 text-red-600">¿Eliminar producto?</h2>
        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}