import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import SpotifyStatGrabberHome from './SpotifyStatGrabberHome.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SpotifyStatGrabberHome />
  </StrictMode>,
)
