import {useState} from "react"
import axios from "axios"


const useSearchUser = () => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    const searchUser = async (name, genders, orientations, sort) => {
        setLoading(true)

        const searchData = {
            name: name,
            genders: genders,
            orientations: orientations,
            sort: sort
        }

        try {
            const response = await axios.post("https://localhost:3001/user/users-search", searchData, {
                headers: {
                    "Authorization" :`Bearer ${JSON.parse(localStorage.getItem('auth-user'))}`
                }
            })
            setUsers(response.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return {searchUser, loading, users}
}

export default useSearchUser