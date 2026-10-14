import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fullsite.css'
import UploadZip from './UploadZip.jsx'
import { BrowserRouter } from 'react-router-dom'
import TrackStreamList from './TrackStreamList.jsx'
import { Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <StrictMode>
            <UploadZip />
            <Routes><Route path="/trackstreamlist" element={<TrackStreamList />} ></Route></Routes>
    </StrictMode>
    </BrowserRouter>,
)
