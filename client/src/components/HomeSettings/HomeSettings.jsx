import {useState} from "react";
import {ConnectedUserContext} from "../../pages/HomeLayout";
import {useContext} from "react";
const HomeSettings = () => {

    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); // (1) in notes below
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