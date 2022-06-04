import { Link, useLocation } from 'react-router-dom';
import user from '../images/user.png'
export const ContactDetail = (props) => {
    const location = useLocation()
    const { contact } = location.state;
    // const { id } = useParams();
    // console.log("id", id);
    console.log("details", contact)
    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className='content'>
                    <div className='header'>
                        {contact.name}
                    </div>
                    <div className='description'>
                        {contact.email}
                    </div>
                </div>
            </div>

            <div className='center-div'>
                <Link to="/">
                    <button className='ui button blue center' >Back To Contact List</button>
                </Link>
            </div>

        </div>
    );
}