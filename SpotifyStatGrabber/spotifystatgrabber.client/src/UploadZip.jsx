import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function UploadZip() {
    const [selectedZip, setSelectedZip] = useState(null);
    const [uploadedStreamsCount, setUploadedStreamsCount] = useState(0);
    const [currentTrackStreamCount, setCurrentTrackStreamCount] = useState(0);
    const [isServerReady, setIsServerReady] = useState(false);
    const [isloading, setIsLoading] = useState(true);
    const [unableToLoad, setUnableToLoad] = useState(false);
    const maxRetryAttempts = 20; // Timeout after 40s

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Make sure server is ready for the application
    useEffect(() => {
        let retryAttempts = 0;

        const pollServer = async () => {
            setIsLoading(true);
            while (!isServerReady && retryAttempts <= maxRetryAttempts) {
                checkServer();

                console.log("retry attmept: ", retryAttempts);
                retryAttempts = retryAttempts + 1;
                await delay(2000); // 2 second delay
            }
            setIsLoading(false);
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

    // Returns html to build the page
    if (isloading) {
        return <div><p>Server is loading.... </p></div>
    }
    else if (unableToLoad) {
        return <div><p>Server polling timed-out, please try refreshing the page.</p></div>
    }
    else {
        return (
            <div>
                <p>Current Stream Count: {currentTrackStreamCount}</p>
                <div>
                    <input type="file" accept=".zip" onChange={onFileChange} ></input>
                    <button onClick={onFileUpload}>Upload Spotify Extended Streaming History Zip</button>
                </div>
                <p>Uploaded Streams: {uploadedStreamsCount}</p>
                <Link to="/trackstreamlist">All Stream Data</Link>
            </div>

        )
    }

    // Check that the server side is live
    async function checkServer() {
        console.log("check server ready!");
        try {
            const response = await fetch('api/isserverready');

            if (!response.ok) {
                throw new Error(`HTTP error: status: ${response.status}`);
            }

            setIsServerReady(true);
        }
        catch (error) {
            setIsServerReady(false);
            console.log("Error populating track streams:", error);
        }
    }

    // Get the amount of track streams CURRENTLY in the DB
    async function getTeackStreamCount() {
        console.log("get track stream count!");
        try {
            const response = await fetch('api/trackstream/gettrackstreamcount');

            if (!response.ok) {
                throw new Error(`HTTP error: status: ${response.status}`);
            }

            const data = await response.json();
            setCurrentTrackStreamCount(data);
        }
        catch (error) {
            console.log("Error populating track streams:", error);
        }
    }

    // Populate the DB after zip is uploaded
    async function populateTrackStreams(zipFile) {
        console.log("uploading zip!");
        try {
            const response = await fetch('api/trackstream/loadtrackstreams', {
                method: "POST",
                body: zipFile,
            });

            if (!response.ok) {
                throw new Error(`HTTP error: status: ${response.status}`);
            }

            const data = await response.json();
            setUploadedStreamsCount(data);
        }
        catch (error) {
            console.log("Error populating track streams:", error);
        }
    }
    
}

export default UploadZip;