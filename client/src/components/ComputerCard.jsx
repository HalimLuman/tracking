import React from 'react';

const ComputerCard = ({ name, startTime, shutdownTime, totalTime, downloads, websites }) => {
    return (
        <div className="computer-card">
            <h2>Computer {name}</h2>
            <p>Start Time: {new Date(startTime).toLocaleString()}</p>
            <p>Shutdown Time: {shutdownTime ? new Date(shutdownTime).toLocaleString() : 'Running'}</p>
            <p>Total Time Spent: {totalTime} minutes</p>
            <h3>Downloads:</h3>
            <ul>
                {downloads.map((download, index) => (
                    <li key={index}>{download}</li>
                ))}
            </ul>
            <h3>Websites Visited:</h3>
            <ul>
                {websites.map((website, index) => (
                    <li key={index}>{website}</li>
                ))}
            </ul>
        </div>
    );
};

export default ComputerCard;
