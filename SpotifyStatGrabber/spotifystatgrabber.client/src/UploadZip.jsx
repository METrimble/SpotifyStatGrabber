import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap';

function UploadZip() {
    const [selectedZip, setSelectedZip] = useState(null);
    const [uploadedStreamsCount, setUploadedStreamsCount] = useState(0);
    const [currentTrackStreamCount, setCurrentTrackStreamCount] = useState(0);
    const [isServerReady, setIsServerReady] = useState(false);
    const [serverIsloading, setServerIsLoading] = useState(true);
    const [unableToLoad, setUnableToLoad] = useState(false);
    const [populatingStreams, setPopulatingStreams] = useState(false);
    const maxRetryAttempts = 20; // Timeout after 40s

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Make sure server is ready for the application
    useEffect(() => {
        let retryAttempts = 0;
        let localIsServerReady = isServerReady;

        const pollServer = async () => {
            setServerIsLoading(true);
            while (!localIsServerReady && retryAttempts <= maxRetryAttempts) {
                localIsServerReady = await checkServer();

                console.log("retry attmept: ", retryAttempts);
                retryAttempts = retryAttempts + 1;
                await delay(2000); // 2 second delay
            }
            setServerIsLoading(false);
        }

        const couldNotLoadServer = async () => {
            if (retryAttempts >= maxRetryAttempts) {
                setUnableToLoad(true);
                console.log("Server was unable to load, try refreshing");
            }
        }

        pollServer();
        couldNotLoadServer();

    }, [isServerReady])

    // Get the count of uploaded streams after zip is processed
    useEffect(() => {
        if (!isServerReady) return;

        getTeackStreamCount();
    }, [uploadedStreamsCount, isServerReady]);

    // Handle Zip upload and processing
    const onFileChange = (event) => {
        setSelectedZip(event.target.files[0]);
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "File", selectedZip
        );
        populateTrackStreams(formData);
    };

    // If server is still mounting
    if (serverIsloading) {
        return <div><p>Server is loading.... </p></div>
    }
    // Server error or timeout
    else if (unableToLoad) {
        return <div><p>Server timed-out, please try refreshing the page.</p></div>
    }
    // Server is up
    else {
        return (
            <div>
            <div>
                <p>Current Stream Count: {currentTrackStreamCount}</p>
                <div>
                    <input type="file" accept=".zip" onChange={onFileChange} ></input>
                    <button onClick={onFileUpload}>Upload Spotify Extended Streaming History Zip</button>
                </div>
                {populatingStreams ? <p>Reading zip file...</p> : <p>Uploaded Streams: {uploadedStreamsCount}</p>}
            </div>
            
                <Navbar>
                    <Container>
                        <Navbar.Brand>Spotify Stat Grabber</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse>
                        <Nav>
                            <Nav.Link as={Link} to="/trackstreamlist" >List Streaming History</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }

    // Check that the server side is live
    async function checkServer() {
        try {
            const response = await fetch('api/isserverready');

            if (!response.ok) {
                throw new Error(`HTTP error: status: ${response.status}`);
            }

            setIsServerReady(true);
            return true;
        }
        catch (error) {
            setIsServerReady(false);
            console.log("Error checking server:", error);
            return false;
        }
    }

    // Get the amount of track streams CURRENTLY in the DB
    async function getTeackStreamCount() {
        try {
            const response = await fetch('api/trackstream/gettrackstreamcount');

            if (!response.ok) {
                throw new Error(`HTTP error: status: ${response.status}`);
            }

            const data = await response.json();
            setCurrentTrackStreamCount(data);
        }
        catch (error) {
            console.log("Error getting stream count:", error);
        }
    }

    // Populate the DB after zip is uploaded
    async function populateTrackStreams(zipFile) {
        try {
            setPopulatingStreams(true);
            const response = await fetch('api/trackstream/loadtrackstreams', {
                method: "POST",
                body: zipFile,
            });

            if (!response.ok) {
                throw new Error(`HTTP error: status: ${response.status}`);
            }

            const data = await response.json();
            setUploadedStreamsCount(data);
            if (data != null) setPopulatingStreams(false);
        }
        catch (error) {
            console.log("Error populating track streams:", error);
        }
    }
    
}

export default UploadZip;