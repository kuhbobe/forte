import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?"
const clientID = "7708fc22a830427cb3c94009446b8366"
const redirectUri= "http://localhost:3000"
const scopes = ["user-library-read", "playlist-read-private"]

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
})

let accessToken = ''; // Declare a variable to store the access token

export const setClientToken = (token) => {
    accessToken = token; // Store the access token when it's set
}

export const clearAccessToken = () => {
    accessToken = ''; // Clear the access token
    localStorage.removeItem('token'); // Remove access token from local storage
}

const getRefreshToken = async () => {
    // Get refresh token from local storage or wherever it's stored
    const refreshToken = localStorage.getItem('refresh_token');
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientID
        }),
    };

    try {
        const response = await fetch(url, payload);
        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }
        const data = await response.json();
        accessToken = data.access_token; // Update the access token
        localStorage.setItem('access_token', accessToken); // Store the new access token
        console.log('Access token updated:', accessToken); // Log message when access token is updated
        return accessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error; // Throw error for handling
    }
};


// Intercept requests to add Authorization header with access token
apiClient.interceptors.request.use(async function(config) {
    if (!accessToken) {
        try {
            accessToken = await getRefreshToken(); // Try to refresh token if not available
        } catch (error) {
            console.error('Error getting access token:', error);
            throw error; // Throw error for handling
        }
    }
    config.headers.Authorization = "Bearer " + accessToken;
    return config;
});



export default apiClient;
