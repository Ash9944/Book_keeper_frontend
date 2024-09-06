import axios from 'axios';
const baseUrl = 'http://192.168.29.195:8080';

async function httpRequest(url, method = "GET", body = null) {
    try {
        var options = {
            url: url,
            method: method,
            headers: {
                'User-Agent': 'Axios',
                "Content-Type": "application/json",
            },
            responseType: 'json'
        };
        if (method.toLowerCase() == "get") {
            if (body) {
                options.params = body; // treat body as query string
            }
        } else {
            if (body) {
                options.data = body;
            }
        }
        return axios(options).catch(error => error)
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function validateUser(userDetails) {
    try {
        let response = await httpRequest(`${baseUrl}/login`, 'POST', userDetails);
        if (!response.data) {
            throw new Error("Failed To Validate User");
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

export async function signUpUser(userDetails) {
    try {
        let response = await httpRequest(`${baseUrl}/sign/up`, 'POST', userDetails);
        if (!response.data) {
            throw new Error("Failed To Sign up User");
        }

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getFriends(userId) {
    try {
        let response = await httpRequest(`${baseUrl}/friends/${userId}`, 'GET');
        if (!response.data) {
            throw new Error("Failed To Sign up User");
        }

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getRequests(userId) {
    try {
        let response = await httpRequest(`${baseUrl}/requests/${userId}`, 'GET');
        if (!response.data) {
            throw new Error("Failed To Sign up User");
        }

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getUserDetails(userId) {
    try {
        let response = await httpRequest(`${baseUrl}/user/${userId}`, 'GET');
        if (!response.data) {
            throw new Error("Failed To fetch User");
        }

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getAllUserDetails(userId) {
    try {
        let response = await httpRequest(`${baseUrl}/users/${userId}`, 'GET');
        if (!response.data) {
            throw new Error("Failed To fetch User");
        }

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function addFriend(userId, friendId) {
    try {
        let response = await httpRequest(`${baseUrl}/add/friend`, 'POST', {
            "friendId": friendId,
            "userId": userId
        });

        if (!response.data) {
            throw new Error("Failed To fetch User");
        }

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function acceptFriendRequest(userId, friendId) {
    try {
        let response = await httpRequest(`${baseUrl}/accept/friend`, 'POST', {
            "friendId": friendId,
            "userId": userId
        });

        if (!response.data) {
            throw new Error("Failed To fetch User");
        }

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}