import { useEffect, useState } from 'react';
import './trackstream.css'

function TrackStreamList() {
    const [trackStreams, setTrackStreams] = useState();

    //Table Pagination
    const itemsPerPage = 50;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTrackStreams = trackStreams?.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getTrackStreams();
    }, []);

    const allTrackStreamsContent = trackStreams === undefined
        ? <p><em>Parsing your streams...</em></p>
        : <table className="track-stream-table">
            <thead>
                <tr>
                    <th>Time Stamp</th>
                    <th>Platform</th>
                    <th>Milliseconds Played</th>
                    <th>Connected Country</th>
                    <th>IP Address</th>
                    <th>Track Name</th>
                    <th>Artist Name</th>
                    <th>Album Name</th>
                    <th>Spotify Track Link</th>
                    <th>Episode Name</th>
                    <th>Episode Show Name</th>
                    <th>Spotify Episode Link</th>
                    <th>Audiobook Title</th>
                    <th>Spotify Audiobook Link</th>
                    <th>Spotify Audiobook Chapter Link</th>
                    <th>Audiobook Chapter</th>
                    <th>Reason Stream Was Started</th>
                    <th>Reason Stream Was Ended</th>
                    <th>Shuffle Mode On</th>
                    <th>Stream Skipped</th>
                    <th>User In Offine Mode</th>
                    <th>Offline Time Stamp</th>
                    <th>User In Incognito Mode</th>
                </tr>
            </thead>
            <tbody>
                {currentTrackStreams.map(trackStream =>
                    <tr>
                        <td>{trackStream.ts}</td>
                        <td>{trackStream.platform}</td>
                        <td>{trackStream.ms_played}</td>
                        <td>{trackStream.conn_country}</td>
                        <td>{trackStream.ip_addr}</td>
                        <td>{trackStream.master_metadata_track_name}</td>
                        <td>{trackStream.master_metadata_album_artist_name}</td>
                        <td>{trackStream.master_metadata_album_album_name}</td>
                        <td>{trackStream.spotify_track_uri}</td>
                        <td>{trackStream.episode_name}</td>
                        <td>{trackStream.episode_show_name}</td>
                        <td>{trackStream.spotify_episode_uri}</td>
                        <td>{trackStream.audiobook_title}</td>
                        <td>{trackStream.audiobook_uri}</td>
                        <td>{trackStream.audiobook_chapter_uri}</td>
                        <td>{trackStream.audiobook_chapter_title}</td>
                        <td>{trackStream.reason_start}</td>
                        <td>{trackStream.reason_end}</td>
                        <td>{trackStream.shuffle}</td>
                        <td>{trackStream.skipped}</td>
                        <td>{trackStream.offline}</td>
                        <td>{trackStream.offline_timestamp}</td>
                        <td>{trackStream.incognito_mode}</td>
                    </tr> 
                )}
            </tbody>
        </table>

    return (
        <div>
            {allTrackStreamsContent}

            <div>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <div>
                    Page {currentPage} of {Math.ceil(trackStreams?.length / itemsPerPage)}
                </div>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(trackStreams?.length / itemsPerPage)} >
                    Next
                </button>
            </div>
        </div>
    );

    async function getTrackStreams()
    {
        try {
            const response = await fetch('api/trackstream/gettrackstreams');

            if (!response.ok) {
                throw new Error(`HTTP error: status: ${response.status}`);
            }

            const data = await response.json();
            setTrackStreams(data);
        }
        catch (error) {
            console.log("Error getting track streams:", error);
        }
    }
}

export default TrackStreamList;