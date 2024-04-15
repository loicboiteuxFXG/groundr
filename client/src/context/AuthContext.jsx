import axios from "axios";

const {createContext, useContext, useState} = require('react')

export const AuthContext = createContext({
    firstName: 'Chargement',
    lastName: '',
    bio: '',
    pfpURL: 'default-user.png'
})

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {

    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('auth-user')))

    return <AuthContext.Provider value={{authUser, setAuthUser}}>{children}</AuthContext.Provider>
}