const {createContext, useContext, useState} = require('react')

export const ConversationContext = createContext(null)

export const useConversation = () => {
    return useContext(ConversationContext)
}

export const ConversationContextProvider = ({children}) => {

    const [selectedConversation, setSelectedConversation] = useState(null)
    const [messages, setMessages] = useState(null)

    return <ConversationContext.Provider value={{selectedConversation, setSelectedConversation, messages, setMessages}}>{children}</ConversationContext.Provider>
}