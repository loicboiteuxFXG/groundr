import {useQuery} from "react-query";
import {fetchDemo} from "../../utils/FetchUtils";


const HomeChatbox = () => {

    const { data, status } = useQuery('test', fetchDemo, {cacheTime: 0})

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'error') {
        return <p>Something went wrong :(</p>
    }

    return(
        <p>{data['fact']}</p>
    )
}

export default HomeChatbox;