document.addEventListener('DOMContentLoaded', () => {
    // API Configuration
    const API_KEY = 'IvJR3EdaHw9fRZ3eCmq5iPAFW-4Ecybz'; // Replace 'your_actual_api_key_here' with your valid Warpcast API key
    const BASE_URL = 'https://api.warpcast.com/v1';

    if (!API_KEY || API_KEY === '<YOUR_API_KEY>') {
        console.warn("API key is missing. Using mock data for testing.");
        updateUI({
            data: {
                userDataBody: {
                    username: "Test User",
                    value: "https://via.placeholder.com/50",
                },
                fid: "12345",
            },
        });
        return;
    }

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
            console.error("Error fetching user data:", error);
            document.querySelector('.frame-body').innerHTML = '<p style="color: red;">Failed to load data. Please try again later.</p>';
        }
    };

    const updateUI = (data) => {
        const userData = data.data || {};
        const userBody = userData.userDataBody || {};

        // Update Profile Information
        document.querySelector('#username').textContent = userBody.username || '@username';
        document.querySelector('#profile-img').src = userBody.value || 'https://via.placeholder.com/50';
        document.querySelector('#farcaster-id').textContent = userData.fid || 'Farcaster ID';

        // Update Stats with better visuals
        document.querySelector('#allocation').textContent = '20 Allocations';
        document.querySelector('#remaining').textContent = '5 Remaining';
        document.querySelector('#percent-tipped').textContent = '85%';
        document.querySelector('#rank').textContent = 'Top #10';
        document.querySelector('#score').textContent = '98';

        // Enhance animations
        const rows = document.querySelectorAll('.data-row');
        rows.forEach((row, index) => {
            row.style.animation = `fadeIn 0.5s ease-in-out ${(index + 1) * 0.1}s forwards`;
        });
    };

    // Fetch data for a specific user FID (example FID: 6833)
    fetchUserData(6833);

    // Add animations
    const rows = document.querySelectorAll('.data-row');
    rows.forEach((row) => {
        row.style.opacity = 0;
    });

    // Animations
    document.querySelector('body').style.animation = 'fadeInBg 1s ease-in-out';

    // CSS Keyframes
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInBg {
            from {
                background: #f4f4f4;
            }
            to {
                background: linear-gradient(120deg, #f3f4f7, #eaf1fc);
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Fetch blockchain data
    const fetchBlockchainData = async () => {
        try {
            const { createPublicClient, http } = await import("viem");
            const { base } = await import("viem/chains");

            const client = createPublicClient({
                chain: base,
                transport: http("https://base-mainnet.g.alchemy.com/v2/IvJR3EdaHw9fRZ3eCmq5iPAFW-4Ecybz"),
            });

            const block = await client.getBlock({
                blockNumber: 123456n,
            });

            console.log(block);

            // Display blockchain data in the UI
            const blockInfo = document.createElement('div');
            blockInfo.innerHTML = `
                <h3>Blockchain Data</h3>
                <p><strong>Block Number:</strong> ${block.number}</p>
                <p><strong>Timestamp:</strong> ${new Date(block.timestamp * 1000).toLocaleString()}</p>
                <p><strong>Transactions:</strong> ${block.transactions.length}</p>
            `;
            document.body.appendChild(blockInfo);
        } catch (error) {
            console.error("Error fetching blockchain data:", error);
        }
    };

    // Fetch and display blockchain data
    fetchBlockchainData();
});
