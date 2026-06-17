
import axios from "axios";
const API_URL = "http://localhost:8089/api/auth";

// Signup
export const signup = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password
    });
    return response.data;
};

// Login
export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password
    });
    return response.data;
};

// Get all profiles (requires session token in header)
export const getAllProfiles = async (sessionToken) => {
    const response = await axios.get(`${API_URL}/profiles`, {
        headers: { "X-Session-Token": sessionToken }
    });
    return response.data;
};

// Update profile
export const updateProfile = async (email, username, bio, sessionToken) => {
    const response = await axios.put(
        `${API_URL}/profile/${email}`,
        { username, bio },
        {
            headers: {
                "X-Session-Token": sessionToken
            }
        }
    );
    return response.data;
};
