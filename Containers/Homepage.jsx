import React, {useEffect, useState} from 'react';
import Navigation from "../Containers/Navigation/Navigation";
import Contacts from "../Components/Contacts/Contacts";
import AddNewContact from "./Modals/AddNewContact/AddNewContact";
import EditContact from "./Modals/EditContact/EditContact";


const Homepage = () => {
    const [contacts, setContacts] = useState();
    const [addNewContact, setAddNewContact] = useState(false);
    const [editContact, setEditContact] = useState(null);
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        getContacts().then(r => {
            setContacts(r);
        })
    }, []);

    const getContacts = async () => {
        const response = await fetch('/api/contacts');
        return await response.json();
    }
    return (
        <div
            className='flex flex-col min-h-screen h-full items-stretch relative bg-white dark:bg-black text-black dark:text-white'>
            <Navigation setAddNewContact={setAddNewContact}/>
            <div
                className='max-w-[768px] w-full flex flex-col items-stretch before:absolute before:w-[1px] before:h-full before:top-0 before:-ml-6 before:bg-[#282828] mx-auto px-6'>
                {contacts?.map((e, index) => (
                    <div key={e.name + index}>
                        <Contacts id={e.id} image={e.photo} name={e.name} phoneNumber={e.phone_number}
                                  favourite={e.is_favourite}
                                  setEditContact={setEditContact} favorites={favorites} setFavorites={setFavorites}
                                  setContacts={setContacts}/>
                    </div>
                ))}
            </div>
            {addNewContact && <AddNewContact setContacts={setContacts} setAddNewContact={setAddNewContact}/>}
            {editContact &&
                <EditContact editContact={editContact} setEditContact={setEditContact} setContacts={setContacts}/>}
        </div>
    );
};

export default Homepage;
