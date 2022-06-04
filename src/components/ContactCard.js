import { useState } from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";
import { Button, Modal } from 'semantic-ui-react'

export const ContactCard = (props) => {
    const { id, name, email } = props.contact;
    const [showPopup, setShowPopup] = useState(false);

    const ConfirmationDialog = ({ name }) => {
        return (
            <Modal
                size="mini"
                open={showPopup}>
                <Modal.Header>Delete Contact</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete {name + `'s`}  contact ?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setShowPopup(false)}>
                        No
                    </Button>
                    <Button positive onClick={() => props.clickHandler(id)}>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }

    // props.clickHandler(id)

    return (
        <div className="item">
            <ConfirmationDialog name={name} />
            <img className="ui avatar image" src={user} alt="user"></img>
            <div className="content">
                <Link to={`contact/${id}`} state={{ contact: props.contact }}>
                    <div className="header">
                        {name}
                    </div>
                    <div>{email}</div>
                </Link>
            </div>
            <i className="trash alternate outline icon"
                style={{ color: 'red', marginTop: '7px', marginLeft: '10px' }}
                onClick={() => setShowPopup(true)}>
            </i>

            <Link to={`edit/${id}`} state={{ contact: props.contact }}>
                <i className="edit alternate outline icon"
                    style={{ color: 'blue', marginTop: '7px' }}
                >
                </i>
            </Link>

        </div>

    );
}

