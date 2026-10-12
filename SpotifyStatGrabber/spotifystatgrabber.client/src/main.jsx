import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fullsite.css'
import SpotifyStatGrabberHome from './SpotifyStatGrabberHome.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SpotifyStatGrabberHome />
  </StrictMode>,
)
