import { useState } from 'react';
import { nanoid } from 'nanoid';

import initialState from '../../data/contacts.json';
import Container from '../Container/Container';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import useLocalStorage from 'hooks/useLocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', initialState);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    if (contacts.some(({ name }) => name === data.name)) {
      alert(`${data.name} is already in contacts!`);
      return;
    } else if (contacts.some(({ number }) => number === data.number)) {
      alert(`${data.number} is already in contacts!`);
      return;
    }
    const { name, number } = data;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(contacts => [newContact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const lowerCaseFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter),
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
}
