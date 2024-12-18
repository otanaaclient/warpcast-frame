document.addEventListener('DOMContentLoaded', () => {
    // API Configuration
    const API_KEY = 'wc_secret_29b25514c07d8415ba66464e05441d777c070438cfa09cf74e93963d_97ed49ea'; // Warpcast API Key
    const BASE_URL = 'https://api.warpcast.com/v2';

    const fetchUserData = async (fid) => {
        try {
            if (!API_KEY) {
                throw new Error("API Key is missing. Please provide a valid API key.");
            }

            const response = await fetch(`${BASE_URL}/userDataByFid?fid=${fid}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Request failed: ${response.status} ${response.statusText} - ${errorMessage}`);
            }

            const data = await response.json();
            console.log("Fetched Data:", data);
            updateUI(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            document.querySelector('.frame-body').innerHTML = `<p style="color: red;">${error.message}</p>`;
        }
    };

    const updateUI = (data) => {
        const userData = data?.data || {};
        const userBody = userData?.userDataBody || {};

        // Check if HTML elements exist
        const usernameEl = document.querySelector('#username');
        const profileImgEl = document.querySelector('#profile-img');
        const farcasterIdEl = document.querySelector('#farcaster-id');

        if (!usernameEl || !profileImgEl || !farcasterIdEl) {
            console.error("Required HTML elements are missing. Check your HTML structure.");
            return;
        }

        // Update UI with data or fallback values
        usernameEl.textContent = userBody.username || '@username';
        profileImgEl.src = userBody.value || 'https://via.placeholder.com/50';
        farcasterIdEl.textContent = userData.fid || 'Farcaster ID';

        // Additional Stats
        document.querySelector('#allocation').textContent = '20 Allocations';
        document.querySelector('#remaining').textContent = '5 Remaining';
        document.querySelector('#percent-tipped').textContent = '85%';
        document.querySelector('#rank').textContent = 'Top #10';
        document.querySelector('#score').textContent = '98';

        // Apply Fade-In Animation
        const rows = document.querySelectorAll('.data-row');
        rows.forEach((row, index) => {
            row.style.animation = `fadeIn 0.5s ease-in-out ${(index + 1) * 0.1}s forwards`;
        });
    };

    // Fetch data for a specific user FID (example FID: 6833)
    fetchUserData(6833);

    // Add animations to body
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
});
