import {useState} from "react";
import {postDemo} from "../../utils/FetchUtils";

const HomeSettings = () => {

    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); // (1) in notes below
        postDemo({"name": name})
    };


    return(
        <form onSubmit={handleSubmit}>
            <label>Enter your name:
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <input type="submit"/>
        </form>
    );
}

export default HomeSettings;