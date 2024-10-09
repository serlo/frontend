import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Preview } from './preview'

// import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Preview />
  </StrictMode>
)
