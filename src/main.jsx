import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// index.js atau App.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import './index.css'; // Import Tailwind CSS
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
