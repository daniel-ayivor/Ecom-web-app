import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CartContext from './components/contexts/CartContext.tsx'
import AuthProvider from './components/contexts/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartContext>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CartContext>
  </StrictMode>,
)
