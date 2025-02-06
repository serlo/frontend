import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  // Works
  // <iframe
  //   style={{ width: '100%', height: '100%', borderWidth: '0' }}
  //   // Embedding localhost:3001 on host page localhost:3000 simulates cross-origin. Important because a lot of iframe, cookie, CSP security measures are only in effect for cross-origin iframes.
  //   src="http://localhost:3000/demo/react-preview/"
  // ></iframe>

  // Does not work
  <iframe
    style={{ width: '100%', height: '100%', borderWidth: '0' }}
    // Embedding localhost:3001 on host page localhost:3000 simulates cross-origin. Important because a lot of iframe, cookie, CSP security measures are only in effect for cross-origin iframes.
    src="http://localhost:3001/demo/react-preview/"
  ></iframe>
)
