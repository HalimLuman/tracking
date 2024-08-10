const Computer = require('../models/Computer');

// Start tracking a computer
exports.startTracking = async (req, res) => {
    try {
        const { name } = req.body;

        const computer = new Computer({
            name,
            startTime: Date.now(),
        });

        await computer.save();
        res.status(201).json(computer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Stop tracking a computer
exports.stopTracking = async (req, res) => {
    try {
        const { id } = req.params;

        const computer = await Computer.findById(id);
        if (!computer) {
            return res.status(404).json({ message: 'Computer not found' });
        }

        computer.shutdownTime = Date.now();
        computer.totalTime = Math.floor((computer.shutdownTime - computer.startTime) / (1000 * 60)); // Convert milliseconds to minutes

        await computer.save();
        res.json(computer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Record a download
exports.recordDownload = async (req, res) => {
    try {
        const { id } = req.params;
        const { download } = req.body;

        const computer = await Computer.findById(id);
        if (!computer) {
            return res.status(404).json({ message: 'Computer not found' });
        }

        computer.downloads.push(download);
        await computer.save();

        res.json(computer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Record a website visit
exports.recordWebsiteVisit = async (req, res) => {
    try {
        const { id } = req.params;
        const { website } = req.body;

        const computer = await Computer.findById(id);
        if (!computer) {
            return res.status(404).json({ message: 'Computer not found' });
        }

        computer.websites.push(website);
        await computer.save();

        res.json(computer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all computers data
exports.getAllComputers = async (req, res) => {
    try {
        const computers = await Computer.find();
        res.json(computers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
