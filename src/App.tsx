import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewProduct from './pages/NewProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nuevo" element={<NewProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;