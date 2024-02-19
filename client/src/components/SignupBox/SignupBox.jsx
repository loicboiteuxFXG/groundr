import {useState} from "react";
import {User} from "../../class/User";
import {postCreateUser} from "../../utils/FetchUtils";



const SignupBox = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPwd] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        postCreateUser(new User(firstName, lastName, password, email))
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>Enter your first name:
                <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>Enter your first name:
                <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <label>Enter your email:
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>Enter your password:
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPwd(e.target.value)}
                />
            </label>
            <input type="submit"/>
        </form>
    );
}

export default SignupBox;