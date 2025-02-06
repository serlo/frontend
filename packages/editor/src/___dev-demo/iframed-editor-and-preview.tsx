import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <iframe
    style={{ width: '100%', height: '100%', borderWidth: '0' }}
    // Embedding from subdomain (cross-origin-mock) on host page localhost:5173 simulates cross-origin.
    // Important because a lot of iframe, cookie, CSP security measures are only in effect for cross-origin iframes.
    src="http://cross-origin-mock.localhost:5173/demo/react-preview/"
    sandbox={`
      allow-downloads
      allow-forms
      allow-modals
      allow-popups
      allow-popups-to-escape-sandbox
      allow-presentation
      allow-same-origin
      allow-scripts
      allow-storage-access-by-user-activation
    `}
    allow={`
      clipboard-read *;
      clipboard-write *;
      fullscreen *;
      autoplay *
    `}
  ></iframe>
)
