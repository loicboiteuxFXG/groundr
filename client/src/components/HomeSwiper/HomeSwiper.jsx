import {useQuery} from "react-query";
import {fetchDB} from "../../utils/FetchUtils";

const HomeSwiper = () => {

    const { data, status } = useQuery('test', fetchDB, {cacheTime: 0})

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'error') {
        return <p>Something went wrong :(</p>
    }


    return(
        <p>{JSON.stringify(data)}</p>
    )
}

export default HomeSwiper;