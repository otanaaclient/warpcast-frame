document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'IvJR3EdaHw9fRZ3eCmq5iPAFW-4Ecybz'; 
    const BASE_URL = 'https://api.warpcast.com/v2';

    const fetchUserData = async (fid) => {
        try {
            const response = await fetch(`${BASE_URL}/userDataByFid?fid=${fid}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            updateUI(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            document.querySelector('.frame-body').innerHTML = '<p style="color: red;">Failed to load data.</p>';
        }
    };

    const updateUI = (data) => {
        const userData = data.data?.userDataBody || {};
        document.querySelector('#username').textContent = userData.username || 'Unknown User';
        document.querySelector('#profile-img').src = userData.value || 'https://via.placeholder.com/50';
        document.querySelector('#allocation').textContent = '20 Allocations';
        document.querySelector('#remaining').textContent = '5 Remaining';
        document.querySelector('#percent-tipped').textContent = '85%';
        document.querySelector('#rank').textContent = 'Top #10';
        document.querySelector('#score').textContent = '98';
    };

    // Mock Test Data (For Development)
    const mockFID = 6833;
    fetchUserData(mockFID);
});
