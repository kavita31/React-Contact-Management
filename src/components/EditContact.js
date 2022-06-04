import {  useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const EditContact = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const location = useLocation()
    const { contact } = location.state;

    useEffect(() => {
        setName(contact.name);
        setEmail(contact.email);
    }, [contact]);

    let navigate = useNavigate();

    const RouteChange = () => {
        navigate('/')
    }

    const update = (e) => {
        e.preventDefault();
        if (name === '' || email === '') {
            alert("All the fields are mandatory!");
            return;
        }

        const state = {
            id: contact.id,
            name: name,
            email: email
        }

        props.updateContactHandler(state);
        setName("");
        setEmail("");
        RouteChange();
    }

    return (
        <div className="ui main">
            <h2>Edit Contact</h2>
            <form onSubmit={update} className="ui form">
                <div className="field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email" />
                </div>
                <button className="ui button blue ">Update</button>
            </form>
        </div>
    );
}
