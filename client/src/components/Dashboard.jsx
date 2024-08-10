import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComputerCard from './ComputerCard';

const Dashboard = () => {
    const [computers, setComputers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:3000/api/computers');
            setComputers(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className="dashboard">
            {computers.map((computer, index) => (
                <ComputerCard key={index} {...computer} />
            ))}
        </div>
    );
};

export default Dashboard;
