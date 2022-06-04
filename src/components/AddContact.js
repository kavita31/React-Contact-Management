import { Component } from "react";
import { Link } from "react-router-dom";
export class AddContact extends Component {
    state = {
        name: '',
        email: ''
    };

    add = (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.email === '') {
            alert("All the fields are mandatory!");
            return;
        }
        this.props.addContactHandler(this.state);
        this.setState({ name: "", email: "" });
        window.location.href = "/"
    }

    render() {

        return (
            <div className="ui main">
                <h2>Add Contact</h2>
                <form onSubmit={this.add} className="ui form">
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name"
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                            placeholder="Email" />
                    </div>
                    <button className="ui button blue ">Add</button>
                    <Link to="/">
                        <button className="ui button trasparent ">Cancel</button>
                    </Link>
                </form>
            </div>


        );
    }
}