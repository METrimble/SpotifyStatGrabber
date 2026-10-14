import { useState } from 'react';
import { Link } from "react-router-dom";

function UploadZip() {
    const [selectedZip, setSelectedZip] = useState(null);

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

    return (
        <div>
            <div>
                <input type="file" accept=".zip" onChange={onFileChange} ></input>
                <button onClick={onFileUpload}>Upload Spotify Extended Streaming History Zip</button>
            </div>
            <Link to="/trackstreamlist">All Stream Data</Link>
        </div>
    );

    async function populateTrackStreams(zipFile) {
        try {
            const response = await fetch('api/trackstream/loadtrackstreams', {
                method: "POST",
                body: zipFile,
            });

            if (!response.ok) {
                throw new Error(`HTTP error: status: ${response.status}`);
            }
        }
        catch (error) {
            console.log("Error populating track streams:", error);
        }
    }
}

export default UploadZip;