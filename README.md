# SPA Gestión de Productos

Este proyecto es una Single Page Application (SPA) construida con **React + Vite + TypeScript + Tailwind CSS** para gestionar productos usando la API pública de [https://dummyjson.com/products](https://dummyjson.com/products).

## Características

- **Pantalla principal** (`/`):  
  - Lista de productos (id, title, price)
  - Búsqueda por título
  - Paginación client-side
  - Botón "Añadir" para navegar a `/nuevo`
  - Botón "Editar" que abre un modal para editar (title, price)
  - Botón "Eliminar" que abre un modal de confirmación
  - Estados de UI: loading, error, validaciones mínimas

- **Pantalla de creación** (`/nuevo`):  
  - Formulario para crear producto (title, price)
  - Validaciones mínimas (title requerido, price > 0)
  - POST a `/products/add` y regreso a `/` con la lista actualizada

- **Consumo de API real**:  
  - Endpoints GET, POST, PUT, DELETE a [dummyjson.com/products](https://dummyjson.com/products)

- **Estilos**:  
  - 100% con Tailwind CSS

## Estructura de Carpetas

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── types/
│   └── product.ts
├── services/
│   └── productService.ts
├── components/
│   ├── EditProductModal.tsx
│   ├── DeleteProductModal.tsx
├── pages/
│   ├── Home.tsx
│   └── NewProduct.tsx
```

## Instalación y uso

1. **Clona el repositorio**
   ```
   git clone <url-del-repo>
   cd segundo-parcial
   ```

2. **Instala dependencias**
   ```
   npm install
   ```

3. **Configura Tailwind CSS**  
   (Ya configurado, pero si necesitas reinstalar)
   ```
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. **Inicia el servidor de desarrollo**
   ```
   npm run dev
   ```

5. **Abre en tu navegador**
   ```
   http://localhost:5173/
   ```

## Notas

- El proyecto usa la API pública de [dummyjson.com](https://dummyjson.com/products), por lo que los cambios no son persistentes.
- Si Tailwind no aplica los estilos, revisa la configuración de `tailwind.config.js`, `postcss.config.js` y asegúrate de importar `index.css` en `main.tsx`.

---


