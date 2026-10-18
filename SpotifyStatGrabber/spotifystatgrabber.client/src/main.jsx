import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fullsite.css'
import UploadZip from './UploadZip.jsx'
import { BrowserRouter } from 'react-router-dom'
import TrackStreamList from './TrackStreamList.jsx'
import { Routes, Route } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StrictMode>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossorigin="anonymous"
            />

            <UploadZip />
            <Routes><Route path="/trackstreamlist" element={<TrackStreamList />} ></Route></Routes>
    </StrictMode>
    </BrowserRouter>,
)

//<Routes><Route path="/trackstreamlist" element={<TrackStreamList />} ></Route></Routes>
//<Nav.Link to="/trackstreamlist" >List Streaming History</Nav.Link>
