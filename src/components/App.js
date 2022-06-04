import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import uuidv4 from 'uuidv4';
import { AddContact } from './AddContact';
import './App.css';
import { ContactDetail } from './ContactDetails';
import { ContactList } from './ContactList';
import { Header } from './Header';
import api from '../api/Contacts'
import { EditContact } from './EditContact';
import { ConfirmationDialog } from './ConfirmationDialog';

function App() {
  //const LOCAL_STORAGE_KEY = "contacts"
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const getAllContacts = async () => {
    const allContacts = await retriveContacts();
    if (allContacts) setContacts(allContacts);
  }

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact
    }

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };


  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact)
    //const { id, name, email } = response.data;
    const { id } = response.data;
    setContacts(contacts.map((contact) => {
      return contact.id === id ? { ...response.data } : contact;
    }))
  }

  const removeContactHandler = async (id) => {
    await api.delete(`contacts/${id}`);
    getAllContacts();

    /*const newContactList =
      contacts.filter((contact) => {
        return contact.id !== id;
      });
    setContacts(newContactList);*/
  };

  useEffect(() => {
    /* var retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
     console.log("first  cl..", retriveContacts);
     if (retriveContacts) setContacts(retriveContacts);*/
    getAllContacts();
  }, []);

  /*useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);*/

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContactList);
    }
    else {
      setSearchResult(contacts);
    }
  }

  return (
    <BrowserRouter>
      <div className='ui container'>
        <Header />
        <Routes>
          <Route exact path="/" element={<ContactList contacts={searchTerm.length < 1 ? contacts : searchResult} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />} />
          <Route path="/create" element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path="/contact/:id" element={<ContactDetail />} />
          <Route path="/edit/:id" element={<EditContact updateContactHandler={updateContactHandler} />} />
          <Route path="/confirm" element={<ConfirmationDialog />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
