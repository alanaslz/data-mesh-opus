import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 👈 importar o BrowserRouter
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/data-mesh-opus/">
    <App />
  </BrowserRouter>
);
