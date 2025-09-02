import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GuestProvider } from './context/GuestContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GuestProvider>
      <App />
    </GuestProvider>
  </StrictMode>,
)
