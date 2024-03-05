'use strict'
import axios from "axios";

export const checkIfValidToken = async () => {

    const token = JSON.parse(localStorage.getItem("usertoken"));
    if (!token) {
        return false;
    }

    try {
        await axios.post('http://localhost:3001/auth/check-token', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return true
    } catch (err) {
        return false
    }

}