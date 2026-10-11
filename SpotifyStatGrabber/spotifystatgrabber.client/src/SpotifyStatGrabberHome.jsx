import { useEffect, useState } from 'react';

function SpotifyStatGrabberHome() {
    const [trackStreams, setTrackStreams] = useState();

    useEffect(() => {
        console.log("SpotifyStatGrabberHome useEffect called");
        populateTrackStreams();
    }, []);

    return (
        <div>
            <p>{trackStreams}</p>
        </div>
    );

    async function populateTrackStreams()
    {
        console.log("populating track streams...");
        const response = await fetch('api/trackstream/loadtrackstreams');
        if (response.ok) {
            const data = await response.json();
            setTrackStreams(data);
        }
    }
}

export default SpotifyStatGrabberHome;