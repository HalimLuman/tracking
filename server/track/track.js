const axios = require('axios');
const os = require('os');
const { exec } = require('child_process');

// Example computer name (you can change this to dynamic detection based on the computer)
const computerName = os.hostname();

// Start tracking when the script is started
const startTracking = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/computers/start', { name: computerName });
        return response.data._id;
    } catch (error) {
        console.error('Error starting tracking:', error.message);
    }
};

// Stop tracking when the script is terminated
const stopTracking = async (computerId) => {
    try {
        await axios.post(`http://localhost:3000/api/computers/stop/${computerId}`);
    } catch (error) {
        console.error('Error stopping tracking:', error.message);
    }
};

// Function to monitor downloads
const monitorDownloads = async (computerId) => {
    // This is a simplified example. You might need a more robust solution to monitor downloads.
    exec('ls ~/Downloads', async (error, stdout) => {
        if (error) {
            console.error('Error checking downloads:', error.message);
            return;
        }
        const downloads = stdout.split('\n').filter(Boolean);
        for (const download of downloads) {
            await axios.post(`http://localhost:3000/api/computers/download/${computerId}`, { download });
        }
    });
};

// Function to monitor visited websites
const monitorWebsites = async (computerId) => {
    // This is a simplified example. You might need a more robust solution to monitor websites.
    const websites = ['https://example.com']; // Replace with actual method to get visited websites
    for (const website of websites) {
        await axios.post(`http://localhost:3000/api/computers/website/${computerId}`, { website });
    }
};

// Main function
const main = async () => {
    const computerId = await startTracking();
    if (computerId) {
        setInterval(() => monitorDownloads(computerId), 60000); // Check downloads every minute
        setInterval(() => monitorWebsites(computerId), 60000); // Check websites every minute

        // Stop tracking when the process is exited
        process.on('exit', async () => {
            await stopTracking(computerId);
        });

        // Handle unexpected exits (e.g., from SIGINT or SIGTERM)
        process.on('SIGINT', async () => {
            await stopTracking(computerId);
            process.exit();
        });

        process.on('SIGTERM', async () => {
            await stopTracking(computerId);
            process.exit();
        });
    }
};

// Execute the main function
main();
