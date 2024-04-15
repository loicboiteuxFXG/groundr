import {IoSearchSharp} from "react-icons/io5";
import React, {useState} from "react";
import {useConversation} from "../../context/ConversationContext";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
    const [error, setError] = useState(false)
    const [search, setSearch] = useState("")
    const {setSelectedConversation} = useConversation()
    const {conversations} = useGetConversations()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!search) return

        const conversation = conversations.find((c) => (c.firstName + " " + c.lastName).toLowerCase().includes(search.toLowerCase()))
        if(conversation) {
            setError(false)
            setSelectedConversation(conversation)
            setSearch("")
        } else {
            setError(true)
        }
    }
     return (
         <div>
             <form className="search" onSubmit={handleSubmit}>
                 <input type="text" placeholder="Rechercher" className="form-control" value={search}
                 onChange={(e) => setSearch(e.target.value)}/>
                 <button type="submit" className="btnSearch rounded-circle">
                     <IoSearchSharp style={{width:"100%", height:"100%"}}/>
                 </button>
             </form>
             {error && <span className="accent-red-700">Conversation non trouvée.</span>}
         </div>
     )
}

export default SearchInput